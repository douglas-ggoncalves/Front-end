<template>
  <v-container fluid class="homeView px-sm-10">
    <v-snackbar top min-width="50%" color="success" v-model="dataRec.snackbarNewRec" :timeout="5000">
      {{ this.dataRec.msgSuccess }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="dataRec.snackbarNewRec = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>

    <v-row class="">
      <v-dialog v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Editar Receita</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field :prepend-inner-icon="'mdi-cash-multiple'" v-model="editedItem.value" v-money="money" label="Informe o Valor *"  hint="informe o valor desejado"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field :prepend-inner-icon="'mdi-file'" v-model="editedItem.desc" label="Descrição" hint="informe a descrição desejada"></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="editedItem.dateFormatted" readonly :prepend-inner-icon="'mdi-calendar'" label="Informe a Data *" 
                      hint="informe a data desejada" v-bind="attrs" @blur="editedItem.date = parseDate(editedItem.dateFormatted)" v-on="on" ></v-text-field>
                    </template>
                    
                    <v-date-picker v-model="editedItem.date" no-title @input="menu2 = false" locale="pt"></v-date-picker>
                  </v-menu>
                </v-col>
               
                <v-col cols="12">
                  <v-select :prepend-inner-icon="'mdi-label'" v-model="editedItem.idCategory" 
                    :items="[this.allFormsPagt[1].categories[0].title, this.allFormsPagt[1].categories[1].title, 
                    this.allFormsPagt[1].categories[2].title, this.allFormsPagt[1].categories[3].title]" label="Categoria *" required>
                  </v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveEdit()">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialogDelete" max-width="600px">
        <v-card>
          <v-card-title class="text-h5">Tem certeza de que deseja excluir esta receita?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="deleteItemConfirm()">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
      <v-col class="col" :cols="12" :md="8">
        <v-card>
          <v-card-title>
            Receitas
            <v-spacer></v-spacer>
            <v-text-field v-model="search2" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table :no-data-text="'Não há dados'" :no-results-text="'Nenhum resultado encontrado'" 
          :header-props="{'sortByText': 'Ordenar por'}" :footer-props="{'items-per-page-text':'Itens por página', 
          pageText: '{0}-{1} de {2}', 'items-per-page-all-text':'Todos'}" :headers="headers2" :items="desserts2" 
          :search="search2" :custom-filter="filterData">
            <template v-slot:[`item.desc`]="{ item }">
              <v-tooltip :color="'rgb(0, 0, 0)'" :max-width="220" bottom>
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on" style="">{{ item.desc }}</span>
                </template> 
                <span>{{ item.desc }}</span>
              </v-tooltip>
            </template>

            <template v-slot:[`item.value`]="{ item }">
              <span>{{ item.value | toBrl }}</span>
            </template>

            <template v-slot:[`item.date`]="{ item }">
              <span>{{ new Date(item.date.replace("-",',')).toLocaleString() | toDate }}</span>
            </template>

            
          </v-data-table>
        </v-card>
      </v-col>
      
      <v-col class="col" :cols="12" :md="4" :lg="3">
        <div>
         <v-btn class="mb-2" rounded  color="success" @click="dialog = true">
            Nova Receita
          </v-btn>
        </div>
        
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="elements" v-bind="attrs" v-on="on">
              <a :href="`#`">
                <div class="left">
                  <span>Receitas</span>
                  <br>
                  <span class="value">R$ {{ dataRec.totalRecSalary + dataRec.totalRecInvest + dataRec.totalRecEmp + dataRec.totalRecOut | toBrl }}</span>
                </div>
                
                <div class="right">
                  <span>
                    <v-icon class="iGreen">mdi-arrow-up</v-icon>
                  </span>
                </div>
              </a>
            </div>
          </template>
          <span>Valor total de suas receitas</span>
        </v-tooltip>

        <v-row>
          <v-col :cols="12">
            <v-menu style="z-index: 13" ref="menuFilterInit" v-model="menuFilterInit" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateFilterFormattedInit" readonly :prepend-inner-icon="'mdi-calendar'" label="Período Inicial" 
                hint="informe a data desejada" v-bind="attrs" @blur="dateFilterInit = parseDate(dateFilterFormattedInit)" v-on="on" ></v-text-field>
              </template>
              
              <v-date-picker v-model="dateFilterInit" no-title @input="menuFilterInit = false" locale="pt"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col :cols="12">
            <v-menu style="z-index: 13" ref="menuFilterFinal" v-model="menuFilterFinal" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateFilterFormattedFinal" readonly :prepend-inner-icon="'mdi-calendar'" label="Período Final" 
                hint="informe a data desejada" v-bind="attrs" @blur="dateFilterFinal = parseDate(dateFilterFormattedFinal)" v-on="on" ></v-text-field>
              </template>
              
              <v-date-picker v-model="dateFilterFinal" no-title @input="menuFilterFinal = false" locale="pt"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        
        <v-btn class="ma-1" color="success" @click="filterByDate()">
          Filtrar
        </v-btn>
        
        <v-btn class="ma-1" color="primary" @click="clearDateFilter()">
          Limpar Filtro
        </v-btn>
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
            <v-btn class="d-none d-sm-inline-flex ma-1" color="success darken-1" @click="newRec(true)">Salvar e continuar cadastrando</v-btn>
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
 
      <v-col class="dash" :cols="12" :md="6" :lg="4">
        <h4>Receitas por Categoria</h4>
        
        <div id="first">
          <div v-if="allFormsPagt[1].data != null && allFormsPagt[1].data.length == 0 && dataRec.message == ''">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>Você ainda não possui receitas.</h5>
          </div>
          
          <div v-if="allFormsPagt[1].data != null && allFormsPagt[1].data.length == 0 && dataRec.message != ''">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>{{ dataRec.message }}</h5>
          </div>
          
          <div v-if="allFormsPagt[1].data != null && allFormsPagt[1].data.length > 0 && dataRec.message != ''">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>{{ dataRec.message }}</h5>
          </div>

          <div class="divDash" v-if="allFormsPagt[1].data != null && allFormsPagt[1].data.length > 0 && dataRec.message == ''">
            <apexchart class=""  height="350" id="apexDonutRec" type="donut" :options="dataRec.optionsDonut" :series="dataRec.seriesDonut"></apexchart>
          </div>
        </div>
      </v-col>
      
      <v-col class="dash" :cols="12" :md="6" :lg="5">
        <h4>Receitas por Ano</h4>
        
        <div id="first">
          <div v-if="allFormsPagt[1].data != null && allFormsPagt[1].data.length == 0">
            <v-icon>mdi-chart-donut</v-icon>
            <br>
            <h5>Você ainda não possui receitas.</h5>
          </div>

          <div class="divDash" v-else>
            <v-select style="z-index: 12;" v-model="yearSelected" :items="arrayYears" menu-props="auto" label="Select" hide-details :prepend-inner-icon="'mdi-calendar-range'" single-line/>
            <apexchart type="line"  height="350" :options="dataRec.optionsLine" :series="dataRec.seriesLine"></apexchart>
          </div>
        </div>
      </v-col>

      <v-col class="dash" :cols="12" :lg="3">
        <h4>Dados Gerais</h4>
        <v-row class="mt-0">
          <v-col class="pt-0" :cols="12" :md="6" :lg="12">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div class="elements" v-bind="attrs" v-on="on">
                  <span>
                    <div class="left">
                      <span style="font-weight: bold;">Quantidade de Receitas</span>
                      <br>
                      <span v-if="allFormsPagt[1].data != null">{{ allFormsPagt[1].data.length }}</span>
                      <span v-if="allFormsPagt[1].data == null">0</span>
                    </div>
                    
                    <div class="right">
                      <span>
                        <v-icon class="iGreen">mdi-arrow-up</v-icon>
                      </span>
                    </div>
                  </span>
                </div>
              </template>
              <span>Quantidade de Receitas Informadas</span>
            </v-tooltip>
          </v-col>

          <v-col class="pt-0" :cols="12" :md="6" :lg="12">
            <div id="arrayMov">
              <span>
                <h3>
                  Últimas movimentações criadas
                </h3>

                <div style="text-align: center" v-if="allFormsPagt[1].data != null && allFormsPagt[1].data.length == 0">
                  <v-icon>mdi-chart-donut</v-icon>
                  <br>
                  <h5>Você ainda não possui receitas.</h5>
                </div>

                <div v-if="allFormsPagt[1].data != null && allFormsPagt[1].data[allFormsPagt[1].data.length -1]" class="data">
                  <div>
                    <div class="divLeft">
                      <v-tooltip :color="'rgb(0, 0, 0)'" :max-width="220" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">{{ allFormsPagt[1].data[allFormsPagt[1].data.length -1].desc }}</span> <br>
                        </template>
                        <span>{{ allFormsPagt[1].data[allFormsPagt[1].data.length -1].desc }}</span>
                      </v-tooltip>
                      <span>{{ formatDate(allFormsPagt[1].data[allFormsPagt[1].data.length -1].date) }}</span>
                    </div>

                    <div class="divRight">
                      <span>
                        R$ {{ allFormsPagt[1].data[allFormsPagt[1].data.length -1].value | toBrl }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div v-if="allFormsPagt[1].data != null && allFormsPagt[1].data[allFormsPagt[1].data.length -2]" class="data">
                  <div>
                    <div class="divLeft">
                      <v-tooltip :color="'rgb(0, 0, 0)'" :max-width="220" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">{{ allFormsPagt[1].data[allFormsPagt[1].data.length -2].desc }}</span> <br>
                        </template>
                        <span>{{ allFormsPagt[1].data[allFormsPagt[1].data.length -2].desc }}</span>
                      </v-tooltip>
                      <span>{{ formatDate(allFormsPagt[1].data[allFormsPagt[1].data.length -2].date) }}</span>
                    </div>

                    <div class="divRight">
                      <span>
                        R$ {{ allFormsPagt[1].data[allFormsPagt[1].data.length -2].value | toBrl }}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div v-if="allFormsPagt[1].data != null && allFormsPagt[1].data[allFormsPagt[1].data.length -3]" class="data">
                  <div>
                    <div class="divLeft">
                      <v-tooltip :color="'rgb(0, 0, 0)'" :max-width="220" bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <span v-bind="attrs" v-on="on">{{ allFormsPagt[1].data[allFormsPagt[1].data.length -3].desc }}</span> <br>
                        </template>
                        <span>{{ allFormsPagt[1].data[allFormsPagt[1].data.length -3].desc }}</span>
                      </v-tooltip>
                      <span>{{ formatDate(allFormsPagt[1].data[allFormsPagt[1].data.length -3].date) }}</span>
                    </div>

                    <div class="divRight">
                      <span>
                        R$ {{ allFormsPagt[1].data[allFormsPagt[1].data.length -3].value | toBrl }}
                      </span>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import scrypt from "../../assets/js/scrypt.js"
import VueApexCharts from 'vue-apexcharts'

import "../../assets/style/style.css"
import money from  'vuejs-money'
Vue.use(money)

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)
export default {
  data(){
    return {
      yearSelected: '',
      arrayYears: [],
      picker: 2022,
      dateFilterInit: '',
      dateFilterFormattedInit: '',
      menuFilterInit: false,
      dateFilterFinal: '',
      dateFilterFormattedFinal: '',
      menuFilterFinal: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      menu2: false,
      search2: '',
      headers2: [
        { text: 'Descrição', align: 'start', value: 'desc'},
        { text: 'Categoria', value: 'idCategory'},
        { text: 'Valor', value: 'value' , searchable: false},
        { text: 'Data', value: 'date' },
        { text: 'Ações', value: 'action', sortable: false }
      ],
      desserts2: [],
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      },
      dialog: false,
      dialogEdit: false,
      dialogDelete: false,
      allFormsPagt:[],
      editedItem: {
        desc: '',
        idCategory: '',
        value: '',
        date: '',
        dateEdit: '',
      },
      dataRec: {
        indexs:[],
        totalRecSalary: 0,
        totalRecInvest: 0,
        totalRecEmp: 0,
        totalRecOut: 0,
        newRecValue: '0',
        newRecSelect: '',
        newRecDesc: '',
        message: '', 
        error: false,
        msgError: '',
        msgSuccess: '',
        snackbarNewRec: false,
        seriesDonut: [],
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
        optionsLine: {
          width: '100%',
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
          chart: {
            defaultLocale: 'pt-br',
            locales: [{
              name: 'pt-br',
              options: {
                toolbar: {
                  selectionZoom: 'Selecionar Zoom',
                  zoomIn: 'Mais Zoom',
                  zoomOut: 'Reduzir Zoom',
                  pan: 'Panorâmico',
                  reset: 'Resetar Zoom',
                }
              }
            }],
            toolbar: {
              export: {
                csv: {
                  filename: 'Receitas por ano',
                  columnDelimiter: ';',
                  headerCategory: 'Mês',
                },
                svg:{
                  filename: 'Receitas por ano',
                },
                png:{
                  filename: 'Receitas por ano',
                }
              }
            },
          },
          markers: {
            size: [4,7],
          },
          xaxis: {
            categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          }
        },
        seriesLine: [{
          name: 'Total',
          data: []
        }],
        
      },
    }
  },
  created(){
    this.allFormsPagt = scrypt.allFormsPagt;

    if(window) {
      this.allFormsPagt[1].data = JSON.parse(localStorage.getItem('dataRec'))

      this.createArrayData();
      if(this.allFormsPagt[1].data != null){
        this.configData();
        this.configDataLine(this.yearSelected);
      } else{
        this.allFormsPagt[1].data = [];
      }

      this.dataRec.seriesDonut = [this.dataRec.totalRecSalary, this.dataRec.totalRecInvest, this.dataRec.totalRecEmp, this.dataRec.totalRecOut]
    }
  },
  mounted(){
    this.configShowDonut();
  },
  methods:{
    configShowDonut(){
      var elementExist = document.getElementById("apexDonutRec")  
      if(elementExist){
        if(this.dataRec.totalRecSalary != 0){
          document.getElementById("apexDonutRec").classList.add("one")
        } else{
          document.getElementById("apexDonutRec").classList.remove("one")
        }

        if(this.dataRec.totalRecInvest != 0){
          document.getElementById("apexDonutRec").classList.add("two")
        } else{
          document.getElementById("apexDonutRec").classList.remove("two")
        }

        if(this.dataRec.totalRecEmp != 0){
          document.getElementById("apexDonutRec").classList.add("three")
        } else{
          document.getElementById("apexDonutRec").classList.remove("three")
        }
        
        if(this.dataRec.totalRecOut != 0){
          document.getElementById("apexDonutRec").classList.add("four")
        } else{
          document.getElementById("apexDonutRec").classList.remove("four")
        }
      }
    },
    filterData (value, search2) {
      return  value != null &&
        search2 != null &&
        typeof value === 'string' &&
        (value.toString().replace(".", ",").toLowerCase().indexOf(search2.toLowerCase()) !== -1 || 
        value.toString().replace(",", ".").toLowerCase().indexOf(search2.toLowerCase()) !== -1)
    },
    configDataLine(date){
      var jan = 0;
      var fev = 0;
      var mar = 0;
      var abr = 0;
      var may = 0;
      var jun = 0;
      var jul = 0;
      var aug = 0;
      var set = 0;
      var out = 0;
      var nov = 0;
      var dez = 0;

      if(this.allFormsPagt[1].data != null){
        this.allFormsPagt[1].data.forEach(element => {
          var [year, month] = element.date.split('-')
          if(year == date){
            if(month == '01'){
              jan = this.round(jan, element.value)
            } else if(month == '02'){
              fev = this.round(fev, element.value)
            } else if(month == '03'){
              mar = this.round(mar, element.value)
            } else if(month == '04'){
              abr = this.round(abr, element.value)
            } else if(month == '05'){
              may = this.round(may, element.value)
            } else if(month == '06'){
              jun = this.round(jun, element.value)
            } else if(month == '07'){
              jul = this.round(jul, element.value)
            } else if(month == '08'){
              aug = this.round(aug, element.value)
            } else if(month == '09'){
              set = this.round(set, element.value)
            } else if(month == '10'){
              out = this.round(out, element.value)
            } else if(month == '11'){
              nov = this.round(nov, element.value)
            } else if(month == '12'){
              dez = this.round(dez, element.value)
            }
          }
        })
      }

      var newData = [jan, fev, mar, abr, may, jun, jul, aug, set, out, nov, dez]

      this.dataRec.seriesLine = [{
        name: 'Total',
        data: newData
      }]
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
    filterByDate(){
      if(this.dateFilterInit == '' || this.dateFilterFinal == ''){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Preencha os campos data inicial e final antes de filtrar';
      } else if(this.dateFilterFinal >= this.dateFilterInit){
        this.dataRec.message = ''
        var elementExist = document.getElementById("apexDonutRec")
        this.configData();
        Vue.set(this.dataRec.seriesDonut, 0, (this.dataRec.totalRecSalary))
        Vue.set(this.dataRec.seriesDonut, 1, (this.dataRec.totalRecInvest))
        Vue.set(this.dataRec.seriesDonut, 2, (this.dataRec.totalRecEmp))
        Vue.set(this.dataRec.seriesDonut, 3, (this.dataRec.totalRecOut))
        this.verifyMessage();

        if(elementExist){
          if(this.dataRec.totalRecSalary == 0) document.getElementById("apexDonutRec").classList.remove("one")
          if(this.dataRec.totalRecInvest == 0) document.getElementById("apexDonutRec").classList.remove("two")
          if(this.dataRec.totalRecEmp == 0) document.getElementById("apexDonutRec").classList.remove("three")
          if(this.dataRec.totalRecOut == 0) document.getElementById("apexDonutRec").classList.remove("four")
        }
      } else {
        this.dataRec.error = true;
        this.dataRec.msgError = 'A data inicial deve ser menor ou igual a data final';
      }
    },
    clearDateFilter(){
      this.dateFilterInit = ''
      this.dateFilterFinal = ''
      this.dateFilterFormattedInit = ''
      this.dateFilterFormattedFinal = ''
      this.dataRec.message = ''
      var elementExist = document.getElementById("apexDonutRec")
      this.configData();
      Vue.set(this.dataRec.seriesDonut, 0, (this.dataRec.totalRecSalary))
      Vue.set(this.dataRec.seriesDonut, 1, (this.dataRec.totalRecInvest))
      Vue.set(this.dataRec.seriesDonut, 2, (this.dataRec.totalRecEmp))
      Vue.set(this.dataRec.seriesDonut, 3, (this.dataRec.totalRecOut))

      if(elementExist){
        if(this.dataRec.totalRecSalary == 0) document.getElementById("apexDonutRec").classList.remove("one")
        if(this.dataRec.totalRecInvest == 0) document.getElementById("apexDonutRec").classList.remove("two")
        if(this.dataRec.totalRecEmp == 0) document.getElementById("apexDonutRec").classList.remove("three")
        if(this.dataRec.totalRecOut == 0) document.getElementById("apexDonutRec").classList.remove("four")
      }
    },
    newRec(continueSave){
      if(this.dataRec.newRecValue == 'R$ 0,00' ){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Não é possivel cadastrar uma receita com valor zerado';
      } else if(this.dataRec.newRecSelect == ""){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Não é possivel cadastrar uma receita sem categoria';
      } else{
        this.dataRec.message = ''
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
        this.configData();
        this.configDataLine(this.yearSelected);
        this.configShowDonut();

        this.verifyMessage();
        
        this.dataRec.msgSuccess = 'Receita cadastrada com sucesso'
        if(!continueSave){
          this.dialog = false;
        }
      }
    },
    generateData(){
      if(this.dataRec.newRecSelect == 'Salário'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Salário'

          if(this.dateFilterInit == undefined || this.dateFilterInit == '' || this.dateFilterFinal == undefined || this.dateFilterFinal == ''){
            this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, this.convertMoneyFloat(this.dataRec.newRecValue));
          } else{
            if(this.date >= this.dateFilterInit && this.date <= this.dateFilterFinal){
              this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, this.convertMoneyFloat(this.dataRec.newRecValue));
            }
          }
            
        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 0, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecSalary}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 0, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        if(window) {
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        }
        Vue.set(this.dataRec.seriesDonut, 0, this.dataRec.totalRecSalary)
      }
        
      if(this.dataRec.newRecSelect == 'Investimentos'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Investimentos'
          if(this.dateFilterInit == undefined || this.dateFilterInit == '' || this.dateFilterFinal == undefined || this.dateFilterFinal == ''){
            this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, this.convertMoneyFloat(this.dataRec.newRecValue));
          } else {
            if(this.date >= this.dateFilterInit && this.date <= this.dateFilterFinal){
              this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, this.convertMoneyFloat(this.dataRec.newRecValue));
            }
          }

        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 1, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecInvest}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 1, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        if(window) {
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        }
        Vue.set(this.dataRec.seriesDonut, 1, this.dataRec.totalRecInvest)
      }
      
      if(this.dataRec.newRecSelect == 'Empréstimos'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Empréstimos'
          if(this.dateFilterInit == undefined || this.dateFilterInit == '' || this.dateFilterFinal == undefined || this.dateFilterFinal == ''){
            this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, this.convertMoneyFloat(this.dataRec.newRecValue));
          } else {
            if(this.date >= this.dateFilterInit && this.date <= this.dateFilterFinal){
              this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, this.convertMoneyFloat(this.dataRec.newRecValue));
            }
          }

        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 2, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecEmp}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 2, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        if(window) {
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        }
        Vue.set(this.dataRec.seriesDonut, 2, this.dataRec.totalRecEmp)
      }
      
      if(this.dataRec.newRecSelect == 'Outros'){
        if(this.dataRec.newRecDesc.trim() == '') this.dataRec.newRecDesc = 'Outros'
          if(this.dateFilterInit == undefined || this.dateFilterInit == '' || this.dateFilterFinal == undefined || this.dateFilterFinal == ''){
            this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, this.convertMoneyFloat(this.dataRec.newRecValue));
          } else{
            if(this.date >= this.dateFilterInit && this.date <= this.dateFilterFinal){
              this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, this.convertMoneyFloat(this.dataRec.newRecValue));
            }
          }

        if(this.allFormsPagt[1].data == null){
          this.allFormsPagt[1].data = [{idRec: Date.now(), idCategory: 3, desc: this.dataRec.newRecDesc, date: this.date, value: this.dataRec.totalRecOut}]
        } else{
          this.allFormsPagt[1].data.push({idRec: Date.now(), idCategory: 3, desc: this.dataRec.newRecDesc, date: this.date, value: this.convertMoneyFloat(this.dataRec.newRecValue)})
        }
        if(window) {
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        }
        Vue.set(this.dataRec.seriesDonut, 3, this.dataRec.totalRecOut)
      }
    },
    verifyMessage(){
      if(this.dataRec.seriesDonut[0] == 0 && this.dataRec.seriesDonut[1] == 0 && this.dataRec.seriesDonut[2] == 0 && this.dataRec.seriesDonut[3] == 0){
        if(this.allFormsPagt[1].data.length == 0) {
          this.dataRec.message = ''
        } else if(this.allFormsPagt[1].data.length > 0){
          this.dataRec.message = 'Você não possui movimentações na data selecionada.'
        }
      }
    },
    editItem(item){
      this.editedItem.id = item.idRec;
      this.editedItem.desc = item.desc.trim();
      this.editedItem.value = item.value;
      this.editedItem.date = item.date;
      this.editedItem.dateFormatted = this.formatDate(this.editedItem.date);
      this.editedItem.idCategory = item.idCategory;

      this.dialogEdit = true;
    },
    deleteItem(item){
      this.dialogDelete = true;
      this.editedItem.id = item.idRec;
      this.editedItem.desc = item.desc;
      this.editedItem.value = item.value;
      this.editedItem.idCategory = item.idCategory;
    },
    deleteItemConfirm(){
      var arr = this.allFormsPagt[1].data.filter(element => element.idRec != this.editedItem.id)
      this.allFormsPagt[1].data = arr
      this.desserts2 = []
      this.configData();
      this.configDataLine(this.yearSelected);
      this.dialogDelete = false;
      this.dataRec.message = ''

      Vue.set(this.dataRec.seriesDonut, 0, (this.dataRec.totalRecSalary))
      Vue.set(this.dataRec.seriesDonut, 1, (this.dataRec.totalRecInvest))
      Vue.set(this.dataRec.seriesDonut, 2, (this.dataRec.totalRecEmp))
      Vue.set(this.dataRec.seriesDonut, 3, (this.dataRec.totalRecOut))

      this.verifyMessage();
      this.configShowDonut();
      if(window) {
        localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
      }
      this.dataRec.msgSuccess = 'Receita excluída com sucesso'
      this.dataRec.snackbarNewRec = true;
    },
    saveEdit(){
      if(this.editedItem.value == 'R$ 0,00' ){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Não é possivel salvar uma despesa com valor zerado';
      } else{
        var elementIndex;
        if(this.allFormsPagt[1].data != null){
          this.allFormsPagt[1].data.forEach((element, index) => {
            if(element.idRec == this.editedItem.id){
              elementIndex = index
            }
          })
        }

        this.allFormsPagt[1].data[elementIndex].desc = this.editedItem.desc
        this.allFormsPagt[1].data[elementIndex].idCategory = this.editedItem.idCategory
        if(this.allFormsPagt[1].data[elementIndex].desc.trim() == '') this.allFormsPagt[1].data[elementIndex].desc = this.allFormsPagt[1].data[elementIndex].idCategory

        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Salário'){
          if(this.editedItem.desc.trim() == 'Investimentos' || this.editedItem.desc.trim() == 'Empréstimos' || this.editedItem.desc.trim() == 'Outros'){
            this.allFormsPagt[1].data[elementIndex].desc = 'Salário'
          }
          this.allFormsPagt[1].data[elementIndex].idCategory = 0
        } 

        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Investimentos'){
          if(this.editedItem.desc.trim() == 'Salário' || this.editedItem.desc.trim() == 'Empréstimos' || this.editedItem.desc.trim() == 'Outros'){
            this.allFormsPagt[1].data[elementIndex].desc = 'Investimentos'
          }
          this.allFormsPagt[1].data[elementIndex].idCategory = 1
        } 

        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Empréstimos') {
          if(this.editedItem.desc.trim() == 'Salário' || this.editedItem.desc.trim() == 'Investimentos' || this.editedItem.desc.trim() == 'Outros'){
            this.allFormsPagt[1].data[elementIndex].desc = 'Empréstimos'
          }
          this.allFormsPagt[1].data[elementIndex].idCategory = 2
        }
        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Outros'){
          if(this.editedItem.desc.trim() == 'Salário' || this.editedItem.desc.trim() == 'Investimentos' || this.editedItem.desc.trim() == 'Empréstimos'){
            this.allFormsPagt[1].data[elementIndex].desc = 'Outros'
          }
          this.allFormsPagt[1].data[elementIndex].idCategory = 3
        } 
        this.allFormsPagt[1].data[elementIndex].value = this.round(this.convertMoneyFloat(this.editedItem.value)) 
        this.allFormsPagt[1].data[elementIndex].date = this.editedItem.date;
          
        this.configData();
        this.configDataLine(this.yearSelected);
        this.configShowDonut();
        Vue.set(this.dataRec.seriesDonut, 0, (this.dataRec.totalRecSalary))
        Vue.set(this.dataRec.seriesDonut, 1, (this.dataRec.totalRecInvest))
        Vue.set(this.dataRec.seriesDonut, 2, (this.dataRec.totalRecEmp))
        Vue.set(this.dataRec.seriesDonut, 3, (this.dataRec.totalRecOut))
        this.verifyMessage();

        if(window) {
          localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
        }
        this.dialogEdit = false;
        this.dataRec.msgSuccess = 'Receita editada com sucesso'
        this.dataRec.snackbarNewRec = true;
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
    toBrl(value){
      return (Math.round(value * 100) / 100).toFixed(2);
    },
    configData(){
      this.dataRec.totalRecSalary = 0;
      this.dataRec.totalRecInvest = 0;
      this.dataRec.totalRecEmp = 0;
      this.dataRec.totalRecOut = 0;
      this.desserts2 = [];
      
      if(this.allFormsPagt[1].data != null){
        this.allFormsPagt[1].data.forEach(element => {

          if(this.dateFilterInit != undefined && this.dateFilterInit != '' && this.dateFilterFinal != undefined && this.dateFilterFinal != ''){
            if(element.date >= this.dateFilterInit && element.date <= this.dateFilterFinal){
              if(element.idCategory == 0){
                this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, element.value)
                if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Salário', date: element.date, value: this.toBrl(element.value)}]
                else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Salário', date: element.date, value: this.toBrl(element.value)})
              }
              if(element.idCategory == 1){
                this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, element.value)
                if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Investimentos', date: element.date, value: this.toBrl(element.value)}]
                else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Investimentos', date: element.date,value: this.toBrl(element.value)})
              }
              if(element.idCategory == 2){
                this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, element.value)
                if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Empréstimos', date: element.date,value: this.toBrl(element.value)}]
                else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Empréstimos', date: element.date, value: this.toBrl(element.value)})
              }
              if(element.idCategory == 3){
                this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, element.value)
                if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Outros', date: element.date, value: this.toBrl(element.value)}]
                else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Outros', date: element.date, value: this.toBrl(element.value)})
              }
            }
          } else{
            if(element.idCategory == 0){
              this.dataRec.totalRecSalary = this.round(this.dataRec.totalRecSalary, element.value)
              if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Salário', date: element.date, value: this.toBrl(element.value)}]
              else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Salário', date: element.date, value: this.toBrl(element.value)})
            }
            if(element.idCategory == 1){
              this.dataRec.totalRecInvest = this.round(this.dataRec.totalRecInvest, element.value)
              if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Investimentos', date: element.date, value: this.toBrl(element.value)}]
              else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Investimentos', date: element.date,value: this.toBrl(element.value)})
            }
            if(element.idCategory == 2){
              this.dataRec.totalRecEmp = this.round(this.dataRec.totalRecEmp, element.value)
              if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Empréstimos', date: element.date,value: this.toBrl(element.value)}]
              else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Empréstimos', date: element.date, value: this.toBrl(element.value)})
            }
            if(element.idCategory == 3){
              this.dataRec.totalRecOut = this.round(this.dataRec.totalRecOut, element.value)
              if(this.desserts2.length == 0) this.desserts2 = [{idRec: element.idRec, desc: element.desc, idCategory: 'Outros', date: element.date, value: this.toBrl(element.value)}]
              else this.desserts2.push({idRec: element.idRec, desc: element.desc, idCategory: 'Outros', date: element.date, value: this.toBrl(element.value)})
            }
          }
        })
      }
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
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
    },
    toDate(value){
      return value.substr(0, 10)
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
    
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date);
    },
    'editedItem.date'(){
      this.editedItem.dateFormatted = this.formatDate(this.editedItem.date);
    },
    dateFilterInit(){
      this.dateFilterFormattedInit = this.formatDate(this.dateFilterInit);
    },
    dateFilterFinal(){
      this.dateFilterFormattedFinal = this.formatDate(this.dateFilterFinal);
    },
    yearSelected(){
      this.configDataLine(this.yearSelected)
    },
  
  },
}
</script>

