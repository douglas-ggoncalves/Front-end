<template>
  <div>
    <v-container class="" :fluid="true" v-if="select == 'Início'">
      <v-row class="mb-6" no-gutters>
        <v-col :sm="6">
          <div>
            Olá, meu nome é <span style="font-weight: bold">Douglas Gonçalves</span>
          </div>

          <div>
            <h3>Eu sou um desenvolvedor full stack</h3>

            Eu sou um desenvolvedor web ...
          </div>
        </v-col>
      </v-row>
    </v-container>
    
    <v-container class="" :fluid="true" v-if="select == 'Sobre'">
      <v-row class="mb-6" no-gutters>
        <v-col :sm="12">
          View da aba sobre ainda não criada
        </v-col>
      </v-row>
    </v-container>
    
    <v-container class="" :fluid="true" v-if="select == 'Portfólio'">
      <v-row class="mb-6" no-gutters>
        <v-col :sm="12">
          View da aba portfólio ainda não criada
        </v-col>
      </v-row>
    </v-container>
    
    <v-container class="" :fluid="true" v-if="select == 'Contato'">
      <v-row class="mb-6" no-gutters>
        <v-col :sm="12">
          View da aba contato ainda não criada
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>



<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
Vue.use(Vuetify)

export default({
  data(){
    return{

    }
  },
  methods:{
   
  },
  props: {
    select: String
  }
})

</script>

