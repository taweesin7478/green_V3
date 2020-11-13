<template>
  <v-dialog
    v-model="localDialogDowload"
    max-width="1100px"
    scrollable
    class="mx-auto"
  >
    <v-card scrollable style="border-radius: 10px;" outlined>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-row no-gutters class="">
          <v-col cols="12" class="text-center mt-n12 mb-n10">
            <img width="200px" height="200px" src="@/assets/logoOneConference.png" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" class="text-center pb-3">
            <p style="color:#000000; font-size:28px">Download File</p>
          </v-col>
        </v-row>
            <v-row>
              <v-col cols="12">
                <v-simple-table dense class=" mr-1 ml-1 mt-n1">
                  <template v-slot:default>
                    <thead>
                      <tr style="background-color:#086AAB;" class="text-center">
                        <th
                          style="border-radius: 10px 0px 0px 10px; color:white; font-size:20px"
                          class="text-center pt-3 pb-3"
                          width="10%"
                        >
                          No
                        </th>
                        <th
                          style="color:white; font-size:20px"
                          class="text-center pt-3 pb-3"
                          width="50%"
                        >
                          Name
                        </th>
                        <th
                          style="color:white; font-size:20px"
                          class="text-center pt-3 pb-3"
                          width="40%"
                        >
                          Size
                        </th>
                        <th
                          style="border-radius: 0px 10px 10px 0px;color:white; font-size:20px"
                          class="text-center pt-3 pb-3"
                          width="20%"
                        >
                          Dowload
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in dataFileIdIn" :key="index">
                        <td class="text-center">{{ index+1 }}</td>
                        <td class="text-center">{{ item.filename }}</td>
                        <td class="text-center">{{ item.size }}</td>
                        <td class="text-center">
                          <v-btn
                            text
                            @click="dowloadFile(item.file_id)"
                          >
                            <v-icon right style="color:#086AAB; font-size:30px"
                              >mdi-download</v-icon
                            ></v-btn
                          >
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
      </v-card-text>
      <v-card-actions></v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// import Reportvote from '../../components/reportvote'
export default {
  data () {
    return {
      dataFileIdIn: []
    }
  },
  watch: {
    localDialogDowload (value) {
      if (value) {
        this.getFileID()
      }
    }
  },
  computed: {
    ...mapState('dialog', ['dowload', 'dataFileId', 'reportmeet']),
    localDialogDowload: {
      get () {
        return this.dowload
      },
      set (value) {
        this.setDowload(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogReport', 'setDowload']),
    openModeleditroom () {
      this.setDialogReport(false)
    },
    async dowloadFile (fileId) {
      // console.log('vuex report meetinf_id', this.meet_id)
      // console.log('data', headers)
      this.axios
        .get(process.env.VUE_APP_API + '/api/onebox/download/' + fileId, {
          responseType: 'arraybuffer'
        })
        .then(res => {
          // console.log(res)
          const blob = new Blob([res.data], { type: 'application/mp4' })
          const link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.download = fileId + '.mp4'
          link.click()
        })
    },
    async getFileID () {
      // console.log('vuex report meetinf_id', this.meet_id)
      // console.log('data', headers)
      this.axios
        .get(
          process.env.VUE_APP_API +
            '/api/onebox/getoneboxfile/' +
            this.reportmeet
        )
        .then(res => {
          this.dataFileIdIn = res.data.data
          // console.log(res.data.data)
        })
      // console.log('data', this.dataFileIdIn)
    }
  }
}
</script>
