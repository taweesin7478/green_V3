<template>
  <v-row justify="center">
    <v-dialog v-model="dialogCreate" persistent max-width="400px">
      <v-card
        min-height="200px"
        style="border-radius: 10px; box-shadow: 0.5px 0.5px 8px 4px rgba(0, 0, 0, 0.5), 0 6px 30px 0 rgba(0, 0, 0, 0.5);"
      >
        <v-card-title justify-center>
          <v-spacer></v-spacer>
          <v-icon @click="dialogCreate = false" style="font-weight: 900; font-size: 24pt;">mdi-close</v-icon>
        </v-card-title>
        <br />
        <v-card-text>
          <div
            class="text-center pb-4"
            style="color: #03429E; font-weight: bold; font-size: 20pt;"
          >สร้างห้องประชุม</div>
          <br />
          <div class="mr-4 ml-4">ชื่อห้องประชุม*</div>
          <div>
            <v-text-field
              class="mr-4 ml-4 border-radius-10"
              autofocus
              v-model="roomname"
              required
              outlined
              dense
            ></v-text-field>
          </div>
          <div class="mr-4 ml-4" v-if="chkPassword">รหัสเข้าห้องประชุม</div>
          <div class="pb-4" v-if="chkPassword">
            <v-text-field
              class="mr-4 ml-4 border-radius-10"
              v-model="password"
              type="password"
              outlined
              dense
              v-on:keyup="enterToSignIn"
            ></v-text-field>
          </div>
          <div class="mr-4 ml-4 mb-3"><input id="chkPassword" type="checkbox" v-model="chkPassword" /> ตั้งรหัสเข้าห้องประชุม</div>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="pb-6">
              <v-btn
                rounded
                class="mr-4"
                color="#03429E"
                @click="startroom"
                block
                style="color: white; padding: 25px;"
              >สร้าง</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      dialogCreate: false,
      roomname: '',
      password: '',
      chkPassword: false
    }
  },
  methods: {
    chklogin () {
      this.meeting()
    },
    goPage (link) {
      this.$router.push(link)
    },
    meeting () {
      this.goPage('/manage')
    },
    openSigninInfo () {
      this.dialogSigninInfo = true
    },
    async startroom () {
      // console.log('getjitsi')
      var token = this.$cookies.get('user-token')
      // console.log('start-token', token)
      var base64Url = token.split('.')[1]
      var datapage = JSON.parse(window.atob(base64Url))
      // console.log('header', headers)

      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/createroom',
          {
            roomname: this.roomname,
            user_id: datapage.users._id,
            option: 'video',
            key: this.password
          }
        )
        // this.roominfo = data
        // console.log('data', data)
        var roomdetail = [
          data.room.urlroom,
          data.room.urlinvite,
          data.room.meetingid,
          data.room.key,
          this.roomname
        ]
        localStorage.setItem('roomUrl', JSON.stringify(roomdetail))
        this.goPage('/manage')
      } catch (error) {
        console.log('error', error.message)
      }
    },
    createroom () {
      localStorage.setItem('rname', this.roomname)
      this.meeting()
    },
    enterToSignIn: function (e) {
      if (e.keyCode === 13) this.chklogins()
    }
  }
}
</script>

<style lang="css">
.v-dialog {
  border-radius: 10px !important;
  overflow-y: inherit !important;
}

.border-radius-10 {
  border-radius: 10px;
}
</style>
