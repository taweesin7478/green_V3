<template>
    <v-dialog v-model="localDialog" max-width="604px" scrollable>
      <v-card style="border-radius: 10px;">
        <v-card-title>
          Settings
        </v-card-title>
        <v-card-text>
        <v-tabs vertical class="pl-4">
            <!-- <v-tab style="margin-right:auto;">
              General
            </v-tab> -->
            <v-tab style="margin-right:auto;">
              Password
            </v-tab>
            <!-- <v-tab-item>
                <v-card flat>
                  <v-card-title style="font-weight:bold;">Language</v-card-title>
                  <v-card-text>
                    <p style="color:black;">App language determines the date and time format.</p>
                    <v-select
                      :items="items"
                      label="Defualt Englist (United state)"
                      outlined
                    ></v-select>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="no-uppercase" style="border-radius: 10px;" width="80px" height="36px">Save</v-btn>
                  </v-card-actions>
                </v-card>
            </v-tab-item> -->
            <v-tab-item>
                <v-card flat>
                    <v-card-title style="font-weight:bold;">Password</v-card-title>
                    <v-card-text>
                        <!-- <div class="pb-2">Old Password</div>
                        <div>
                            <v-text-field placeholder="Old Password" outlined dense v-model="oldPassword" :rules="passwordRule" type="password" autofocus></v-text-field>
                        </div>
                        <div class="pb-2">New Password</div>
                        <div>
                            <v-text-field placeholder="New Password" outlined dense v-model="newPassword" :rules="passwordRule" type="password"></v-text-field>
                        </div>
                        <div class="pb-2">Confirm password</div>
                        <div>
                            <v-text-field placeholder="Confirm password" outlined dense v-model="confirmPassword" :rules="[rules.confirmPassword, rules.required]" type="password"></v-text-field>
                        </div> -->
                        <div class="text-center pb-6">
                          We'll send password to <a :href="link" target="_blank" style="color: #5088bf; font-weight: bold;">{{ email }}</a>
                          <p>Click the reset password link in that email to reset your password.</p>
                        </div>
                        <div class="text-center">
                          <v-btn style="text-transform: none; border-radius: 10px;" color="warning" @click="alertResetPassword">Reset Password</v-btn>
                        </div>
                    </v-card-text>
                    <!-- <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" class="no-uppercase" style="border-radius: 10px;" width="80px" height="36px">Save</v-btn>
                    </v-card-actions> -->
                </v-card>
            </v-tab-item>
        </v-tabs>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      items: ['Defualt Englist (United state)', 'Thai'],
      email: '',
      link: process.env.VUE_APP_email,
      jwt: require('jsonwebtoken')
    }
  },
  created () {
    this.decodeToken()
  },
  computed: {
    ...mapState('dialog', ['setting']),
    localDialog: {
      get () {
        return this.setting
      },
      set (value) {
        this.setDialogSetting(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogSetting']),
    decodeToken () {
      if (this.$cookies.get('user-token') !== null) {
        var d = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(d, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        // var base64Url = d.split('.')[1]
        // this.datapage = JSON.parse(window.atob(base64Url))
        // console.log('datatoken', this.datapage)
        this.user = data.user
        // console.log('user', this.datapage.user)
        // this.id = this.user._id
        // this.avatar = this.user.avatar_profile
        this.email = this.user.email
      }
    },
    alertResetPassword () {
      this.$swal({
        title: 'Confirm reset password ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.resetPassword()
        }
      })
    },
    resetPassword () {
      this.axios.post(process.env.VUE_APP_API + '/api/users/changepassword').then(res => {
        if (res.data.status === 'success') {
          this.$swal('We sended email for recovery password', '', 'success')
        } else {
          this.$swal('Do not have email or sign in timeout', 'Please, log out and click on Sign In button to click Forgot', 'error')
        }
      })
    }
  }
}
</script>
