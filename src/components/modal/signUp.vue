<template>
  <v-row>
    <v-dialog v-model="localDialog" scrollable max-width="445px">
      <!-- box-shadow: 0.5px 0.5px 8px 4px rgba(0, 0, 0, 0.5), 0 6px 30px 0 rgba(0, 0, 0, 0.5); -->
      <v-card
        color="#eeeeee"
        min-height="200px"
        style="border-radius: 10px;"
        outlined
      >
        <v-card-title justify-center>
        </v-card-title>
        <v-card-text>
          <div
            class="text-center pb-n4 "
            style="color: #03429E; font-weight: bold; font-size: 22pt;"
          >Register</div>
          <v-card-subtitle class="text-center mb-n4">
            One Platform
          </v-card-subtitle>
          <br />
          <v-form ref="form">
            <v-stepper v-model="e1" style="background-color: #eeeeee;">
              <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1" editable edit-icon=""></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2" editable edit-icon=""></v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3" editable edit-icon=""></v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card color="#eeeeee">
                    <v-card-text>
                      <div class="mr-1 ml-1">Username : <span style="color:red;">*</span></div>
                      <div>
                        <v-text-field
                          :rules="[rules.required]"
                          class="mr-1 ml-1"
                          v-model="username"
                          dense
                          placeholder="Username"
                          outlined
                          autofocus
                        >
                        </v-text-field>
                      </div>
                      <!-- <div class="mr-1 ml-1">
                        E-Mail : <span style="color:red;">*</span>
                      </div>
                      <div>
                        <v-text-field
                          class="mr-1 ml-1"
                          v-model="email"
                          dense
                          required
                          outlined
                          :rules="[rules.email, rules.required]"
                          placeholder="E-Mail"
                        >
                        </v-text-field>
                      </div> -->
                      <div class="mr-1 ml-1">
                        Password : <span style="color:red;">*</span></div>
                      <div>
                        <v-text-field
                          class="mr-1 ml-1"
                          v-model="password"
                          dense
                          :rules="passwordRule"
                          type="password"
                          placeholder="Password"
                          required
                          outlined
                        >
                        </v-text-field>
                      </div>
                      <div class="mr-1 ml-1">
                        Confirm Password : <span style="color:red;">*</span>
                      </div>
                      <div>
                        <v-text-field
                          class="mr-1 ml-1"
                          v-model="confirmedPassword"
                          dense
                          :rules="[rules.confirmPassword, rules.required]"
                          type="password"
                          required
                          placeholder="Confirm Password"
                          outlined
                        >
                        </v-text-field>
                        <!-- <v-text-field
                          style="display:none;"
                          label="Avatar Profile"
                          v-model="avatar_profile"
                          outlined
                        >
                        </v-text-field> -->
                      </div>
                      <!-- <div class="mr-4 ml-4 mb-n1"><span style="color:#878484; font-size: 10pt;">
                        Password must : </span>
                      </div>
                      <div class="ml-4" style="color:#878484; font-size: 8pt;">
                        <p class="mb-n2">- Have at least 8 characters</p>
                        <p class="mb-n2">- Have at least 1 letter (a,b,c ...)</p>
                        <p class="mb-n2">- Have at least 1 number (1,2,3 ...)</p>
                        <p>- Include both uppercase and lowercase characters</p>
                      </div> -->

                      <!-- <v-btn
                        color="primary"
                        @click="e1 = 2"
                      >
                      Continue
                      </v-btn> -->
                      <br/>
                      <v-btn
                        class="mr-4 no-uppercase no-border-radius"
                        color="#086aab"
                        @click="e1 = 2"
                        block
                        style="color: white; padding: 25px; font-size: 14pt;"
                      >
                        Next
                      </v-btn>
                      <br/>
                      <div style="font-size: 10pt;" class="text-center">
                        Have a ONE Platform Account ?
                        <v-btn text style="color:#428bbc;" class="p-0 m-0 no-uppercase" height="0" min-width="0" @click="openModalSignin"> Login</v-btn>
                      </div>
                    </v-card-text>
                  </v-card>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-card color="#eeeeee">
                  <v-card-text>
                    <div class="mr-1 ml-1">Name : <span style="color:red;">*</span></div>
                    <div>
                      <v-text-field
                        :rules="[rules.required]"
                        class="mr-1 ml-1"
                        v-model="name"
                        dense
                        placeholder="Name"
                        outlined
                        autofocus
                      >
                      </v-text-field>
                    </div>
                    <div class="mr-1 ml-1">Last Name : <span style="color:red;">*</span></div>
                    <div>
                      <v-text-field
                        :rules="[rules.required]"
                        class="mr-1 ml-1"
                        v-model="lastname"
                        dense
                        placeholder="Last Name"
                        outlined
                      >
                      </v-text-field>
                    </div>
                    <div class="mr-1 ml-1">
                      Telephone :
                      <span style="color:red;"> *</span>
                    </div>
                    <div>
                      <v-text-field
                        class="mr-1 ml-1"
                        dense
                        v-model="phonenumber"
                        required
                        outlined
                        @keypress="filterKey"
                        :maxlength="max"
                        :rules="[rules.countTen, rules.required]"
                        placeholder="telephone"
                      >
                      </v-text-field>
                    </div>
                    <div class="mr-1 ml-1">
                      Company :
                      <span style="color:red;"> *</span>
                    </div>
                    <div>
                      <v-text-field
                        :rules="[rules.required, rules.required]"
                        class="mr-1 ml-1"
                        v-model="company"
                        dense
                        placeholder="Company"
                        outlined
                      >
                      </v-text-field>
                    </div>
                    <br/>
                    <v-btn
                      class="mr-4 no-uppercase no-border-radius"
                      color="#086aab"
                      @click="e1 = 3"
                      block
                      style="color: white; padding: 25px; font-size: 14pt;"
                    >
                      Next
                    </v-btn>
                    <br/>
                    <div style="font-size: 10pt;" class="text-center">
                      Have a ONE Platform Account ?
                      <v-btn text style="color:#428bbc;" class="p-0 m-0 no-uppercase" height="0" min-width="0" @click="openModalSignin"> Login</v-btn>
                    </div>
                  </v-card-text>
                </v-card>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card color="#eeeeee">
                  <v-card-text>
                      <div class="mr-1 ml-1">Terms And conditions of use :</div>
                      <br/>
                      <div>
                        <v-textarea
                          class="mr-1 ml-1"
                          no-resize
                          rows="8"
                          v-model="privacy"
                          readonly
                          outlined
                        >
                        </v-textarea>
                      </div>
                      <div class="mr-1 ml-1">
                        <b-form-checkbox v-model="agreePrivacy">I agree to the Privacy Policy and Terms of Service.</b-form-checkbox>
                      </div>
                      <br/>
                      <v-btn
                        :disabled="isDisabled"
                        class="mr-4 no-uppercase no-border-radius"
                        color="#086aab"
                        @click="register"
                        block
                        style="color: white; padding: 25px; font-size: 14pt;"
                      >
                        Register
                      </v-btn>
                      <br/>
                      <div style="font-size: 10pt;" class="text-center">
                        Have a ONE Platform Account ?
                        <v-btn text style="color:#428bbc;" class="p-0 m-0 no-uppercase" height="0" min-width="0" @click="openModalSignin"> Login</v-btn>
                      </div>
                    </v-card-text>
                </v-card>
                <!-- <v-btn
                  color="primary"
                  @click="e1 = 1"
                >
                  Continue
                </v-btn> -->
                <!-- <v-btn text>Cancel</v-btn> -->
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-form>

        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { required, maxLength, minLength } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Signup',
  components: {
  },
  data () {
    return {
      e1: 1,
      max: 10,
      dialogSignupInfo: false,
      username: '',
      name: '',
      lastname: '',
      password: '',
      confirmedPassword: '',
      phonenumber: '',
      company: '',
      privacy: '',
      agreePrivacy: false,
      isDisabled: true,
      passwordRule: [
        v => !!v || 'Required',
        v => /(?=.*[a-z])/.test(v) || 'Must have one lowercase character',
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /([!@$%~])/.test(v) || 'Must have one special character [!@#$%~]',
        v => (v && v.length >= 8) || 'Have at least 8 characters'
      ],
      rules: {
        required: value => !!value || 'Required.',
        confirmPassword: value => {
          return value === this.password || 'Not match Password !'
        },
        // email: value => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //   return pattern.test(value) || 'Email format'
        // },
        countTen: value => {
          return value.length === 10 || 'Enter 10 digits'
        }
      }
    }
  },
  computed: {
    ...mapState('dialog', ['signup', 'email']),
    localDialog: {
      get () {
        return this.signup
      },
      set (value) {
        this.setDialogSignup(value)
      }
    }
  },
  created () {
    this.$multiwatch(['name', 'lastname', 'phonenumber', 'company', 'username', 'password', 'confirmedPassword'], function () {
      const valid = this.$refs.form.validate()
      this.isDisabled = !valid
    })
  },
  validations: {
    name: { required, maxLength: maxLength(10) },
    // email: { required, maxLength: maxLength(30) },
    password: { require, maxLength: maxLength(30) },
    confirmedPassword: { require, maxLength: maxLength(30) },
    phonenumber: { require, minLength: minLength(10) }
  },
  methods: {
    ...mapActions('dialog', ['setDialogSignup', 'setDialogSignin', 'setDialogRegisterComplete', 'setDataEmail']),
    openModalSignin () {
      this.setDialogSignin(true)
    },
    openModalRegisterComplete (email) {
      this.setDataEmail(email)
      this.setDialogRegisterComplete(true)
    },
    clearData () {
      this.username = ''
      this.name = ''
      this.lastname = ''
      this.password = ''
      this.confirmedPassword = ''
      this.phonenumber = ''
      this.company = ''
      this.agreePrivacy = false
    },
    goPage (link) {
      this.$router.push(link)
    },
    register () {
      if (this.agreePrivacy === true) {
        var data = {
          username: this.username,
          password: this.password,
          passwordconfirm: this.confirmedPassword,
          company: this.company,
          name: this.name,
          lastname: this.lastname,
          phonenumber: this.phonenumber
        }
        // http://localhost:9213/backend/api/users/registeroneid
        this.axios
          .post(process.env.VUE_APP_API + '/api/users/registeroneid', data)
          .then(response => {
            console.log(response.data)
            if (response.data.status === 'success') {
              localStorage.setItem('email', response.data.user.email)
              this.openModalRegisterComplete(response.data.user.email)
              this.clearData()
            } else {
              this.$swal(
                'WARNING !',
                response.data.message.message,
                'warning'
              )
            }
          })
      } else if (this.agreePrivacy === false) {
        this.$swal(
          'Please accept privacy !',
          'Read Terms And conditions of use and accept "I agree to the Privacy Policy and Terms of Service."',
          'warning'
        )
      }
    },
    filterKey (e) {
      const key = (e.which) ? e.which : e.keyCode
      if (key > 31 && (key < 48 || key > 57)) {
        return e.preventDefault()
      }
    },
    chklogin () {
      this.meeting()
    },
    meeting () {
      this.goPage('/')
    },
    openSigninInfo () {
      this.dialogSigninInfo = true
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

.no-border-radius {
  border-radius:0;
}

.border-radius-10 {
  border-radius: 10px;
}

.v-stepper__content {
  padding: 0 !important;
}

.v-stepper {
  box-shadow: none !important;
}
</style>
