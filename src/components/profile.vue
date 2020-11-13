<template>
  <div>
    <UpperLogin />
    <v-layout align-center justify-center>
      <v-flex>
        <v-row no-gutters align="center" justify="center" style="background-color: rgba(255, 255, 255,0.6)" class="pt-6">
          <v-col cols="12" md="12" xs="12" sm="12" class="text-center">
            <div style="color: #03429E; font-size: 18pt;">แก้ไขข้อมูลส่วนตัว</div>
          </v-col>
        </v-row>
        <v-row no-gutters align="center" justify="center" style="background-color: rgba(255, 255, 255,0.6)" class="pb-6">
          <v-col cols="12" md="6" xs="12" sm="12" class="text-center">
            <Avatar />
          </v-col>
          <v-col cols="12" md="6" xs="12" sm="12" class="text-center">
            <AccountInfo />
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
    <!-- <v-row no-gutters>
        <v-col cols="12" xs="12" sm="12" md="1"></v-col>

        <v-col cols="12" xs="12" sm="12" md="10">
            <div role="tablist" class="mt-2 mb-2">
              <b-card no-body class="mb-2" style="border-radius: 25px; box-shadow: 2px 3px 2px 2px #b0b0b0;">
                <b-card-header header-tag="header" class="p-0" role="tab">
                  <b-button pill block v-b-toggle.accordion-1 variant="info" style="background-image: linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4);">
                      <v-icon left color="white">
                          mdi-account
                      </v-icon>
                      ข้อมูลบัญชี</b-button>
                </b-card-header>
                <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                  <b-card-body>
                    <b-card-text>
                        <AccountInfo />
                    </b-card-text>
                  </b-card-body>
                </b-collapse>
              </b-card>

    <b-card no-body class="mb-2" style="border-radius: 25px; box-shadow: 2px 3px 2px 2px #b0b0b0;">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button pill block v-b-toggle.accordion-2 variant="info" style="background-image: linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4);"><v-icon left color="white">mdi-camera-account</v-icon>
        Upload Avatar</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
              <Avatar />
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

    <b-card no-body class="mb-2" style="border-radius: 25px; box-shadow: 2px 3px 2px 2px #b0b0b0;">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button pill block v-b-toggle.accordion-3 variant="info" style="background-image: linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4);"><v-icon left color="white">mdi-key-variant</v-icon>
        เปลี่ยนรหัสผ่าน</b-button>
      </b-card-header>
      <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-card-text>
              <Password/>
          </b-card-text>
        </b-card-body>
      </b-collapse>
    </b-card>

  </div>

    </v-col>
    <v-col cols="12" xs="12" sm="12" md="1"></v-col>
</v-row> -->
  </div>
</template>

<script>
import UpperLogin from '../views/UpperLogin'
import AccountInfo from '../components/account/accountInfo'
// import Password from '../components/account/password'
// import Profiles from '../components/account/profiles'
import Avatar from '../components/account/avatar'

export default {
  components: {
    UpperLogin,
    AccountInfo,
    // Password,
    // Profiles,
    Avatar
  },
  data () {
    return {

    }
  }
}
</script>
