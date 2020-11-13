<template>
    <v-footer color="#086aab">
      <v-row no-gutters class="pt-6 pb-6" align-items="center">
        <v-col cols="12" md="1" xs="12" sm="12"></v-col>
        <v-col cols="12" md="3" xs="12" sm="12" v-show="!$vuetify.breakpoint.xs">
          <v-img src="@/assets/logobottom.png" max-width="178px" max-height="86px"></v-img>
        </v-col>
        <v-col cols="12" md="3" xs="12" sm="12" v-show="$vuetify.breakpoint.xs">
          <div align="center"><v-img src="@/assets/logobottom.png" max-width="178px" max-height="86px"></v-img></div>
        </v-col>
        <v-col cols="120" md="1" xs="12" sm="12" v-show="!$vuetify.breakpoint.xs">
          <div style="transform: rotate(-90deg); position: absolute; padding-top: 70px; margin-left: -100px;">
            <span style="font-size: 20px; color: white;">..................</span>
          </div>
        </v-col>
        <v-col cols="12" md="4" xs="12" sm="12" v-show="$vuetify.breakpoint.xs" class="text-center pt-6 pb-4">
          <div>
            <v-icon color="white" width="18px" height="18px" class="mt-n2">mdi-map-marker</v-icon>
            <span style="font-size: 20px; font-weight: bold; color:white;">บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน)</span>
          </div>
          <div>
            <span style="font-size: 13px; color: white;">
              1768 อาคารไทยซัมมิท ทาวเวอร์ ชั้น 10 - 12 และ IT
            </span>
          </div>
          <div>
            <span style="font-size: 13px; color: white;">
              ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง
            </span>
          </div>
          <div>
            <span style="font-size: 13px; color: white;">
              กรุงเทพมหานคร 10310
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="4" xs="12" sm="12" v-show="!$vuetify.breakpoint.xs">
          <div class="ml-n6">
            <v-icon color="white" width="18px" height="18px" class="mt-n2">mdi-map-marker</v-icon>
            <span class="pl-2" style="font-size: 20px; font-weight: bold; color:white;">บริษัท อินเทอร์เน็ตประเทศไทย จำกัด (มหาชน)</span>
          </div>
          <div class="ml-n6">
            <span style="font-size: 13px; color: white;" class="pl-8">
              1768 อาคารไทยซัมมิท ทาวเวอร์ ชั้น 10 - 12 และ IT
            </span>
          </div>
          <div class="ml-n6">
            <span style="font-size: 13px; color: white;" class="pl-8">
              ถนนเพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง
            </span>
          </div>
          <div class="ml-n6">
            <span style="font-size: 13px; color: white;" class="pl-8">
              กรุงเทพมหานคร 10310
            </span>
          </div>
        </v-col>
        <v-col cols="12" md="2" xs="12" sm="12" v-show="$vuetify.breakpoint.xs" class="text-center">
          <div class="pb-2">
            <v-icon color="white">mdi-email</v-icon><span style="color: white; font-size:15px;" class="pl-2">noc@inet.co.th</span>
          </div>
          <div>
            <v-icon color="white">mdi-phone</v-icon><span style="color: white; font-size:15px;" class="pl-2">02 257 7127</span>
          </div>
        </v-col>
        <v-col cols="12" md="2" xs="12" sm="12" v-show="!$vuetify.breakpoint.xs">
          <div class="pb-2">
            <v-icon color="white">mdi-email</v-icon><span style="color: white; font-size:15px;" class="pl-2">noc@inet.co.th</span>
          </div>
          <div>
            <v-icon color="white">mdi-phone</v-icon><span style="color: white; font-size:15px;" class="pl-2">02 257 7127</span>
          </div>
        </v-col>
        <v-col cols="12" md="1" xs="12" sm="12"></v-col>
      </v-row>
    </v-footer>
</template>
