<template>
  <v-row>
    <v-dialog v-model="localDialog" max-width="536px" scrollable>
      <v-card max-width="536px" style="border-radius:10px;">
        <v-card-title style="font-size:28px;">Room settings</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="4" sm="12" xs="12" class="pr-0 pt-5 mb-n4">
              <span style="font-size: 20px;">Meeting Room :</span>
            </v-col>
            <v-col cols="12" md="7" sm="12" xs="12">
              <v-text-field
                outlined
                dense
                placeholder="Meeting Room"
                v-model="name"
                style="font-size: 12px;"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="pb-2">
            <v-col cols="12" md="12" sm="12" sx="12" class="mt-n7 mb-n4">
              <v-btn
                text
                class="no-uppercase p-0 m-0"
                style="color:#086AAB; font-size:12px;"
                @click="clickToShowOptions"
                >Options</v-btn
              >
            </v-col>
          </v-row>
          <div v-if="!showOptions">
            <v-row no-gutters v-if="hidePassword" class="mb-n2">
            <v-col cols="12" md="5" sm="12" xs="12" class="pl-7 pt-2">
              <span style="font-size: 16px;">Set password</span>
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <v-text-field
                outlined
                dense
                v-model="key"
                append-icon="mdi-dice-multiple"
                @click:append="clickToAddPassword"
              ></v-text-field>
            </v-col>
          </v-row>
            <v-row no-gutters class="mb-n2" v-if="role === 'host'">
              <v-col cols="12" md="5" sm="12" xs="12" class="pt-2"><span class="pl-7 " style="font-size: 16px;"
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
            <v-row no-gutters class="pb-1" v-if="role === 'host'">
              <v-col cols="12" md="10" sm="6" xs="6" class="pr-0">
                <span class="pl-7" style="font-size: 16px;"
                  >Secret meeting</span
                >
              </v-col>
              <v-col cols="12" md="2" sm="12" xs="12" class="pl-3">
                <b-form-checkbox switch v-model="option5"></b-form-checkbox>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            outlined
            class="no-uppercase radius-10"
            width="80px"
            height="36px"
            @click="closeDialog"
            >Close</v-btn
          >
          <v-btn
            class="no-uppercase radius-10"
            color="#086AAB"
            style="color:white;"
            width="80px"
            height="36px"
            @click="settingRoom"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      hidePassword: true,
      lengthPassword: 11,
      name: null,
      key: '',
      option1: false,
      option2: false,
      option3: false,
      option4: false,
      option5: false,
      showOptions: false,
      room: [],
      user: [],
      onebox: [],
      oneboxSelected: '',
      jwt: require('jsonwebtoken'),
      role: ''
    }
  },
  created () {
    this.decodeToken()
    // this.generatePassword()
  },
  computed: {
    ...mapState('dialog', ['roomSetting', 'roleUser']),
    localDialog: {
      get () {
        return this.roomSetting
      },
      set (value) {
        this.setDialogRoomSetting(value)
      }
    }
  },
  watch: {
    roomSetting (value, oldValue) {
      if (value !== oldValue) {
        this.getonebox()
        this.generatePassword()
        this.role = localStorage.getItem('role')
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogRoomSetting']),
    closeDialog () {
      this.setDialogRoomSetting(false)
      // this.hidePassword = true
      // this.showOptions = false
      // this.key = null
      // this.option1 = false
      // this.option2 = true
      // this.option3 = false
      // this.option4 = false
      // this.option5 = false
    },
    clickToShowPassword () {
      this.hidePassword = false
    },
    clickToAddPassword () {
      this.key = this.randomPassword(this.lengthPassword)
    },
    clickToShowOptions () {
      this.showOptions = !this.showOptions
    },
    randomPassword (length) {
      var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890'
      // var chars = 'abcdefghijklmnopqrstuvwxyz'
      var pass = ''
      for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length)
        pass += chars.charAt(i)
      }
      return pass
    },
    async generatePassword () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/getkeyroom'
        )
        // console.log('data', data)
        if (data.status === 'success') {
          this.key = data.data
        }
      } catch (error) {
        this.$swal(data.status, error.message, 'error')
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
    },
    settingRoom () {
      var data = {
        name: this.name,
        key: this.key,
        option1: this.option1,
        option2: this.option2,
        option3: this.option3,
        option4: this.option4,
        option5: this.option5,
        onebox_accountid: this.oneboxSelected.account_id
      }
      // console.log('datasetting', data)
      this.axios
        .put(process.env.VUE_APP_API + '/api/rooms/settingroom', data)
        .then(res => {
          // console.log(res)
          if (res.data.status === 'tokenError') {
            this.$swal('Sign in timeout', 'Please, sign in again', 'error')
          }
          if (res.data.status === 'success') {
            this.$swal('Setting room success', '', 'success')
            // localStorage.removeItem('user-token')
            const encryptedText = this.CryptoJS.AES.encrypt(res.data.token, 'One Conference').toString()
            this.$cookies.set('user-token', encryptedText, 'default')
            // localStorage.setItem('user-token', res.data.token)
            // this.decodeToken()
            // window.location.reload()
            this.closeDialog()
          } else {
            this.$swal('WARNING!', res.data.message, 'error')
          }
        })
    },
    async logoutRoom () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/rooms/checksessionroom',
          {
            meetingid: localStorage.getItem('meetingid')
          }
        )
        // this.roominfo = data
        console.log('data', data.status)
        this.createSession()
      } catch (error) {
        this.$swal('ผิดพลาด!', error.message, 'error')
        // console.log('error', error.message)
        this.goPage('/createroom')
      }
    },
    async getonebox () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/onebox/getoneboxbusiness', {
            userid: this.users._id
          }
        )
        // console.log('onebox', data)
        this.onebox = data.data
        // console.log(this.onebox)
        this.oneboxSelected = this.onebox[0]
      } catch (error) {
        this.$swal('ผิดพลาด!', error.message, 'error')
      }
    }
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
.no-radius {
  border-radius: 0;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: #f4f1f1;
}
.v-btn:before {
  background-color: transparent;
}
.custom-control-input:checked ~ .custom-control-label::before {
  color: #fff;
  border-color: #48af44;
  background-color: #48af44;
}
</style>
