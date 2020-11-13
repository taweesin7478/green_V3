<template>
  <v-dialog v-model="localDialog" max-width="536px" scrollable>
    <v-card
      min-height="30%"
      style="border-radius: 10px;"
      outlined
      color="#FFFFFF"
    >
      <v-card-title>
        <v-row no-gutters
          ><v-col style="color:#000000; font-size: 28px; line-height: 11mm;">{{
            title
          }}</v-col></v-row
        >
        <v-row no-gutters
          ><v-col style=" font-size: 13px;color:#086AAB;"
            >{{ dateInfo }} , {{ data.start_time }} -
            {{ data.end_time }}</v-col
          ></v-row
        >
      </v-card-title>
      <v-divider class="mt-n2"></v-divider>
      <v-card-text>
        <div>
          <p style="color:#525151; font-style: normal; font-size: 20px;">
            Meeting information
            <v-btn icon @click="copylink"
              ><v-icon right style="font-size: 18px;">
                mdi-image-filter-none
              </v-icon></v-btn
            >
          </p>
        </div>
        <v-row no-gutters>
          <v-col style="color:#525151;font-size: 15px;" cols="12" md="3" xs="12"
            >Meeting Url :</v-col
          >
          <v-col cols="12" md="9" xs="12">
            <v-text-field
              class="mt-n2"
              dense
              v-model="cid"
              id="meetUrl"
              ref="meetUrl"
              readonly
              solo
              style="font-size:15px"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters style="color:#525151;font-size: 15px;">
          <v-col cols="12" md="3" xs="12">Password : </v-col>
          <v-col cols="12" md="9" xs="12">
            <v-text-field
              class="mt-n2"
              dense
              v-model="meetPass"
              id="meetPass"
              ref="meetPAss"
              readonly
              solo
              style="font-size:15px"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters style="color:#525151;font-size: 15px;">
          <v-col cols="12" md="3" xs="12">Send invite to : </v-col>
          <v-col cols="12" md="9" xs="12">
            <v-text-field
              class="mt-n2"
              dense
              v-model="email"
              solo
              style="font-size:15px"
              placeholder="example.ex@gmail.com,example.ex@inet.co.th"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="sendInvite"
          class="ma-1  no-uppercase border-radius-10 btn btn-outline-dark"
          style="font-color: #000000;"
          >Send Invite</v-btn
        >
        <v-btn
          outlined
          @click="closeDialog"
          class="ma-1  no-uppercase border-radius-10 btn btn-outline-dark"
          style="font-color: #000000;"
          >Close</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    el: '#app',
    message: '',
    copiedText: '',
    enabled: false,
    showpass: false,
    showoption: false,
    dialogeditroomInfo: false,
    title: '',
    show: false,
    cid: '',
    meetPass: '',
    data: [],
    dateInfo: '',
    email: ''
  }),
  computed: {
    ...mapState('dialog', ['editroom', 'delroom', 'datarditroom']),
    localDialog: {
      get () {
        return this.editroom
      },
      set (value) {
        this.setDialogeditroom(value)
      }
    },
    localDialog2: {
      get () {
        return this.delroom
      },
      set (value) {
        this.setDialogdelroom(value)
      }
    }
  },
  watch: {
    editroom (value, oldvalue) {
      if (value !== oldvalue) {
        this.data = this.datarditroom
        this.title = this.data.name
        // console.log('data', this.data)
        this.cid = process.env.VUE_APP_DOMAIN + '/join/?uuid=' + this.data.uid
        this.meetPass = this.data.key
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

        var today = new Date(parseInt(this.data.date.slice(6)), parseInt(this.data.date.slice(3, 5)) - 1, parseInt(this.data.date.slice(0, 2)))
        // console.log(parseInt(this.data.date.slice(6)), parseInt(this.data.date.slice(3, 5)), parseInt(this.data.date.slice(0, 2)))
        this.dateInfo = today.toLocaleDateString('en-US', options)// Saturday, September 17, 2016
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogeditroom', 'setDialogdelroom']),
    openModeleditroom () {
      this.setDialogeditroom(true)
    },
    openModeldelroom () {
      this.setDialogdelroom(true)
    },
    closeDialog () {
      this.setDialogeditroom(false)
    },
    copylink () {
      var cid = document.getElementById('meetUrl')
      cid.select()
      cid.setSelectionRange(0, 99999) /* For mobile devices */
      document.execCommand('copy')
      // console.log(cid)
    },
    sendInvite () {
      // console.log('meetid', this.datarditroom.meeting_id)
      // console.log('dataeditroom', this.datarditroom)
      if (this.email !== '') {
        var data = {
          meetingid: this.datarditroom.meeting_id,
          email: this.email
        }
        // http://localhost:9213/api/avatar/pictureprofile
        this.axios.post(process.env.VUE_APP_API + '/api/rooms/sendinvite', data).then(res => {
        // console.log('part2', res)
          if (res.data.status === 'success') {
            this.$swal('Send invited', res.data.message, 'success')
            this.closeDialog()
            this.email = ''
          }
        }).catch(error => {
          this.$swal('WARNING !', error.response.data.message, 'warning')
        })
      } else {
        this.$swal('Please, enter email', '', 'warning')
      }
    }
  }
}
</script>
