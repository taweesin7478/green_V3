<template>
  <v-row>
    <v-dialog v-model="localDialog" max-width="536px" scrollable>
      <v-card
        min-height="300px"
        style="border-radius: 10px;"
        outlined
        color="#FFFFFF"
      >
        <br />
        <v-card-text>
          <v-col cols="12" class="text-center mt-n2"> </v-col>
          <div class=" mr-4 ml-4" style="color:#000000; font-size: 28px;">
            Schedule meeting
          </div>
          <v-divider></v-divider>
          <br/>
          <div>
            <v-row class="text-left pl-6" no-gutters>
              <v-col cols="12" md="4" sm="4" xs="4">
                <p
                class="pt-2"
                style="color:#525151; font-style: normal; font-size: 20px;"
              >
                Subject <span style="color:red;"> * </span> :
              </p>
              </v-col>
              <v-col cols="12" md="8" sm="8" xs="8">
                <v-text-field
                autofocus
                v-model="subject"
                required
                outlined
                dense
                :rules="[rules.subject]"
                style="font-size: 12px;"
              ></v-text-field>
              </v-col>
            </v-row>
            <!-- <v-row class="text-left pl-6" no-gutters v-if="showpass">
              <v-col cols="12" md="4" sm="4" xs="4">
                <p
                class="pt-2"
                style="color:#525151; font-style: normal; font-size: 20px;"
              >
                Password :
              </p>
              </v-col>
              <v-col cols="12" md="8" sm="8" xs="8">
                <v-text-field
                v-model="pass"
                required
                outlined
                dense
                :rules="[]"
              ></v-text-field>
              </v-col>
            </v-row> -->
          </div>
          <!-- <v-row no-gutters>
            <v-col align="right" class="mt-n7">
              <v-btn
                style=" font-size: 9pt;"
                text
                color="#428bbc"
                height="0"
                min-width="0"
                @click="showpass = !showpass"
                class="no-uppercase pt-4 pb-4"
                >Add password</v-btn
              >
            </v-col>
          </v-row> -->

            <v-row class="text-left pl-3" no-gutters>
              <v-col cols="12" md="4" sm="4" xs="4">
                <p class="pl-3 pt-2" style="color:#525151; font-size: 19px;">
                  Date and time :
                </p>
              </v-col>
              <v-col cols="12" md="8" sm="8" xs="8">
                <v-menu
                  v-model="datetime"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :value="displayDate"
                      prepend-inner-icon="mdi-calendar-blank"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      dense
                      class="pl-2"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false">
                  </v-date-picker>
                </v-menu>
              </v-col>
              <!-- <v-spacer></v-spacer> -->
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" md="4" sm="4" xs="4"></v-col>
              <v-col cols="12" md="3" sm="3" xs="3" class="pl-4">
                <!-- <input
                  required
                  type="time"
                  v-model="time"
                  class="form-control text-center ml-4"
                  placeholder="Select time"
                  :rules="[rules.time]"
                /> -->
                <vue-timepicker v-model="time"
                  input-width="120px"
                  input-class="time-custom"
                >
                  <v-icon  />
                   </vue-timepicker>
                <label for="default-picker"> </label>
              </v-col>
              <v-col cols="12" md="4" sm="4" xs="4">
                  <v-text-field
                   required
                    class="pl-6"
                    v-model="duration"
                    @keypress="filterKey"
                    placeholder="            60"
                    label="Duration"
                    outlined dense
                    :rules="[rules.duration]"
                  >
                  </v-text-field>
              </v-col>
              <v-col cols="12" md="1" sm="1" xs="1">
                <div class="pt-2 text-right">Mins</div>
              </v-col>
              <div class="md-form md-outline mt-n2">
              </div>
              <v-col md="6" style="padding: 0px" class="mr12- ml-5">
                <div style="display: flex">
                </div>
              </v-col>
            </v-row>

            <v-row class="text-left pl-6" no-gutters>
              <v-col cols="12" md="4" sm="4" xs="4">
                <p
                class="pt-2"
                style="color:#525151; font-style: normal; font-size: 20px;"
              >
                Send invite to :
              </p>
              </v-col>
              <v-col cols="12" md="8" sm="8" xs="8">
                <v-text-field
                autofocus
                v-model="email"
                outlined
                dense
                style="font-size: 12px;"
                placeholder="example.ex@gmail.com,example.ex@inet.co.th"
              ></v-text-field>
              </v-col>
            </v-row>

          <v-row no-gutters>
            <v-col class="mt-n2 pl-2 pb-4">
            <v-btn
              text
              color="#428bbc"
              height="0"
              min-width="0"
              @click="showoption = !showoption"
              class="no-uppercase"
              >Options</v-btn
            >
            </v-col>
          </v-row>
          <div v-if="!showoption">
            <v-row no-gutters class="mb-n2">
            <v-col cols="12" md="5" sm="6" xs="6" class="pl-7 pt-2">
              <span style="font-size: 16px;">Set password</span>
            </v-col>
            <v-col cols="12" md="6" sm="6" xs="6">
              <v-text-field
                outlined
                dense
                v-model="pass"
              ></v-text-field>
            </v-col>
          </v-row>
            <v-row no-gutters class="pl-1">
              <v-col cols="12" md="5" sm="12" xs="12" class="pt-2"><span class="pl-7" style="font-size: 16px;"
                  >Onebox</span
                ></v-col>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-select
                  :items="onebox"
                  label=""
                  dense
                  outlined
                  item-text="account_name"
                  item-value="account_id"
                  style="font-size: 10px;"
                  v-model="oneboxSelected"
                ></v-select>
              </v-col>
            </v-row>
            <v-row no-gutters class="pb-3 pl-1">
              <v-col cols="12" md="10" sm="6" xs="6" class="pr-0">
                <span class="pl-7" style="font-size: 16px;"
                  >Secret meeting</span
                >
              </v-col>
              <v-col cols="12" md="2" sm="6" xs="6" class="pl-3">
                <b-form-checkbox switch v-model="option5"></b-form-checkbox>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            outlined
            width="80px" height="36px"
            class="ma-1  no-uppercase border-radius-10 btn btn-outline-dark"
            style="font-color: #000000;"
            @click="localDialog = false"
          >Close
          </v-btn>
          <v-btn
            depressed
            outlined
            width="80px" height="36px"
            class="ma-2 white--text no-uppercase border-radius-10 btn btn-primary"
            style="font-color: #000000;"
            @click="schemeeting"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import VueTimepicker from 'vue2-timepicker'

