<template>
   <div class="app">
     <apexchart width="550" type="line" :options="chartOptions" :series="dataRec.series"></apexchart>
     <div>
       <button @click="updateChart">Update!</button>
    </div>
   </div>

</template>

<script>

import Vue from 'vue'
import VueApexCharts from 'vue-apexcharts'

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
export default {
  data(){
    return {
      chartOptions: {
        chart: {
          id: 'vuechart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      dataRec: {
        series: [{
          name: 'series-1',
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }]
      }
      
    }
  },
  methods: {
    updateChart() {
   /*   const max = 90;
      const min = 20;
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min
      })
*/
      var newData = [20, 7, 9, 8, 13, 18, 9, 2]
      console.log(newData)
      console.log(this.dataRec.series[0].data)


      const colors = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random()*colors.length)]]
      };
      // In the same way, update the series option
      this.dataRec.series = [{
        data: newData
      }]
    }
  }
}
</script>
