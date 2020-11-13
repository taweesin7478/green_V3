<template>
  <v-row>
    <v-dialog v-model="localDialog" max-width="492px" scrollable>
      <v-card max-width="492px" style="border-radius: 10px;">
        <v-card-title style="font-size:28px;">Send invite email</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" sm="12" xs="12" class="pr-0 pt-5 mb-n4">
              <span style="font-size: 20px;">Mail subject :</span>
            </v-col>
            <v-col cols="12" md="7" sm="12" xs="12">
              <v-text-field outlined dense class="no-radius" v-model="subject" style="font-size: 12px;"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-n7">
            <v-col cols="12" md="4" sm="12" xs="12" class="pr-0 pt-5 mb-n4">
              <span style="font-size: 20px;">Send mail to :</span>
            </v-col>
            <v-col cols="12" md="7" sm="12" xs="12">
              <v-text-field outlined dense class="no-radius" v-model="email" placeholder="name@example.com"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="12" sm="12" xs="12" class="text-right">
              <v-btn outlined class="no-uppercase radius-10 mr-1" width="80px" height="36px" @click="closeDialog">Close</v-btn>
              <v-btn class="no-uppercase radius-10" color="#086AAB" style="color:white;" width="80px" height="36px" @click="sharemeeting">Send</v-btn>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="12" sm="12" xs="12">
              <span style="font-size: 20px;">Other share</span>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12" md="2" sm="2" xs="2" class="text-center">
              <v-btn icon @click="copyText">
                <v-icon>mdi-checkbox-multiple-blank-outline</v-icon>
              </v-btn>
              <br/>
              <span style="font-size: 12px;">Copy</span>
              <!-- <v-text-field type="text" style="display: none;" v-model="txtCopy" id="txtCopy" ref="txtCopy"></v-text-field> -->
              <input type="hidden" v-model="txtCopy" id="txtCopy" ref="txtCopy" />
            </v-col>
            <v-col cols="12" md="2" sm="2" xs="2" class="text-center">
              <v-btn icon color="red" @click="gmail">
                <v-icon>mdi-gmail</v-icon>
              </v-btn>
              <br/>
              <span style="font-size: 12px;">Gmail</span>
            </v-col>
            <v-col cols="12" md="2" sm="2" xs="2" class="text-center">
              <v-btn icon color="blue" @click="office365">
                <v-icon>mdi-microsoft-office</v-icon>
              </v-btn>
              <br/>
              <span style="font-size: 12px;">Office 365</span>
            </v-col>
            <v-col cols="12" md="2" sm="2" xs="2" class="text-center">
              <v-btn icon color="blue" @click="outlook">
                <v-icon>mdi-microsoft-outlook</v-icon>
              </v-btn>
              <br/>
              <span style="font-size: 12px;">Outlook</span>
            </v-col>
            <v-col cols="12" md="2" sm="2" xs="2" class="text-center">
              <v-btn icon color="purple" @click="yahoo">
                <v-icon>mdi-yahoo</v-icon>
              </v-btn>
              <br/>
              <span style="font-size: 12px;">Yahoo Mail</span>
            </v-col>
            <v-col cols="12" md="2" sm="2" xs="2" class="text-center">
              <v-btn icon @click="onechat">
                <v-avatar size="22">
                  <img src="@/assets/shareMeeting/logoonechat.png" />
                </v-avatar>
              </v-btn>
              <br/>
              <span style="font-size: 12px;">ONE Mail</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      email: '',
      subject: '',
      room: [],
      user: [],
      roomName: '',
      userName: '',
      cid: process.env.VUE_APP_DOMAIN + '/join/?uuid=',
      roomUid: '',
      txtCopy: '',
      jwt: require('jsonwebtoken')
    }
  },
  computed: {
    ...mapState('dialog', ['shareMeeting']),
    localDialog: {
      get () {
        return this.shareMeeting
      },
      set (value) {
        this.setDialogShareMeeting(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogShareMeeting']),
    closeDialog () {
      this.setDialogShareMeeting(false)
    },
    sharemeeting () {
      // console.log('enter')
      var data = {
        subject: this.subject,
        email: this.email
      }
      // console.log('part1')
      // http://localhost:9213/api/avatar/pictureprofile
      this.axios.post(process.env.VUE_APP_API + '/api/rooms/sharemeeting', data).then(res => {
        // console.log('part2', res)
        if (res.data.status === 'success') {
          this.$swal('SUCCESS', res.data.message, 'success')
          // localStorage.setItem('user-token', res.data.token)
          // this.decodeToken()
          // window.location.reload()
          this.closeDialog()
        }
      }).catch(error => {
        this.$swal('WARNING !', error.response.data.message, 'warning')
      })
    },
    copyText () {
      var txtCopy = document.getElementById('txtCopy')
      txtCopy.type = 'text'
      txtCopy.select()
      txtCopy.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      txtCopy.type = 'hidden'
      // console.log(cid)
    },
    gmail () {
      // https://mail.google.com/mail/?view=cm&fs=1&su=คุณได้รับคำเชิญเข้าร่วมประชุม: (ชื่อห้องประชุม)&body=(ชื่อเจ้าของห้อง) เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: (URL ห้องประชุม)
      window.open('https://mail.google.com/mail/?view=cm&fs=1&su=คุณได้รับคำเชิญเข้าร่วมประชุม: ' + this.roomName + '&body=' + this.userName + ' เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: ' + this.cid + this.roomUid)
    },
    office365 () {
      // https://outlook.office.com/mail/deeplink/compose?subject=คุณได้รับคำเชิญเข้าร่วมประชุม: (ชื่อห้องประชุม)&body=(ชื่อเจ้าของห้อง) เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: (URL ห้องประชุม)
      window.open('https://outlook.office.com/mail/deeplink/compose?subject=คุณได้รับคำเชิญเข้าร่วมประชุม: ' + this.roomName + '&body=' + this.userName + ' เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: ' + this.cid + this.roomUid)
    },
    outlook () {
      // https://outlook.live.com/mail/deeplink/compose?subject=คุณได้รับคำเชิญเข้าร่วมประชุม: (ชื่อห้องประชุม)&body=(ชื่อเจ้าของห้อง) เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: (URL ห้องประชุม)
      window.open('https://outlook.live.com/mail/deeplink/compose?subject=คุณได้รับคำเชิญเข้าร่วมประชุม: ' + this.roomName + '&body=' + this.userName + ' เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: ' + this.cid + this.roomUid)
    },
    yahoo () {
      // https://compose.mail.yahoo.com/?&subject=คุณได้รับคำเชิญเข้าร่วมประชุม: (ชื่อห้องประชุม)&body=(ชื่อเจ้าของห้อง) เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: (URL ห้องประชุม)
      window.open('https://compose.mail.yahoo.com/?&subject=คุณได้รับคำเชิญเข้าร่วมประชุม: ' + this.roomName + '&body=' + this.userName + ' เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: ' + this.cid + this.roomUid)
    },
    onechat () {
      // https://mail.inet.co.th/mail?view=compose&subject=คุณได้รับคำเชิญเข้าร่วมประชุม: (ชื่อห้องประชุม)&body=(ชื่อเจ้าของห้อง) เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: (URL ห้องประชุม)
      window.open('https://mail.inet.co.th/mail?view=compose&subject=คุณได้รับคำเชิญเข้าร่วมประชุม: ' + this.roomName + '&body=' + this.userName + ' เชิญคุณเข้าร่วมประชุม%0A%0Aคลิก URL เพื่อเข้าร่วม: ' + this.cid + this.roomUid)
    },
    decodeToken () {
      if (this.$cookies.get('user-token') !== null) {
        var token = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(token, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        this.user = data.user
        this.userName = this.user.name + ' ' + this.user.lastname
        // console.log(this.userName)
        this.room = data.room
        this.roomName = this.room.name
        this.roomUid = this.room.uid
        this.txtCopy = this.userName + ' เชิญคุณเข้าร่วมประชุม' + 'คลิก URL เพื่อเข้าร่วม: ' + this.cid + this.roomUid
        // console.log(this.roomName)
        // console.log(this.roomUid)
      }
    }
  },
  created () {
    this.decodeToken()
  }
}
</script>

<style>
.no-uppercase {
     text-transform: none;
}
.radius-10 {
  border-radius: 10px;
}
</style>
