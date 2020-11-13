<template>
    <v-dialog v-model="localDialogreport" max-width="1100px" scrollable class="mx-auto">
      <v-card
        style="border-radius: 10px;"
        outlined
      >
      <v-card-title></v-card-title>
      <v-card-text>
        <div id="testHtml" ref="testHtml">
        <v-row no-gutters class="">
          <v-col cols="12" class="text-center mt-n12 mb-n10">
            <img width="200px" height="200px" src="@/assets/logoOneConference.png" />
          </v-col>
          <v-row  class="text-right pb-3 mt-n12">
           <v-col justify="space-around">
                <v-btn
                v-show="showButton"
                width="165px"
                height="50px"
                tile
                class="ma-2 white--text no-uppercase border-radius-10 mt-n13"
                style="font-size: 20px;"
                color="#20C492"
                @click="downloadreport">
                <v-icon left>
                  mdi-download
                </v-icon>
                Download
                </v-btn>
          </v-col>
        </v-row>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" class="text-center pb-3 mt-n1">
            <p style="color:#000000; font-size:28px">Report</p>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="mr-1 ml-1">
            <span style="color:#000000; font-size:20px">Subject : </span>
            <span style="font-size:20px">{{ ssss.subject }}</span>
          </v-col>
        </v-row>
        <v-row>
          <v-col class=" mr-1 ml-1">
            <span style="color:#000000; font-size:20px">Date and Time : </span>
            <span style="font-size:20px"
              > {{ ssss.datetime }}</span
            >
          </v-col>
        </v-row>
        <v-row class=" mr-1 ml-1">
          <span style="color:#000000; font-size:20px">Record video : </span>
          <div class="ml-2">
            <b-form-group>
              <b-form-radio disabled  v-model="record" name="record" :value="true">YES</b-form-radio>
              <b-form-radio  disabled v-model="record" name="record" :value="false">NO</b-form-radio>
            </b-form-group>
          </div>
        </v-row>
        <v-row>
          <v-col class=" mr-1 ml-1 mt-n6">
            <span style="color:#000000; font-size:20px">Attendee :  </span>
            <span style="font-size:20px">{{ ssss.attendee }}</span>
          </v-col>
        </v-row>
        <v-tabs background-color="white" :right="false">
        <v-tab >Meeting Report</v-tab>
        <!-- <v-tab>Vote Report</v-tab> -->
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
              <p style="color:#525151; font-size:28px" class="mt-4 mt-n1 ">Vote Report</p>
              <!-- <Reportvote class="mt-n10"/> -->
              <Vote class="mt-n6"/>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs>
      </div>
      </v-card-text>
       <!-- <img :src="output"> -->
      <v-card-actions></v-card-actions>
     </v-card>
  </v-dialog>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import Report from '../../components/report'
import Vote from '../modal/Vote'
// import { jsPDF } from 'jspdf'
import jsPDF from 'jspdf'
// import domtoimage from 'dom-to-image'
// import Reportvote from '../../components/reportvote'
import html2canvas from 'html2canvas'
export default {
  components: {
    Report,
    // domtoimage,
    // Reportvote,
    Vote
  },
  data () {
    return {
      output: null,
      desserts: [
      ],
      record: '',
      ssss: [],
      showButton: true
    }
  },
  watch: {
    localDialogreport (value) {
      if (value) {
        this.getreport()
      }
    }
  },
  computed: {
    ...mapState('dialog', ['reportSchedue', 'reportmeet']),
    localDialogreport: {
      get () {
        return this.reportSchedue
      },
      set (value) {
        this.setDialogReport(value)
      }
    },
    meet_id: {
      get () {
        return this.reportmeet
      },
      set (value) {
        this.setMeetingIdReport(value)
      }
    }
  },
  // created () {
  //   this.getreport()
  // },
  methods: {
    ...mapActions('dialog', ['setDialogReport']),
    openModeleditroom () {
      this.setDialogReport(false)
    },
    downloadreport () {
        try {
          this.axios.get(process.env.VUE_APP_API + '/api/rooms/downloadreport/' + this.meet_id, { responseType: 'arraybuffer' }).then(res => {
          // console.log(res)
          const blob = new Blob([res.data], { type: 'application/pdf' })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = this.meet_id + '.pdf'
          link.click()
        })
        } catch (error) {
          this.$swal('WARNING !', error.response.data.message, 'warning')
        }
      //   const vm = this
      // this.$nextTick(() => {
      //   html2canvas(this.$refs.testHtml)
      //   .then((canvas) => {
      //     var img = canvas.toDataURL('image/png')
      //     var doc = new jsPDF('p', 'pt', 'A4')
      //     doc.addImage(img, 'PNG', 15, 15, 550, 400)
      //     // // doc.text('pdf', 15, 15)
      //     doc.save('Meeting Report.pdf')
      //     vm.showButton = true
      //   })
      // })
    },
    async getreport () {
      // console.log('vuex report meetinf_id', this.meet_id)
      // console.log('data', headers)
      var { data } = await this.axios.get(
        process.env.VUE_APP_API + '/api/rooms/getreport/' + this.meet_id
      )
      // console.log('data all', data)
      this.record = data.data.record
      this.desserts = data.data.member
      this.ssss = data.data
      /* if (data.record === true) {
        this.record = 'record'
      } else {
        this.record = 'record'
      } */
      // console.log('record', this.record)

      // console.log('data report', this.record)
    }
  }
}
</script>
