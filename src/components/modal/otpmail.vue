<template>
  <div>
    <div
      class="pt-5 pb-10"
      no-gutters
      style="background-color: rgba(255, 255, 255,0.6);border-radius:36px;padding:10px;"
    >
      <v-col cols="12" md="12" sm="12" xs="12" style="padding-top:40px">
        <v-row>
          <v-col class="text-center">
            <p style="#525151; font-size:39px">{{ roomName }}</p>
          </v-col>
        </v-row>
        <v-row class="mt-n8">
          <v-col class="text-center pb-6">
            <p style="#525151; font-size:15px">Invite by : {{fullname}}</p>
          </v-col>
        </v-row>
        <v-row class="mt-n8" v-if="showPassword">
          <v-col class="text-center" >
            <span style="color:#525151; font-size:15px" class="text-center">
              Please enter the password meeting. before entering the
              meeting.
            </span>
          </v-col>
        </v-row>
        <v-row class="text-center mt-n2" v-if="showPassword">
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="4" sm="10" xs="12">
            <v-text-field outlined placeholder="Password meeting" v-model="password"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="text-center mt-n8" >
          <v-col cols="12" md="4"  ></v-col>
          <v-col cols="12" md="4" sm="10" xs="12">
            <div style="float:center">
              <v-btn
                large
                color="success"
                class="ma-2 white--text no-uppercase border-radius-10"
                style="font-size: 20px;"
                @click="joinroom"
              >Join</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      password: '',
      uuid: '',
      fullname: '',
      showPassword: false,
      prevRoute: null,
      roomName: '',
      overlay: false
    }
  },
  sockets: {
    meet: function (response) {
      console.log('sockets : ' + response)
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log('otp', next)
    next(vm => {
      vm.prevRoute = from
    })
  },
  computed: {
    ...mapState('dialog', ['displayName']),
    localDisplayName: {
      get () {
        return this.displayName
      },
      set (value) {
        this.setDisplayName(value)
      }
    }
  },
  created () {
    // console.log('created')
    console.log('service', this.$route.query.service)
    if (this.$route.query.service === 'onemail') {
      var url = '/onemailjoin/?uuid=' + this.$route.query.uuid + '&clientid=' + `${escape(this.$route.query.clientid)}`
      console.log('url', url)
      this.$router.push(url)
    } else {
      this.checkroom()
    }
  },
  methods: {
    async checkroom () {
      this.uuid = this.$route.query.uuid
      try {
        var { data } = await this.axios.get(
          process.env.VUE_APP_API + '/api/rooms/check/' + this.$route.query.uuid
        )
        // this.roominfo = data
        // console.log('data', data)
        this.fullname = data.fullname
        this.roomName = data.roomname
        if (data.status === 'Success') {
          if (data.secretRoom === true) {
            // console.log('secret')
            this.chklogin()
          } else {
            // console.log('no serect')
            // console.log(this.prevRoute.path)
            if (this.prevRoute.path !== '/meetingnologin/') {
              console.log('in if check path')
              this.checkLoginNoSecret(data.key)
            } else {
              // console.log('key before if', data.key)
              this.checkkey(data.key)
            }
          }
          // console.log('checksessionroom: success')
        } else {
          this.$swal(data.status, data.message, 'error')
          // this.$router.push('/')
          // console.log('checksessionroom: fail')
        }
      } catch (error) {
        // this.$swal('warning!', 'meeting is not start', 'warning')
        this.$swal.fire({
          title: 'Warning !',
          text: 'meeting is not start',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ok'
        }).then((result) => {
          if (result.value) {
            var rolechk = localStorage.getItem('role')
            if (rolechk === 'user') {
              this.$router.push('/joinuserrole')
            } else if (rolechk === 'admin') {
              this.$router.push('/main')
            } else {
              this.$router.push('/')
            }
          }
        })
        // window.history.back()
        // console.log('error', error.message)
      }
    },
    checkkey (key) {
      if (key === 'true') {
        this.showPassword = true
        // console.log('true:', key)
      } else if (key === 'false') {
        this.showPassword = false
        // console.log('false:', key)
      }
    },
    chklogin () {
      if (this.$cookies.get('user-token') === null) {
        // console.log('no login')
        this.$swal('WARNING !', 'Token expired, please sign in', 'warning')
        this.$router.push('/')
      } else {
        this.$router.push('/otp/?uuid=' + this.$route.query.uuid)
      }
    },
    checkLoginNoSecret (key) {
      if (this.$cookies.get('user-token') === null) {
        this.$router.push('/meetingnologin/?uuid=' + this.$route.query.uuid)
      } else {
        this.checkkey(key)
      }
    },
    async joinroom () {
      this.$socket.emit('Joinroom', {
        data: JSON.stringify({
          id: '216594',
          name: 'Buddha',
          approve: false,
          meetingID: '2c6277820b5073b44b9caa0944f8591a-1605241081472'
        })
      })
      // this.overlay = true
      if (this.prevRoute.path === '/meetingnologin/') {
        // console.log('joinNoLogin')
        this.joinNoLogin()
      } else {
        // ต้องใส่ if เพื่อดัก socket.io ก่อนเข้าห้อง
        this.uuid = this.$route.query.uuid
        try {
          var { data } = await this.axios.post(
            process.env.VUE_APP_API + '/api/rooms/joinroom',
            {
              roomuid: this.uuid,
              key: this.password,
              name: ''
            }
          )
          // this.roominfo = data
          // console.log('data', data)
          if (data.status === 'success') {
            window.open(data.url, '_self')
            // this.$cookies.set('meetUrl', data.url)
            // var url = '/lobby?uuid=' + this.$route.query.uuid
            // this.$router.push(url)
          // console.log('checksessionroom: success')
          } else {
            this.$swal('ผิดพลาด!', data.message, 'warning')
          // this.$router.push('/otp/?uuid=' + this.$route.query.uuid)
          // console.log('checksessionroom: fail')
          }
        } catch (error) {
          this.$swal('ผิดพลาด!', error.message, 'error')
          // console.log('error', error.message)
        }
      }
    },
    async joinNoLogin () {
      this.uuid = this.$route.query.uuid
      try {
        var { data } = await this.axios.post(process.env.VUE_APP_API + '/api/rooms/unauth/joinroom', {
          roomuid: this.uuid,
          name: this.localDisplayName,
          key: this.password
        })
        // console.log(data)
        if (data.status === 'success') {
          window.open(data.url, '_self')
          // this.$cookies.set('meetUrl', data.url)
          // var url = '/lobby?uuid=' + this.$route.query.uuid
          // this.$router.push(url)
        } else {
          this.$swal('WARNING !', data.message, 'warning')
        }
      } catch (error) {
        this.$swal('ERROR !', error.message, 'error')
      }
    }
  },
  watch: {
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 30000)
    }
  }
}
</script>
