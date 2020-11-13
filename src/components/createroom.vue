<template>
  <div>
    <UpperLogin />
    <div class="mr-11 ml-11 mt-11">
    <v-row class="pt-5 pb-5" no-gutters style="background-color: rgba(255, 255, 255,0.6);border-radius:18px;padding:10px;">
      <v-col cols="12" md="2" sm="12" class="text-center">
          <v-btn x-large color="#03429E" @click="openSchedule" style="padding:50px;border-radius:10px" ><v-icon x-large color="white" style="font-size:60px">mdi-plus</v-icon></v-btn>
      </v-col>
      <v-col cols="12" md="10" sm="12" style="padding-top:40px" class="text-center">
          <h4>สร้างห้องประชุม</h4>
      </v-col>
    </v-row>

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
      var base64Url = this.d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log(this.datapage)
      this.userinfo = this.datapage.users
      // console.log(this.userinfo)
      this.room = this.datapage.rooms
      // console.log(this.room)
    },
    async startroom () {
      // console.log('getjitsi')
      const headers = {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJWaWRlb2NhbGwiLCJuYW1lIjoiT05FQ0hBVFNFUlZJQ0UiLCJpYXQiOjIyMDF9.-llQuCLFEUdv4BdJ1pf0-4KwrfwnXz7ybqS10DFLuBs'
      }

      try {
        var { data } = await this.axios.post(process.env.VUE_APP_API + '/api/onechatroom/create', {
          roomname: this.editroom,
          name: this.userinfo.name,
          option: [
            'video',
            'voice'
          ]
        },
        {
          headers: headers
        }
        )
        // this.roominfo = data
        // console.log('data', data)
        var roomdetail = [data.data.urlroom, data.data.meetingid, data.data.key, this.editroom]
        localStorage.setItem('roomUrl', JSON.stringify(roomdetail))
        this.goPage('/meeting')
      } catch (error) {
        console.log('error', error.message)
      }
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
    }
  }
}
</script>
