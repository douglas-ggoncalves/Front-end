<template>
  <div id="content">
    <v-container class="" :fluid="true" v-if="select == 'Início'" id="containerIndex">
      <v-row id="Início" no-gutters>
        <v-col :sm="6">
          <div>
            <h2>
              Olá, meu nome é <span id="name">Douglas Gonçalves</span>
            </h2>
          </div>

          <div>
            <h3>Eu sou um desenvolvedor 
              <span class="typed-text">{{ typeValue }}</span>
              <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
            </h3>

            Eu sou um desenvolvedor ...

            <v-btn
              rounded
              color="primary"
              @click="alterViewEmit()"
            >
              Saiba Mais
            </v-btn>
          </div>
        </v-col>
<!-- 
        <v-col :sm="6">
          <div class="container">
            <h1>Coding is
              <span class="typed-text">{{ typeValue }}</span>
              <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
            </h1>
          </div>
        </v-col>
        -->
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

import '../assets/js/scrypt.js'
Vue.use(Vuetify)

export default({
  data(){
    return{
      typeValue: '',
      typeStatus: false,
      typeArray: ['Full Stack', 'Web', 'Autodidata'], 
      typingSpeed: 200,
      erasingSpeed: 100,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 0
    } 
  },
  methods:{
    alterViewEmit(){
      this.$emit('alterViewEmit', 'Início')
    },
    typeText() {
      if(this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if(!this.typeStatus)
          this.typeStatus = true;
          this.typeValue += this.typeArray[this.typeArrayIndex].charAt(this.charIndex);
          this.charIndex += 1;
          setTimeout(this.typeText, this.typingSpeed);
      }
      else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if(this.charIndex > 0) {
        if(!this.typeStatus)
          this.typeStatus = true;
          this.typeValue = this.typeArray[this.typeArrayIndex].substring(0, this.charIndex - 1);
          this.charIndex -= 1;
          setTimeout(this.eraseText, this.erasingSpeed);
      }
      else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if(this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
          setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    }
  },
  props: {
    select: String
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
  }
})


</script>
