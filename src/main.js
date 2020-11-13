import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate'
import vuetify from './plugins/vuetify'
import Dialog from 'vue-dialog-loading'
import OtpInput from '@bachdgvn/vue-otp-input'
import VueOtp2 from 'vue-otp-2'
import 'vue2-timepicker/dist/VueTimepicker.css'
import VueCookies from 'vue-cookies'
import VueCryptojs from 'vue-cryptojs'
import * as io from 'socket.io-client'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueCryptojs)

Vue.use(VueCookies)

Vue.use(VueOtp2)

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io('https://oneconference-new.inet.co.th')
  })
)

Vue.component('v-otp-input', OtpInput)

const otpToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvbmVjb25mZXJlbmNlIiwibmFtZSI6Im9uZWNvbmZlcmVuY2VAaW5ldCEiLCJpYXQiOjE1MTYyMzkwMjJ9.76dYYbFS1Hlv9vfu2hZ31a3qwA4p_5jYuLqYiBiHPmw'

axios.interceptors.request.use(async (config) => {
  const token = Vue.$cookies.get('user-token')
  if (!config.url.includes('loginoneid')) {
    if (config.url.includes('/api/otp/sendotp/')) {
      config.headers = { ...config.headers, Authorization: 'Bearer ' + otpToken }
    } else if (config.url.includes('/api/otp/checkotp/')) {
      config.headers = { ...config.headers, Authorization: 'Bearer ' + otpToken }
    } else if (config.url.includes('/api/v1/oneconf/service/checkroom') || config.url.includes('/api/v1/oneconf/service/joinroom') || config.url.includes('/api/v1/oneconf/service/createsession')) {
    } else if (token) {
      var jwt = require('jsonwebtoken')
      const jwtToken = Vue.CryptoJS.AES.decrypt(token, 'One Conference').toString(Vue.CryptoJS.enc.Utf8)
      var dataToken = jwt.decode(jwtToken)
      var dateNow = Math.floor(Date.now() / 1000)
      // var date2 = Math.floor(new Date().setUTCMinutes(45) / 1000)
      // console.log('exp1: ', dataToken.exp)
      // console.log('exp2: ', date)
      if (dateNow > dataToken.exp) {
        Vue.$cookies.remove('user-token')
        Vue.swal('WARNING !', 'Token expired, please sign in', 'warning')
        window.location.href = '/'
      } else {
        config.headers = { ...config.headers, Authorization: 'Bearer ' + jwtToken }
      }
    }
  }
  return config
})

Vue.use(Dialog, {
  dialogBtnColor: '#0f0'
})
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuelidate)
Vue.use(Vuex)

Vue.prototype.eventBus = new Vue()

Vue.prototype.$multiwatch = function (props, watcher) {
  var iterator = function (prop) {
    this.$watch(prop, watcher)
  }
  props.forEach(iterator, this)
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
