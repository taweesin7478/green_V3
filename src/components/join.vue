<template>
  <div>
    <UpperGuest />
    <div class="mr-11 ml-11 mt-11">
      <v-row>
        <v-col cols="12" md="12" sm="12" class="text-center">
          <h1 style="color:white;">{{ $route.query.rooname }}</h1>
          <h5 class="mb-6" style="color:white;">เชิญโดย : {{$route.query.name}}</h5>
          <div class="mt-4" style="width:40%; margin: auto;">
            <v-text-field
              class="border-radius-10"
              placeholder="กรุณาใส่ชื่อของคุณ"
              required
              solo
              v-model="joinname"
            ></v-text-field>
            <v-text-field
              class="border-radius-10"
              placeholder="กรุณาใส่รหัสผ่านห้องประชุม (ถ้ามี)"
              required
              solo
              v-model="pass"
              type="password"
            ></v-text-field>
          </div>

          <v-btn color="#03429E" large rounded style="color:white; padding-right: 40px; padding-left: 40px;" @click="chkactiveroom">เข้าร่วมประชุม</v-btn>
        </v-col>
      </v-row>
    </div>
    <Create ref="popupCreate" />
  </div>
</template>

<script>
import Create from '../components/modal/create'
import UpperGuest from '../views/UpperGuest'
export default {
  components: {
    Create,
    UpperGuest
  },
  data () {
    return {
      openRoom: true,
      editform: 1,
      editforms: 1,
      editroom: 'RoomName',
      datapage: [],
      room: [],
      userinfo: [],
      d: '',
      //   joinroomurl: '',
      joinroomkey: '',
      joinroomid: '',
      joinroomname: '',
      roominfo: [],
      pass: '',
      joinname: ''
    }
  },
  created () {
    this.decodejwttoken()
  },
  methods: {
    openPop () {
      // console.log('pressed')
      this.$refs.popupSetting.dialogSetting = true
      // this.$refs.popupSetting.opendialog()
    },
    decodejwttoken () {
      // console.log('param', this.$route.query.rooname)
      this.d = this.$cookies.get('user-token')
      var base64Url = this.d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log(this.datapage)
      this.userinfo = this.datapage.users
      // console.log(this.userinfo)
      this.room = this.datapage.rooms
      // console.log(this.room)
    },
    async joinroom () {
      // console.log('joinroom')
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/joinroom',
          {
            meetingid: this.$route.query.meeting,
            name: this.joinname,
            option: 'video',
            key: this.pass
          }
        )
        // console.log('data', data)
        this.startroomMeet(data.join_room.urlinvite)
      } catch (error) {
        this.$swal('ผิดพลาด!', 'meetingid หรือ key ไม่ถูกต้อง', 'error')
        console.log('error', error.message)
      }
    },
    async chkactiveroom () {
      // console.log(' active check room')
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/checkactiveroom',
          {
            meetingid: this.$route.query.meeting
          }
        )
        // console.log('data', data)
        if (data.status === 'success') {
          this.joinroom()
        } else {
          this.$swal('ผิดพลาด!', 'ผู้สร้างห้องยังไม่เปิดใช้งานห้อง ', 'error')
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', 'meetingid หรือ key ไม่ถูกต้อง', 'error')
        console.log('error', error.message)
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

<style>
.border-radius-10 {
  border-radius: 10px;
}
</style>
