<template>
  <v-row>
    <v-dialog v-model="localDialog" max-width="441px" scrollable>
      <v-card
        min-height="200px"
        style="border-radius: 10px;"
        outlined
        color="#eeeeee"
      >
        <br />
        <v-card-text>
          <v-row no-gutters class="mt-n2 mb-n6">
            <v-col cols="12" class="text-center mt-n12 mb-n12">
              <img
                width="300px"
                height="300px"
                src="@/assets/logoOneConference.png"
              />
            </v-col>
          </v-row>
          <div
            class="text-center pb-4 pt-2"
            style="color:#03429E; font-weight: bold; font-size: 40px;"
          >
            SIGN IN
          </div>
          <div
            class="text-center mr-4 ml-4"
            style="color:#BDB6B6; font-weight: bold; font-size: 14px;"
          >
            By One platform
          </div>
          <br />
          <div
            class="mr- ml-1"
            style="color:#000000; font-style: normal; font-weight: bold;"
          >
            Username (One ID) :
          </div>
          <div>
            <v-text-field
              class="mr-1 ml-1"
              autofocus
              v-model="username"
              required
              outlined
              placeholder="Username (One ID)"
              dense
            ></v-text-field>
          </div>
          <div
            class="mr-1 ml-1"
            style="color:#000000; font-style: normal; font-weight: bold;"
          >
            Password :
          </div>
          <div>
            <v-text-field
              class="mr-1 ml-1"
              v-model="password"
              type="password"
              outlined
              dense
              required
              placeholder="Password"
              v-on:keyup="enterToSignIn"
            ></v-text-field>
            <div class="mt-n2 mb-2">
              <input type="checkbox" class="mr-1 ml-1" />
              <span style="padding-right: 180px;"> Remember </span>
              <!-- <b-form-checkbox value="grape" class="mr-n12">Remember</b-form-checkbox> -->
              <!-- <v-btn text color="#428bbc" height="0" min-width="0" @click="openModelForgot" class="no-uppercase p-0 m-0">Forgot?</v-btn> -->
              <a
                href="https://one.th/type_forgot_password"
                target="_blank"
                style="color:#428bbc; padding-left: 60px;"
                >Forgot?</a
              >
            </div>
          </div>
          <v-row class="mt-n4">
            <v-col cols="12" sm="12" md="12" class="pb-6 pt-6 text-center">
              <v-btn
                class="no-uppercase"
                color="#086aab"
                block
                @click="chklogins"
                style="color: white; padding: 25px; font-size: 14pt; border-radius:0; "
                >Sign In</v-btn
              >
            </v-col>
          </v-row>
          <!-- <v-col style="padding: 25px; font-size: 16px;">
            Not have a ONE Platform Account ?
            <v-btn style="font-size: 18px;" text color="#428bbc" height="0" min-width="0" @click="openModelSignup" class="no-uppercase p-0 m-0 pt-n2">Register</v-btn>
          </v-col> -->
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <Signup ref="popupSignup" /> -->
    <!-- <Forgot ref="popupForgot" /> -->
  </v-row>
</template>

<script>
// import Signup from '../modal/signUp'
// import Forgot from '../modal/forgot'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      dialogSigninInfo: false,
      username: '',
      password: ''
      // rules: {
      //   email: value => {
      //     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      //     return pattern.test(value) || ''
      //   }
      // }
    }
  },
  // mounted () {
  //   this.$cookies.set('hover-time', '24hr')
  // },
  computed: {
    ...mapState('dialog', ['signin', 'roleUser']),
    localDialog: {
      get () {
        return this.signin
      },
      set (value) {
        this.setDialogSignin(value)
      }
    }
  },
  // created () {
  //   console.log(this.CryptoJS)
  // },
  methods: {
    ...mapActions('dialog', [
      'setDialogSignin',
      'setDialogSignup',
      'setDialogForgot',
      'setUserRole'
    ]),
    openModelSignup () {
      this.setDialogSignup(true)
    },
    openModelForgot () {
      this.setDialogForgot(true)
    },
    async chklogin () {
      var { data } = await this.axios.post(
        process.env.VUE_APP_API + '/api/users/checkroleuser'
      )
      // console.log('data role', data.role.name)
      var roles = data.role.name
      localStorage.setItem('role', roles)
      if (roles === 'user') {
        this.setUserRole('user')
        this.goPage('/joinuserrole')
      } else if (roles === 'citizen') {
        this.setUserRole('citizen')
        // this.goPage('/citizenrole')
        this.goPage('/main')
        // this.$swal('WARNING!', roles, 'infomation')
      } else {
        // console.log('role admin')
        this.setUserRole('host')
        this.goPage('/main')
      }
    },
    goPage (link) {
      this.$router.push(link).catch(() => {})
    },
    openSigninInfo () {
      this.dialogSigninInfo = !this.dialogSigninInfo
    },
    async chklogins () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API + '/api/auth/loginoneid',
          {
            username: this.username,
            password: this.password
          }
        )
        // console.log(data)
        if (data.status === 'error') {
          this.$swal('WARNING!', data.message, 'warning')
          // console.log('hey try if')
        } else {
          // this.$cookies.set('user-token', data.token, 'default')
          const encryptedText = this.CryptoJS.AES.encrypt(
            data.token,
            'One Conference'
          ).toString()
          this.$cookies.set('user-token', encryptedText, 'default')
          // console.log(encryptedText)
          // const decryptedText = this.CryptoJS.AES.decrypt(encryptedText, 'One Conference').toString(this.CryptoJS.enc.Utf8)
          // console.log(decryptedText)
          // console.log('text: ', btoa(data.token))
          // console.log('textToken: ', atob(textToken))
          // this.$cookies.set('user-token', textToken, 'default')
          // console.log(this.$cookies.get('user-token'))
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
