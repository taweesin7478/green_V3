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
        <v-row class="mt-n8">
          <v-col class="text-center" >
            <span style="color:#525151; font-size:15px" class="text-center">
              Please enter your name for display in the meeting.
            </span>
          </v-col>
        </v-row>
        <v-row class="text-center mt-n2">
          <v-col cols="12" md="4"></v-col>
          <v-col cols="12" md="4" sm="10" xs="12">
            <v-text-field outlined placeholder="Enter your name" v-model="displayName"></v-text-field>
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
                @click="setValueDisplayName"
              >Join</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      password: '',
      uuid: '',
      fullname: '',
      showPassword: false,
      displayName: '',
      roomName: ''
    }
  },
  created () {
    // console.log('created')
    this.checkroom()
  },
  methods: {
    ...mapActions('dialog', [
      'setDisplayName'
    ]),
    setValueDisplayName () {
      this.setDisplayName(this.displayName)
      this.$router.push('/join?uuid=' + this.$route.query.uuid)
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
        this.roomName = data.roomname
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
            this.$router.push('/')
          }
        })
        // window.history.back()
        // console.log('error', error.message)
      }
    },
    checkName () {
      if (this.displayName !== '') {
        this.setValueDisplayName()
      } else {
        this.$swal.fire({
          title: 'ยังไม่กรอกชื่อ !',
          text: 'กรุณากรอกชื่อ',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ok'
        })
      }
    }
  }
}
</script>
