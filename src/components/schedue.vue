<template>
  <div>
    <div
      style="background-color: rgba(255, 255, 255,0.6);border-radius:36px;padding-right:40px;"
      class="pb-6"
    >
    <v-divider></v-divider>
      <v-col
        cols="12"
        md="12"
        sm="12"
        xs="12"
      >
      </v-col>
      <v-tabs background-color="white" :right="false" class="">
        <v-tab>Upcoming</v-tab>
        <v-tab>History</v-tab>
        <v-tab-item :key="1">
          <v-row>
            <v-col class="">
              <p style="color:#525151; font-size:28px">My Meeting</p>
            </v-col>
          </v-row>
          <v-simple-table dense class="">
            <template v-slot:default>
              <thead>
                <tr style="background-color:#086AAB;" class="text-center">
                  <th
                    style="border-radius: 10px 0px 0px 10px; color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="19%"
                  >
                    Date
                  </th>
                  <th
                    style="color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="60%"
                  >
                    Subject
                  </th>
                  <th
                    style="border-radius: 0px 10px 10px 0px; color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="39%"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items" :key="i">
                  <td style="font-size:17px">
                    {{ item.date }} {{ item.start_time }}  - {{item.end_time}}
                  </td>
                  <td
                    class="text-center"
                    style="font-size:17px;cursor: pointer;"
                    @click="openModeleditroom(item)"
                  >
                    {{ item.name }}
                  </td>
                  <td class="text-center">
                    <v-btn
                      color="success"
                      class="ma-1 white--text no-uppercase border-radius-10"
                      style="font-size: 13px;"
                      @click="checkrole(item.meeting_id)"
                    >
                      Start
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-row no-gutters>
            <v-col>
              <v-pagination v-model="page" :length="pageCount"></v-pagination>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item :key="2">
          <v-row no-gutters>
            <v-col class="">
              <p style="color:#525151; font-size:28px">My Meeting</p>
            </v-col>
          </v-row>
          <v-simple-table dense class="">
            <template v-slot:default>
              <thead>
                <tr
                  style="background-color:#086AAB;border-radius:4px;"
                  class="text-center"
                >
                  <th
                    style="border-radius: 10px 0px 0px 10px; color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="20%"
                  >
                    Date
                  </th>
                  <th
                    style="color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="30%"
                  >
                    Subject
                  </th>
                  <th
                    style=" color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="10%"
                  >
                    Attendee
                  </th>
                  <th
                    style="color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="20%"
                  >
                    Report
                  </th>
                  <th
                    style="border-radius: 0px 10px 10px 0px; color:white; font-size:17px"
                    class="text-center pt-3 pb-3"
                    width="20%"
                  >
                    Record
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in items2" :key="i">
                  <td style="font-size:17px">
                    {{ item.date }} {{ item.start_time }} - {{ item.end_time }}
                  </td>
                  <td class="text-center" style="font-size:17px">
                    {{ item.name }}
                  </td>
                  <td class="text-center" style="font-size:17px">
                    {{ item.attendee }}
                  </td>
                  <td class="text-center" style="font-size:17px">
                    <!-- <v-btn icon
                      ><v-icon right style="color:#086AAB; font-size:30px"
                        >mdi-file-document-outline</v-icon
                      ></v-btn
                    > -->
                    <v-btn icon @click="openModalreport(item.meeting_id)"
                      ><v-icon right style="color:#086AAB; font-size:30px"
                        >mdi-file-document-outline</v-icon
                      ></v-btn
                    >
                  </td>
                  <td class="text-center">
                    <!-- <v-btn :disabled="true" text>
                    <v-icon right style="color:#086AAB; font-size:30px"
                      >mdi-play-circle-outline</v-icon
                    ></v-btn> -->
                    <v-btn :disabled="true" text v-if="item.file_id.length === 0">
                    <v-icon right style="color:#086AAB; font-size:30px"
                      >mdi-play-circle-outline</v-icon
                    ></v-btn>
                    <v-btn text v-if="item.file_id.length !== 0" @click="download(item.meeting_id)">
                    <v-icon right style="color:#086AAB; font-size:30px"
                      >mdi-play-circle-outline</v-icon
                    ></v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-row no-gutters>
            <v-col>
              <v-pagination v-model="page" :length="pageCounts"></v-pagination>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      page: 1,
      itemsPerPage: 10,
      desserts: [],
      ssss: [],
      intervalTime: null
    }
  },
  computed: {
    ...mapState('dialog', ['editroom', 'scheduleMeeting']),
    localDialog: {
      get () {
        return this.editroom
      },
      set (value) {
        this.setDialogeditroom(value)
      }
    },
    pageCount () {
      // console.log(this.desserts)
      return Math.ceil(this.desserts.length / this.itemsPerPage)
    },
    items () {
      // console.log(this.desserts)
      return this.desserts.slice(
        (this.page - 1) * this.itemsPerPage,
        this.page * this.itemsPerPage
      )
    },
    pageCounts () {
      // console.log(this.ssss)
      return Math.ceil(this.ssss.length / this.itemsPerPage)
    },
    items2 () {
      // console.log(this.ssss)
      return this.ssss.slice(
        (this.page - 1) * this.itemsPerPage,
        this.page * this.itemsPerPage
      )
    }
  },
  created () {
    this.schemeeting()
    this.history()
  },
  watch: {
    scheduleMeeting (value, oldValue) {
      if (value !== oldValue && value === false) {
        this.schemeeting()
      }
    }
  },
  mounted () {
    const vm = this
    this.intervalTime = setInterval(() => {
      for (const item of vm.desserts) {
        // console.log('test')
        const timeEnd = moment(item.time_end)
        const timeDiff = moment().diff(timeEnd)
        if (!timeDiff) {
          // console.log('test1')
          vm.schemeeting()
        }
      }
    }, 30000)
  },
  beforeDestroy () {
    this.intervalTime.clearInterval()
  },
  methods: {
    ...mapActions('dialog', ['setDialogeditroom', 'setDialogReport', 'setMeetingIdReport', 'setDialogdataedit', 'setIdReportvote', 'setDowload']),
    openModeleditroom (item) {
      // console.log('item', item)
      this.setDialogeditroom(true)
      this.setDialogdataedit(item)
    },
    openreport (meetingId) {
      // console.log('press')
      window.open('/report/?mid=' + meetingId, '_blank')
    },
    openModalreport (meetingid) {
      this.setDialogReport(true)
      this.setMeetingIdReport(meetingid)
      this.setIdReportvote(meetingid)
    },
    openstartsche (url) {
      // console.log('press')
      window.open(url, '_self')
    },
    async schemeeting () {
      // console.log('api')
      // console.log('data', headers)
      var { data } = await this.axios.post(
        process.env.VUE_APP_API + '/api/rooms/getschedule',
        {
          name: 'name'
        }
      )
      if (data.status === 'error') {
        this.desserts = []
      } else {
        this.desserts = data.data
      }
      // console.log('schedule', this.desserts)
      // console.log('data', data)
    },
    async history () {
      // console.log('api')
      // console.log('data', headers)
      var { data } = await this.axios.get(
        process.env.VUE_APP_API + '/api/rooms/history'
      )
      if (data.status === 'error') {
        this.ssss = []
      } else {
        this.ssss = data.history
      }
      // console.log('history', this.ssss)
    },
    async checkrole (id) {
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
        this.startsche(id)
      }
      // console.log('data response', data)
    },
    async startsche (id) {
      try {
        var { data } = await this.axios.post(process.env.VUE_APP_API + '/api/rooms/startschedule', { meetingid: id })
        // console.log('dataStartSchedule', data)
        if (data.status === 'success') {
          this.openstartsche(data.url)
        } else {
          this.$swal('WARNING!', data.message, 'error')
        }
      } catch (error) {
        console.log('errorStartSchedule', error.message)
      }
    },
    download (meetingid) {
      this.setDowload(true)
      this.setMeetingIdReport(meetingid)
      // this.axios
      //   .get(process.env.VUE_APP_API + '/api/onebox/download/' + fileId, { responseType: 'arraybuffer' })
      //   .then(res => {
      //     // console.log(res)
      //     const blob = new Blob([res.data], { type: 'application/mp4' })
      //     const link = document.createElement('a')
      //     link.href = window.URL.createObjectURL(blob)
      //     link.download = fileId + '.mp4'
      //     link.click()
      //   })
    }
  }
}
</script>
