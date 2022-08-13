<template>
  <v-container fluid class="homeView px-sm-10">
    <v-snackbar top min-width="50%" color="success" v-model="dataRec.snackbarNewRec" :timeout="5000">
      Receita cadastrada com sucesso

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col class="col" v-for="form in allFormsPagt" :key="form.id" :cols="12" :sm="6" :lg="4">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="elements" v-bind="attrs" v-on="on">
              <a v-if="form.title == 'Saldo Atual'" :href="`#`" style="">
                <div class="left">
                  <span>{{ form.title }}</span>
                  <br>
                  <span class="value">R$ {{ someAll() }}</span>
                </div>
                
                <div class="right">
                  <span>
                    <v-icon class="iBlue">{{ form.icon }}</v-icon>
                  </span>
                </div>
              </a>
              
              <a v-else :href="`transacoes/${form.slug}`" style="">
                <div class="left">
                  <span>{{ form.title }}</span>
                  <br>
                  <span v-if="form.title == 'Receitas'" class="value">R$ {{ calcRec() }}</span>
                  <span v-else class="value">R$ {{ calcExp() }}</span>
                </div>
                
                <div class="right">
                  <span>
                    <v-icon :class="{
                    iGreen: form.title == 'Receitas',
                    iRed: form.title == 'Despesas'}">{{ form.icon }}</v-icon>
                  </span>
                </div>
              </a>
            </div>
          </template>
          <span>{{ form.desc }}</span>
        </v-tooltip>
      </v-col>
    </v-row>

    <v-row class="reports">
      <v-col class="dash" :cols="12" :md="6">
        <h4>Receitas por Categoria</h4>

        <div id="first">
          <div v-if="!dataRec.hasRec">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>
              Você ainda não possui receitas.
            </h5>
          </div>

          <div class="divDash" v-if="dataRec.hasRec">
            <apexchart class="" id="apexDonutRec" height="350" type="donut" :options="dataRec.optionsDonut" :series="dataRec.series"></apexchart>
          </div>
        </div>
      </v-col>

      <v-col class="dash" :cols="12" :md="6">
        <h4>Despesas por Categoria</h4>
        
        <div id="first">
          <div v-if="!dataExp.hasExp">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>
              Você ainda não possui despesas.
            </h5>
          </div>

          <div class="divDash" v-if="dataExp.hasExp">
            <apexchart class="" height="350" id="apexDonutExp" type="donut" :options="dataExp.optionsDonut" :series="dataExp.seriesDonut"></apexchart>
          </div>
        </div>
      </v-col>
      
      <v-col class="dash" id="divLineIndex" :cols="12" :md="6">
        <h4>Estatísticas por Ano</h4>
        
        <div id="first">
          <div v-if="!dataExp.hasExp">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>
              Você ainda não possui despesas.
            </h5>
          </div>

          <div class="divDash" v-if="dataExp.hasExp" style="">
            <v-select style="z-index: 12;" v-model="yearSelected" :items="arrayYears" menu-props="auto" label="Select" hide-details :prepend-inner-icon="'mdi-calendar-range'" single-line/>
            <apexchart class="" height="350" id="" type="line" :options="data.new555" :series="data.series"></apexchart>
          </div>
        </div>
      </v-col>

      <v-col class="dash" :cols="12" :sm="8" :md="3">
        <h4>Entradas e Saídas</h4>
        
        <div id="first">
          <div class="divDash">
            <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateRecAndExpsFormated" readonly :prepend-inner-icon="'mdi-calendar'" label="Informe o Mês *" hint="informe a data desejada" v-bind="attrs" v-on="on" ></v-text-field>
              </template>
              
              <v-date-picker v-model="dateRecAndExps" type="month" no-title @input="menu2 = false" locale="pt"></v-date-picker>
            </v-menu>
            <div v-if="!dataAll.hasDate">
              <v-icon>mdi-chart-donut</v-icon>
              <br>
              <h5>
                Você não possui movimentações no mês selecionado.
              </h5>
            </div>
            <apexchart class="" id="dashExpAndRecs" :width="200" :height="dataAll.height" type="bar" :options="dataAll.plotOptions" :series="dataAll.series"></apexchart>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import scrypt from "../assets/js/scrypt.js"
import VueApexCharts from 'vue-apexcharts'

