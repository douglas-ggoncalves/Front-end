<template>
  <v-container fluid class="homeView" >
    <v-snackbar top min-width="50%" color="success" v-model="dataRec.snackbarNewRec" :timeout="5000">
      
      {{ this.dataRec.msgSuccess }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Fechar
        </v-btn>
      </template>
    </v-snackbar>

    <v-row class="px-md-10">
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
                  <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="editedItem.dateFormatted" readonly :prepend-inner-icon="'mdi-calendar'" label="Informe a Data *" 
                      hint="informe a data desejada" v-bind="attrs" @blur="editedItem.date = parseDate(editedItem.dateFormatted)" v-on="on" ></v-text-field>
                    </template>
                    
                    <v-date-picker v-model="editedItem.date" no-title @input="menu1 = false" locale="pt"></v-date-picker>
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
    
      <v-col class="col" :cols="12" :md="9">
        <v-card>
          <v-card-title>
            Receitas
            <v-spacer></v-spacer>
            <v-text-field v-model="search2" append-icon="mdi-magnify" label="Pesquisar" single-line hide-details></v-text-field>
          </v-card-title>
          <v-data-table :no-data-text="'Não há dados'" :no-results-text="'Nenhum resultado encontrado'" 
          :header-props="{'sortByText': 'Ordenar por'}"
          :footer-props="{'items-per-page-text':'Itens por página', pageText: '{0}-{1} de {2}', 'items-per-page-all-text':'Todos'}"
          :headers="headers2" :items="desserts2" :search="search2">

            <template v-slot:[`item.value`]="{ item }">
              <span title="">R$ {{ item.value | toBrl }}</span>
            </template>

            <template v-slot:[`item.date`]="{ item }">
              <span>{{ new Date(item.date.replace("-",',')).toLocaleString() | toDate }}</span>
            </template>

            <template v-slot:[`item.action`]="{ item }"> 
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      
      <v-col class="col" :cols="12" :md="3">
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
          <span>descrição</span>
        </v-tooltip>

        <v-row>
          <v-col :cols="12">
            <v-menu ref="menu1" v-model="menuFilterInit" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="dateFilterFormattedInit" readonly :prepend-inner-icon="'mdi-calendar'" label="Período Inicial" 
                hint="informe a data desejada" v-bind="attrs" @blur="dateFilterInit = parseDate(dateFilterFormattedInit)" v-on="on" ></v-text-field>
              </template>
              
              <v-date-picker v-model="dateFilterInit" no-title @input="menuFilterInit = false" locale="pt"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col :cols="12">
            <v-menu ref="menu1" v-model="menuFilterFinal" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
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
      dateFilterInit: '',
      dateFilterFormattedInit: '',
      menuFilterInit: false,
      dateFilterFinal: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFilterFormattedFinal: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menuFilterFinal: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
      search2: '',
      headers2: [
        { text: 'Descrição', align: 'start', value: 'desc'},
        { text: 'Categoria', value: 'idCategory'},
        { text: 'Valor', value: 'value' },
        { text: 'Data', value: 'date' },
        { text: 'Ações', value: 'action', sortable: false }
      ],
      desserts2: [],
      price: 123.45,
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
        hasRec: false,
        error: false,
        msgError: '',
        msgSuccess: '',
        optionsDonut: {
          tooltip: {
            enabled: true,
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
    /* Receitas */
    if(window) {
      this.allFormsPagt[1].data = JSON.parse(localStorage.getItem('dataRec'))
    } 

    if(this.allFormsPagt[1].data != null){
      this.configData();
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
    filterByDate(){
      if(this.dateFilterInit == '' || this.dateFilterFinal == ''){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Preencha os campos data inicial e final antes de filtrar';
      } else if(this.dateFilterFinal >= this.dateFilterInit){
        var elementExist = document.getElementById("apexDonutRec")
        this.configData(true);
        Vue.set(this.dataRec.series, 0, (this.dataRec.totalRecSalary))
        Vue.set(this.dataRec.series, 1, (this.dataRec.totalRecInvest))
        Vue.set(this.dataRec.series, 2, (this.dataRec.totalRecEmp))
        Vue.set(this.dataRec.series, 3, (this.dataRec.totalRecOut))

        if(this.dataRec.series[0] == 0 && this.dataRec.series[1] == 0 && this.dataRec.series[2] == 0 && this.dataRec.series[3] == 0){
          this.dataRec.hasRec = false
        }

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
      var elementExist = document.getElementById("apexDonutRec")
      this.configData();
      Vue.set(this.dataRec.series, 0, (this.dataRec.totalRecSalary))
      Vue.set(this.dataRec.series, 1, (this.dataRec.totalRecInvest))
      Vue.set(this.dataRec.series, 2, (this.dataRec.totalRecEmp))
      Vue.set(this.dataRec.series, 3, (this.dataRec.totalRecOut))

      if(this.dataRec.series[0] == 0 && this.dataRec.series[1] == 0 && this.dataRec.series[2] == 0 && this.dataRec.series[3] == 0){
        this.dataRec.hasRec = false
      }

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
        this.configData()
        this.dataRec.msgSuccess = 'Receita cadastrada com sucesso'
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
    editItem(item){
      this.editedItem.id = item.idRec;
      this.editedItem.desc = item.desc;
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
      var elementExist = document.getElementById("apexDonutRec")
      var arr = this.allFormsPagt[1].data.filter(element => element.idRec != this.editedItem.id)
      this.allFormsPagt[1].data = arr
      this.desserts2 = []
      this.configData()
      this.dialogDelete = false;

      Vue.set(this.dataRec.series, 0, (this.dataRec.totalRecSalary))
      Vue.set(this.dataRec.series, 1, (this.dataRec.totalRecInvest))
      Vue.set(this.dataRec.series, 2, (this.dataRec.totalRecEmp))
      Vue.set(this.dataRec.series, 3, (this.dataRec.totalRecOut))

      if(this.dataRec.series[0] == 0 && this.dataRec.series[1] == 0 && this.dataRec.series[2] == 0 && this.dataRec.series[3] == 0){
        this.dataRec.hasRec = false
      }

      if(elementExist){
        if(this.dataRec.totalRecSalary == 0) document.getElementById("apexDonutRec").classList.remove("one")
        if(this.dataRec.totalRecInvest == 0) document.getElementById("apexDonutRec").classList.remove("two")
        if(this.dataRec.totalRecEmp == 0) document.getElementById("apexDonutRec").classList.remove("three")
        if(this.dataRec.totalRecOut == 0) document.getElementById("apexDonutRec").classList.remove("four")
      }
      localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
      this.dataRec.msgSuccess = 'Receita excluída com sucesso'
      this.dataRec.snackbarNewRec = true;
    },
    saveEdit(){
      if(this.editedItem.value == 'R$ 0,00' ){
        this.dataRec.error = true;
        this.dataRec.msgError = 'Não é possivel cadastrar uma receita com valor zerado';
      } else{
        var elementIndex;
        this.allFormsPagt[1].data.forEach((element, index) => {
          if(element.idRec == this.editedItem.id){
            elementIndex = index
          }
        })

        this.allFormsPagt[1].data[elementIndex].desc = this.editedItem.desc
        this.allFormsPagt[1].data[elementIndex].idCategory = this.editedItem.idCategory
        if(this.allFormsPagt[1].data[elementIndex].desc.trim() == '') this.allFormsPagt[1].data[elementIndex].desc = this.allFormsPagt[1].data[elementIndex].idCategory

        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Salário') this.allFormsPagt[1].data[elementIndex].idCategory = 0
        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Investimentos') this.allFormsPagt[1].data[elementIndex].idCategory = 1
        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Empréstimos') this.allFormsPagt[1].data[elementIndex].idCategory = 2
        if(this.allFormsPagt[1].data[elementIndex].idCategory == 'Outros') this.allFormsPagt[1].data[elementIndex].idCategory = 3
        this.allFormsPagt[1].data[elementIndex].value = this.round(this.convertMoneyFloat(this.editedItem.value)) 
        this.allFormsPagt[1].data[elementIndex].date = this.editedItem.date;
          
        this.configData()
        Vue.set(this.dataRec.series, 0, (this.dataRec.totalRecSalary))
        Vue.set(this.dataRec.series, 1, (this.dataRec.totalRecInvest))
        Vue.set(this.dataRec.series, 2, (this.dataRec.totalRecEmp))
        Vue.set(this.dataRec.series, 3, (this.dataRec.totalRecOut))
        localStorage.setItem("dataRec", JSON.stringify(this.allFormsPagt[1].data));
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
    configData(filterOn){
    this.dataRec.totalRecSalary = 0;
    this.dataRec.totalRecInvest = 0;
    this.dataRec.totalRecEmp = 0;
    this.dataRec.totalRecOut = 0;
    this.desserts2 = [];
    var minDate;
    var maxDate;
    
    this.allFormsPagt[1].data.forEach(element => {
      if(minDate == undefined){
        minDate = element.date
      } else{
        if(element.date < minDate){
          minDate = element.date
        }
      }
      if(maxDate == undefined){
        maxDate = element.date
      } else{
        if(element.date > maxDate){
          maxDate = element.date
        }
      }
      this.dataRec.hasRec = true

      if(filterOn){
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
      }
      else{
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
     this.dateFilterInit = minDate;
      this.dateFilterFormattedInit =  this.formatDate(this.dateFilterInit);
    
   
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
  },
}
</script>

