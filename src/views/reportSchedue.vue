<template>
  <div>
    <v-dialog v-model="localDialog" max-width="536px" scrollable>
      <v-card
        min-height="300px"
        style="border-radius: 10px;"
        outlined
        color="#FFFFFF"
      >
      <br/>
    <div
      class="pt-5 pb-10"
      no-gutters
      style="background-color: rgba(255, 255, 255,0.6);border-radius:36px;padding:10px;"
    >
    <v-container>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-col cols="12" class="text-center mt-n4">
          <img width="125px" height="125px" src="@/assets/logoOneConference.png" />
          <v-row>
            <v-col class=" mr-1 ml-5 mt-n1">
              <p style="color:#000000; font-size:28px">Report</p>
            </v-col>
          </v-row>
        </v-col>
         <v-card-text>
        <v-row>
          <v-col class=" mr-1 ml-1">
            <span style="color:#000000; font-size:20px">Subject : </span>
            <span style="font-size:20px">{{ ssss.subject }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class=" mr-1 ml-1 mt-n5">
            <span style="color:#000000; font-size:20px">Date and Time : </span>
            <span style="font-size:20px"
              > {{ ssss.datetime }}</span
            >
          </v-col>
        </v-row>
        <v-row class=" mr-1 ml-1 mt-n2">
          <span style="color:#000000; font-size:20px">Record video : </span>
          <div class="ml-2">
            <b-form-group>
              <b-form-radio disabled v-model="record" name="record" :value="true">YES</b-form-radio>
              <b-form-radio disabled v-model="record" name="record" :value="false">NO</b-form-radio>
            </b-form-group>
          </div>
        </v-row>
        <v-row>
          <v-col class=" mr-1 ml-1 mt-n5">
            <span style="color:#000000; font-size:20px">Attendee :  </span>
            <span style="font-size:20px">{{ ssss.attendee }}</span>
          </v-col>
        </v-row>
        <v-simple-table dense class=" mr-1 ml-1 mt-n1">
          <template v-slot:default>
          </template>
        </v-simple-table>
      </v-card-text>
              <v-tabs background-color="white" :right="false" class="">
        <v-tab >Meeting Report</v-tab>
        <v-tab>Vote Report</v-tab>
        <v-tab-item :key="1">
          <v-row class="text-center">
            <v-col class="mb-6 ml-3">
              <p style="color:#525151; font-size:28px">Meeting Report</p>
              <Report class="mt-n10"/>
            </v-col>
          </v-row>
        </v-tab-item>
        <v-tab-item :key="2">
          <v-row no-gutters class="mb-4 ml-3 text-center">
            <v-col class="mb-6 ml-3">
              <p style="color:#525151; font-size:28px" class="mt-4">Vote Report</p>
              <Reportvote class="mt-n10"/>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-container>
    </div>
     </v-card>
  </v-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Report from '../components/report'
import Reportvote from '../components/reportvote'
export default {
  components: {
    Report,
    Reportvote
  },
  data () {
    return {
      desserts: [
      ],
      record: '',
      ssss: []
    }
  },
  computed: {
    ...mapState('dialog', ['reportschedue']),
    localDialog: {
      get () {
        return this.reportschedue
      },
      set (value) {
        this.setDialogreportschedue(value)
      }
    }
  },
  created () {
    this.getreport()
  },
  methods: {
    ...mapActions('dialog', ['setDialogeditroom']),
    openModeleditroom () {
      this.setDialogeditroom(true)
    },
    async getreport () {
      // console.log('api')
      // console.log('data', headers)
      var { data } = await this.axios.get(
        process.env.VUE_APP_API + '/api/rooms/getreport/' + this.$route.query.mid
      )
      this.record = data.data.record
      this.desserts = data.data.member
      this.ssss = data.data
      // if (data.record === true) {
      //   this.record = 'norecord'
      // } else {
      //   this.record = 'record'
      // }
      // console.log('desserts', this.desserts)
    }
  }
}
</script>
