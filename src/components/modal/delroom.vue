<template>
  <v-row>
    <v-dialog v-model="localDialog" max-width="490px    " scrollable>
      <v-card
        min-height="30%"
        style="border-radius: 10px;"
                outlined
        color="#FFFFFF"
      >
        <v-card-text>
                     <v-col cols="12"  class="text-center"></v-col>
                         <div class=" mr-2 ml-2"
                             style="color:#000000; font-size: 18px;"
                                >Remove schedule</div>
                                <br />
                               <div class=" mr-10 ml-10"
                             style="color:#000000; font-size: 14px;"
                                >Do you want to remove this shedule ? </div>
                                        <br />
                                        <br />
                                <v-col align="right">
                                        <div class="my-2">
                                            <v-btn depressed outlined>Close</v-btn>
                                            <v-btn depressed  color="primary"
                                            class="ma-2 white--text no-uppercase border-radius: 10px;">Save </v-btn>
                                        </div>
                                </v-col>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <Signup ref="popupSignup" /> -->
    <!-- <Forgot ref="popupForgot" /> -->
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    enabled: false,
    showpass: false,
    showoption: false,
    dialogeditroomInfo: false,
    username: '',
    password: '',
    show: false,
    admins: [
      ['Management', 'people_outline'],
      ['Settings', 'settings']
    ],
    rules: {
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || ''
      }
    },
    items: [
      {
        text: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      }
    ]
  }),
  computed: {
    ...mapState('dialog', ['delroom']),
    localDialog: {
      get () {
        return this.delroom
      },
      set (value) {
        this.setDialogdelroom(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogdelroom']),
    openModeldelroom () {
      this.setDialogdelroom(true)
    }
  }
}
</script>
