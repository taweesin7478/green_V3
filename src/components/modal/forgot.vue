<template>
  <v-row>
    <v-dialog v-model="localDialog" max-width="400px" scrollable>
      <v-card
        min-height="200px"
        style="border-radius: 10px;"
        outlined
        color="#eeeeee"
      >
        <br />
        <v-card-text>
          <v-col cols="12"  class="text-center mt-n4">
        <img width="125px" height="125px"
        src="@/assets/logoOne.png"
        />
      </v-col>
          <div
            class="text-center pb-4 pt-2"
            style="color:#03429E; font-weight: bold; font-size: 30px;"
          >Recovery</div>
          <div class="text-center mr-1 ml-1"
          style="color:#BDB6B6; font-weight: bold; font-size: 14px;"
          >One platform</div>
          <br />
          <div class="mr-1 ml-1 mb-1"
          style="color:#000000;font-size: 14px;"
          >Please enter the username you used to continue</div>
          <div class="mb-2">
            <v-text-field
              class="mr-1 ml-1"
              autofocus
              v-model="username"
              required
              outlined
              prepend-inner-icon="mdi-account-arrow-right-outline"
              placeholder="Username"
              dense
            ></v-text-field>
          </div>
          <v-row class="mt-n10">
            <v-col cols="12" sm="12" md="12" class="pb-8 pt-8 text-center">
              <v-btn
                class="no-uppercase"
                color="#086aab"
                block
                @click="forgotPassword"
                style="color: white; padding: 25px; font-size: 14pt; border-radius:0;"
              ><span style="font-size:22px;">Send</span></v-btn>
            </v-col>
          </v-row>
          <v-col class="pb-6 pt-6 text-center">
            <span  style="color:#428bbc;">Contact support ?</span>
          </v-col>
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
      username: ''
    }
  },
  computed: {
    ...mapState('dialog', ['forgot']),
    localDialog: {
      get () {
        return this.forgot
      },
      set (value) {
        this.setDialogForgot(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogForgot', 'setDialogSubmitForgotPassword']),
    openModelSubmitForgotPassword () {
      this.setDialogSubmitForgotPassword(true)
    },
    goPage (link) {
      this.$router.push(link)
    },
    forgotPassword () {
      var data = {
        username: this.username
      }
      this.axios.post(process.env.VUE_APP_API + '/api/users/forgot', data).then(
        res => {
          if (res.data.status === 'error') {
            this.$swal('ERROR !', 'Email is not in the server.', 'error')
          } else {
            localStorage.setItem('email', res.data.email)
            this.openModelSubmitForgotPassword()
          }
        }
      )
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
