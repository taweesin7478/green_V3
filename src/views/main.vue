<template>
  <div id="app">
    <v-app>
      <UpperLogin />
      <v-app-bar app color="#E5E5E5" dark elevation="0">
        <span style="color:black; font-size:28px;" class="pl-3">{{ title }}</span>
      </v-app-bar>
      <v-navigation-drawer
        v-model="sidebarMenu"
        app
        floating
        :permanent="sidebarMenu"
        :mini-variant.sync="mini"
        color="#44546a"
        mini-variant-width="70px"
        style="top:50px"
      >
        <v-list>
          <v-list-item></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="pt-8 pl-12">
        <router-view />
      </v-main>
    </v-app>
    <!-- <editpoll/> -->
  </div>
</template>

<script>
import UpperLogin from './UpperLogin'

export default {
  components: {
    UpperLogin
  },
  data: () => ({
    title: 'Meeting',
    sparklineData: [423, 446, 675, 510, 590, 610, 423],
    sidebarMenu: true,
    toggleMini: true
  }),
  computed: {
    mini () {
      return this.$vuetify.breakpoint.smAndDown || this.toggleMini
    },
    buttonText () {
      return !this.$vuetify.theme.dark ? 'Go Dark' : 'Go Light'
    }
  },
  methods: {},
  created () {}
}
</script>

<style>
.no-uppercase {
  text-transform: none;
}
</style>
