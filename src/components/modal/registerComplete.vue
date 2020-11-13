<template>
  <v-row>
      <v-dialog v-model="localDialog" max-width="400px" scrollable persistent>
        <v-card
          min-height="200px"
          style="border-radius: 10px;"
          outlined
          color="#eeeeee"
        >
        <br/>
        <v-card-text>
          <v-row>
            <v-col cols="12"  class="text-center mt-n4">
              <img width="125px" height="125px" src="@/assets/logoOne.png" />
            </v-col>
          </v-row>
          <v-row cols="12" class="mb-n2">
            <v-col cols="12">
                <span style="color:#03429E; font-weight: bold; font-size: 30px;">Register Complete</span>
            </v-col>
          </v-row>
          <v-row cols="12">
            <v-col cols="12">
                <p style="font-size: 14px;">Enter <a :href="enterSite" target="_blank">{{ enterSite }}</a> and login with <span style="color:#5088bf; font-weight: bold;">{{ email }}</span> and password. Click the confirmation link in that email to begin using One conference.</p>
            </v-col>
          </v-row>
          <v-row class="mt-n4">
            <v-col cols="12" sm="12" md="12" class="pb-6 pt-6 text-center">
              <v-btn
                class="no-uppercase"
                color="#086aab"
                block
                @click="closeDialog"
                style="color: white; padding: 25px; font-size: 14pt; border-radius:0;"
              >Home</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      enterSite: process.env.VUE_APP_email,
      emails: ''
    }
  },
  computed: {
    ...mapState('dialog', ['registerComplete', 'email']),
    localDialog: {
      get () {
        return this.registerComplete
      },
      set (value) {
        this.setDialogRegisterComplete(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogRegisterComplete']),
    closeDialog () {
      this.setDialogRegisterComplete(false)
      localStorage.removeItem('email')
    }
  },
  created () {
    this.emails = localStorage.getItem('email')
    // console.log('email', this.email)
    // console.log(process.env.VUE_APP_email)
    // console.log(process.env.VUE_APP_API)
  }
}
</script>
