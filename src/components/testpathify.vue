<template>
  <v-container>
  <v-row>
    <v-col>
      <form>
        <input required type="text" v-model="form.f_name" />
        <br />
        <input required type="text" v-model="form.lname" />
        <br />
        <button type="submit" @click="addTodo()">Add Todo</button>
      </form>
      <div v-for="(tod, index) in todo" :key="index" @click="removeTodo(index)">
        <p>
          {{ index + 1 }}. {{ tod.fname }} <span>{{ tod.lname }}</span>
        </p>
      </div>
    </v-col>
  </v-row>
  </v-container>
</template>
<script>
import { sync, call } from 'vuex-pathify'
export default {
  computed: {
    ...sync('todo/*')
  },
  methods: {
    ...call('todo/*')
  }
}
</script>
