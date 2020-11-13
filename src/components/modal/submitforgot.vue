<template>
  <v-row>
    <v-dialog v-model="localDialog" max-width="400px" scrollable persistent>
      <v-card
        min-height="200px"
        style="border-radius: 10px; box-shadow: 0.5px 0.5px 8px 4px rgba(0, 0, 0, 0.5), 0 6px 30px 0 rgba(0, 0, 0, 0.5);"
        outlined
        color="#eeeeee"
      >
        <br />
        <v-card-text>
          <v-col cols="12"  class="text-center mt-n4 pb-10">
        <img width="125px" height="125px"
        src="@/assets/logoOne.png"
        />
      </v-col>
          <div
            class="mr-1 ml-1"
            style="color:#03429E; font-weight: bold; font-size: 24px;"
          >Reset your password</div>
          <br />
          <div class="mr-1 ml-1 pb-8"
          style="color:#000000;font-size: 14px;"
          >     We've sent an email to <a :href="link" target="_blank" style="color: #5088bf; font-weight: bold;">{{ email }}</a> Click the reset password link in that email to reset your password.</div>
          <div>
          </div>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="pb-8 pt-8 text-center">
              <v-btn
                class="no-uppercase mt-n4"
                color="#086aab"
                block
                @click="closeDialog"
                style="color: white; padding: 25px; font-size: 14pt;"
              >Done</v-btn>
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
  components: {

  },
  data () {
    return {
      link: process.env.VUE_APP_email,
      email: localStorage.getItem('email')
    }
  },
  computed: {
    ...mapState('dialog', ['submitForgotPassword']),
    localDialog: {
      get () {
        return this.submitForgotPassword
      },
      set (value) {
        this.setDialogSubmitForgotPassword(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogSubmitForgotPassword']),
    closeDialog () {
      this.setDialogSubmitForgotPassword(false)
      localStorage.removeItem('email')
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
