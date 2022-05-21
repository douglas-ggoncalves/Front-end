<template>
  <v-theme-provider root>
    <v-container class="" :fluid="true">
      <v-row class="mb-6" no-gutters>

        <v-col :sm="2" style="height: 100vh">
          <v-card height="5vh">
            <v-app-bar-nav-icon
              @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
          </v-card>

          <v-card height="95vh" width="256" class="">
            <!-- width="256" -->
            <v-navigation-drawer
              id="navegationBar"
              v-model="drawer"
              permanent
              style="
                border: 1px solid red;
                box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
                  0px 2px 2px 0px rgb(0 0 0 / 14%),
                  0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
                background: none !important;
              "
            >
              <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link>
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          </v-card>
        </v-col>

        <v-col :sm="10">
          <v-app app id="inspire" style="border: 1px solid red">
            <v- dark flat height="5vh">
              <v-toolbar flat>
                <v-switch
                  v-model="$vuetify.theme.dark"
                  inset
                  label="Trocar Tema"
                  persistent-hint
                  class="ml-auto"
                ></v-switch>
              </v-toolbar>
            </v->
            <router-view />
          </v-app>
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify/lib";

import "./assets/css/style.css";

Vue.use(Vuetify);
export default {
  name: "App",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home" },
        { title: "Sobre", icon: "mdi-account" },
        { title: "Portfolio", icon: "mdi-briefcase" },
        { title: "Contato", icon: "mdi-message" },
      ],
      right: null,
    };
  },
};
</script>
