import Vue from 'vue'
import Vuex from 'vuex'
import pathify, { make } from 'vuex-pathify'
import todo from './todo'

const state = {}
const mutations = make.mutations(state)

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [pathify.plugin],
  state,
  mutations,
  actions: {},
  modules: {
    todo,
    dialog: {
      state: {
        editpoll: false,
        signup: false,
        signin: false,
        forgot: false,
        profile: false,
        setting: false,
        registerComplete: false,
        scheduleMeeting: false,
        submitForgotPassword: false,
        roomSetting: false,
        shareMeeting: false,
        addPolls: false,
        editroom: false,
        delroom: false,
        dataedit: [],
        email: '',
        displayName: '',
        reportSchedue: false,
        reportmeet: '',
        roleUser: '',
        manageActive: false,
        datarditroom: null,
        reportvote: '',
        dowload: false
      },
      mutations: {
        SET_DIALOG_REPORTVOTE: (state, payload) => {
          state.reportvote = payload
        },
        SET_DIALOG_DATAEDIT: (state, payload) => {
          state.datarditroom = payload
        },
        SET_DIALOG_SIGNUP: (state, payload) => {
          state.signup = payload
        },
        SET_DIALOG_DOWLOAD: (state, payload) => {
          state.dowload = payload
        },
        SET_DIALOG_REPORTMEET: (state, payload) => {
          state.reportmeet = payload
        },
        SET_DIALOG_REPORTSCHEDUE: (state, payload) => {
          state.reportSchedue = payload
        },
        SET_USER_ROLE: (state, payload) => {
          state.roleUser = payload
        },
        SET_MANAGE_ACTIVE: (state, payload) => {
          state.manageActive = payload
        },
        SET_DIALOG_EDITPOLL: (state, payload) => {
          state.editpoll = payload
        },
        SET_DIALOG_EMAIL: (state, payload) => {
          state.email = payload
        },
        SET_DATA_EDIT: (state, payload) => {
          state.dataedit = payload
        },
        SET_DIALOG_SIGNIN: (state, payload) => {
          state.signin = payload
        },
        SET_DIALOG_FORGOT: (state, payload) => {
          state.forgot = payload
        },
        SET_DIALOG_PROFILE: (state, payload) => {
          state.profile = payload
        },
        SET_DIALOG_SETTING: (state, payload) => {
          state.setting = payload
        },
        SET_DIALOG_REGISTERCOMPLETE: (state, payload) => {
          state.registerComplete = payload
        },
        SET_DIALOG_SCHEDULEMEETING: (state, payload) => {
          state.scheduleMeeting = payload
        },
        SET_DIALOG_SUBMITFORGOTPASSWORD: (state, payload) => {
          state.submitForgotPassword = payload
        },
        SET_DIALOG_ROOMSETTING: (state, payload) => {
          state.roomSetting = payload
        },
        SET_DIALOG_SHAREMEETING: (state, payload) => {
          state.shareMeeting = payload
        },
        SET_DIALOG_ADDPOLLS: (state, payload) => {
          state.addPolls = payload
        },
        SET_DIALOG_EDITROOM: (state, payload) => {
          state.editroom = payload
        },
        SET_DIALOG_DELROOM: (state, payload) => {
          state.delroom = payload
        },
        SET_DISPLAY_NAME: (state, payload) => {
          state.displayName = payload
        }
      },
      actions: {
        setDialogdataedit ({ commit }, payload) {
          commit('SET_DIALOG_DATAEDIT', payload)
        },
        setDialogReport ({ commit }, dialog) {
          commit('SET_DIALOG_REPORTSCHEDUE', dialog)
          // commit('SET_DIALOG_REPORTMEET', mid)
        },
        setMeetingIdReport ({ commit }, payload) {
          commit('SET_DIALOG_REPORTMEET', payload)
        },
        setIdReportvote ({ commit }, payload) {
          commit('SET_DIALOG_REPORTVOTE', payload)
        },
        setDowload ({ commit }, payload) {
          commit('SET_DIALOG_DOWLOAD', payload)
        },
        setUserRole ({ commit }, payload) {
          commit('SET_USER_ROLE', payload)
        },
        setManageActive ({ commit }, payload) {
          commit('SET_MANAGE_ACTIVE', payload)
        },
        setDialogSignin ({ commit }, payload) {
          commit('SET_DIALOG_SIGNIN', payload)
          commit('SET_DIALOG_SIGNUP', false)
          commit('SET_DIALOG_FORGOT', false)
        },
        setDialogSignup ({ commit }, payload) {
          commit('SET_DIALOG_SIGNUP', payload)
          commit('SET_DIALOG_SIGNIN', false)
          commit('SET_DIALOG_FORGOT', false)
        },
        setDialogForgot ({ commit }, payload) {
          commit('SET_DIALOG_FORGOT', payload)
          commit('SET_DIALOG_SIGNIN', false)
        },
        setDialogProfile ({ commit }, payload) {
          commit('SET_DIALOG_PROFILE', payload)
        },
        setDialog ({ commit }, payload) {
          commit('SET_DIALOG_PROFILE', payload)
        },
        setDialogSetting ({ commit }, payload) {
          commit('SET_DIALOG_SETTING', payload)
        },
        setDialogRegisterComplete ({ commit }, payload) {
          commit('SET_DIALOG_REGISTERCOMPLETE', payload)
          commit('SET_DIALOG_SIGNUP', false)
        },
        setDialogScheduleMeeting ({ commit }, payload) {
          commit('SET_DIALOG_SCHEDULEMEETING', payload)
        },
        setDialogSubmitForgotPassword ({ commit }, payload) {
          commit('SET_DIALOG_SUBMITFORGOTPASSWORD', payload)
          commit('SET_DIALOG_FORGOT', false)
        },
        setDialogRoomSetting ({ commit }, payload) {
          commit('SET_DIALOG_ROOMSETTING', payload)
        },
        setDialogShareMeeting ({ commit }, payload) {
          commit('SET_DIALOG_SHAREMEETING', payload)
        },
        setDialogAddPolls ({ commit }, payload) {
          commit('SET_DIALOG_ADDPOLLS', payload)
        },
        setDialogEditPoll ({ commit }, payload) {
          commit('SET_DIALOG_EDITPOLL', payload)
        },
        setManageEditDataPoll ({ commit }, payload) {
          commit('SET_DATA_EDIT', payload)
        },
        setDialogeditroom ({ commit }, payload) {
          commit('SET_DIALOG_EDITROOM', payload)
        },
        setDialogdelroom ({ commit }, payload) {
          commit('SET_DIALOG_DELROOM', payload)
        },
        setDataEmail ({ commit }, payload) {
          commit('SET_DIALOG_EMAIL', payload)
        },
        setDisplayName ({ commit }, payload) {
          commit('SET_DISPLAY_NAME', payload)
        }
      },
      namespaced: true
    }
  }
})
