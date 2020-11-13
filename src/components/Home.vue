<template>
  <div style="height: 100%;">
      <Upper />
      <v-layout align-center justify-center id="home" class="mt-n3">
        <v-flex>
          <v-row no-gutters align="center" style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);">
            <!-- <v-row no-gutters align="center" style="background-image: url('img/3804_new.png');"> -->
            <v-col cols="12" md="6" xs="12" sm="12" class="pt-11">
              <div class="text-center" style="font-size:50px; color: white; text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
                ONE Conference
              </div>
              <div class="text-center pb-10" style="font-size:20pt; color: white;">
                Anywhere Anytime
              </div>
              <!-- <div class="text-center" v-if="showSignup">
                <v-btn color="#FFD200" rounded style="padding: 25px; padding-left: 35px; padding-right: 35px; margin-bottom: 50px;" @click="openModelSignup">
                  <span class="no-uppercase" style="color: black; font-size:14px; font-weight: bold;">Sign Up</span>
                </v-btn>
              </div> -->
            </v-col>
            <v-col cols="12" md="6" xs="12" sm="12">
              <v-img src="@/assets/Image.png"></v-img>
            </v-col>
          </v-row>
          <!-- <v-row no-gutters>
            <v-col cols="12" md="12" xs="12" sm="12">
              <v-img src="@/assets/3804_new.png"></v-img>
            </v-col>
          </v-row> -->
          <v-row style="background-color: white; padding-top: 100px; padding-bottom: 100px;" no-gutters>
            <v-col cols="12" md="6" xs="12" sm="12">
              <v-img src="@/assets/Screen Shot 2563-08-19 at 12.00.54.png"></v-img>
            </v-col>
            <v-col cols="12" md="6" xs="12" sm="12" class="pl-5 pr-5 pt-2">
              <div class="text-left" style="font-size:65px; color: black; font-weight: bold;">
                ONE Conference
              </div>
              <div class="pb-10" style="font-size:35px; color: black;">
                <p> <label style="padding-left: 80px;"></label> ระบบ Conference ในรูปแบบ Web Application เพื่อเพิ่มความสะดวกสบาย ในการติดต่อสื่อสารระหว่างหน่วยงานหรือแผนกต่างๆภายในองค์กรให้ธุรกิจเดินหน้าได้อย่างต่อเนื่อง</p>
              </div>
            </v-col>
          </v-row>
          <v-row style="background-color: #E5E5E5;" no-gutters class="pt-8 pb-8">
            <v-col cols="12" md="1" xs="1" sm="2" v-show="!$vuetify.breakpoint.xs">
              <div class="mt-7" style="width: 21px; height: 255px; background: #086AAB; margin-left: 80px;"></div>
            </v-col>
            <v-col cols="12" md="5" xs="11" sm="10">
              <div class="text-left" style="font-size:65px; color: black; font-weight: bold;">
                Feature
              </div>
              <div class="pb-10 pr-12" style="font-size:35px; color: black;">
                <p> <label style="padding-left: 20px;"></label> ระบบ Conference มีรายละเอียดของ Feature ต่างๆ ไว้รองรับและตอบโจทย์การใช้งาน เพื่อให้การประชุมของท่านเป็นเรื่องง่าย</p>
              </div>
            </v-col>
            <v-col cols="12" md="6" xs="12" sm="12">
              <v-img src="@/assets/Screen Shot 2563-08-19 at 12.01.36.png"></v-img>
            </v-col>
          </v-row>
          <v-row no-gutters style="background-color: white; padding-top: 60px;">
            <v-col cols="12" md="12" xs="12" sm="12" class="text-center">
              <span style="font-size: 65px; font-weight: bold;">Security</span>
            </v-col>
          </v-row>
          <v-row no-gutters style="background-color: white;">
            <v-col cols="12" md="2" xs="12" sm="12"></v-col>
            <v-col cols="12" md="8" xs="12" sm="12">
              <p style="font-size:35px;"> <label style="padding-left: 40px;"></label>ระบบ One confernce ถูกติดตั้งอยู่บน Cloud INET ซึ่งมีความปลอดภัยและได้รับมาตรฐานระดับโลก</p>
            </v-col>
            <v-col cols="12" md="2" xs="12" sm="12"></v-col>
          </v-row>
          <v-row no-gutters style="background-color: white; align-items: center;" class="pb-8">
            <v-col cols="12" md="3" xs="12" sm="12"></v-col>
            <v-col cols="12" md="2" xs="12" sm="12" class="text-center">
              <div align="center"><v-img src="@/assets/security/csastar.png" max-height="50px" max-width="80px" contain ></v-img></div>
              <div style="font-weight:bold; font-size: 16px;" class="pt-2">CSA-STAR</div>
              <div class="" style="font-size: 14px;">CLOUD SECURITY</div>
              <div class="" style="font-size: 14px;">for Service Provider</div>
            </v-col>
            <v-col cols="12" md="2" xs="12" sm="12" class="text-center">
              <div align="center"><v-img src="@/assets/security/iso-stands-for.gif" contain max-height="58px" max-width="80px"></v-img></div>
              <div style="font-weight:bold; font-size: 16px;" class="pt-2">ISO 27018:2014</div>
              <div class="" style="font-size: 14px;">Protection of Personally</div>
              <div class="" style="font-size: 14px;">Identifiable Information</div>
              <div class="" style="font-size: 14px;">in Public Cloud</div>
            </v-col>
            <v-col cols="12" md="2" xs="12" sm="12" class="text-center">
              <div align="center"><v-img src="@/assets/security/iso-stands-for.gif" contain max-height="58px" max-width="80px" class=""></v-img></div>
              <div style="font-weight:bold; font-size: 16px;" class="pt-2">ISO 27017:2015</div>
              <div class="" style="font-size: 14px;">CLOUD Information Security</div>
              <div class="" style="font-size: 14px;">Management</div>
            </v-col>
            <v-col cols="12" md="3" xs="12" sm="12"></v-col>
          </v-row>
          <v-row no-gutters style="background-color: white; align-items: center;" class="pb-12">
            <v-col cols="12" md="3" xs="1" sm="1"></v-col>
            <v-col cols="12" md="2" xs="12" sm="12" class="text-center">
              <div align="center"><v-img src="@/assets/security/bsi_and_ukas_logo-300x169.jpg" contain max-height="60px" max-width="100px" class="ml-2"></v-img></div>
              <div style="font-weight:bold; font-size: 16px;" class="pt-2">ISO 22301:2012</div>
              <div class="" style="font-size: 14px;">CLOUD laaS</div>
              <div class="" style="font-size: 14px;">Business Continuity</div>
              <div class="" style="font-size: 14px;">Management</div>
            </v-col>
            <v-col cols="12" md="2" xs="12" sm="12" class="text-center">
              <div align="center"><v-img src="@/assets/security/ISO9001-2008-SGS-UKAS-Certificate-Label.jpg" contain max-height="60px" max-width="100px"></v-img></div>
              <div style="font-weight:bold; font-size: 16px;" class="pt-2">ISO/IEC 27001:2013</div>
              <div class="" style="font-size: 14px;">CLOUD & DATA CENTER</div>
              <div class="" style="font-size: 14px;">SECURITY Management</div>
            </v-col>
            <v-col cols="12" md="2" xs="12" sm="12" class="text-center">
              <div align="center"><v-img src="@/assets/security/sgsiso20000.png" contain max-height="70px" max-width="50px"></v-img></div>
              <div style="font-weight:bold; font-size: 16px;" class="pt-2">ISO/IEC 20000-1:2011</div>
              <div class="" style="font-size: 14px;">CLOUD MANAGENT</div>
              <div class="" style="font-size: 14px;">Enterprise Network Connectivity</div>
              <div class="" style="font-size: 14px;">and DATA CENTER Management</div>
            </v-col>
            <v-col cols="12" md="3" xs="12" sm="12"></v-col>
          </v-row>
        </v-flex>
      </v-layout>
      <Footer id="contact" />
      <Signup />
      <Signin />
      <Forgot />
      <Profile />
      <Setting />
      <RegisterComplete />
      <SubmitForgotPassword />
  </div>
