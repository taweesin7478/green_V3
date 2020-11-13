<template>
  <v-app>
    <!-- <v-main style="background-image: linear-gradient(to right, #20C492, #0BAABD , #03429E);"> -->
    <v-main>
      <router-view />
      <!-- test branch -->
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {},

  data: () => ({
    user: []
  }),
  methods: {
    goPage (link) {
      this.$router.push(link).catch(() => {})
    },
    chkHasToken () {
      if (this.$route.name !== 'join') {
        this.goPage('/')
      }
    }
  },
  created () {
    // this.chkHasToken()
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&family=Sarabun:wght@300&display=swap');

html,
body {
  font-family: 'Roboto', 'Sarabun', sans-serif;
  @font-face {
    font-family: 'Sarabun', sans-serif;
    unicode-range: U+0E00-U+0E7F;
  }
}

#app {
  font-family: 'Roboto', 'Sarabun', sans-serif;
  @font-face {
    font-family: 'Sarabun', sans-serif;
    unicode-range: U+0E00-U+0E7F;
  }
}
.v-card__text::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.v-card__text::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* Handle */
.v-card__text::-webkit-scrollbar-thumb {
  background: lightgray;
  border-radius: 10px;
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #ccc8c0;
}
</style>
