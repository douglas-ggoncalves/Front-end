<template>
  <v-container id="index" fluid>
    <v-row id="headerRow">
      <v-col cols="12">
        <h5>Dieta e Controle de Peso</h5>
        <h2>Contador de Calorias</h2>
      </v-col>

      <v-col cols="12" id="images">
        <span class="mdi mdi-fish"></span>

        <span class="mdi mdi-food-apple"></span>

        <span class="mdi mdi-food-drumstick"></span>

        <span class="mdi mdi-fruit-watermelon"></span>

        <v-divider></v-divider>
      </v-col>
    </v-row>

    <v-row id="dataRow">
      <v-col cols="12">
        <h2>Procurar Comida</h2>

        <v-text-field
          v-model="foodName"
          label="Informe o nome do alimento."
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row id="selectFoodRow">
      <v-col cols="12">
        <h2>Selecione uma Comida</h2>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="message"
          :append-icon="'mdi-magnify'"
          :prepend-icon="icon"
          filled
          clear-icon="mdi-close-circle"
          clearable
          label="Descrição do Alimento."
          type="text"
          @click:clear="clearMessage"
          @click:append="searchData"
          
        ></v-text-field>
      </v-col>

     
    </v-row>
  </v-container>
</template>

<script>
import '../assets/style/style.css'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data (){
    return{
      message: ''
    }
  },
  methods: {
    searchData () {
      if(this.message.trim() == ""){
        alert("Informe a descrição do alimento antes de pesquisar.");
        return;
      }
    },
    clearMessage () {
      this.message = ''
    }
  },
}
</script>