</template>

<script>
import Upper from '../views/Upper'
import { mapActions, mapState } from 'vuex'
import Signup from '../components/modal/signUp'
import Signin from '../components/modal/signIn'
import Forgot from '../components/modal/forgot'
import Profile from '../components/account/avatar'
import Setting from '../components/modal/settings'
import RegisterComplete from '../components/modal/registerComplete'
import SubmitForgotPassword from '../components/modal/submitforgot'
import Footer from '../views/Footer'

export default {
  data: () => ({
    showSignup: true,
    jwt: require('jsonwebtoken')
  }),
  components: {
    Upper,
    Signup,
    Signin,
    Forgot,
    Profile,
    Setting,
    RegisterComplete,
    SubmitForgotPassword,
    Footer
  },
  methods: {
    ...mapActions('dialog', ['setDialogSignup', 'setDialogSignin']),
    openModelSignup () {
      this.setDialogSignup(true)
    },
    showUserName () {
      if (this.$cookies.get('user-token') !== null) {
        var d = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(d, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        // var base64Url = d.split('.')[1]
        // this.datapage = JSON.parse(window.atob(base64Url))
        // test config
        this.user = data.user
        this.showSignup = false
        if (this.roleUser === 'user') {
          this.goPage('/joinuserrole')
        } else {
          this.goPage('/main')
        }
      }
    },
    goPage (link) {
      this.$router.push(link).catch(() => {})
    }
  },
  created () {
    this.showUserName()
    if (this.$route.query.status === 'activemail') {
      this.$swal('Comfirmed Email', 'You can sign in with username and password', 'success')
    }
    this.setDialogSignin(false)
  },
  computed: {
    ...mapState('dialog', ['roleUser'])
  }
}
</script>

<style>
.no-uppercase {
     text-transform: none;
}
</style>
