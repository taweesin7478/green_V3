<template>
  <div>
    <!-- <UpperLogin /> -->
    <v-row no-gutters>
      <v-col>
        <div class="">
          <div
            class=""
            no-gutters
            style="background-color: rgba(255, 255, 255,0.6);border-radius:36px;"
          >
            <v-tabs background-color="white">
              <v-tab
                style="color:#525151; font-size: 20px;"
                class="no-uppercase"
                >Meeting</v-tab
              >
              <!-- <v-tab
                style="color:#525151; font-size: 20px;"
                class="no-uppercase"
                >Polls</v-tab
              > -->
              <v-tab-item :key="1">
                <v-row no-gutters class="mt-10">
                  <v-col cols="12" md="8" sm="12" xs="12">
                    <v-row
                      no-gutters
                      class=""
                      style="color:#525151; font-size: 39px;"
                    >
                      <v-col cols="12" md="12">
                        {{ this.roomname }}
                        <v-icon
                          right
                          class="mt-n1"
                          style="color:#525151; font-size: 16px;"
                          @click="openModelRoomSetting"
                          >mdi-square-edit-outline</v-icon
                        >
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-col
                        cols="12"
                        md="12"
                        class=""
                        style="color:#525151; font-size: 20px;"
                        sm="12"
                        xs="12"
                      >
                        <p class="">
                          <!-- <label id="cids">//www.meet.one.th/srm-iso-oid</label> -->
                          <v-row no-gutters>
                            <v-col cols="12" md="6" sm="6" xs="6">
                              <v-text-field
                                dense
                                v-model="cid"
                                id="cid"
                                ref="cid"
                                readonly
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="2" sm="6" xs="6">
                              <v-btn icon color="#525151" @click="copylink">
                                <v-icon style="font-size: 22px;"
                                  >mdi-checkbox-multiple-blank-outline</v-icon
                                >
                              </v-btn>
                              <v-btn
                                icon
                                color="red"
                                @click="openModelShareMeeting"
                              >
                                <v-icon style="color:#525151; font-size: 22px;"
                                  >mdi-share-variant</v-icon
                                ></v-btn
                              >
                            </v-col>
                            <v-col cols="12" md="4"> </v-col>
                          </v-row>
                        </p>
                      </v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12" md="3" sm="12" xs="12"></v-col>
                  <v-col cols="12" md="6" sm="12" xs="12">
                    <div style="float:left">
                      <v-btn
                        v-if="Start"
                        large
                        color="success"
                        class="white--text no-uppercase border-radius-10"
                        style="font-size: 20px;"
                        @click="startRoom"
                      >
                        Start
                      </v-btn>
                      <v-btn
                        v-if="Join"
                        large
                        color="success"
                        class="white--text no-uppercase border-radius-10"
                        style="font-size: 20px;"
                        @click="joinold"
                      >
                        Join
                      </v-btn>
                      <span class="pr-2"></span>
                      <v-btn
                        v-if="role === 'host'"
                        large
                        class="no-uppercase border-radius-10 "
                        style="font-size: 20px;"
                        @click="openModelScheduleMeeting"
                      >
                        Schedule
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="3" sm="12" xs="12"></v-col>
                </v-row>
                <v-row no-gutters v-if="role === 'host'">
                  <v-col cols="12" md="12" sm="12" xs="12" class="pt-10">
                    <Schedue />
                  </v-col>
                </v-row>
              </v-tab-item>
              <v-tab-item :key="2">
                <v-row class="mt-4">
                  <v-col cols="12" md="11" sm="12" xs="12">
                    <label style=" color:#525151; font-size:28px;">
                      Meeting Polls
                    </label>
                    <v-btn
                      class="mx-2 mt-2 float-right"
                      x-small
                      fab
                      dark
                      color="info"
                      @click="openModelAddPolls"
                    >
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row class="mt-n5">
                  <v-col cols="12" md="11" sm="12" xs="12">
                    <v-simple-table dense width="100%">
                      <template v-slot:default>
                        <thead>
                          <tr
                            style="background-color:#086AAB;"
                            class="text-center"
                          >
                            <th
                              style="border-radius: 10px 0px 0px 10px; color:white; font-size:20px"
                              class="text-center pt-3 pb-3"
                              width="10%"
                            >
                              No
                            </th>
                            <th
                              style="color:white; font-size:20px"
                              class="text-center pt-3 pb-3"
                              width="40%"
                            >
                              Topic
                            </th>
                            <th
                              style="color:white; font-size:20px"
                              class="text-center pt-3 pb-3"
                              width="30%"
                            >
                              Questions
                            </th>
                            <th
                              style="border-radius: 0px 10px 10px 0px; color:white; font-size:20px"
                              class="text-center pt-3 pb-3"
                              width="20%"
                            ></th>
                          </tr>
                        </thead>
                        <tbody v-for="(poll, key) in desserts" :key="key">
                          <tr v-if="poll.meetingid === ''" class="text-center ">
                            <td style=" font-size:20px">{{ key + 1 }}</td>
                            <td style=" font-size:20px">{{ poll.topic }}</td>
                            <td style=" font-size:20px">
                              {{ poll.questions }}
                            </td>
                            <td>
                              <v-btn
                                class="p-0 m-0"
                                text
                                @click="openModeleditpoll(desserts[key])"
                              >
                                <v-icon right
                                  >mdi-square-edit-outline</v-icon
                                ></v-btn
                              >
                              <v-btn class="p-0 m-0" text @click="checkDelete">
                                <v-icon right>mdi-trash-can-outline</v-icon>
                              </v-btn>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-row>
                      <v-col>
                        <v-pagination v-model="page"></v-pagination>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>
          </div>
        </div>
      </v-col>
    </v-row>
    <Create ref="popupCreate" />
  </div>
