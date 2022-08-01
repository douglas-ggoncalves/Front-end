<template>
  <v-app>
    <v-app-bar app color="primary" style="z-index: 201" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary style="z-index: 202; top: 0; width: 256px; height: 100%;">
      <v-list nav dense>
        <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">   

          <a href="/">
            <v-list-item>
              <span class="mr-2">Página Inicial</span>
            </v-list-item>
          </a>
          
          <a href="/transacoes/receitas">
            <v-list-item>
              <span class="mr-2">Receitas</span>
            </v-list-item>
          </a>

          <a href="/transacoes/despesas">
            <v-list-item>
              <span class="mr-2">Despesas</span>
            </v-list-item>
          </a>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
  
  
</template>

<script>
import "./assets/style/style.css"

export default {
  name: "App",
  data(){
    return {
      drawer: false,
      group: null,
    }
  },
  watch: {
    group () {
      this.drawer = false
    },
  }
};
</script>