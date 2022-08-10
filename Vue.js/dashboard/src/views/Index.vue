<template>
  <v-container fluid class="homeView px-10">
    <v-snackbar top min-width="50%" color="success" v-model="dataRec.snackbarNewRec" :timeout="5000">
      Receita cadastrada com sucesso

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col class="col" v-for="form in allFormsPagt" :key="form.id" :cols="10" :sm="6" :lg="4">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="elements" v-bind="attrs" v-on="on">
              <a :href="`transacoes/${form.slug}`" style="">
                <div class="left">
                  <span>{{ form.title }}</span>
                  <br>
                  <span v-if="form.title == 'Saldo Atual'" class="value">R$ {{ someAll() }}</span>
                  <span v-else-if="form.title == 'Receitas'" class="value">R$ {{ calcRec() }}</span>
                  <span v-else class="value">R$ {{ calcExp() }}</span>
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
              </a>
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
                  <v-text-field :prepend-inner-icon="'mdi-cash-multiple'" v-model="dataRec.newRecValue" v-money="money" label="Informe o Valor *" hint="informe o valor desejado" required/> 
                </v-col>

                <v-col cols="12">
                  <v-text-field :prepend-inner-icon="'mdi-file'" v-model="dataRec.newRecDesc" label="Descrição" type="text" hint="informe a descrição desejada" required/>
                </v-col>

                <v-col cols="12">
                  <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="dateFormatted" readonly :prepend-inner-icon="'mdi-calendar'" label="Informe a Data *" hint="informe a data desejada" v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on" ></v-text-field>
                    </template>
                    
                    <v-date-picker v-model="date" no-title @input="menu1 = false" locale="pt"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col cols="12">
                  <v-select :prepend-inner-icon="'mdi-label'" v-model="dataRec.newRecSelect" :items="[this.allFormsPagt[1].categories[0].title, this.allFormsPagt[1].categories[1].title, 
                    this.allFormsPagt[1].categories[2].title, this.allFormsPagt[1].categories[3].title]" label="Categoria *" required>
                  </v-select>
                </v-col>

              </v-row>
            </v-container>
            <small>* indica campo obrigatório</small>
            <v-spacer></v-spacer>
            <v-btn class="ma-1" color="error" @click="dialog = false">Cancelar</v-btn>
            <v-btn class="ma-1" color="primary" @click="newRec()">Salvar</v-btn>
            <v-btn class="ma-1"  color="success darken-1" @click="newRec(true)">Salvar e continuar cadastrando</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog v-model="this.dataRec.error" persistent transition="dialog-bottom-transition" max-width="600" style="z-index: 10000;">
        <v-card>
          <v-toolbar color="error" dark>Ocorreu um erro</v-toolbar>
          <v-card-text>
            <div class="text-h4 pa-12">{{ dataRec.msgError }}</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn color="error" block @click="dataRec.error = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col class="dash" :cols="12" :sm="8" :md="6">
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
            <apexchart class="" :width="width" id="apexDonutRec" type="donut" :options="dataRec.optionsDonut" :series="dataRec.series"></apexchart>
          </div>
        </div>
      </v-col>

      <v-col class="dash" :cols="12" :sm="8" :md="6">
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
            <apexchart class="" :width="widthDonut" id="apexDonutExp" type="donut" :options="dataExp.optionsDonut" :series="dataExp.seriesDonut"></apexchart>
          </div>
        </div>
      </v-col>

      <v-col class="dash" :cols="12" :sm="4" :md="3">
        <h4>Entradas e Saídas</h4>
        
        <div id="first">
          <div v-if="!dataExp.hasExp">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>
              Você ainda não possui despesas.
            </h5>
          </div>

          <div class="divDash" v-if="dataExp.hasExp">
              <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="dateRecAndExpsFormated" readonly :prepend-inner-icon="'mdi-calendar'" label="Informe o Mês *" hint="informe a data desejada" v-bind="attrs" v-on="on" ></v-text-field>
                </template>
                
                <v-date-picker v-model="dateRecAndExps" type="month" no-title @input="menu2 = false" locale="pt"></v-date-picker>
              </v-menu>
            <apexchart class="" :width="150" :height="200" type="bar" :options="dataAll.plotOptions" :series="dataAll.series"></apexchart>
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
      dateRecAndExps: new Date().toISOString().substr(0, 7),
      dateRecAndExpsFormated: this.formatMonth(new Date().toISOString().substr(0, 7)),
      menu: false,
      modal: false,
      width: 0,
      widthDonut: 0,
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
            redrawOnWindowResize: false,
            redrawOnParentResize: false
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
      this.configWidthDash();
      this.configRecXExps();
    } 
  },
  mounted(){
    this.configShowDonut();
  },
  methods:{
    configWidthDash(){
      if(window.innerWidth < 320){
        this.width = 250;
        this.widthDonut = 250;
      } else if(window.innerWidth >= 320 && window.innerWidth <= 400){
        this.width = 300;
        this.widthDonut = 319;
      } else if(window.innerWidth > 400 && window.innerWidth <= 500){
        this.width = 340;
        this.widthDonut = 360;
      } else if(window.innerWidth > 500 && window.innerWidth <= 1263){
        this.width = 380;
        this.widthDonut = 450;
      } else if(window.innerWidth > 1263 && window.innerWidth <= 1600){
        this.width = 380;
        this.widthDonut = 420;
      } else if(window.innerWidth > 1600){
        this.width = 470;
        this.widthDonut = 550;
      }

      window.addEventListener("resize", () => {
        if(window.innerWidth < 320){
          this.width = 250;
          this.widthDonut = 250;
        } else if(window.innerWidth >= 320 && window.innerWidth <= 400){
          this.width = 300;
          this.widthDonut = 319;
        } else if(window.innerWidth > 400 && window.innerWidth <= 500){
          this.width = 340;
          this.widthDonut = 360;
        } else if(window.innerWidth > 500 && window.innerWidth <= 1263){
          this.width = 380;
          this.widthDonut = 450;
        } else if(window.innerWidth > 1263 && window.innerWidth <= 1600){
          this.width = 380;
          this.widthDonut = 420;
        } else if(window.innerWidth > 1600){
          this.width = 470;
          this.widthDonut = 550;
        }
      })
    },
    newRec(continueSave){
      if(this.dataRec.newRecValue == 'R$ 0,00' ){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Não é possivel cadastrar uma receita com valor zerado';
      } else if(this.dataRec.newRecSelect == ""){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Não é possivel cadastrar uma receita sem categoria';
      } else{
        this.dataRec.hasRec = true
        var elementExist = document.getElementById("apexDonutRec")

        this.generateData();

        if(elementExist){
          if(this.dataRec.totalRecSalary != 0) document.getElementById("apexDonutRec").classList.add("one")
          if(this.dataRec.totalRecInvest != 0) document.getElementById("apexDonutRec").classList.add("two")
          if(this.dataRec.totalRecEmp != 0) document.getElementById("apexDonutRec").classList.add("three")
          if(this.dataRec.totalRecOut != 0) document.getElementById("apexDonutRec").classList.add("four")
        }

        this.dataRec.newRecValue = 0
        this.dataRec.newRecSelect = ''
        this.dataRec.newRecDesc = ''
        this.dataRec.snackbarNewRec = true;

        if(!continueSave){
          this.dialog = false;
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

      this.dataAll.series = [{ name: 'Receitas', data: [this.dataRec.total] }, { name: 'Despesas', data: [this.dataExp.total] }]

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
    dateRecAndExps () {
      this.dateRecAndExpsFormated = this.formatMonth(this.dateRecAndExps)
      this.configRecXExps();
    },
  },
}


</script>