</template>

<script>
import Create from '../components/modal/create'
import Schedue from '../components/schedue'
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    Create,
    Schedue
  },
  data () {
    return {
      testingCode: '',
      openRoom: true,
      meetingid: '',
      userId: '',
      editform: 1,
      editforms: 1,
      editroom: 'Meeting Room',
      datapage: [],
      roomname: 'Meeting Room',
      room: [],
      userinfo: [],
      d: '',
      page: 1,
      itemsPerPage: 10,
      //   joinroomurl: '',
      joinroomkey: '',
      joinroomid: '',
      joinroomname: '',
      roominfo: [],
      meetUrl: '',
      desserts: [],
      drawer: true,
      cid: 'www.meet.one.th/srm-iso-oid',
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' }
      ],
      color: 'primary',
      colors: ['primary', 'blue', 'success', 'red', 'teal'],
      right: false,
      permanent: true,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      url: '',
      Join: false,
      Start: true,
      urljoinold: '',
      meetid: '',
      urlmeet: '',
      jwt: require('jsonwebtoken'),
      role: ''
    }
  },
  computed: {
    ...mapState('dialog', ['addPolls', 'roomSetting', 'editpoll']),
    pageCount () {
      return Math.ceil(this.desserts.length / this.itemsPerPage)
    },
    itempang () {
      return this.desserts.slice(
        (this.page - 1) * this.itemsPerPage,
        this.page * this.itemsPerPage
      )
    }
  },
  watch: {
    addPolls (value, oldValue) {
      if (value !== oldValue && !value) {
        this.getpoll()
      }
    },
    roomSetting (value, oldValue) {
      if (value !== oldValue && value === false) {
        this.decodejwttoken()
      }
    },
    editpoll (value, oldValue) {
      if (value !== oldValue && value === false) {
        this.getpoll()
      }
    }
  },
  created () {
    if (this.$cookies.get('user-token') === null) {
      this.$router.push('/')
    } else if (localStorage.getItem('role') === 'user') {
      this.$router.push('/joinuserrole')
    } else {
      this.role = localStorage.getItem('role')
      this.decodejwttoken()
      this.getpoll()
      this.checkmeeting()
    }
    // this.decodejwttoken()
    // this.getpoll()
    // this.checkmeeting()
  },

  methods: {
    openstartsche (url) {
      // console.log('press', url)
      window.open(url)
    },
    schemeeting () {
      var data = {
        meetingid: this.meetingid
      }
      // http://localhost:9213/api/avatar/pictureprofile
      this.axios
        .post(process.env.VUE_APP_API + '/api/rooms/startschedule', data)
        .then(res => {
          if (res.data.status === 'success') {
            this.$swal('Successfully.', '', 'success')
            window.location.reload()
          } else if (res.data.error === 'invalid file') {
            this.$swal(
              'Incorrect ! Filename Extension',
              'Please, select filename extension of photo',
              'error'
            )
          }
        })
    },
    insertpoll () {
      var data = {
        meetingid: this.meetingid
      }
      this.axios
        .post(process.env.VUE_APP_API + '/api/rooms/startschedule', data)
        .then(res => {
          if (res.data.status === 'success') {
            this.$swal('Successfully.', '', 'success')
            const encryptedText = this.CryptoJS.AES.encrypt(
              data.token,
              'One Conference'
            ).toString()
            this.$cookies.set('user-token', encryptedText, 'default')
            // localStorage.setItem('user-token', res.data.token)
            // this.decodejwttoken()
            // window.location.reload()
          } else if (res.data.error === 'invalid file') {
            this.$swal(
              'Incorrect ! Filename Extension',
              'Please, select filename extension of photo',
              'error'
            )
          }
        })
    },
    checkDelete () {
      this.$swal
        .fire({
          title: 'ยืนยันลบ',
          text: 'ต้องการลบใช่',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'OK'
        })
        .then(result => {
          if (result.isConfirmed) {
            this.Delpoll()
          }
        })
    },
    Delpoll () {
      this.axios
        .delete(process.env.VUE_APP_API + '/api/votes_manage/polls')
        .then(res => {
          if (res.data.status === 'Success') {
            this.$swal('Successfully.', '', 'success')
            window.location.reload()
          } else if (res.data.error === 'invalid file') {
            this.$swal(res.data.status, res.data.message, 'error')
          }
        })
    },
    ...mapActions('dialog', [
      'setDialogScheduleMeeting',
      'setDialogRoomSetting',
      'setDialogAddPolls',
      'setDialogShareMeeting',
      'setDialogEditPoll',
      'setDialogReportSchedue',
      'setManageActive',
      'setManageEditDataPoll'
    ]),
    openModeleditpoll (key) {
      // console.log('datakey', key)
      this.setManageEditDataPoll(key)
      this.setDialogEditPoll(true)
    },
    openModelScheduleMeeting () {
      this.setDialogScheduleMeeting(true)
    },
    openModelReportSchedue () {
      this.setDialogReportSchedue(true)
    },
    openModelRoomSetting () {
      this.setDialogRoomSetting(true)
    },
    openModelShareMeeting () {
      this.setDialogShareMeeting(true)
    },
    openModelAddPolls () {
      this.setDialogAddPolls(true)
    },
    openPop () {
      // console.log('pressed')
      this.$refs.popupSetting.dialogSetting = true
      // this.$refs.popupSetting.opendialog()
    },
    decodejwttoken () {
      var token = this.$cookies.get('user-token')
      const decryptedText = this.CryptoJS.AES.decrypt(
        token,
        'One Conference'
      ).toString(this.CryptoJS.enc.Utf8)
      var data = this.jwt.decode(decryptedText)
      this.datapage = data
      if (data.room.name !== '') {
        this.roomname = data.room.name
      }
      // console.log('data token', this.datapage)
      // console.log('roomname', this.roomname)
      this.room = this.datapage.room
      this.cid = process.env.VUE_APP_DOMAIN + '/join/?uuid=' + this.room.uid
      // console.log('datapage', this.datapage)
    },
    copylink () {
      var cid = document.getElementById('cid')
      cid.select()
      cid.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      // console.log(cid)
    },
    async editroomname () {
      // console.log('editroom')

      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/editroomname',
          {
            meetingid: this.roominfo[2],
            roomname: this.editroom
          }
        )
        // this.roominfo = data
        // console.log('data', data)
        this.joinroomkey = data.url.joinUrl
        this.meetUrl = data.url.createUrl
        this.submitfunc()
      } catch (error) {
        this.$swal('ผิดพลาด!', 'meeting id หรือ key ไม่ถูกต้อง', 'error')
        // console.log('error', error.message)
      }
    },
    async logoutRoom () {
      // console.log('check session')
      // console.log('uinfo', this.userinfo)
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/logout',
          {
            meetingid: this.meetid
          }
        )
        // this.roominfo = data
        // console.log('meetingid', localStorage.getItem('meetid'))
        // console.log('data', data)
        if (data.status === 'success') {
          this.createSession()
        } else {
          this.$swal(
            'ผิดพลาด!',
            'คุณยังไม่ได้ออกจากการประชุมครั้งล่าสุด',
            'error'
          )
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', error.message, 'error')
        // console.log('error', error.message)
        // this.goPage('/createroom')
      }
    },
    async checkmeeting () {
      var { data } = await this.axios.post(
        process.env.VUE_APP_API + '/api/rooms/checkmeetting'
      )
      if (data.status === 'success') {
        this.Join = true
        this.Start = false
        this.urljoinold = data.url
      } else {
        // this.$swal('ผิดพลาด!', data.message, 'error')
        this.Join = false
        this.Start = true
      }
    },
    async getpoll () {
      // console.log('getpoll')
      // console.log('data', headers)
      var { data } = await this.axios.get(
        process.env.VUE_APP_API + '/api/votes_manage/polls'
      )
      // console.log('polls', data)
      if (data.status === 'Success') {
        this.desserts = data.polls
        // console.log('polls', this.desserts)
      }
    },
    startsche (id) {
      var data = {
        meetingid: id
      }
      this.axios
        .post(process.env.VUE_APP_API + '/api/rooms/startschedule', data)
        .then(res => {
          // console.log(res)
          this.openstartsche(res.data.url)
        })
    },
    editformfunc () {
      this.editform -= 1
      // this.editroom = 'Room'
    },
    submitfunc () {
      this.editform = 1
    },
    goPage (link) {
      this.$router.push(link)
    },
    enterToEditRoomName: function (e) {
      if (e.keyCode === 13) this.editroomname()
    },
    async checkrole () {
      // console.log('check role')
      var { data } = await this.axios.post(
        process.env.VUE_APP_API + '/api/users/checkroleuser'
      )
      if (data.role.name === 'user') {
        this.$swal(
          'NO PERMITTED !!!',
          'Your page does not currently support this function.',
          'warning'
        )
      } else {
        this.createSession()
      }
      // console.log('data response', data)
    },
    async createSession () {
      // console.log('create session')
      this.axios
        .post(process.env.VUE_APP_API + '/api/rooms/createsession')
        .then(res => {
          // console.log('data res', res.data)
          if (res.data.status === 'tokenError') {
            this.$swal(
              'Time out',
              'Sign in time out. Please, sign in again',
              'warning'
            )
          } else if (res.data.status === 'success') {
            // console.log('data sessioin room', res.data)
            // console.log('success meeting')
            this.meetid = res.data.meetingid
            this.urlmeet = res.data.url
            this.url = res.data.url
            window.open(this.url, '_self')
            // console.log(res.data)
            // this.$cookies.set('meetUrl', res.data.url)
            // this.goPage('/lobby')
          } else if (res.data.status === 'error') {
            this.checkmeeting()
          }
          if (this.url === '') {
            this.url = this.urlmeet
          }
        })
        .catch(error => {
          this.$swal('WARNING !', error.response.data.message, 'warning')
        })
    },
    openurl (url) {
      // console.log('open url')
      window.open(url, '_self')
    },
    joinold () {
      // this.$cookies.set('meetUrl', this.urljoinold)
      window.open(this.urljoinold, '_self')
      // this.goPage('/lobby')
    },
    startRoom () {
      this.createSession()
      // this.checkrole()
    }
  }
}
</script>

<style>
.border-radius-10 {
  border-radius: 10px;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: white;
}
.no-uppercase {
  text-transform: none;
}
thead {
  border-radius: 18px;
}
</style>
