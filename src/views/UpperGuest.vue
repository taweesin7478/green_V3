<template>
  <div>
      <v-system-bar height="auto" style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);" class="pt-4 pb-4 pl-6 pr-6">
      <div class="d-flex align-center">
        <v-img src="@/assets/logo.png" max-width="200px" class="app-bar-left"></v-img>
      </div>
      <v-spacer></v-spacer>
      <v-btn text><span style="color: white;" @click="goPage('/')">Home</span></v-btn>
      <!-- <v-btn color="white" class="ml-5 p-4" rounded @click="openModelSignin">
        <span class="no-uppercase" style="color: black; font-size:12pt;">Sign in</span>
      </v-btn> -->
    </v-system-bar>
    <v-footer app style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E); color: white; padding: 0;">
      <v-flex class="pb-3"
      text-center
      xs12
        >
        Powerful ONE Conference &copy;{{ new Date().getFullYear() }} ONE Conference Team. All rights reserved INET.CO.TH
        </v-flex>
    </v-footer>
    <!-- <Signin ref="popupSignin" /> -->
  </div>
</template>

<script>
// import Signin from '../components/modal/signIn'

export default {
  components: {
    // Signin
  },
  methods: {
    // openModelSignin () {
    //   this.$refs.popupSignin.openSigninInfo()
    // },
    // func_sign_in () {
    //   this.goPage('/signin')
    // },
    goPage (link) {
      this.$router.push(link)
    }
  }
}
</script>

<style>
.no-uppercase {
     text-transform: none;
}
</style>
