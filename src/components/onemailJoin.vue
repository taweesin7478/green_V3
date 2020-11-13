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
            <p style="#525151; font-size:15px">Please enter Name and room for join meeting.</p>
          </v-col>
        </v-row>
        <v-row class="text-center mt-n3" no-gutters>
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="4" sm="12" xs="12">
            <v-text-field outlined placeholder="Name" v-model="name"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="text-center mt-n3" no-gutters>
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="4" sm="12" xs="12">
            <v-text-field outlined placeholder="Password" v-model="pass"></v-text-field>
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
                @click="checkmasse"
              >{{buttonname}}</v-btn>
            </div>
          </v-col>
          <v-col cols="4" md="4"></v-col>
        </v-row>
    </div>
</template>
<script>

export default {
  data () {
    return {
      password: '',
      uuid: '',
      roomName: '',
      name: '',
      message: true,
      buttonname: 'start',
      pass: ''
    }
  },
  created () {
    this.checkroom()
  },
  methods: {
    async checkroom () {
      // console.log('chacroom')
      this.uuid = this.$route.query.uuid
      // console.log('clientid', this.$route.query.clientid)
      try {
        var { data } = await this.axios.get(
          process.env.VUE_APP_API_ONEMAIL + '/api/v1/oneconf/service/checkroom/' + this.uuid, {
            headers: {
              Authorization: 'Bearer ' + `${this.$route.query.clientid}`
            }
          }
        )
        // console.log('checkroom', data)
        if (data.status === 'success') {
          if (data.message === 'show modulater.') {
            this.buttonname = 'start'
          } else {
            this.buttonname = 'join'
          }
          this.password = data.password
        } else {
          this.$swal('warning!', data.message, 'warning')
        }
      } catch (error) {
        // console.log('error check', error.response.data.message)
        this.$swal('warning!', error.response.data.message, 'warning')
      }
    },
    async joinroom () {
      this.uuid = this.$route.query.uuid
      // console.log('uid', this.$route.query.uuid)
      var datajson = {
        uid: this.uuid,
        password: this.pass,
        name: this.name
      }
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API_ONEMAIL + '/api/v1/oneconf/service/joinroom/', datajson, {
            headers: {
              Authorization: 'Bearer ' + `${this.$route.query.clientid}`
            }
          }
        )
        // console.log(data)
        if (data.status === 'success') {
          window.open(data.url, '_self')
        } else {
          this.$swal('warning!', data.message, 'warning')
        }
      } catch (error) {
        // console.log('joinroom', error.response.data.message)
        this.$swal('warning!',
          error.response.data.message,
          'warning')
      }
    },
    async createsession () {
      // console.log('cliid session', this.$route.query.uuid)
      this.uuid = this.$route.query.uuid
      var datajson = {
        uid: this.uuid,
        password: this.pass,
        name: this.name
      }
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API_ONEMAIL + '/api/v1/oneconf/service/createsession/', datajson, {
            headers: {
              Authorization: 'Bearer ' + `${this.$route.query.clientid}`
            }
          }
        )
        // console.log(data)
        if (data.status === 'success') {
          window.open(data.url, '_self')
        } else {
          // console.log(data)
          this.$swal('warning!', data.message, 'warning')
        }
      } catch (error) {
        // console.log('sion', error.response.data.message)
        this.$swal('warning!',
          error.response.data.message,
          'error')
      }
    },
    checkmasse () {
      if (this.buttonname === 'start') {
        // console.log('start', this.buttonname)
        this.createsession()
      } else {
        // console.log('joinroom', this.buttonname)
        this.joinroom()
      }
    }
  }
}
</script>
