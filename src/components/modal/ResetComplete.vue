<template>
  <v-row>
    <v-dialog v-model="dialogResetcompleteInfo" max-width="400px" scrollable>
      <v-card
        min-height="200px"
        style="border-radius: 10px;"
        outlined
        color="#eeeeee"
      >
        <br />
        <v-card-text>
          <v-col cols="12"  class="text-center mt-n4">
        <img width="125px" height="125px"
        src="@/assets/logoOne.png"
        />
      </v-col>
      <div
            class="mr-6 ml-6"
            style="color:#03429E; font-weight: bold; font-size: 18px;"
          >Reset Complete</div>
          <br />
          <div class="mr-6 ml-6"
          style="color:#000000;font-size: 12px;"
          >We've sent an successfully reset the password. Please login again.</div>
          <div>
          </div>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="pb-8 pt-8 text-center">
              <v-btn
                class="no-uppercase"
                color="#086aab"
                block
                @click="openResetpassInfo"
                style="color: white; padding: 25px; font-size: 14pt;"
              >Sign in</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <Signup ref="popupSignup" />
  </v-row>
</template>

<script>
import Signup from '../modal/signUp'
export default {
  components: {
    Signup
  },
  data () {
    return {
      dialogSigninInfo: false,
      dialogResetcompleteInfo: false,
      username: '',
      password: '',
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || ''
        }
      }
    }
  },
  methods: {
    openModelSignup () {
      this.$refs.popupSignup.openSignupInfo()
      this.dialogSigninInfo = false
    },
    openResetcomInfo () {
      this.dialogResetcompleteInfo = true
    },
    chklogin () {
      this.meeting()
    },
    goPage (link) {
      this.$router.push(link)
    },
    meeting () {
      this.goPage('/createroom')
    },
    openSigninInfo () {
      this.dialogSigninInfo = true
    },
    async chklogins () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/auth/login',
          {
            email: this.username,
            password: this.password
          }
        )
        // console.log(data)
        if (data.status === 'error') {
          this.$swal('ผิดพลาด!', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error')
          // console.log('hey try if')
        } else {
          var textToken = btoa(data.token)
          this.$cookies.set('user-token', textToken, 'default')
          // localStorage.setItem('user-token', data.token)
          this.user = data.token
          // console.log(localStorage.getItem('user-token'))
          this.chklogin()
        }
      } catch (error) {
        console.log(error.message)
      }
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

.no-uppercase {
  text-transform: none;
}

.border-radius-10 {
  border-radius: 10px;
}
</style>
