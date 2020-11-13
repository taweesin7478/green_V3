<template>
  <v-container>
    <div>
      <v-card-text>
      <v-row justify="center">
        <v-expansion-panels popout>
          <v-expansion-panel
            v-for="(item, i) in items"
            :key="item.id"
          >
            <v-expansion-panel-header>คำถาม : {{item[0]}}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col style="padding-top: 40px">
                  <v-row>
                     <v-card
                        class="mx-auto text-center"
                        width="300"
                        height="120"
                        outlined
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="overline mb-4">ผู้ตอบ</div>
                            <v-list-item-title class="headline mb-1">{{item[1]}}</v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                     </v-card>
                  </v-row><br/>
                </v-col>
                <v-col style="margin-right: 100px">
                  <div id="chart">
                    <apexchart type="bar" height="200" :options="allChartOptions[i]" :series="allSeries[i]"></apexchart>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
            </v-card-text>
    </div>
  </v-container>
</template>
<script>
import { mapState } from 'vuex'
import VueApexCharts from 'vue-apexcharts'
export default {
  components: {
    apexchart: VueApexCharts
  },
  data () {
    return {
      test: '94152d51453d035bf4f86172acfc59b2-1597135679246',
      items: [],
      nameRoom: '',
      attendee: '',
      date: '',
      userVote: '',
      series: [{
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: [],
          type: 'numeric'
        }
      },
      allChartOptions: [],
      allSeries: [],
      desserts: [
      ],
      record: '',
      ssss: []
    }
  },
  watch: {
    localDialogreport (value) {
      if (value) {
        this.getMeeting()
      }
    }
  },
  computed: {
    ...mapState('dialog', ['reportmeet', 'reportSchedue']),
    localDialogreport: {
      get () {
        return this.reportSchedue
      },
      set (value) {
        this.setDialogReport(value)
      }
    }
  },
  created () {
    // this.getreport()
    // this.getRoom()
    this.getMeeting()
  },
  methods: {
    async getMeeting () {
      var AllPoll = []
      var poll1 = []
      var poll2 = []
      var pollS = []
      var pollT = []
      var Votes = await this.axios.post(
        'http://localhost:9213/api/votes/search',
        { meetingid: this.reportmeet }
      )
      // console.log('meetid', this.reportmeet)
      this.date = Votes.data.data[0].updated_at
      var dataV = Votes.data.data[0].PollList
      for (let i = 0; i < dataV.length; i++) {
        poll1.push(dataV[i].content)
        poll1.push(dataV[i].user_votes.length)
        const categories = []
        const series = []
        for (let j = 0; j < dataV[i].choice.length; j++) {
          var A = dataV[i].choice[j].user_answer.length
          var B = dataV[i].user_votes.length
          pollS.push([dataV[i].choice[j].text, (A / B) * 100])
          categories.push(dataV[i].choice[j].text)
          pollT.push(A)
          series.push(A)
        }
        poll1.push(pollS)
        poll1.push(pollT)
        poll2.push(poll1)
        this.allChartOptions.push({ ...this.chartOptions, xaxis: { categories } })
        this.allSeries.push([
          {
            data: series
          }
        ])
        pollS = []
        pollT = []
        poll1 = []
      }
      AllPoll.push(dataV)
      this.items = poll2
      // console.log('items', this.items)
    }
  }
}
</script>
