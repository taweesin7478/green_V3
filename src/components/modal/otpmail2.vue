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
        <v-row class="mt-n12">
          <v-col class="text-center">
            <p style="#525151; font-size:15px">
              Invite by : {{fullname}}
            </p>
          </v-col>
        </v-row>
        <v-row class="mt-n5" v-if="showPassword">
          <v-col class="text-center">
            <span style="color:#525151; font-size:15px" class="text-center">
              Please enter the password meeting. before entering the
              meeting.</span
            >
          </v-col>
        </v-row>
        <v-row class="text-center " v-if="showPassword" >
          <v-col cols="12" md="4"  ></v-col>
          <v-col cols="12" md="4" sm="10" xs  >
            <v-text-field
              outlined
              placeholder="Password meeting"
              v-model="password"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="text-center " >
          <v-col cols="12" md="4"  ></v-col>
          <v-col cols="12" md="4" sm="10" xs  >
            <div style="">
              <v-btn
                large
                color="success"
                class="ma-2 white--text no-uppercase border-radius-10"
                style="font-size: 20px;"
                @click="joinroom"
              >
                Join
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      password: '',
      uuid: '',
      fullname: '',
      showPassword: false,
      roomName: ''
    }
  },
  created () {
    this.checkroom()
  },
  methods: {
    async checkroom () {
      this.uuid = this.$route.query.uuid
      try {
        var { data } = await this.axios.get(
          process.env.VUE_APP_API + '/api/rooms/check/' + this.$route.query.uuid
        )
        this.fullname = data.fullname
        this.roomName = data.roomname
        if (data.key === 'true') {
          this.showPassword = true
          // console.log('true:', data.key)
        } else if (data.key === 'false') {
          this.showPassword = false
          // console.log('false:', data.key)
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', error.message, 'error')
        // console.log('error', error.message)
      }
    },
    async joinroom () {
      this.uuid = this.$route.query.uuid
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/joinroom', {
            roomuid: this.uuid,
            key: this.password,
            name: ''
          }
        )
        this.roominfo = data
        // console.log('data', data)
        if (data.status === 'success') {
          window.open(data.url, '_self')
          // this.$cookies.set('meetUrl', data.url)
          // var url = '/lobby?uuid=' + this.$route.query.uuid
          // this.$router.push(url)
          // console.log('checksessionroom: success')
        } else {
          this.$swal('ผิดพลาด!', data.message, 'error')
          // this.$router.push('/otp/?uuid=' + this.$route.query.uuid)
          // console.log(data.message)
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', 'ไม่มีห้อง', 'error')
        // console.log('error', error.message)
      }
    }
  }
}
</script>
