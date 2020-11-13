<template>
  <div>
    <UpperLogin />
    <div class="mr-11 ml-11">
      <div class="pt-5 pb-5" no-gutters style="background-color: rgba(255, 255, 255, 0.5);border-radius:10px;padding:10px;">
      <v-row v-if="editform > 0">
                <v-col cols="12" md="4" sm="12">
                  <v-form>
                  <table width="100%" border="0" class="ml-11">
                    <tr class="text-center">
                      <td></td>
                      <td><v-text-field class="mt-6" dense outlined readonly v-model="editroom"></v-text-field></td>
                      <td></td>
                    </tr>
                  </table>
                </v-form>
                </v-col>
              </v-row>
    <v-row class="mt-n8">
      <v-col cols="12" md="10" sm="12" style="padding-top:40px" >
          <h5 class="ml-11">เชิญผู้เข้าร่วมประชุม</h5>
      </v-col>
      <v-col cols="12" md="2" sm="12">
          <v-btn color="#03429E" @click="startroomMeet(roominfo[0])" style="padding:40px;border-radius:36px;color:white;font-size:16px" >เริ่มการประชุม</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="6" sm="12">
        <input class="ml-11 form-control" v-model="joinroomid" readonly id="cid"/>
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <v-btn class="ml-11" color="#0BAABD" @click="copyid()">คัดลอกไอดี</v-btn>
      </v-col>
    </v-row>
    <v-row class="mt-n4">
      <v-col cols="12" md="6" sm="12">
        <input class="ml-11 form-control" v-model="joinroomkey" readonly id="ckey"/>
      </v-col>
      <v-col cols="12" md="2" sm="12">
        <v-btn class="ml-11" color="#0BAABD" @click="copykey()">คัดลอกคีย์</v-btn>
      </v-col>
    </v-row>
      </div>
    </div>
    <Create ref="popupCreate"/>
  </div>
</template>

<script>
import Create from '../components/modal/create'
import UpperLogin from '../views/UpperLogin'
export default {
  components: {
    Create,
    UpperLogin
  },
  data () {
    return {
      openRoom: true,
      editform: 1,
      editforms: 1,
      editroom: 'RoomName',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || ''
      ],
      datapage: [],
      room: [],
      userinfo: [],
      d: '',
      //   joinroomurl: '',
      joinroomkey: '',
      joinroomid: '',
      joinroomname: '',
      roominfo: []
    }
  },
  created () {
    this.decodejwttoken()
    // this.chkRoomUrl()
  },
  methods: {
    openPop () {
      // console.log('pressed')
      this.$refs.popupSetting.dialogSetting = true
      // this.$refs.popupSetting.opendialog()
    },
    decodejwttoken () {
      this.d = this.$cookies.get('user-token')
      this.editroom = localStorage.getItem('rname')
      this.roominfo = JSON.parse(localStorage.getItem('roomUrl'))
      // console.log('roomurl', this.roominfo)
      var base64Url = this.d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log(this.datapage)
      this.userinfo = this.datapage.users
      // console.log(this.userinfo)
      this.room = this.datapage.rooms
      this.joinroomid = this.roominfo[1]
      this.joinroomkey = this.roominfo[2]
      // console.log(this.room)
    },
    async joinroom () {
      // console.log('joinroom')
      const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWaWRlb2NhbGwiLCJuYW1lIjoiT05FQ0hBVFNFUlZJQ0UiLCJpYXQiOjIyMDF9.-llQuCLFEUdv4BdJ1pf0-4KwrfwnXz7ybqS10DFLuBs'
      }

      try {
        var { data } = await this.axios.post(process.env.VUE_APP_API + '/api/onechatroom/join', {
          meetingid: this.joinroomid,
          name: this.joinroomname,
          option: [
            'video',
            'voice'
          ],
          key: this.joinroomkey
        },
        {
          headers: headers
        }
        )
        // this.roominfo = data
        // console.log('data', data)
        this.startroomMeet(data.data.urlroom)
      } catch (error) {
        this.$swal(
          'ผิดพลาด!',
          'meetingid หรือ key ไม่ถูกต้อง',
          'error'
        )
        // console.log('error', error.message)
      }
    },
    chkRoomUrl () {
      if (localStorage.getItem('roomUrl') === null) {
        // console.log('if true')
        this.startroom()
      } else {
        // console.log('if false')
        this.roominfo = [localStorage.getItem('roomUrl'), localStorage.getItem('meetingId')]
        // console.log(this.roominfo)
      }
    },
    openSchedule () {
      // console.log('pressedpopup')
      this.$refs.popupCreate.dialogCreate = true
    },
    show () {
      this.openRoom = !this.openRoom
    },
    hide () {
      this.openRoom = !this.openRoom
    },
    openModalInvite () {
      this.$refs.popupInvite.openInvite()
    },
    editformfunc () {
      this.editform -= 1
      // this.editroom = 'Room'
    },
    submitfunc () {
      this.editform = 1
    },
    startroomMeet (url) {
      window.open(
        url,
        '_self' // <- This is what makes it open in a new window.
      )
    },
    goPage (link) {
      this.$router.push(link)
    },
    copyid () {
      var cid = document.getElementById('cid')
      cid.select()
      cid.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      // console.log(cid)
    },
    copykey () {
      var ckey = document.getElementById('ckey')
      ckey.select()
      ckey.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      // console.log(ckey)
    }
  }
}
</script>
