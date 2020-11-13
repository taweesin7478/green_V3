<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6">
        <div style="text-align: left;" class="mb-n12">ชื่อ</div>
      </v-col>
    </v-row>

    <v-form ref="form">
      <v-row class="mb-n8">
      <v-col cols="12" xs="12" sm="12" md="6">
        <v-text-field v-model="name" outlined dense class="border-radius-10"></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" style="display: none;">
        <v-text-field v-model="phonenumber" outlined dense label="Phone number"></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" xs="12" sm="12" md="6">
        <div style="text-align: left;" class="mb-n12">อีเมล</div>
      </v-col>
    </v-row>

    <v-row class="mb-n8">
      <v-col cols="12" xs="12" sm="12" md="6">
        <v-text-field v-model="email" class="border-radius-10" outlined dense disabled></v-text-field>
      </v-col>
    </v-row>

    <v-row v-if="showChangePassword">
      <v-col cols="12" xs="12" sm="12" md="6">
        <p class="text-right mt-n4">
          <v-btn
            text
            style="color: #03429E; padding: 0;"
            @click="hideShowChangePassword"
          >เปลี่ยนรหัสผ่าน</v-btn>
        </p>
      </v-col>
    </v-row>

    <div v-if="!showChangePassword">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6">
          <div style="text-align: left;" class="mb-n12">รหัสผ่านปัจจุบัน</div>
        </v-col>
      </v-row>
      <v-row class="mb-n8">
        <v-col cols="12" xs="12" sm="12" md="6">
          <v-text-field v-model="oldpass" type="password" class="border-radius-10" outlined dense></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6">
          <div style="text-align: left;" class="mb-n12">รหัสผ่านใหม่</div>
        </v-col>
      </v-row>
      <v-row class="mb-n8">
        <v-col cols="12" xs="12" sm="12" md="6">
          <v-text-field dense v-model="newpass" type="password" class="border-radius-10" outlined :rules="passwordRule"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6">
          <div style="text-align: left;" class="mb-n12 border-radius-10" outlined>ยืนยันรหัสผ่านใหม่</div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="6">
          <v-text-field
            dense
            v-model="confirmpass"
            type="password"
            :rules="[rules.confirmPassword]"
            class="border-radius-10"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
    </div>

    <v-row class="mt-n5">
      <v-col cols="12" xs="12" sm="12" md="6">
        <v-btn
          rounded
          color="#20C492"
          style="color:white; padding: 24px; padding-right: 32px; padding-left: 32px;"
          @click="alertConfirmed"
          class="mr-6"
        >ยืนยัน</v-btn>
        <v-btn
          rounded
          outlined
          style="padding: 22px; padding-right: 30px; padding-left: 30px;"
          @click="onCancel"
        >ยกเลิก</v-btn>
      </v-col>
    </v-row>
    </v-form>

    <!-- <v-row no-gutters>
                  <v-col cols="12" sm="12" md="12" class="mt-n3">
                      <v-overflow-btn editable v-model="language" label="ภาษา" :items="dropdown_edit" item-value="text" class="my-2"></v-overflow-btn>
                  </v-col>
    </v-row>-->

    <!-- <v-card-actions>
              <v-spacer></v-spacer>
            <v-btn color="orange" style="color:white;" @click="alertConfirmed">แก้ไข</v-btn>
    </v-card-actions>-->
  </v-container>
</template>

<script>
// import ConfirmedUpdateAccountInfo from '../modal/accountInfo'