export default {
  components: {
    VueTimepicker
  },
  data: () => ({
    subject: '',
    key: '',
    datetime: '',
    duration: '',
    option1: false,
    option2: false,
    option3: false,
    option4: false,
    option5: false,
    time: moment().format('HH:mm'),
    modal2: false,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    enabled: false,
    showpass: false,
    showoption: false,
    dialogSigninInfo: false,
    username: '',
    pass: '',
    show: false,
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings']
    ],
    rules: {
      required: value => !!value || 'Required.',
      subject: value => {
        return value !== '' || ' Please Enter  Subject !'
      },
      duration: value => {
        return value !== '' || 'Please Enter  duration !'
      }
    },
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      }
    ],
    onebox: [],
    oneboxSelected: '',
    jwt: require('jsonwebtoken'),
    email: ''
  }),
  computed: {
    ...mapState('dialog', ['scheduleMeeting']),
    displayDate () {
      return moment(this.date).format('dddd, MMM DD, YYYY')
    },
    localDialog: {
      get () {
        return this.scheduleMeeting
      },
      set (value) {
        this.setDialogScheduleMeeting(value)
      }
    }
  },
  watch: {
    scheduleMeeting (value, oldValue) {
      if (value !== oldValue) {
        this.getonebox()
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogScheduleMeeting']),
    schemeeting () {
      // Get AM/PM from HTML time input
      // var inputEle = document.getElementById('default-picker')
      // var timeSplit = inputEle.value.split(':')
      // var hours
      // var minutes
      // hours = timeSplit[0]
      // minutes = timeSplit[1]
      // this.time = hours + ':' + minutes
      // Get AM/PM from HTML time input
      var data = {
        subject: this.subject,
        key: this.pass,
        date: this.date,
        // time: document.getElementById('default-picker').value,
        time: this.time,
        duration: this.duration,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        option4: this.option4,
        option5: this.option5,
        onebox_accountid: this.oneboxSelected.account_id,
        email: this.email
      }
      // console.log('date', data)
      if (this.subject === '') {
        this.$swal('Subject', 'Please Enter !', 'error')
      } else if (this.time === null) {
        this.$swal('Time', 'Please Enter !', 'error')
      } else if (this.duration === '') {
        this.$swal('duration', 'Please Enter !', 'error')
      } else {
        this.axios.post(process.env.VUE_APP_API + '/api/rooms/schedulemeeting', data).then(res => {
          if (res.data.status === 'success') {
            this.setDialogScheduleMeeting(false)
            this.$swal(res.data.status, res.data.message, 'success')
            this.subject = ''
            this.email = ''
          }
        }).catch(error => {
          this.$swal('WARNING !', error.response.data.message, 'warning')
        })
      }
    },
    filterKey (e) {
      const key = (e.which) ? e.which : e.keyCode
      if (key > 31 && (key < 48 || key > 57)) {
        return e.preventDefault()
      }
    },
    myFunction () {
      var d = new Date()
      var n = d.getHours()
      var n2 = d.getMinutes()
      document.getElementById('default-picker').value = n + ':' + n2
    },
    async getonebox () {
      this.time = moment().format('HH:mm')
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/onebox/getoneboxbusiness', {
            userid: this.users._id
          }
        )
        // console.log('data', data)
        this.onebox = data.data
        this.oneboxSelected = this.onebox[0]
      } catch (error) {
        this.$swal('ผิดพลาด!', error.message, 'error')
      }
    },
    decodeToken () {
      if (this.$cookies.get('user-token') !== null) {
        var token = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(token, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        this.users = data.user
        this.room = data.room
        this.name = this.room.name
        this.option1 = this.room.setting.MuteUserJoin
        this.option2 = this.room.setting.ModeratorApproveBeforeJoin
        this.option3 = this.room.setting.AllowAnyUserStartMeeting
        this.option4 = this.room.setting.AllUserJoinAsModerator
        this.option5 = this.room.setting.SecretRoom
      }
    }
  },
  created () {
    this.decodeToken()
    // this.getonebox()
  }
}
</script>

<style>
.time-custom{
  height: 40px !important;
  text-align: center;
  background: #f4f1f1;
  border: 1px solid #000 !important;
  border-radius: 5px;
}
</style>
