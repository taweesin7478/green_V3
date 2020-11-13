<template>
  <div>
    <v-row no-gutters>
      <v-col class="text-center">
        <img width="400px" height="300px" src="@/assets/Image.png" />
      </v-col>
    </v-row>
    <v-row class="mt-n6" no-gutters>
      <v-col class="text-center">
        <p style="#525151; font-size:39px">Start meeting</p>
      </v-col>
    </v-row>
    <!-- <v-row class="mt-n6">
          <v-col class="text-center pb-6">
            <p style="#525151; font-size:15px">Please enter URL room for join meeting.</p>
          </v-col>
        </v-row> -->
    <!-- <v-row class="text-center mt-n3" no-gutters>
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="4" sm="12" xs="12">
            <v-text-field outlined placeholder="Room URL or Room ID" v-model="url1"></v-text-field>
          </v-col>
        </v-row> -->
    <v-row class="text-center mt-n4" no-gutters>
      <v-col cols="4" md="4"></v-col>
      <v-col cols="4" md="4" sm="12" xs="12">
        <div style="float:center">
          <v-btn
            v-if="btnjoin"
            large
            color="success"
            class="ma-2 white--text no-uppercase border-radius-10"
            style="font-size: 20px;"
            @click="joinold"
            >Join</v-btn
          >
          <v-btn
            v-if="btnstart"
            large
            color="success"
            class="ma-2 white--text no-uppercase border-radius-10"
            style="font-size: 20px;"
            @click="createSession"
            >Start</v-btn
          >
        </div>
      </v-col>
      <v-col cols="4" md="4"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  components: {},
  data () {
    return {
      datapage: null,
      btnstart: true,
      btnjoin: false,
      urljoinold: ''
    }
  },
  created () {
    // console.log('created')
    this.chklogin()
    this.decodejwttoken()
    this.checkmeeting()
  },
  methods: {
    chklogin () {
      if (this.$cookies.get('user-token') === null) {
        // console.log('no login')
        this.$swal('WARNING !', 'Token expired, please sign in', 'warning')
        this.$router.push('/')
      }
    },
    decodejwttoken () {
      var token = this.$cookies.get('user-token')
      const decryptedText = this.CryptoJS.AES.decrypt(
        token,
        'One Conference'
      ).toString(this.CryptoJS.enc.Utf8)
      var data = this.jwt.decode(decryptedText)
      this.datapage = data
    },
    async createSession () {
      this.axios
        .post(process.env.VUE_APP_API + '/api/rooms/createsession')
        .then(res => {
          if (res.data.status !== 'success') {
            this.$swal('warning', res.data.message, 'warning')
          } else {
            this.url = res.data.url
            window.open(this.url, '_self')
          }
        })
    },
    async checkmeeting () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/checkmeetting'
        )
        if (data.status === 'success') {
          this.btnstart = false
          this.btnjoin = true
          this.urljoinold = data.url
        } else {
          this.btnstart = true
          this.btnjoin = false
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', error.message, 'error')
      }
    },
    joinold () {
      window.open(this.urljoinold, '_self')
    }
  }
}
</script>