export default {
  components: {
    // ConfirmedUpdateAccountInfo
  },
  data () {
    return {
      showChangePassword: true,
      user: [],
      id: null,
      name: null,
      phonenumber: null,
      email: null,
      // language: null,
      avatar: '',
      selectedFile: null,
      oldpass: null,
      newpass: null,
      confirmpass: null,
      passwordRule: [
        // value => !!value || 'Required.',
        v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /([!@$%~])/.test(v) || 'Must have one special character [!@#$%~]'
      ],
      rules: {
        confirmPassword: value => {
          return value === this.newpass || 'Not match Password !'
        }
      }
      // dropdown_edit: [
      //   { text: 'ไทย' },
      //   { text: 'อังกฤษ' }
      // ]
    }
  },
  methods: {
    goPage (link) {
      this.$router.push(link)
    },
    onCancel () {
      this.goPage('/createroom')
    },
    hideShowChangePassword () {
      this.showChangePassword = false
    },
    onFileSelected (event) {
      // console.log(event)
      this.selectedFile = event.target.files[0]
      // console.log(this.selectedFile)
    },
    updatePassword () {
      // console.log('i am here')
      var data = {
        user_id: this.id,
        old_password: this.oldpass,
        new_password: this.newpass
      }
      // http://localhost:9213/backend/api/users/changepassword
      var token = this.$cookies.get('user-token')
      try {
        this.axios
          .put(process.env.VUE_APP_API + '/api/users/changepassword', data, {
            headers: {
              Authorization: 'bearer ' + token
            }
          })
          .then(response => {
            // console.log(response.data)
            if (this.newpass === this.confirmpass) {
              if (response.data.status === 'success') {
                this.$swal('แก้ไขรหัสผ่านสำเร็จแล้ว', '', 'success')
                const encryptedText = this.CryptoJS.AES.encrypt(data.token, 'One Conference').toString()
                this.$cookies.set('user-token', encryptedText, 'default')
                // localStorage.setItem('user-token', response.data.token)
                this.decodeToken()
                window.location.reload()
              } else {
                // console.log(response.data)
                this.$swal('ERROR !', 'รหัสผ่านปัจจุบัน ไม่ถูกต้อง', 'error')
              }
            } else {
              this.$swal('ยืนยันรหัสผ่าน ไม่ตรงกับ รหัสผ่านไหม', 'กรุณากรอก ยืนยันรหัสผ่าน ใหม่อีกครั้ง', 'error')
            }
          })
      } catch (error) {
        console.log(error.message)
      }
    },
    confirmedUpdate () {
      var data = {
        id: this.id,
        name: this.name,
        phonenumber: this.phonenumber
      }
      // http://localhost:9213/api/users/update
      var token = this.$cookies.get('user-token')
      try {
        this.axios
          .put(process.env.VUE_APP_API + '/api/users/update', data, {
            headers: {
              Authorization: 'bearer ' + token
            }
          })
          .then(response => {
            // console.log(response.data)
            if (response.data.status === 'success') {
              // add if password != null call axios '/chanagepassword'
              // if (this.newpass != null) {
              // this.updatePassword()
              // } else {
              this.$swal('แก้ไขชื่อสำเร็จแล้ว.', '', 'success')
              const encryptedText = this.CryptoJS.AES.encrypt(data.token, 'One Conference').toString()
              this.$cookies.set('user-token', encryptedText, 'default')
              // localStorage.setItem('user-token', response.data.token)
              this.decodeToken()
              window.location.reload()
              // }
            } else {
              // console.log('name')
              this.$swal('ERROR !', 'Please, try again', 'error')
            }
          })
      } catch (error) {
        console.log(error.message)
      }
    },
    alertConfirmed () {
      if (this.newpass === null && this.name != null) {
        this.$swal({
          title: 'ยืนยันแก้ไขชื่อ ?',
          text: 'ต้องการแก้ไขข้อมูลชื่อใช่หรือไม่',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก'
        }).then(result => {
          if (result.value) {
            this.confirmedUpdate()
          // this.$swal(
          //   'สำเร็จ !',
          //   'เปลี่ยนข้อมูลบัญชีแล้ว.',
          //   'success'
          // )
          }
        })
      } else {
        this.$refs.form.validate()
        this.$swal({
          title: 'ยืนยันแก้ไขรหัสผ่าน ?',
          text: 'ต้องการแก้ไขข้อมูลรหัสผ่านใช่หรือไม่',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
          cancelButtonText: 'ยกเลิก'
        }).then(result => {
          if (result.value) {
            this.updatePassword()
          // this.$swal(
          //   'สำเร็จ !',
          //   'เปลี่ยนข้อมูลบัญชีแล้ว.',
          //   'success'
          // )
          }
        })
      }
    },
    decodeToken () {
      var d = this.$cookies.get('user-token')
      var base64Url = d.split('.')[1]
      this.datapage = JSON.parse(window.atob(base64Url))
      // console.log('datatoken', this.datapage)
      this.user = this.datapage.users
      // console.log('user', this.datapage.users)
      this.id = this.user._id
      this.name = this.user.name
      this.phonenumber = this.user.phonenumber
      this.email = this.user.email
      this.avatar = this.user.avatar_profile
    }
  },
  created () {
    this.decodeToken()
  }
}
</script>

<style>
.border-radius-10 {
  border-radius: 10px;
}
</style>
