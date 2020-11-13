<template>
      <v-dialog v-model="localDialog" min-width="295px" min-height="149px" max-width="400px">
        <v-card
          min-height="149px"
          min-width="295px"
          class="border-radius-10"
        >
        <v-card-title>
          Edit Profile
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="2" sm="12" xs="12">
              <v-avatar class="profile" size="40">
                <!-- <v-img :src="user.avatar_profile" v-model="avatar"></v-img> -->
                <v-img :src="avatar" v-model="avatar"></v-img>
              </v-avatar>
              <input type="file" accept="image/*" @change="onFileSelected" style="font-size: 12pt; display: none;" ref="avatarInput" />
            </v-col>
            <v-col cols="12" md="6" sm="12" xs="12">
              <v-btn text class="p-0 m-0 no-uppercase" height="0" min-width="0" @click="$refs.avatarInput.click()">Upload Picture</v-btn>
            <br/>
            <v-btn text class="p-0 m-0 no-uppercase" height="0" min-width="0" @click="clearSelectedFile">Remove</v-btn>
              </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" class="no-uppercase" style="border-radius: 10px;" width="80px" height="36px" @click="alertConfirmed" v-show="avatar">Save</v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>

      <!-- <v-row>
        <v-col cols="12" sm="12" md="12" xs="12" style="text-align: center;">
          <span style="color:red;">* รูปภาพขนาดไม่เกิน 1 MB</span><br/><br/>
          <v-avatar class="profile" size="120" @click="$refs.avatarInput.click()">
            <v-img :src="avatar" v-model="avatar"></v-img>
          </v-avatar>
          <br/><br/> กดที่รูปเพื่ออัปโหลดรูปภาพ
        </v-col>
      </v-row>

      <v-row >
        <v-col cols="12" sm="12" md="12 " style="text-align: center; display: none;">
          <input type="file" accept="image/*" @change="onFileSelected" style="font-size: 12pt;" ref="avatarInput" />
        </v-col>
        <v-col cols="12" sm="12" md="12 " style="text-align: center;">
          <v-btn color="#03429E" rounded style="color: white; padding: 20px; padding-left: 40px; padding-right: 40px;" @click="alertConfirmed">แก้ไขรูปภาพ</v-btn>
        </v-col>
      </v-row> -->

          <!-- <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="primary" @click="alertConfirmed">Upload</v-btn>
          </v-card-actions> -->

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    // ConfirmedUpdateAccountInfo
  },
  data () {
    return {
      user: [],
      id: null,
      avatar: '',
      selectedFile: null,
      jwt: require('jsonwebtoken')
    }
  },
  methods: {
    ...mapActions('dialog', ['setDialogProfile']),
    onFileSelected (event) {
      // console.log(event)
      this.selectedFile = event.target.files[0]
      // console.log(this.selectedFile)
      const file = event.target.files[0]
      this.avatar = URL.createObjectURL(file)
    },
    uploadPhoto () {
      const fd = new FormData()
      fd.append('avatar', this.selectedFile, this.selectedFile.name)
      fd.append('user_id', this.id)
      // const headers = {
      //   Authorization: 'Bearer ' + localStorage.getItem('user-token')
      // }
      // http://localhost:9213/api/avatar/pictureprofile
      this.axios.post(process.env.VUE_APP_API + '/api/avatar/pictureprofile', fd).then(res => {
        if (res.data.status === 'success') {
          this.$swal('Successfully changed profile picture.', '', 'success')
          const encryptedText = this.CryptoJS.AES.encrypt(res.data.token, 'One Conference').toString()
          this.$cookies.set('user-token', encryptedText, 'default')
          // localStorage.setItem('user-token', res.data.token)
          this.decodeToken()
          window.location.reload()
        } else if (res.data.error === 'invalid file') {
          this.$swal('Incorrect ! Filename Extension', 'Please, select filename extension of photo', 'warning')
        }
      })
    },
    alertConfirmed () {
      this.$swal({
        title: 'Confirm update profile picture ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.uploadPhoto()
        }
      })
    },
    decodeToken () {
      if (this.$cookies.get('user-token') !== null) {
        var d = this.$cookies.get('user-token')
        const decryptedText = this.CryptoJS.AES.decrypt(d, 'One Conference').toString(this.CryptoJS.enc.Utf8)
        var data = this.jwt.decode(decryptedText)
        // var base64Url = d.split('.')[1]
        // this.datapage = JSON.parse(window.atob(base64Url))
        // console.log('datatoken', this.datapage)
        this.user = data.user
        // console.log('user', this.datapage.user)
        this.id = this.user._id
        // this.avatar = this.user.avatar_profile
      }
    },
    clearSelectedFile () {
      // this.avatar = this.user.avatar_profile
      this.avatar = ''
    }
  },
  created () {
    this.decodeToken()
  },
  computed: {
    ...mapState('dialog', ['profile']),
    localDialog: {
      get () {
        return this.profile
      },
      set (value) {
        this.setDialogProfile(value)
      }
    }
  }
}
</script>

<style>
.no-uppercase {
  text-transform: none;
}
.border-radius-10 {
  border-radius: 10px;
}
</style>
