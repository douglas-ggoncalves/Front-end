<template>
  <v-container class="homeView">
    <v-row>
      <v-col v-for="form in formsPagt" :key="form.id" :cols="3">
        <v-tooltip bottom>
          
          <template v-slot:activator="{ on, attrs }">
            <div class="elements" v-bind="attrs" v-on="on">
              <div class="left">
                <span>{{ form.title }}</span>
                <br>
                <span class="value">R$ 00.00</span>
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
    
    <v-row class="mt-5 pt-5" align="center">
      <v-col class="d-flex justify-center" :cols="12">
        <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
      </v-col>

      <v-col class="d-flex justify-center" :cols="12">
        <v-btn color="primary" @click="teste()">
          Primary
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
    
</template>

<script>
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
import "../assets/style/style.css"
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

export default {
  data(){
    return {
      formsPagt:[
        { id: 1, title: 'Saldo Atual', desc: 'Saldo atual de sua conta', icon: 'mdi-cash' },
        { id: 2, title: 'Receitas', desc: 'Valor total de suas receitas cadastradas', icon: 'mdi-arrow-up'  },
        { id: 3, title: 'Despesas', desc: 'Valor total de suas despesas cadastradas', icon: 'mdi-arrow-down' },
        { id: 4, title: 'Cartão de crédito', desc: 'Valor total de suas contas pagas com cartão de crédito', icon: 'mdi-credit-card'  },
      ],
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000]
        }
      },
      series: [
      {
        name: 'Entradas',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 92, 24]
      },
      {
        name: 'Saídas',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 92, 97]
      }]
    }
  }, methods:{
    teste(){
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (90 - 20 + 1)) + 20
      })
      
      Vue.set(this.series, 0, {data: newData})
    }
    
  }
}
</script>
