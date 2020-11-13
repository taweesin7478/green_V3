<template>
  <div>
    <div
      class=" pb-10"
      no-gutters
      style="background-color: rgba(255, 255, 255,0.6);border-radius:36px;padding:10px;"
    >
    <v-container
    scrollable>
      <v-card-title></v-card-title>
      <v-card-text>
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
                  width="57%"
                >
                  Name
                </th>
                <th
                  style="border-radius: 0px 10px 10px 0px; color:white; font-size:20px"
                  class="text-center pt-3 pb-3"
                  width="30%"
                >
                  Time in
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in desserts" :key="item.no">
                <td class="text-center">{{ item.no}}</td>
                <td class="text-center">{{ item.name }}</td>
                <td class="text-center">{{ item.timein }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-container>
    </div>
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
  computed: {
    ...mapState('dialog', ['editroom']),
    localDialog: {
      get () {
        return this.editroom
      },
      set (value) {
        this.setDialogeditroom(value)
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
