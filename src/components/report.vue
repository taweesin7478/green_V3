<template>
  <div>
    <v-container>
      <v-card-title></v-card-title>
        <v-simple-table dense class=" mr-1 ml-1 mt-n1">
          <template v-slot:default>
            <thead>
              <tr style="background-color:#086AAB;" class="text-center">
                <th
                  style="border-radius: 10px 0px 0px 10px; color:white; font-size:20px"
                  class="text-center pt-3 pb-3"
                  width="20%"
                >
                  NO.
                </th>
                <th
                  style="color:white; font-size:20px"
                  class="text-center pt-3 pb-3"
                  width="40%"
                >
                  Name
                </th>
                <th
                  style="color:white; font-size:20px"
                  class="text-center pt-3 pb-3"
                  width="15%"
                >
                  Time in
                </th>
                 <th
                  style="border-radius: 0px 10px 10px 0px; color:white; font-size:20px"
                  class="text-center pt-3 pb-3"
                  width="20%"
                >
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.no">
                <td class="text-center">{{ item.no}}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center" >{{ item.timein }} - {{ item.timeout }}</td>
                <td class="text-center" v-if="item.duration == ''">-</td>
                <td class="text-center" v-else>{{ item.duration }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      <v-card-actions></v-card-actions>
    </v-container>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      desserts: [
      ],
      record: '',
      ssss: []
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
    ...mapState('dialog', ['editroom', 'reportSchedue', 'reportmeet']),
    localDialog: {
      get () {
        return this.editroom
      },
      set (value) {
        this.setDialogeditroom(value)
      }
    },
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
  methods: {
    ...mapActions('dialog', ['setDialogeditroom']),
    openModeleditroom () {
      this.setDialogeditroom(true)
    },
    async getreport () {
      // console.log('api')
      // console.log('data', headers)
      var { data } = await this.axios.get(
        process.env.VUE_APP_API + '/api/rooms/getreport/' + this.meet_id
      )
      // console.log('data', data)
      this.ssss = data.data
      this.desserts = data.data.member
      // console.log('data in table', this.ssss)
    }
  },
  created () {
    this.getreport()
  }
}
</script>
