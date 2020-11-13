<template>
  <v-row justify="center">
    <v-dialog v-model="localedit" scrollable max-width="536px">
      <v-card
        min-height="200px"
        style="border-radius: 10px; box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.5);;"
      >
        <v-card-title justify-center style="font-size:28px; margin-auto">
            <v-row>
                <v-col class="text-center">
          EDIT POLLS
          </v-col>
          </v-row>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row >
            <v-col cols="12" md="3" style="font-size:20px" class="pt-4" >
              Topic <span style="color:red">*</span>:
            </v-col>
            <v-col cols="12" md="9">
              <v-text-field
                class="mr-4"
                autofocus
                v-model="topic"
                required
                outlined
                dense
                placeholder="Topic"
                style="font-size: 12px;"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-card outlined v-for="(poll, i) in pollist" :key="i">
            <v-row class="pt-6" no-gutters>
              <v-col cols="12" class="pl-6 pr-6">
                <v-row no-gutters
                  ><v-col cols="12" md="1">{{i+1}}</v-col
                  ><v-col cols="12" md="11" class="ml-n5"
                    ><v-text-field
                      dense
                      outlined
                      placeholder="Question"
                      v-model="poll.content"
                      style="font-size: 12px;"
                    ></v-text-field></v-col
                ></v-row>
                <v-row no-gutters>
                  <v-col cols="12" md="1"></v-col>
                  <v-col cols="12" md="11">
                    <div v-for="(answer, ai) in poll.choice" :key="ai">
                      <v-text-field
                      class="mt-n6"
                      dense
                      outlined
                      placeholder="Answer"
                      v-model="answer.text"
                      style="font-size: 12px;"
                    ></v-text-field>
                    </div>
                    <v-row>
                    <v-col class="mr-1 ml-1 mt-n3">
                      <v-btn
                      class=" float-right"
                      x-small
                      fab
                      dark
                      color="red"
                      @click="deleteChoise(poll.choice, i)">
                      <v-icon dark>mdi-close-circle-outline</v-icon>
                    </v-btn>
                    </v-col>
                      <v-btn
                      class=" float-right mr-1 ml-1"
                      x-small
                      fab
                      dark
                      color="info"
                      @click="addpoll(poll.choice)">
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
          <v-row>
            <v-col cols="12" sm="12" md="12" class="text-center">
              <v-btn
                class="mr-4"
                color="success"
                @click="addquest"
                style="color: white; padding: 25px; border-radius:10px;"
                >Add Question</v-btn
              >
              <v-btn
                class="mr-4"
                color="error"
                @click="delquest"
                style="color: white; padding: 25px; border-radius:10px;"
                >Delete Question</v-btn
              >
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12" md="12">
              <div class="float-right">
                <v-btn style="background-color:#ffffff; border:solid 1px #000000; border-radius:10px;" @click="closedialog"
                  >Close</v-btn
                >
                &nbsp;<v-btn  style="background-color:#086AAB; border-radius:10px; color:white" @click="updatePoll"
                  >Save</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      roomname: '',
      showpass1: false,
      dialogCreate: false,
      topic: '',
      pollist: [],
      jwt: require('jsonwebtoken')
    }
  },
  watch: {
    editpoll (value, oldValue) {
      // console.log('editpolls', value)
      console.log('polist false', this.pollist)
      if (value === true) {
        // console.log('true value')
        this.topic = this.dataedit.topic
        // console.log('data edit', this.dataedit)
        this.pollist = this.dataedit.PollList
        // this.setdata()
        // console.log('polist true', this.pollist)
      }
    }
  },
  computed: {
    ...mapState('dialog', ['editpoll', 'dataedit']),
    localedit: {
      get () {
        return this.editpoll
      },
      set (value) {
        this.setDialogEditPoll(value)
      }
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogEditPoll']),
    chklogin () {
      this.meeting()
    },
    setdata () {
      // this.topic = this.dataedit.PollList[0].content
      // console.log('dataedit', this.dataedit)
      this.pollist = [
        {
          content: '',
          pollid: 1,
          user_votes: [],
          choice: [
            {
              text: '',
              select: false,
              user_answer: []
            },
            {
              text: '',
              select: false,
              user_answer: []
            }
          ]
        }
      ]
      // console.log('pollist', this.pollist)
    },
    goPage (link) {
      this.$router.push(link)
    },
    meeting () {
      this.goPage('/manage')
    },
    addpoll (choises) {
      if (choises.length < 5) {
        choises.push({
          text: '',
          select: false,
          user_answer: []
        })
      }
    },
    async updatePoll () {
    //   console.log('insert')
      const { topic, pollist } = this
      this.axios
        .put(process.env.VUE_APP_API + '/api/votes_manage/update', { topic, pollist })
        .then(res => {
        //   console.log('res', res)
          this.setDialogEditPoll(false)
          if (res.data.status === 'Success') {
            this.$swal(
              res.data.status,
              res.data.message,
              'success'
            )
            // this.$swal(res.data.status, res.data.message, 'success')
          } else {
            this.$swal(
              res.data.status,
              res.data.message,
              'error'
            )
          }
        })
    },
    deleteChoise (choises, i) {
      this.pollist = this.pollist.reduce((result, item, index) => {
        if (index === i) {
          return [
            ...result,
            {
              ...item,
              choice: choises.slice(0, choises.length - 1)
            }
          ]
        }
        return [
          ...result,
          item
        ]
      }, [])
    },
    addquest () {
      this.pollist.push({
        topic: this.topic,
        isSingle: 'single',
        pollid: this.pollid,
        user_vote: this.user_votes,
        content: this.content,
        choice: [
          {
            text: this.text,
            select: this.select,
            user_answer: this.user_answer
          },
          {
            text: this.text,
            select: this.select,
            user_answer: this.user_answer
          }
        ]
      })
    },
    delquest () {
      // var lengths = this.pollist.length
      // console.log('length', lengths)
      this.pollist.pop()
    },
    closedialog () {
      this.setDialogEditPoll(false)
    },
    decodeToken () {
      if (this.$cookies.get('user-token') !== null) {
        var d = this.$cookies.get('user-token')
        var base64Url = d.split('.')[1]
        this.datapage = JSON.parse(window.atob(base64Url))
        // console.log('datatoken', this.datapage)
        // this.user = this.datapage.user
        // console.log('user', this.datapage.user)
        // this.id = this.user._id
        this.room = this.datapage.room
        this.name = this.room.name
        this.option1 = this.room.setting.MuteUserJoin
        this.option2 = this.room.setting.ModeratorApproveBeforeJoin
        this.option3 = this.room.setting.AllowAnyUserStartMeeting
        this.option4 = this.room.setting.AllUserJoinAsModerator
        this.option5 = this.room.setting.SecretRoom
      }
    }
  }
}
</script>

<style lang="css">
.v-dialog {
  border-radius: 10px !important;
  overflow-y: inherit !important;
}

.border-radius-10 {
  border-radius: 10px;
}
.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: #f4f1f1;
}
</style>
