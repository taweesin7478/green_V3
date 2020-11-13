<template>
  <div>
    <v-row no-gutters>
    <v-col class="text-center">
            <img
              width="400px"
              height="300px"
              src="@/assets/Image.png"
            />
    </v-col>
    </v-row>
        <v-row class="mt-n6" no-gutters>
          <v-col class="text-center">
            <p style="#525151; font-size:39px">Join meeting</p>
          </v-col>
        </v-row>
        <v-row class="mt-n6">
          <v-col class="text-center pb-6">
            <p style="#525151; font-size:15px">Please enter URL room for join meeting.</p>
          </v-col>
        </v-row>
        <v-row class="text-center mt-n3" no-gutters>
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="4" sm="12" xs="12">
            <v-text-field outlined placeholder="Room URL or Room ID" v-model="url1"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="text-center mt-n4" no-gutters>
          <v-col cols="4" md="4"></v-col>
          <v-col cols="4" md="4" sm="12" xs="12">
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
          <v-col cols="4" md="4"></v-col>
        </v-row>
    </div>
</template>
<script>
export default {
  components: {
  },
  data () {
    return {
      url1: '',
      uuid: '',
      fullname: '',
      showPassword: false,
      cid: process.env.VUE_APP_DOMAIN + '/join/?uuid='
    }
  },
  created () {
    // console.log('created')
    this.chklogin()
  },
  methods: {
    chklogin () {
      if (this.$cookies.get('user-token') === null) {
        // console.log('no login')
        this.$swal('WARNING !', 'Token expired, please sign in', 'warning')
        this.$router.push('/')
      }
    },
    async checkroom () {
      this.uuid = this.$route.query.uuid
      try {
        var { data } = await this.axios.get(
          process.env.VUE_APP_API + '/api/rooms/check/' + this.$route.query.uuid
        )
        // this.roominfo = data
        // console.log('data', data)
        this.fullname = data.fullname
        if (data.status === 'Success') {
          if (data.secretRoom === true) {
            // console.log('secret')
            this.$router.push('/otp/?uuid=' + this.$route.query.uuid)
          } else {
            if (data.key === 'true') {
              this.showPassword = true
              // console.log('true:', data.key)
            } else if (data.key === 'false') {
              this.showPassword = false
              // console.log('false:', data.key)
            }
          }
          // console.log('checksessionroom: success')
        } else {
          this.$swal(data.status, data.message, 'error')
          // this.$router.push('/')
          // console.log('checksessionroom: fail')
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', 'meeting is not start', 'error')
        // console.log('error', error.message)
      }
    },
    joinroom () {
      if (this.url1.startsWith('http') === false) {
        var url2 = this.cid + this.url1
        window.open(url2, '_self')
      } else {
        window.open(this.url1, '_self')
      }
    }
  }
}
</script>
