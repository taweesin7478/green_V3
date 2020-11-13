import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Manage from '../components/manage'
import Profile from '../components/profile'
import Meeting from '../components/meeting'
import Createroom from '../components/createroom'
import Join from '../components/join'
import otp from '../components/modal/otp'
import otpmail from '../components/modal/otpmail'
import otpmail2 from '../components/modal/otpmail2'
import lobypage from '../components/modal/lobypage'
import joinuserrole from '../components/joinuserrole'
import citizenrole from '../components/startCitizen'
import MeetingNoLogin from '../components/MeetingNoLogin'
import OnemailJoin from '../components/onemailJoin'
import Lobby from '../components/lobby'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/joinold',
    name: 'join',
    component: Join
  },
  {
    path: '/createroom',
    name: 'createroom',
    component: Createroom
  },
  {
    path: '/meeting',
    name: 'meeting',
    component: Meeting
  },
  {
    path: '/manage',
    name: 'manage',
    component: Manage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/managemain.vue'),
    // beforeEnter: (to, from, next) => {
    //   var token = localStorage.getItem('user-token')
    //   // console.log('token: ' + token)
    //   if (token === null) {
    //     next({ name: 'Home' })
    //   } else next()
    // },
    children: [
      { path: '/', component: Manage },
      { path: '/join', component: otpmail },
      { path: '/joinsecret', component: otpmail2 },
      { path: '/otp', component: otp },
      { path: '/lobypage', component: lobypage },
      { path: '/joinuserrole', component: joinuserrole },
      { path: '/citizenrole', component: citizenrole },
      { path: '/lobby', component: Lobby }
    ]
  },
  {
    path: '/report',
    name: 'Report',
    component: () => import(/* webpackChunkName: "about" */ '../views/reportSchedue.vue')
  },
  {
    path: '/pathify',
    name: 'Pathify',
    component: () => import('../components/testpathify')
  },
  {
    path: '/meetingnologin',
    name: 'MeetingNoLogin',
    component: () => import('../views/main.vue'),
    children: [
      { path: '/', component: MeetingNoLogin },
      { path: '/onemailjoin', component: OnemailJoin }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
