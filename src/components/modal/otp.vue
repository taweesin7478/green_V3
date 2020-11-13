<template>
  <div>
    <div
      class="pt-5 pb-10"
      no-gutters
      style="background-color: rgba(255, 255, 255,0.6);border-radius:36px;padding:10px;"
    >
      <v-col
        cols="12"
        md="12"
        sm="12"
        xs="12"
        style="padding-top:40px"
        class="mb-n12"
      >
        <v-row class="mt-n1">
          <v-col class="text-center mt-n1">
            <p style="color:#000000; font-size:40px">OTP Code</p>
          </v-col>
        </v-row>
        <v-row class="mt-n5">
          <v-col class="text-center">
            <span style="color:#525151; font-size:28px" class="text-center">
              Please enter the OTP code from ONE Chat Application before</span
            >
            <br />
            <span style="color:#525151; font-size:28px">
              entering the meeting.
            </span>
            <!-- <v-row class="text-center mr-12 ml-12">
            <v-col class="text-center mr-12 ml-12">
                  <div>
                    <v-otp-input style="display: flex; flex-direction: row;"
                      ref="otpInput"
                      input-classes="otp-input"
                      class="text-center"
                      separator="-"
                      :num-inputs="6"
                      @on-change="handleOnChange"
                      @on-complete="handleOnComplete"
                  /></div>
                  </v-col>
                  </v-row> -->
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="12" md="3"></v-col>
          <v-col
            class="text-center"
            cols="12"
            md="6"
            xs
          >
            <!-- <div class="float-right" style="margin-center: 100px; border: 1px solid;" > -->
            <v-otp-input
              ref="otpInput"
              input-classes="otp-input"
              class="text-center "
              separator="-"
              :num-inputs="6"
              @on-change="handleOnChange"
              @on-complete="handleOnComplete"
            />
            <!-- </div> -->
            <!-- <v-otp-input @keypress="filterKey" outlined v-model="otp1" maxLength="1" ></v-otp-input> -->
          </v-col>
        </v-row>
        <v-row class="text-center">
          <!--  -->
          <!-- <v-col cols="12" md="4"></v-col> -->
          <v-col cols="12" md="12" sm="10" xs="10">
            <div>
              <v-btn
                large
                class="no-uppercase border-radius-10 "
                style="font-size: 20px;"
                @click="handleClearInput"
              >
                Resend
              </v-btn>
              <v-btn
                large
                color="success"
                class="ma-2 white--text no-uppercase border-radius-10"
                style="font-size: 20px;"
                @click="checkotp"
              >
                Join
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row class="text-center">
          <v-row>
            <v-col>
              <span style="font-size: 50px;">
                BOT QR CODE
              </span>
            </v-col>
          </v-row>
          <v-row class="text-center mt-n5">
            <v-col>
              <span style="font-size: 18px;">
                on ONE chat
              </span>
            </v-col>
          </v-row>
          <v-col class="text-center mt-n6">
            <img
              width="250px"
              height="250px"
              src="@/assets/bot_OneConference.png"
            />
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      numInputs: {
        default: 6
      },
      d: '',
      datapage: '',
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      otp5: '',
      otp6: '',
      jwt: require('jsonwebtoken')
    }
  },
  created () {
    this.decodejwt()
  },
  methods: {
    handleOnComplete (value) {
      // console.log('OTP completed: ', value)
    },
    handleOnChange (value) {
      this.otp1 = value
    },
    handleClearInput () {
      this.sendotp()
      this.$refs.otpInput.clearInput()
    },
    filterKey (e) {
      const key = e.which ? e.which : e.keyCode
      // If is '.' key, stop it
      if (key > 31 && (key < 48 || key > 57)) {
        return e.preventDefault()
      }
    },
    autotab (current, to) {
      // console.log('autotab')
      if (
        current.getAttribute &&
        current.value.length === current.getAttribute('maxlength')
      ) {
        to.focus()
      }
    },
    decodejwt () {
      if (this.$cookies.get('user-token') !== null) {
        this.d = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(this.d, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        this.datapage = data
        // console.log('datapage', this.datapage)
        this.sendotp()
      }
    },
    async sendotp () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API +
            '/api/otp/sendotp/' +
            this.datapage.user.oneid,
          {
            headers: {
              Authorization:
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVjb25mZXJlbmNlIiwibmFtZSI6Im9uZWNvbmZlcmVuY2VAaW5ldCEiLCJpYXQiOjE1MTYyMzkwMjJ9.76dYYbFS1Hlv9vfu2hZ31a3qwA4p_5jYuLqYiBiHPmw'
            }
          }
        )
        // this.roominfo = data
        // console.log('data', data.status)
        if (data.status === 'Success') {
          // window.open(data.url, '_self')
          // console.log('checksessionroom: success')
        } else {
          // this.$router.push('/otp/?uuid=' + this.$route.query.uuid)
          // console.log('checksessionroom: fail')
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', error.message, 'error')
        console.log('error', error.message)
      }
    },
    async checkotp () {
      try {
        var { data } = await this.axios.post(
          process.env.VUE_APP_API +
            '/api/otp/checkotp/' +
            this.datapage.user.oneid +
            '/' +
            this.otp1
        )
        // this.roominfo = data
        // console.log('datacheck', data)
        if (data.status === 'Success') {
          this.$router.push('/joinsecret/?uuid=' + this.$route.query.uuid)
          // console.log('checksessionroom: success')
        } else {
          this.$swal('ผิดพลาด!', data.message, 'error')
          this.handleClearInput()
          // this.$router.push('/otp/?uuid=' + this.$route.query.uuid)
          // console.log('checksessionroom: fail')
        }
      } catch (error) {
        this.$swal('ผิดพลาด!', 'please input otp !!!', 'error')
        console.log('error', error.message)
      }
    }
  }
}
</script>
<style>
.otp-input {
  width: 100%;
  height: 150%;
  padding: 5%;
  font-size: 25px;
  border-radius: 10%;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input.error {
  border: 1px solid red !important;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-uppercase {
  text-transform: none;
}
</style>
