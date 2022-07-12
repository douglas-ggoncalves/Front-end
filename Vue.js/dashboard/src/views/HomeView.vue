<template>
  <v-container class="homeView">
    <v-row>
      <v-col v-for="form in allFormsPagt" :key="form.id" :cols="3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="elements" v-bind="attrs" v-on="on">
              <div class="left">
                <span>{{ form.title }}</span>
                <br>
                <span class="value">R$ 00,00</span>
              </div>
              
              <div class="right">
                <span>
                  <v-icon :class="{
                  iGreen: form.title == 'Receitas',
                  iRed: form.title == 'Despesas',
                  iBlue: form.title == 'Saldo Atual',
                  iOrange: form.title == 'Cartão de crédito',}">{{ form.icon }}</v-icon>
                </span>
              </div>
            </div>
            
          </template>
          <span>{{ form.desc }}</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row class="reports">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Nova Receita</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="dataRec.newRecValue" label="Informe o Valor *" hint="informe a descrição desejada" required> 
                    <v-icon slot="prepend">
                      mdi-cash-multiple
                    </v-icon>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field label="Descrição" type="text" hint="informe a descrição desejada" required>
                    <v-icon slot="prepend">
                      mdi-file
                    </v-icon>
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select v-model="dataRec.newRecSelect" :items="[this.allFormsPagt[1].categories[0].title, this.allFormsPagt[1].categories[1].title
                  , this.allFormsPagt[1].categories[2].title,
                  , this.allFormsPagt[1].categories[3].title]" label="Categoria *" required>
                  <v-icon slot="prepend">
                    mdi-label
                  </v-icon></v-select>
                </v-col>
              </v-row>
            </v-container>
            <small>* indica campo obrigatório</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="newRec()">Cadastrar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col :cols="6">
        <v-btn color="blue darken-1" text @click="newRec()">Cadastrar</v-btn>

        <h4>Receitas por Categoria</h4>
        <div class="dash">
          <div v-if="!dataRec.hasRec">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>
              Você ainda não possui receitas.
            </h5>
          </div>

          <div v-if="dataRec.hasRec">
            <apexchart class="" id="apexDonutRec" width="380" type="donut" :options="options" :series="series" :showForZeroSeries="false" ></apexchart>
          </div>
        </div>

        <div>
         <v-btn class="ma-2" rounded color="success" @click="dialog = true">
            Cadastrar Receita
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import "../assets/style/style.css"
import scrypt from "../assets/js/scrypt.js"
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

export default {
  data(){
    return {
      dialog: false,
      allFormsPagt:[],
      dataRec: {
        indexs:[],
        totalRecSalary: 0,
        totalRecInvest: 0,
        totalRecEmp: 0,
        totalRecOut: 0,
        newRecValue: 0,
        newRecSelect: '',
        hasRec: false,

      },
      options: {
        showForZeroSeries: false,
        formatter: function (val) {
          return val + "%"
        },
          labels: ['Salário', 'Investimentos', 'Empréstimos', 'Outros'],
        },
        series: [],
    }
  },
  created(){
    this.allFormsPagt = scrypt.allFormsPagt;
    /* Receitas */
    this.allFormsPagt[1].categories = scrypt.recCategories;
    
    this.allFormsPagt[1].data = [
      {idDategory: 0, value: 7.56}, 
      {idDategory: 1, value: 14.56}, 
      {idDategory: 1, value: 14.56}, 
      {idDategory: 2, value: 4.46},
      {idDategory: 2, value: 8.46},
      /*{idDategory: 3, value: 12.00},
      {idDategory: 1, value: 4.46},
      {idDategory: 2, value: 4.46},
      {idDategory: 3, value: 4.46}*/
    ]

    this.allFormsPagt[1].data.forEach(element => {
      this.dataRec.hasRec = true

      if(element.idDategory == 0){
        this.dataRec.totalRecSalary = parseFloat((this.dataRec.totalRecSalary + element.value).toFixed(2)); 
      }

      if(element.idDategory == 1){
        this.dataRec.totalRecInvest = parseFloat((this.dataRec.totalRecInvest + element.value).toFixed(2)); 
      }

      if(element.idDategory == 2){
        this.dataRec.totalRecEmp = parseFloat((this.dataRec.totalRecEmp + element.value).toFixed(2)); 
      }
      if(element.idDategory == 3){
        this.dataRec.totalRecOut = parseFloat((this.dataRec.totalRecOut + element.value).toFixed(2)); 
      }
    })

    this.series = [this.dataRec.totalRecSalary, this.dataRec.totalRecInvest, this.dataRec.totalRecEmp, this.dataRec.totalRecOut]
    /* Fim Receitas */
  },
  mounted(){
    if(this.dataRec.totalRecSalary == 0){
      document.getElementById("apexDonutRec").classList.add("one")
    }
    if(this.dataRec.totalRecInvest == 0){
      document.getElementById("apexDonutRec").classList.add("two")
    }
    if(this.dataRec.totalRecEmp == 0){
      document.getElementById("apexDonutRec").classList.add("three")
    }
    if(this.dataRec.totalRecOut == 0){
      document.getElementById("apexDonutRec").classList.add("four")
    }
  },
  methods:{
    newRec(){
      this.dataRec.hasRec = true
      
      Vue.set(this.series, 0, parseFloat(this.dataRec.newRecValue) + this.dataRec.totalRecSalary)
    }
  }
}
</script>