import "../assets/style/style.css"
import money from  'vuejs-money'

Vue.use(money)

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
export default {
  data(){
    return {
      yearSelected: '',
      arrayYears: [],
      data: {
        series: [],
        new555: {
          chart: {
            width: '100%',
            type: 'line',
            toolbar: {
              show: false,
            }, 
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#1AD174', '#F05847'],
          stroke: {
            width: [5, 5],
            curve: 'straight',
            dashArray: [8, 8]
          },
          legend: {
            tooltipHoverFormatter: function(val, opts) {
              return val + ' R$ ' + (Math.round(opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] * 100) / 100).toFixed(2).replace(".",",") 
            }
          },
          marReckers: {
            size: 0,
            hover: {
              sizeOffset: 6
            }
          },
          xaxis: {
            categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return 'R$ ' + (Math.round(val * 100) / 100).toFixed(2).replace(".",",");
              }
            }
          },
          grid: {
            borderColor: '#f1f1f1',
          }
        },
      },
      dateRecAndExps: new Date().toISOString().substr(0, 7),
      dateRecAndExpsFormated: this.formatMonth(new Date().toISOString().substr(0, 7)),
      menu: false,
      modal: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      dateCalendar: '',
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      dialog: false,
      allFormsPagt:[],
      dataAll: {
        height: 200,
        hasDate: false,
        series: [{
          name: 'Receitas',
          data: [44]
        }, {
          name: 'Despesas',
          data: [76]
        }],
        plotOptions: {
          colors: ['#1AD174', '#F05847'],
          tooltip: {
            enabled: true,
             y: {
              formatter: function (val) {
                return 'R$ ' + (Math.round(val * 100) / 100).toFixed(2).replace(".",",");
              },
              title: {
                formatter : function(){
                  return 'Total:'
                } 
              }
            }
          },
          bar: {
            horizontal: false,
            columnWidth: '10%',
            endingShape: 'rounded'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 10,
            colors: ['transparent']
          },
          xaxis: {
            categories: ['Janeiro'],
            labels: {
              show: false
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false,
            },
            crosshairs: {
              show: false
            }
          },
          grid: {
            show: false
          },
          yaxis: {
            show: false,
          },
          chart: {
            toolbar: {
              show: false,
            }
          },
        }
      },
      dataExp: {
        total: 0,
        totalExpHouse: 0,
        totalExpInvestEduc: 0,
        totalExpInvestElet: 0,
        totalExpLaz: 0,
        totalExpOut: 0,
        totalExpRest: 0,
        totalExpSau: 0,
        totalExpServ: 0,
        totalExpSup: 0,
        newExpValue: '0',
        newExpSelect: '',
        newExpDesc: '',
        hasExp: false,
        error: false,
        msgError: '',
        msgSuccess: '',
        snackbarNewExp: false,
        seriesDonut: [],
        optionsDonut: {
          chart: {
            width: '100%',
          },
          colors: 
            ['#2E93fA', '#66DA26', '#546E7A', '#986CDF', '#FF9800', '#29D9D5', '#FFC107', '#FF0000', '#000000']
          ,
          tooltip: {
            enabled: true,
             y: {
              formatter: function (val) {
                return 'R$ ' + (Math.round(val * 100) / 100).toFixed(2).replace(".",",");
              }
            }
          },
          show: true,
          showForZeroSeries: false,
          formatter: function (val) {
            return val + "%"
          },
          legend:{
            position: 'bottom'
          },
          labels: ['Casa', 'Educação', 'Eletrônicos', 'Lazer', 'Outros', 'Restaurante', 'Saúde', 'Serviços', 'Supermercado'],
        }
      },
      dataRec: {
        indexs:[],
        total: 0,
        totalRecSalary: 0,
        totalRecInvest: 0,
        totalRecEmp: 0,
        totalRecOut: 0,
        newRecValue: '0',
        newRecSelect: '',
        newRecDesc: '',
        hasRec: false,
        error: false,
        msgError: '',
        optionsDonut: {
          chart: {
            width: '100%',
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: function (val) {
                return 'R$ ' + (Math.round(val * 100) / 100).toFixed(2).replace(".",",");
              }
            }
          },
          show: true,
          showForZeroSeries: false,
          formatter: function (val) {
            return val + "%"
          },
          legend:{
            position: 'bottom'
          },
          labels: ['Salário', 'Investimentos', 'Empréstimos', 'Outros'],
        },
        series: [],
        snackbarNewRec: false,
      },
    }
  },
  created(){
    this.allFormsPagt = scrypt.allFormsPagt;

    if(window) {
      this.allFormsPagt[1].data = JSON.parse(localStorage.getItem('dataRec'))
      this.allFormsPagt[2].data = JSON.parse(localStorage.getItem('dataExp'))

      if(this.allFormsPagt[1].data != null){
        this.allFormsPagt[1].data.forEach(element => {
          this.dataRec.hasRec = true

          if(element.idCategory == 0){
            this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, element.value)
          }
          if(element.idCategory == 1){
            this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, element.value)
          }
          if(element.idCategory == 2){
            this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, element.value)
          }
          if(element.idCategory == 3){
            this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, element.value)
          }
        })
      }

      if(this.allFormsPagt[2].data != null){
        this.configDataExp();
      }
      this.dataRec.series = [this.dataRec.totalRecSalary, this.dataRec.totalRecInvest, this.dataRec.totalRecEmp, this.dataRec.totalRecOut]

      this.dataExp.seriesDonut = [this.dataExp.totalExpHouse, this.dataExp.totalExpInvestEduc, this.dataExp.totalExpInvestElet, this.dataExp.totalExpLaz, this.dataExp.totalExpOut,
       this.dataExp.totalExpRest, this.dataExp.totalExpSau, this.dataExp.totalExpServ, this.dataExp.totalExpSup]
      this.configRecXExps();
      this.createArrayData();
      this.configDataLine(this.yearSelected);
    } 
  },
  mounted(){
    this.configShowDonut();
  },
  methods:{
    configDataLine(date){
      var janRec = 0;
      var fevRec = 0;
      var marRec = 0;
      var abrRec = 0;
      var mayRec = 0;
      var junRec = 0;
      var julRec = 0;
      var augRec = 0;
      var setRec = 0;
      var outRec = 0;
      var novRec = 0;
      var dezRec = 0;
      
      if(this.allFormsPagt[1].data != null){
        this.allFormsPagt[1].data.forEach(element => {
          var [year, month] = element.date.split('-')
          if(year == date){
            if(month == '01'){
              janRec = this.round(janRec, element.value)
            } else if(month == '02'){
              fevRec = this.round(fevRec, element.value)
            } else if(month == '03'){
              marRec = this.round(marRec, element.value)
            } else if(month == '04'){
              abrRec = this.round(abrRec, element.value)
            } else if(month == '05'){
              mayRec = this.round(mayRec, element.value)
            } else if(month == '06'){
              junRec = this.round(junRec, element.value)
            } else if(month == '07'){
              julRec = this.round(julRec, element.value)
            } else if(month == '08'){
              augRec = this.round(augRec, element.value)
            } else if(month == '09'){
              setRec = this.round(setRec, element.value)
            } else if(month == '10'){
              outRec = this.round(outRec, element.value)
            } else if(month == '11'){
              novRec = this.round(novRec, element.value)
            } else if(month == '12'){
              dezRec = this.round(dezRec, element.value)
            }
          }
        })
      }

      var janExp = 0;
      var fevExp = 0;
      var marExp = 0;
      var abrExp = 0;
      var mayExp = 0;
      var junExp = 0;
      var julExp = 0;
      var augExp = 0;
      var setExp = 0;
      var outExp = 0;
      var novExp = 0;
      var dezExp = 0;
      
      if(this.allFormsPagt[2].data != null){
        this.allFormsPagt[2].data.forEach(element => {
          var [year, month] = element.date.split('-')
          if(year == date){
            if(month == '01'){
              janExp = this.round(janExp, element.value)
            } else if(month == '02'){
              fevExp = this.round(fevExp, element.value)
            } else if(month == '03'){
              marExp = this.round(marExp, element.value)
            } else if(month == '04'){
              abrExp = this.round(abrExp, element.value)
            } else if(month == '05'){
              mayExp = this.round(mayExp, element.value)
            } else if(month == '06'){
              junExp = this.round(junExp, element.value)
            } else if(month == '07'){
              julExp = this.round(julExp, element.value)
            } else if(month == '08'){
              augExp = this.round(augExp, element.value)
            } else if(month == '09'){
              setExp = this.round(setExp, element.value)
            } else if(month == '10'){
              outExp = this.round(outExp, element.value)
            } else if(month == '11'){
              novExp = this.round(novExp, element.value)
            } else if(month == '12'){
              dezExp = this.round(dezExp, element.value)
            }
          }
        })
      }

      
      var newDataRec = [janRec, fevRec, marRec, abrRec, mayRec, junRec, julRec, augRec, setRec, outRec, novRec, dezRec]
      var newDataExp = [janExp, fevExp, marExp, abrExp, mayExp, junExp, julExp, augExp, setExp, outExp, novExp, dezExp]

      this.data.series = [{ name: 'Receitas', data: newDataRec }, { name: 'Despesas', data: newDataExp }]
    },
    createArrayData(){
      var currentYear = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10).split('-')[0]
      this.yearSelected = parseInt(currentYear)

      var minYear = parseInt(currentYear) - 100;
      var maxYear = parseInt(currentYear) + 100;
      for(var x = minYear; x <= maxYear; x++){
        if(this.arrayYears == []){
          this.arrayYears = x
        } else{
          this.arrayYears.push(x)
        }
      }
    },
    generateData(){
      if(this.dataRec.newRecSelect == 'Salário'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Salário'

        this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, this.convertMoneyFloat(this.dataRec.newRecValue));
        
        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 0, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecSalary}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 0, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        Vue.set(this.dataRec.series, 0, this.dataRec.totalRecSalary)
      }
      
      if(this.dataRec.newRecSelect == 'Investimentos'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Investimentos'

        this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, this.convertMoneyFloat(this.dataRec.newRecValue));

        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 1, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecInvest}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 1, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        Vue.set(this.dataRec.series, 1, this.dataRec.totalRecInvest)
      }
      
      if(this.dataRec.newRecSelect == 'Empréstimos'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Empréstimos'

        this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, this.convertMoneyFloat(this.dataRec.newRecValue));

        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 2, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecEmp}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 2, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        Vue.set(this.dataRec.series, 2, this.dataRec.totalRecEmp)
      }
      
      if(this.dataRec.newRecSelect == 'Outros'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Outros'

        this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, this.convertMoneyFloat(this.dataRec.newRecValue));

        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 3, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecOut}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 3, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        Vue.set(this.dataRec.series, 3, this.dataRec.totalRecOut)
      }
    },
    round(num, num2){
      if(num2){
        return (Math.round((num + parseFloat(num2)) * 100) / 100);
      }

      if(!num2){
        return (Math.round(num * 100) / 100);
      }
    },
    configShowDonut(){
      var elementExist = document.getElementById("apexDonutExp")

      if(elementExist){
        if(this.dataExp.totalExpHouse != 0){
          document.getElementById("apexDonutExp").classList.add("one")
        } else{
          document.getElementById("apexDonutExp").classList.remove("one")
        }

        if(this.dataExp.totalExpInvestEduc != 0){
          document.getElementById("apexDonutExp").classList.add("two")
        } else{
          document.getElementById("apexDonutExp").classList.remove("two")
        }

        if(this.dataExp.totalExpInvestElet != 0){
          document.getElementById("apexDonutExp").classList.add("three")
        } else{
          document.getElementById("apexDonutExp").classList.remove("three")
        }
        
        if(this.dataExp.totalExpLaz != 0){
          document.getElementById("apexDonutExp").classList.add("four")
        } else{
          document.getElementById("apexDonutExp").classList.remove("four")
        }
        
        if(this.dataExp.totalExpOut != 0){
          document.getElementById("apexDonutExp").classList.add("five")
        } else{
          document.getElementById("apexDonutExp").classList.remove("five")
        }

        if(this.dataExp.totalExpRest != 0){
          document.getElementById("apexDonutExp").classList.add("six")
        } else{
          document.getElementById("apexDonutExp").classList.remove("six")
        }

        if(this.dataExp.totalExpSau != 0){
          document.getElementById("apexDonutExp").classList.add("seven")
        } else{
          document.getElementById("apexDonutExp").classList.remove("seven")
        }

        if(this.dataExp.totalExpServ != 0){
          document.getElementById("apexDonutExp").classList.add("eight")
        } else{
          document.getElementById("apexDonutExp").classList.remove("eight")
        }

        if(this.dataExp.totalExpSup != 0){
          document.getElementById("apexDonutExp").classList.add("nine")
        } else{
          document.getElementById("apexDonutExp").classList.remove("nine")
        }

        if(this.dataRec.totalRecSalary != 0){
          document.getElementById("apexDonutRec").classList.add("one")
        }
        if(this.dataRec.totalRecInvest != 0){
          document.getElementById("apexDonutRec").classList.add("two")
        }
        if(this.dataRec.totalRecEmp != 0){
          document.getElementById("apexDonutRec").classList.add("three")
        }
        if(this.dataRec.totalRecOut != 0){
          document.getElementById("apexDonutRec").classList.add("four")
        }
      }
    },
    convertMoneyFloat(value){
      if(value === ""){
        value =  0;
      }else{
        value = value.replace("R$ ", "")
        value = value.replace(".","");
        value = value.replace(",",".");
        value = parseFloat(value);
      }
      return value;
    },
    configDataExp(){
      this.dataExp.totalExpHouse = 0;
      this.dataExp.totalExpInvestEduc = 0;
      this.dataExp.totalExpInvestElet = 0;
      this.dataExp.totalExpLaz = 0;
      this.dataExp.totalExpOut = 0;
      this.dataExp.totalExpRest = 0;
      this.dataExp.totalExpSau = 0;
      this.dataExp.totalExpServ = 0;
      this.dataExp.totalExpSup = 0;

      if(this.allFormsPagt[2].data != null){
        this.allFormsPagt[2].data.forEach(element => {
          this.dataExp.hasExp = true

          if(this.dateFilterInit != undefined && this.dateFilterInit != '' && this.dateFilterFinal != undefined && this.dateFilterFinal != ''){
            if(element.date >= this.dateFilterInit && element.date <= this.dateFilterFinal){
              if(element.idCategory == 0){
                this.dataExp.totalExpHouse = this.round(this.dataExp.totalExpHouse, element.value)
              }
              
              if(element.idCategory == 1){
                this.dataExp.totalExpInvestEduc = this.round(this.dataExp.totalExpInvestEduc, element.value)
              }
              
              if(element.idCategory == 2){
                this.dataExp.totalExpInvestElet = this.round(this.dataExp.totalExpInvestElet, element.value)
              }
              
              if(element.idCategory == 3){
                this.dataExp.totalExpLaz = this.round(this.dataExp.totalExpLaz, element.value)
              }
              
              if(element.idCategory == 4){
                this.dataExp.totalExpOut = this.round(this.dataExp.totalExpOut, element.value)
              }

              if(element.idCategory == 5){ 
                this.dataExp.totalExpRest = this.round(this.dataExp.totalExpRest, element.value)
              }

              if(element.idCategory == 6){ 
                this.dataExp.totalExpSau = this.round(this.dataExp.totalExpSau, element.value)
              }

              if(element.idCategory == 7){ 
                this.dataExp.totalExpServ = this.round(this.dataExp.totalExpServ, element.value)
              }

              if(element.idCategory == 8){
                this.dataExp.totalExpSup = this.round(this.dataExp.totalExpSup, element.value)
              }
            }
          } else{
            if(element.idCategory == 0){
              this.dataExp.totalExpHouse = this.round(this.dataExp.totalExpHouse, element.value)
            }
            if(element.idCategory == 1){
              this.dataExp.totalExpInvestEduc = this.round(this.dataExp.totalExpInvestEduc, element.value)
            }
            if(element.idCategory == 2){
              this.dataExp.totalExpInvestElet = this.round(this.dataExp.totalExpInvestElet, element.value)
            }
            if(element.idCategory == 3){ 
              this.dataExp.totalExpLaz = this.round(this.dataExp.totalExpLaz, element.value)
            }
            
            if(element.idCategory == 4){ 
              this.dataExp.totalExpOut = this.round(this.dataExp.totalExpOut, element.value)
            }
            
            if(element.idCategory == 5){ 
              this.dataExp.totalExpRest = this.round(this.dataExp.totalExpRest, element.value)
            }
            
            if(element.idCategory == 6){ 
              this.dataExp.totalExpSau = this.round(this.dataExp.totalExpSau, element.value) 
            }

            if(element.idCategory == 7){ 
              this.dataExp.totalExpServ = this.round(this.dataExp.totalExpServ, element.value)
            }

            if(element.idCategory == 8){ 
              this.dataExp.totalExpSup = this.round(this.dataExp.totalExpSup, element.value)
            }
          }
        })
      }
    },
    configRecXExps(){
      this.dataAll.hasDate = true;
      this.dataRec.total = 0;
      this.dataExp.total = 0;
      var [monthSelected, yearSelected] = this.dateRecAndExpsFormated.split('/')
      
      if(this.allFormsPagt[1].data != null){
        this.allFormsPagt[1].data.forEach(element => {
          var [year, month] = element.date.split('-')
          if(year == yearSelected &&  month == monthSelected){
            this.dataRec.total = this.round(this.dataRec.total, element.value)
          }
        })
      }
      
      if(this.allFormsPagt[2].data != null){
        this.allFormsPagt[2].data.forEach(element => {
          var [year, month] = element.date.split('-')
          if(year == yearSelected &&  month == monthSelected){
            this.dataExp.total = this.round(this.dataExp.total, element.value)
          }
        })
      }

      if(monthSelected == '01'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Janeiro')
      } else if(monthSelected == '02'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Fevereiro')
      } else if(monthSelected == '03'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'MarRecço')
      } else if(monthSelected == '04'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Abril')
      } else if(monthSelected == '05'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Maio')
      } else if(monthSelected == '06'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Junho')
      } else if(monthSelected == '07'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Julho')
      } else if(monthSelected == '08'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Agosto')
      } else if(monthSelected == '09'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Setembro')
      } else if(monthSelected == '10'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Outubro')
      } else if(monthSelected == '11'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Novembro')
      } else if(monthSelected == '12'){
        Vue.set(this.dataAll.plotOptions.xaxis.categories, 0, 'Dezembro')
      }

      if(this.dataRec.total == 0 && this.dataExp.total == 0){
        this.dataAll.hasDate = false;
        this.dataAll.height = 0
      } else{
        this.dataAll.height = 200
      }

      this.dataAll.series = [{ name: `Receitas R$ ${this.toBrl(this.dataRec.total)}`, data: [this.dataRec.total] }, { name: `Despesas R$ ${this.toBrl(this.dataExp.total)}`, data: [this.dataExp.total] }]
    },
    toBrl(value){
      return (Math.round(value * 100) / 100).toFixed(2);
    },
    someAll(){
      var rec = this.dataRec.totalRecSalary + this.dataRec.totalRecInvest + this.dataRec.totalRecEmp + this.dataRec.totalRecOut;
      var exp = this.dataExp.totalExpHouse + this.dataExp.totalExpInvestEduc + this.dataExp.totalExpInvestElet + this.dataExp.totalExpLaz + this.dataExp.totalExpOut
      + this.dataExp.totalExpRest + this.dataExp.totalExpSau + this.dataExp.totalExpServ + this.dataExp.totalExpSup;
        return (Math.round((rec - exp) * 100) / 100).toFixed(2).replace(".",","); 
    },
    calcRec(){
      var value = this.dataRec.totalRecSalary + this.dataRec.totalRecInvest + this.dataRec.totalRecEmp + this.dataRec.totalRecOut;
      return (Math.round(value * 100) / 100).toFixed(2).replace(".",",");
    },
    calcExp(){
      var value = this.dataExp.totalExpHouse + this.dataExp.totalExpInvestEduc + this.dataExp.totalExpInvestElet + this.dataExp.totalExpLaz + this.dataExp.totalExpOut
      + this.dataExp.totalExpRest + this.dataExp.totalExpSau + this.dataExp.totalExpServ + this.dataExp.totalExpSup;
      return (Math.round(value * 100) / 100).toFixed(2).replace(".",",");
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    
    formatMonth (date) {
      if (!date) return null

      const [year, month] = date.split('-')
      return `${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
  filters: {
    toBrl(value){
      return (Math.round(value * 100) / 100).toFixed(2).replace(".",",");
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    },
    yearSelected(){
      this.configDataLine(this.yearSelected)
    },
    dateRecAndExps () {
      this.dateRecAndExpsFormated = this.formatMonth(this.dateRecAndExps)
      this.configRecXExps();
    },
  },
}


</script>

