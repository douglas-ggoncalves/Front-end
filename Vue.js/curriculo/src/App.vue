<template>
  <v-theme-provider root>
    <v-container class="" :fluid="true">
      <v-app-bar elevation="4">
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-toolbar-title>Douglas Gonçalves</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="selectView('Início')">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </template>
          <span>Início</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="selectView('Sobre')">
              <v-icon>mdi-account</v-icon>
            </v-btn>
          </template>
          <span>Sobre</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="selectView('Portfólio')">
              <v-icon>mdi-briefcase</v-icon>
            </v-btn>
          </template>
          <span>Portfólio</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="selectView('Contato')">
              <v-icon>mdi-message</v-icon>
            </v-btn>
          </template>
          <span>Contato</span>
        </v-tooltip>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list dense nav>

          <div id="divImage" style="">
            <div app>
              <span>DG</span>
            </div>
            <hr>
          </div>

          <v-list-item-group
            active-class="deep-purple--text text--accent-4"
            id="listItens"
          >
            <v-list-item
              v-for="item in items"
              :key="item.title"
              :id="item.title"
              @click="selectView(item.title)"
              link
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-row no-gutters id="asdsad">
        <v-col :sm="12">
          <v-app app id="inspire">
            <v- dark flat>
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
            <Index :select="viewSelected" v-on:alterViewEmit="alterViewEmit($event)"/>

          </v-app>
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify/lib";
import Index from "./views/Index.vue";

import "./assets/css/style.css";
Vue.use(Vuetify);
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      items: [
        { title: "Início", icon: "mdi-home" },
        { title: "Sobre", icon: "mdi-account" },
        { title: "Portfólio", icon: "mdi-briefcase" },
        { title: "Contato", icon: "mdi-message" },
      ],
      right: null,
      viewSelected: "Início",
    };
  },
  methods: {
    selectView(element) {
      if (element == "Início") {
        this.viewSelected = "Início";
      }
      if (element == "Sobre") {
        this.viewSelected = "Sobre";
      }
      if (element == "Portfólio") {
        this.viewSelected = "Portfólio";
      }
      if (element == "Contato") {
        this.viewSelected = "Contato";
      }
    },
    alterViewEmit(element){
      this.viewSelected = element;
    }
  },
  components: {
    Index,
  },
};
</script>