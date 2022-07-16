<template>
  <v-container class="homeView">
    <v-snackbar top min-width="50%" color="success" v-model="dataRec.snackbarNewRec" :timeout="5000">
      Receita cadastrada com sucesso

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col class="col" v-for="form in allFormsPagt" :key="form.id" :cols="10" :sm="6" :lg="3">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="elements" v-bind="attrs" v-on="on">
              <div class="left">
                <span>{{ form.title }}</span>
                <br>
                <span v-if="form.title == 'Receitas'" class="value">R$ {{ dataRec.totalRecSalary + dataRec.totalRecInvest + dataRec.totalRecEmp + dataRec.totalRecOut | toBrl }}</span>
                <span v-else class="value">R$ 00,00</span>
                <div>
                  
                </div>
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
                  <v-text-field v-model="dataRec.newRecValue" v-money="money" label="Informe o Valor *" hint="informe a descrição desejada" required> 
                    <v-icon slot="prepend">
                      mdi-cash-multiple
                    </v-icon>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field v-model="dataRec.newRecDesc" label="Descrição" type="text" hint="informe a descrição desejada" required>
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

          <div v-if="dataRec.hasRec">
            <apexchart class="" id="apexDonutRec" width="380" type="donut" :options="dataRec.optionsDonut" :series="dataRec.series"></apexchart>
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
      price: 123.45,
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          //suffix: ' #',
          precision: 2,
          masked: false /* doesn't work with directive */
        },
      dialog: false,
      allFormsPagt:[],
      dataRec: {
        indexs:[],
        totalRecSalary: 0,
        totalRecInvest: 0,
        totalRecEmp: 0,
        totalRecOut: 0,
        newRecValue: '0',
        newRecSelect: '',
        newRecDesc: '',
        hasRec: false,
        error: false,
        msgError: 'teste',
        optionsDonut: {
          show: true,
          showForZeroSeries: false,
          formatter: function (val) {
            return val + "%"
          },
          legend:{
            position: 'bottom'
          },
          labels: ['Salário', 'Investimentos', 'Empréstimos', 'Outros']
        },
        series: [],
        snackbarNewRec: false,
      },
      
    }
  },
  created(){
    this.allFormsPagt = scrypt.allFormsPagt;
    /* Receitas */
    
    /*
    this.allFormsPagt[1].data = [
      {idRec: 1, idDategory: 0, desc:'teste', value: 0.56}, 
    ]
    */

    if(window) {
      this.allFormsPagt[1].data = JSON.parse(localStorage.getItem('dataRec'))
    } 

    if(this.allFormsPagt[1].data != null){
      this.allFormsPagt[1].data.forEach(element => {
        this.dataRec.hasRec = true

        if(element.idDategory == 0){
          this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, element.value)
        }
        if(element.idDategory == 1){
          this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, element.value)
        }
        if(element.idDategory == 2){
          this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, element.value)
        }
        if(element.idDategory == 3){
          this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, element.value)
        }
      })
    }

    this.dataRec.series = [this.dataRec.totalRecSalary, this.dataRec.totalRecInvest, this.dataRec.totalRecEmp, this.dataRec.totalRecOut]
    /* Fim Receitas */
  },
  mounted(){
    var elementExist = document.getElementById("apexDonutRec")
    if(elementExist){
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
  methods:{
    
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

        if(this.dataRec.newRecSelect == 'Salário'){
          this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."));
          
          if(this.allFormsPagt[1].data == null){
            this.allFormsPagt[1].data = [{idRec: 1, idDategory: 0, desc: this.dataRec.newRecDesc, value: this.dataRec.totalRecSalary}]
          } else{
            this.allFormsPagt[1].data.push({idRec: (this.allFormsPagt[1].data.length+1), idDategory: 0, desc: this.dataRec.newRecDesc, value: this.round(this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."))})
          }
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
          Vue.set(this.dataRec.series, 0, this.dataRec.totalRecSalary)
        }
        
        if(this.dataRec.newRecSelect == 'Investimentos'){
          this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."));

          if(this.allFormsPagt[1].data == null){
            this.allFormsPagt[1].data = [{idRec: 1, idDategory: 1, desc: this.dataRec.newRecDesc, value: this.dataRec.totalRecInvest}]
          } else{
            this.allFormsPagt[1].data.push({idRec: (this.allFormsPagt[1].data.length+1), idDategory: 1, desc: this.dataRec.newRecDesc, value: this.round(this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."))})
          }
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
          Vue.set(this.dataRec.series, 1, this.dataRec.totalRecInvest)
        }
        
        if(this.dataRec.newRecSelect == 'Empréstimos'){
          this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."));

          if(this.allFormsPagt[1].data == null){
            this.allFormsPagt[1].data = [{idRec: 1, idDategory: 2, desc: this.dataRec.newRecDesc, value: this.dataRec.totalRecEmp}]
          } else{
            this.allFormsPagt[1].data.push({idRec: (this.allFormsPagt[1].data.length+1), idDategory: 2, desc: this.dataRec.newRecDesc, value: this.round(this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."))})
          }
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
          Vue.set(this.dataRec.series, 2, this.dataRec.totalRecEmp)
        }
        
        if(this.dataRec.newRecSelect == 'Outros'){
          this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."));

          if(this.allFormsPagt[1].data == null){
            this.allFormsPagt[1].data = [{idRec: 1, idDategory: 3, desc: this.dataRec.newRecDesc, value: this.dataRec.totalRecOut}]
          } else{
            this.allFormsPagt[1].data.push({idRec: (this.allFormsPagt[1].data.length+1), idDategory: 3, desc: this.dataRec.newRecDesc, value: this.round(this.dataRec.newRecValue.replace("R$ ", "").replace(",", "."))})
          }
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
          Vue.set(this.dataRec.series, 3, this.dataRec.totalRecOut)
        }

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
    round(num, num2){
      if(num2){
        return (Math.round((num + parseFloat(num2)) * 100) / 100);
      }

      if(!num2){
        return (Math.round(num * 100) / 100);
      }
    }
  },
  filters: {
    toBrl(value){
      return (Math.round(value * 100) / 100).toFixed(2).replace(".",",");
    }
  }
}


</script>

