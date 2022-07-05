<template>
  <v-row class="mt-5" align="center">
    <v-col class="d-flex justify-center" :cols="12">
      <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
    </v-col>

    <v-col class="d-flex justify-center" :cols="12">
      <v-btn color="primary" @click="teste()">
        Primary
      </v-btn>
    </v-col>
  </v-row>
    
</template>

<script>
import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

export default {
  data(){
    return {
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          //categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
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
