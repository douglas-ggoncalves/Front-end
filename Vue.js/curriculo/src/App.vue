<template>
  <v-container class="grey lighten-5" :fluid="true">


    <v-row class="mb-6" no-gutters>
      <v-col :md="2" style="height: 100vh;">
      
        <div style="height: 5vh">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </div>

        <v-card height="95vh" width="256" class="ml-auto" v-model="drawer" >
          <v-navigation-drawer id="navegationBar" v-model="drawer" style="box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;">
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

            <v-divider></v-divider>

            <v-list
              dense
              nav
            >
              <v-list-item
                v-for="item in items"
                :key="item.title"
                link>
                <a :href="item.title">

                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
                  
                </a>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </v-card>
      </v-col>

      <v-col :md="10" style="border: 1px solid black">
        <router-view />
      </v-col>
    </v-row>

  </v-container>
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
