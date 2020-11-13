<template>
<div id="app">
    <v-app>
      <UpperLogin />
        <v-app-bar app color="#E5E5E5" dark elevation="0">
            <!-- <v-app-bar-nav-icon @click.stop="sidebarMenu = !sidebarMenu"></v-app-bar-nav-icon> -->
            <span style="color:black; font-size:28px;" class="pl-3">{{ title }}</span>
            <!-- <v-spacer></v-spacer> -->
            <!-- <v-btn @click="toggleTheme" color="primary" class="mr-2">{{buttonText}}</v-btn> -->
            <!-- <v-icon>mdi-account</v-icon> -->
        </v-app-bar>
        <v-navigation-drawer
            v-model="sidebarMenu"
            app
            floating
            :permanent="sidebarMenu"
            :mini-variant.sync="mini"
            color="#44546a"
            mini-variant-width="79"
            style="top:50px"
            >
            <!-- <v-list dense color="#20C492" dark style="padding-top: 1px;">
                <v-list-item class="">
                  <v-img src="@/assets/logo.png" max-width="80px" class="app-bar-left" @click="goPage('/main')"></v-img>
                </v-list-item>
            </v-list> -->
            <v-list>
                <!-- <v-list-item v-for="item in items" :key="item.title" link :to="item.href">
                    <v-list-item-content class="text-center">
                      <v-icon color="white">{{ item.icon }}</v-icon>
                        <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->
                <v-list-item>
                  <v-list-item-content class="text-center" style="cursor: pointer;">
                    <div v-if="!showMain">
                      <v-icon color="white" size="30px">mdi-account-circle</v-icon>
                      <v-list-item-title class="white--text pb-4" style="font-size:12px">Meeting</v-list-item-title>
                    </div>
                    <div @click="goPage('/main')" v-if="showMain">
                      <v-icon color="white" size="30px">mdi-account-circle</v-icon>
                      <v-list-item-title class="white--text pb-4" style="font-size:12px">Meeting</v-list-item-title>
                    </div>
                      <!-- <v-avatar tile size="30">
                        <img src="@/assets/Chat icon.png" width="30px" height="31px"/>
                      </v-avatar>
                    <v-list-item-title class="white--text pb-4" style="font-size:12px">Chat</v-list-item-title>
                    <v-avatar tile size="30">
                        <img src="@/assets/box icon.png" width="30px" height="29px"/>
                      </v-avatar>
                    <v-list-item-title class="white--text" style="font-size:12px">One box</v-list-item-title> -->
                  </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main class="pt-8 pl-12">
          <router-view/>
        </v-main>
    </v-app>
    <Setting />
    <Profile />
    <ScheduleMeeting />
    <RoomSetting />
    <ShareMeeting />
    <AddPolls/>
    <editroom/>
    <delroom/>
    <editpoll/>
    <ReportSchedule />
    <DowloadDialog/>
</div>

</template>

<script>
// import Schedule from '../components/schedue'
import UpperLogin from './UpperLogin'
// import { EventBus } from '@/EventBus'
import Setting from '../components/modal/settings'
import Profile from '../components/account/avatar'
import ScheduleMeeting from '../components/modal/scheduleMeeting'
import RoomSetting from '../components/modal/roomSetting'
import ShareMeeting from '../components/modal/shareMeeting'
import AddPolls from '../components/modal/addPolls'
import editroom from '../components/modal/editroom'
import delroom from '../components/modal/delroom'
import ReportSchedule from '../components/modal/reportschedue'
// import reportschedue from '..'
import editpoll from '../components/modal/editpoll'
import DowloadDialog from '../components/modal/dowloadFile'

export default {
  components: {
    UpperLogin,
    Setting,
    Profile,
    editpoll,
    ScheduleMeeting,
    RoomSetting,
    ShareMeeting,
    AddPolls,
    editroom,
    delroom,
    ReportSchedule,
    DowloadDialog
  },
  data: () => ({
    user: [],
    title: 'Meeting',
    sparklineData: [
      423,
      446,
      675,
      510,
      590,
      610,
      423
    ],
    sidebarMenu: true,
    toggleMini: true,
    items: [
      { title: 'Meeting', href: '/', icon: 'mdi-account-circle' },
      { title: 'Chat', href: '/detections', icon: '@/assets/Chat icon.png' },
      { title: 'One box', href: '/comp', icon: 'mdi-palette-swatch' }
    ],
    showMain: true,
    jwt: require('jsonwebtoken')
  }),
  computed: {
    mini () {
      return (this.$vuetify.breakpoint.smAndDown) || this.toggleMini
    },
    buttonText () {
      return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
    }
  },
  methods: {
    toggleTheme () {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    goPage (link) {
      // if (link === '/') {
      //   this.showuser = false
      //   this.logout()
      //   localStorage.clear()
      // console.log('clear')
      //   this.$router.push('/')
      // }
      this.$router.push(link).catch(() => {})
    },
    showUserName () {
      var d = this.$cookies.get('user-token')
      const decryptedText = this.CryptoJS.AES.decrypt(d, 'One Conference').toString(this.CryptoJS.enc.Utf8)
      var data = this.jwt.decode(decryptedText)
      this.datapage = data
      // console.log('datatoken', this.datapage)
      this.user = this.datapage.user
      // console.log('user', this.user)
      this.showuser = true
    },
    logout () {
      // console.log(this.user.email)
      const { email } = this.user
      // http://localhost:9213/backend/api/auth/logout
      try {
        this.axios.delete(process.env.VUE_APP_API + '/api/auth/logout', {
          data: { email }
        }).then((response) => {
          // console.log('response', response.data)
          localStorage.removeItem('user-token')
          this.goPage('/')
        })
      } catch (error) {
        console.log(error.message)
      }
    }
  },
  created () {
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
</style>
