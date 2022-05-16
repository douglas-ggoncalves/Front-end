<template>
  <v-app>
    teste
      <v-main>

        <button @click="color('black')" style="border: 1px solid black; padding 0.5rem 0.7rem; margin: 1rem">
          Preto
        </button>
        
        <button style="border: 1px solid black; padding 0.5rem 0.7rem; margin: 1rem">
          Vermelho
        </button>
        
       
      </v-main>
    </v-app>
</template>



<script>
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default({
  data(){
    return{
      teste: 'Variável'
    }
  },
  methods:{
    color(color){
      if(color == 'black'){
        if(this.$vuetify.theme.dark == true ){
          this.$vuetify.theme.dark = false
        } else{
          this.$vuetify.theme.dark = true
        }
      }
    }
  }
})

</script>


