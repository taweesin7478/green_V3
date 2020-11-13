<template>
  <v-layout align-center justify-center style="border-radius: 20px; border: 1px solid #f5f5f5;box-shadow: 5px 2px 5px 5px #ebebeb;" class="p-1 mr-4">
    <v-flex>
      <v-row no-gutters align="center">
        <v-col cols="12" md="8" xs="12" sm="12" class="pb-6">
          <video width="100%" height="100%" style="border-radius: 20px;">
            Your browser does not support the video tag.
          </video>
        </v-col>
        <v-col cols="12" md="4" xs="12" sm="12" class="text-center">
          <v-row no-gutters>
            <v-col cols="12" md="12" xs="12" sm="12">
              <div style="font-size: 28px;">การประชุมพร้อมแล้ว</div>
              <div class="mt-1">{{ urlJoin }}</div>
            </v-col>
          </v-row>
            <v-row no-gutters
              class="mt-6"
              align="center"
              justify="space-around">
              <v-col cols="12" md="6" xs="12" sm="12" class="pb-6 pt-6" align="right" v-show="!$vuetify.breakpoint.xs">
                <v-btn
                  @click="startConference"
                  color="#006000"
                  class="pt-7 pb-7"
                  style="color: #FFFFFF; padding: 24px; font-size: 14pt; border-radius:10px;"
                >
                <v-icon class="pr-1">mdi-archive-arrow-up-outline</v-icon>
                  เข้าร่วมประชุม
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" xs="12" sm="12" align="left" class="pl-2" v-show="!$vuetify.breakpoint.xs">
                <v-btn
                  class="pt-7 pb-7 pl-7 pr-7"
                  @click="closeVideo()"
                  style="color: black; padding: 24px; font-size: 14pt; border-radius:10px; "
                >
                  <v-icon class="pr-1">mdi-arrow-left-box</v-icon>
                    กลับหน้าหลัก
                </v-btn>
              </v-col>
              <!-- xs -->
              <v-col cols="12" md="6" xs="12" sm="12" class="pb-6 pt-6" align="center" v-show="$vuetify.breakpoint.xs">
                <v-btn
                  @click="startConference"
                  color="#006000"
                  class="pt-7 pb-7"
                  style="color: #FFFFFF; padding: 24px; font-size: 14pt; border-radius:10px;"
                >
                <v-icon class="pr-1">mdi-archive-arrow-up-outline</v-icon>
                  เข้าร่วมประชุม
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" xs="12" sm="12" align="center" class="pl-2" v-show="$vuetify.breakpoint.xs">
                <v-btn
                  class="pt-7 pb-7 pl-7 pr-7"
                  @click="closeVideo()"
                  style="color: black; padding: 24px; font-size: 14pt; border-radius:10px; "
                >
                  <v-icon class="pr-1">mdi-arrow-left-box</v-icon>
                    กลับหน้าหลัก
                </v-btn>
              </v-col>
              <!-- xs -->
            </v-row>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  mounted () {
    this.getMedia()
  },
  data () {
    return {
      mediaStream: null,
      // url: this.$cookies.get('meetUrl'),
      datapage: '',
      jwt: require('jsonwebtoken'),
      urlJoin: ''
    }
  },
  methods: {
    getMedia () {
      // Prefer camera resolution nearest to 1280x720.
      var constraints = { audio: true, video: { width: 1280, height: 720 } }
      const vm = this
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (mediaStream) {
          var video = document.querySelector('video')
          vm.mediaStream = mediaStream
          video.srcObject = mediaStream
          //   console.log(mediaStream)
          //   console.log(video.srcObject)
          video.onloadedmetadata = function (e) {
            video.play()
          }
        })
        .catch(function (err) {
          console.log(err.name + ': ' + err.message)
        }) // always check for errors at the end.
    },
    goPage (link) {
      this.$router.push(link).catch(() => {})
    },
    closeVideo () {
      if (this.mediaStream) {
        this.mediaStream.getTracks().forEach(function (track) {
          track.stop()
        })
        this.goPage('/')
      }
    },
    startConference () {
      window.open(this.$cookies.get('meetUrl'), '_self')
    },
    ckuuId () {
      if (this.$route.query.uuid !== undefined) {
        this.urlJoin = process.env.VUE_APP_DOMAIN + '/join/?uuid=' + this.$route.query.uuid
      } else {
        this.urlJoin = process.env.VUE_APP_DOMAIN + '/join/?uuid=' + this.datapage.room.uid
      }
    },
    decodejwt () {
      if (this.$cookies.get('user-token') !== null) {
        this.d = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(this.d, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        this.datapage = data
        // console.log('datapage', this.datapage)
      }
    }
  },
  beforeDestroy () {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(function (track) {
        track.stop()
      })
    }
  },
  created () {
    this.decodejwt()
    this.ckuuId()
  }
}
</script>
