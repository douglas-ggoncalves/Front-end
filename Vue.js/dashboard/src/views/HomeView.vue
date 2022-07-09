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
      <v-col :cols="6">
        <h4>Receitas por Categoria</h4>
        <div class="dash">
          <div v-if="!hasRec">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>
              Você ainda não possui receitas.
            </h5>
          </div>
          <div v-if="hasRec">
            <apexchart width="380" type="donut" :options="optionsDonutRec" :series="seriesDonutRec"></apexchart>
          </div>
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
      allFormsPagt:[],
      totalRecSalary: 0,
      totalRecInvest: 0,
      totalRecEmp: 0,
      totalRecOut: 0,
      hasRec: false,
      optionsDonutRec: {
        labels: []
      },
      seriesDonutRec: [],
    }
  },
  created(){
    this.allFormsPagt = scrypt.allFormsPagt;

    /* Receitas */
    this.allFormsPagt[1].categories = scrypt.recCategories;
    
    this.allFormsPagt[1].data = [
      {idDategory: 0, value: 55.56}, 
      {idDategory: 1, value: 14.56}, 
      {idDategory: 2, value: 4.46},
      {idDategory: 3, value: 12.00},

      /*{idDategory: 1, value: 4.46},
      {idDategory: 2, value: 4.46},
      {idDategory: 3, value: 4.46},*/
    ]

    this.allFormsPagt[1].data.forEach(element => {
      this.hasRec = true

      if(element.idDategory == 0){
        this.totalRecSalary += element.value
        if(this.totalRecSalary > 0){
          this.seriesDonutRec = [this.totalRecSalary]
        }
      }
      if(element.idDategory == 1){
        this.totalRecInvest += element.value
        if(this.totalRecInvest > 0){
          this.seriesDonutRec.push(element.value)
        }
      }
      if(element.idDategory == 2){
        this.totalRecEmp += element.value
        if(this.totalRecEmp > 0){
          this.seriesDonutRec.push(element.value)
        }
      }
      if(element.idDategory == 3){
        this.totalRecOut += element.value
        if(this.totalRecOut > 0){
          this.seriesDonutRec.push(element.value)
        }
      }
    })

    scrypt.recCategories.forEach(element => {
      if(element.title == 'Salário'){
        if(this.totalRecSalary > 0){
          this.optionsDonutRec.labels.push(element.title)
        }
      }

      if(element.title == 'Investimentos'){
        if(this.totalRecInvest > 0){
          this.optionsDonutRec.labels.push(element.title)
        }
      }
      
      if(element.title == 'Empréstimos'){
        if(this.totalRecEmp > 0){
          this.optionsDonutRec.labels.push(element.title)
        }
      }
      
      if(element.title == 'Outros'){
        if(this.totalRecOut > 0){
          this.optionsDonutRec.labels.push(element.title)
        }
      }

    })
      console.log(this.optionsDonutRec)
      console.log(this.seriesDonutRec)

      
    //this.seriesDonutRec = [this.totalRecSalary, this.totalRecInvest, this.totalRecEmp, this.totalRecOut]
    /* Fim Receitas */
  }
}
</script>
