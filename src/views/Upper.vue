<template>
  <div>
    <!-- <v-system-bar
      height="auto"
      style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);"
      class="pt-6 pb-4 pl-12 pr-6"
      app
    > -->
    <v-system-bar
      height="auto"
      :style="bgColor"
      class="pt-2 pl-12 pr-6"
      app
      v-scroll="onScroll"
      v-show="!$vuetify.breakpoint.xs"
    >
      <v-row style="border:solid 0px;" class="mt-n6 mb-n4">
        <v-col cols="12" md="2">
          <div class="d-flex align-center">
            <v-img
              src="@/assets/logo.png"
              max-width="120px"
              max-height="45px"
              class="app-bar-left mt-4"
              aspect-ratio="1" contain
            ></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="10">
          <v-spacer></v-spacer>
          <div class="float-right">
            <v-row style="border:solid 0px;">
              <v-col
                cols="12"
                md="12"
                xs="12"
                sm="12"
                style="margin-right:50px;"
              >
                <!-- start left menu -->
                <div>
                  <table>
                    <tr>
                      <td>
                        <v-btn text height="0" min-width="0" class="p-0 m-0">
                          <span
                            style="color: white; font-size:14px; font-weight: bold;padding-left: 35px; padding-right: 35px;"
                            @click="home"
                            >Home</span
                          >
                        </v-btn>
                        <v-btn text height="0" min-width="0" class="p-0 m-0" @click="contact">
                          <span
                            style="color: white; font-size:14px; font-weight: bold;padding-left: 35px; padding-right: 35px;"
                            >Contact Us</span
                          >
                        </v-btn>
                      </td>
                      <td>
                        <v-btn
                          v-if="showUser"
                          color="white"
                          rounded
                          @click="openModelSignin"
                          large
                          style="padding-left: 35px; padding-right: 35px;"
                        >
                          <span
                            class="no-uppercase"
                            style="color: black; font-size:14px; font-weight: bold;"
                            >Sign in</span
                          >
                        </v-btn>
                        <v-menu v-if="!showUser" offset-y>
                          <template v-slot:activator="{ on, attrs }">
                            <div v-bind="attrs" v-on="on">
                              <v-avatar class="profile" size="50">
                                <v-img :src="user.avatar_profile"></v-img>
                              </v-avatar>
                            </div>
                          </template>
                          <v-list width="350px">
                            <div class="pl-4">
                              <span style="font-size: 14pt; font-weight: bold;"
                                >One Conference</span
                              >
                              <!-- <span style="font-size: 10pt; color: #c00000;">
                                (Trial)</span
                              > -->
                            </div>
                            <div class="pl-4">
                              <v-row>
                                <v-col cols="12" md="2" sm="2" xs="2">
                                  <v-avatar class="profile" size="40">
                                    <v-img :src="user.avatar_profile"></v-img>
                                  </v-avatar>
                                </v-col>
                                <v-col
                                  cols="12"
                                  md="10"
                                  sm="10"
                                  xs="10"
                                  class=""
                                >
                                  <span style="font-size: 12pt;">{{
                                    user.name + " " + user.lastname
                                  }}</span>
                                  <!-- <span style="font-size: 12pt;">Watcharapron Chaomueangpak</span> -->
                                  <br />
                                  <!-- <v-btn
                                    text
                                    class="p-0 m-0 no-uppercase"
                                    height="0"
                                    min-width="0"
                                    @click="openModalProfile"
                                    >Edit</v-btn
                                  > -->
                                </v-col>
                              </v-row>
                            </div>
                            <div class="pl-4" v-if="showMain">
                              <v-btn
                                text
                                class="p-0 m-0 no-uppercase"
                                height="0"
                                min-width="0"
                                @click="goPage('/main')"
                                >Management meeting</v-btn
                              >
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
                      </td>
                    </tr>
                  </table>
                </div>
                <!-- end left menu -->
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-system-bar>
    <v-system-bar
      height="auto"
      style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);"
      class="pt-2 pl-12 pr-6"
      v-show="$vuetify.breakpoint.xs"
    >
      <v-row style="border:solid 0px;" class="mt-n6 mb-n4">
        <v-col cols="12" md="2">
          <div class="d-flex align-center">
            <v-img
              src="@/assets/logo.png"
              max-width="120px"
              max-height="45px"
              class="app-bar-left mt-4"
              aspect-ratio="1" contain
            ></v-img>
          </div>
        </v-col>
        <v-col cols="12" md="10">
          <v-spacer></v-spacer>
          <div class="float-right">
            <v-row style="border:solid 0px;">
              <v-col
                cols="12"
                md="12"
                xs="12"
                sm="12"
                style="margin-right:50px;"
              >
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
      <!-- mobile section xs -->
      <div id="app">
        <v-avatar color="#034da1" class="mt-n10 ml-n5">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </v-avatar>

        <v-navigation-drawer
          v-model="drawer"
          absolute
          temporary
          style="background-image: linear-gradient(to right, #20C492, #0BAABD);"
        >
          <v-list nav>
            <v-list-item-group
              v-model="group"
              active-class="deep-purple--text text--accent-4"
            >
              <v-list-item>
                <v-list-item-title @click="home" style="color:white;"
                  ><span style="font-weight: bold; font-size: 14px;"
                    >HOME</span
                  ></v-list-item-title
                >
              </v-list-item>

              <v-list-item>
                <v-list-item-title style="color:white;" @click="contact"
                  ><span style="font-weight: bold; font-size: 14px;"
                    >CONTACT US</span
                  ></v-list-item-title
                >
              </v-list-item>

              <v-list-item v-if="showUser" style="background-color:white;">
                <v-list-item-title @click="openModelSignin"
                  >Sign in</v-list-item-title
                >
              </v-list-item>

              <v-list-item v-if="!showUser">
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <div v-bind="attrs" v-on="on">
                      <v-avatar class="profile" size="50">
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
                      <!-- <span style="font-size: 10pt; color: #c00000;">
                        (Trial)</span
                      > -->
                    </div>
                    <div class="pl-4">
                      <v-row>
                        <v-col cols="12" md="2" sm="12" xs="12">
                          <v-avatar class="profile" size="40">
                            <v-img :src="user.avatar_profile"></v-img>
                          </v-avatar>
                        </v-col>
                        <v-col cols="12" md="10" sm="12" xs="12" class="mt-2">
                          <span style="font-size: 12pt;">{{
                            user.name + " " + user.lastname
                          }}</span>
                          <br />
                          <!-- <v-btn
                            text
                            class="p-0 m-0 no-uppercase"
                            height="0"
                            min-width="0"
                            @click="openModalProfile"
                            >Edit</v-btn
                          > -->
                        </v-col>
                      </v-row>
                    </div>
                    <div class="pl-4" v-if="showMain">
                      <v-btn
                        text
                        class="p-0 m-0 no-uppercase"
                        height="0"
                        min-width="0"
                        @click="goPage('/main')"
                        >Management meeting</v-btn
                      >
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
                        >Logout</v-btn
                      >
                    </div>
                  </v-list>
                </v-menu>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
      </div>
      <!-- end mobile section -->
    </v-system-bar>
    <!-- <v-footer
      app
      style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E); color: white; padding: 0;"
    >
      <v-flex
        class="pb-3"
        text-center
        xs12
      >Powerful ONE Conference &copy;{{ new Date().getFullYear() }} ONE Conference Team. All rights reserved INET.CO.TH</v-flex>
    </v-footer> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    drawer: false,
    group: null,
    showUser: true,
    bgColor: 'background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);',
    offsetTop: 0,
    showMain: true,
    jwt: require('jsonwebtoken')
  }),
  watch: {
    group () {
      this.drawer = false
    }
  },
  components: {
    // Profile
  },
  methods: {
    ...mapActions('dialog', [
      'setDialogSignin',
      'setDialogProfile',
      'setDialogSetting'
    ]),
    openModelSignin () {
      // this.$refs.popupSignin.openSigninInfo()
      this.setDialogSignin(true)
    },
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
        this.user = data.user
        // console.log('user', this.user)
        this.showUser = false
      }
    },
    logout () {
      // console.log(this.user.email)
      const { email } = this.user
      // http://localhost:9213/backend/api/auth/logout
      try {
        this.axios
          .delete(process.env.VUE_APP_API + '/api/auth/logout', {
            data: { email }
          })
          .then(response => {
            // console.log('response', response.data)
            localStorage.removeItem('user-token')
            window.location.reload()
          })
      } catch (error) {
        console.log(error.message)
      }
    },
    home () {
      window.location.href = '#home'
    },
    contact () {
      window.location.href = '#contact'
    },
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      // console.log(this.offsetTop)
      if (this.offsetTop > 0) {
        this.bgColor = 'background-color: #086AAB;'
      } else {
        this.bgColor = 'background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);'
      }
    }
  },
  created () {
    this.showUserName()
    if (localStorage.getItem('role') === 'user') {
      this.showMain = false
    }
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none;
}

.theme--light.v-system-bar .v-icon {
  color: white !important;
}
</style>
