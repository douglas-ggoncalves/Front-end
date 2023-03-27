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
        <input type="file" id="archivoExcel" value="../assets/js/myfoodapediadata/Food_Display_Table.xlsx" @change="subirExcel()">

        <v-btn color="success" @click="descarExcel()">
          Download
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="message"
          :append-icon="'mdi-magnify'"
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

//import scrypt from '../assets/js/scrypt.js'
import readXlsFile from "read-excel-file";
import exportFromJSON from "export-from-json";

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data (){
    return{
      message: '',
      foodName: '',
      items: []
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
    },
    subirExcel(){
      /*const input = document.getElementById("archivoExcel");

      readXlsFile(input.files[0]).then((rows) => {
        this.items = rows;
      })*/

      
    },

    descarExcel(){
      const data = this.items;
      const fileName = "download";
      const exportType = exportFromJSON.types.json

      exportFromJSON({ data, fileName, exportType })
    }
  },

  mounted(){
    readXlsFile("../assets/js/myfoodapediadata/Food_Display_Table.xlsx").then((rows) => {
      this.items = rows;
      console.log("itens " + this.items)
    })
  }
}
</script>

