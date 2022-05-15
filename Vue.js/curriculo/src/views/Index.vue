<template>
  <v-app>
      <v-main>
        <v-container>Hello world</v-container>
      </v-main>
    </v-app>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)
export default new Vuetify({
  theme: { dark: true },
})


</script>
