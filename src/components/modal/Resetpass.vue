<template>
  <v-row>
    <v-dialog v-model="dialogResetpassInfo" max-width="400px" scrollable>
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
            class="text-center pb-4 pt-2"
            style="color:#03429E; font-weight: bold; font-size: 30px;"
          >Rset Password</div>
          <br />
          <div class="text-center mr-1 ml-1 mt-n5"
          style="color:#BDB6B6; font-weight: bold; font-size: 14px;"
          >One platform</div>
          <br />
          <div class="mr-1 ml-1 mt-n4"
          style="color:#000000;font-size: 12px;"
          >New password : </div>
          <div>
            <v-text-field
              class="mr-1 ml-1 "
              autofocus
              v-model="Newpassword"
              type="password"
              required
              outlined
              placeholder="New password"
              dense
              v-on:keyup="enterToSignIn"
            ></v-text-field>
          </div>
           <div class="mr-1 ml-1 mt-n4"
          style="color:#000000;font-size: 12px;"
          >Confirm password : </div>
          <div>
            <v-text-field
              class="mr-1 ml-1"
              autofocus
              v-model="confirmpassword"
              type="password"
              required
              outlined
              placeholder="Confirm password"
              dense
              v-on:keyup="enterToSignIn"
            ></v-text-field>
          </div>
          <v-col cols="12" sm="6">
          <v-text-field
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            label="Not visible"
            hint="At least 8 characters"
            value="wqfasds"
            class="input-group--focused"
            @click:append="show3 = !show3"
          ></v-text-field>
        </v-col>
          <div class="mr-6 ml-6 mt-n4"
          style="color:#000000;font-size: 10px;"
          >  Password must :<br/>
            - Have at least 8 characters<br/>
            - Have at least 1 letter (a,b,c …)<br/>
            - Have at least 1 number (1,2,3 …)<br/>
            - Include both uppercase and lowercase characters
            </div>
          <div>
          </div>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="pb-8 pt-8 text-center">
              <v-btn
                class="no-uppercase mt-n4"
                color="#086aab"
                block
                @click="openResetcomInfo"
                style="color: white; padding: 25px; font-size: 14pt;"
              >Reset</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <Signup ref="popupSignup" />
    <Resetcomplete ref="popupResetcomplete" />
  </v-row>
</template>

<script>
import Signup from '../modal/signUp'
import Resetcomplete from '../modal/ResetComplete'
export default {
  components: {
    Signup,
    Resetcomplete
  },
  data () {
    return {
      dialogSigninInfo: false,
      dialogResetpassInfo: false,
      username: '',
      password: '',
      show3: false,
      rules: {
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || ''
        }
      }
    }
  },
  methods: {
    openResetcomInfo () {
      this.$refs.popupResetcomplete.openResetcomInfo()
      this.dialogResetpassInfo = false
    },
    openModelSignup () {
      this.$refs.popupSignup.openSignupInfo()
      this.dialogSigninInfo = false
    },
    openResetpassInfo () {
      this.dialogResetpassInfo = true
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
          this.$cookies.set('user-token', data.token, 'default')
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
