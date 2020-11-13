<template>
  <div>
    <v-system-bar
      app
      height="50px"
      style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);"
    >
      <div class="d-flex align-center">
        <v-img
          src="@/assets/logo.png"
          max-width="60px"
          class="app-bar-left"
          @click="goPage('/')"
          style="cursor: pointer;"
        ></v-img>
        <!-- <v-img src="@/assets/logo.png" max-width="60px" class="app-bar-left" v-if="!showMain"></v-img> -->
      </div>
      <v-spacer></v-spacer>
      <v-menu v-if="showuser" offset-y :disabled="!showuser">
        <template v-slot:activator="{ on, attrs }">
          <div v-bind="attrs" v-on="on" class="pt-2 pb-3">
            <v-avatar class="profile" size="32">
              <v-img :src="user.avatar_profile"></v-img>
            </v-avatar>
            <!-- <v-chip class="v-chip-left" large color="#034da1">
              <span class="font-user" style="color: white;">{{user.name}}</span>
            </v-chip> -->
          </div>
        </template>
        <v-list width="350px">
          <div class="pl-4">
            <span style="font-size: 14pt; font-weight: bold;"
              >One Conference</span
            >
            <!-- <span style="font-size: 10pt; color: #c00000;"> (Trial)</span> -->
          </div>
          <div class="pl-4">
            <v-row no-gutters>
              <v-col cols="12" md="2" sm="2" xs="2">
                <v-avatar class="profile" size="44">
                  <v-img :src="user.avatar_profile"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="12" md="10" sm="10" xs="10" class="mt-2">
                <span style="font-size: 12pt;">{{ user.name }}</span>
                <span style="font-size: 12pt;"> {{ user.lastname }}</span>
                <!-- <span style="font-size: 12pt;">Watcharapron Chaomueangpak</span> -->
                <br />
                <!-- <v-btn text class="p-0 m-0 no-uppercase" height="0" min-width="0" @click="openModalProfile">Edit</v-btn> -->
              </v-col>
            </v-row>
          </div>
          <div class="pl-4">
            <v-btn
              text
              class="p-0 m-0 no-uppercase"
              height="0"
              min-width="0"
              @click="openModelSetting"
              >Setting</v-btn
            >
          </div>
          <div class="pl-4">
            <v-btn
              text
              class="p-0 m-0 no-uppercase"
              height="0"
              min-width="0"
              @click="logout()"
              >Logout</v-btn
            >
          </div>
        </v-list>
      </v-menu>
    </v-system-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  components: {},
  data () {
    return {
      user: [],
      showuser: false,
      showMain: true,
      jwt: require('jsonwebtoken')
    }
  },
  created () {
    this.showUserName()
    if (localStorage.getItem('role') === 'user') {
      this.showMain = false
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogProfile', 'setDialogSetting']),
    openModalProfile () {
      this.setDialogProfile(true)
    },
    openModelSetting () {
      this.setDialogSetting(true)
    },
    goPage (link) {
      this.$router.push(link).catch(() => {})
    },
    showUserName () {
      if (this.$cookies.get('user-token') !== null) {
        var d = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(d, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        // var base64Url = d.split('.')[1]
        // this.datapage = JSON.parse(window.atob(base64Url))
        // console.log('token', this.$cookies.get('user-token'))
        // console.log('datatoken', data)
        this.user = data.user
        // console.log('user', this.user)
        this.showuser = true
      }
      // console.log('showuser', this.showuser)
    },
    async logout () {
      // console.log(this.user.email)
      // const { email } = this.user
      // http://localhost:9213/backend/api/auth/logout
      try {
        var { data } = await this.axios.delete(
          process.env.VUE_APP_API + '/api/auth/logout', {
            email: this.user.emailww
          }
        )
        if (data.status === 'success') {
          this.$cookies.remove('user-token')
          localStorage.removeItem('role')
          this.goPage('/')
        } else {
          console.log('log out: ', data.message)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none;
}
</style>
