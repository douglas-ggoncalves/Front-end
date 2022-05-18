<template>
<v-theme-provider root>
  <v-container class="" :fluid="true">

    <v-row class="mb-6" no-gutters>
      <v-col :md="2" style="height: 100vh;">
        <v-card height="5vh" >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-card>
      

        <v-card height="95vh" width="100%" class="ml-auto" v-model="drawer" > <!-- width="256" -->
          <v-navigation-drawer id="navegationBar" v-model="drawer" style="border: 1px solid red;box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important; background: none !important">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  Application
                </v-list-item-title>
                <v-list-item-subtitle>
                  subtext
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
        </v-navigation-drawer>
      </v-card>asd

      <v-main>
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</v-theme-provider>

</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import './assets/css/style.css'

Vue.use(Vuetify)

export default {
  name: "App",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Photos", icon: "mdi-image" },
        { title: "About", icon: "mdi-help-box" },
      ],
      right: null,
    };
  },
};
</script>
