<template>
  <section id="homePage">
    <Navbar/>
    <div id="content">
      <div id="barLeft">
        <div id="itemsMenu">
          <div>
            <span class="active" id="first">
              <font-awesome-icon icon="fa-solid fa-chart-column"/>
              <p>Dashboard</p>
            </span>

            <span>
              <font-awesome-icon icon="fa-regular fa-circle-check" />
              <p>Tarefas</p>
            </span>

            <span>
              <font-awesome-icon icon="fa-solid fa-screwdriver-wrench" />
              <p>Configurações</p>
            </span>
          </div>
        </div>
      </div>
      <div id="subMain">
        <div id="spacer">
        </div>

        <div id="leftContent">
          <div>
            <h4>Categorias</h4>
            <button id="allCategories" class="active" @click="filterTasks('all'); activeClass('allCategories')">
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
              Todas
            </button>

            <button id="onlyUrgent" class="roundedUrgent" @click="filterTasks('urgent'); activeClass('onlyUrgent')">
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
              Urgentes <button>{{ tasks | totalUrgent }}</button> 
            </button>

            <button id="onlyImportant" class="roundedImportant" @click="filterTasks('important');  activeClass('onlyImportant')"> 
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
              Importantes <button>{{ tasks | totalImportant }}</button>
            </button>

            <button id="onlyOthers" class="roundedOthers" @click="filterTasks('others'); activeClass('onlyOthers')">
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
              Outras <button>{{ tasks | totalOthers }}</button>
            </button>

            <button id="onlyFinished" @click="filterTasks('finished'); activeClass('onlyFinished')">
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
              Finalizadas
            </button>
          </div>
        </div>
        <div id="rightContent">
          <div>
            <h3>Minhas Tarefas</h3>
            
            <p>Olá <span class="active">Douglas Gonçalves,</span> você <span>{{ quant() > 0 ? 'tem' : 'não tem' }}</span>  <span class="active" id="quantTask">{{ quant() | showMsgTasks  }}</span> {{ quant() > 1 ? 'pendentes' : 'pendente'}}.</p>
            <div class="input-container" @click="inputFocus()">
              <input id="searchTaskInput" class="input-field" type="text" v-model="inputSearch" placeholder="Buscar Tarefas">
              <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </div>
            
            <div style="margin-top: 1.5rem;">
              <div v-for="task in arrayFiltered" :key="task.id" :class="task.checked ? 'items taskActive' : 'items'">
                <div>
                  <div class="left" @click="checkItem(task)">
                    <font-awesome-icon :icon="task.checked ? 'fa-solid fa-square-check' : 'fa-square'" />
                    <span class="descItem">
                      {{ task.title }}
                    </span>
                  </div>

                  <div class="final">
                    <div :class="'chip '  + task.category">
                      {{ task.descCategory }}
                    </div>

                    <div class="dropdown">
                      <button class="dropbtn"><font-awesome-icon icon="fa-solid fa-ellipsis-vertical"/></button>
                      <div class="dropdown-content">
                        <button @click="editItem(task)">
                          <span class="dot edit">

                          </span>
                          Editar
                        </button>

                        <button @click="deleteItem(task)">
                          <span class="dot">

                          </span>
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button id="addTask" @click="newTask()">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>
    
    <div id="myModal" class="modal">
      <div class="modal-content">
        <div>
          <span><h3>Cadastrar Tarefa</h3></span>
          <span class="close" style="margin-bottom: auto; line-height: 1" @click="clearNewTaskData()">&times;</span>
        </div>

        <div>
          <form action="">
            <span>Título:</span>
            <input v-model="title" type="text">

            <span>Descrição:</span>
            <textarea v-model="description" name="" id="" cols="30" rows="10" spellcheck="false"></textarea>
          </form>
        </div>

        <div class="modalFooter">
          <span @click="changeCategory('urgent')">
            <button id="categoryUrgent">
              
            </button>
            Urgente
          </span>
          
          <span @click="changeCategory('important')">
            <button id="categoryImportant">
              
            </button>
            Importante
          </span>
          
          <span @click="changeCategory('others')">
            <button id="categoryOthers">
              
            </button>
            Outras
          </span>

          <button id="add" @click="addTask()">
            Adicionar
          </button>
        </div>
      </div>
    </div>

    <div id="modalEdit" class="modal">
      <div class="modal-content">
        <div>
          <span><h3>Editar Tarefa</h3></span>
          <span class="close" style="margin-bottom: auto; line-height: 1" @click="clearEditTaskData()">&times;</span>
        </div>

        <div>
          <form action="">
            <span>Título:</span>
            <input v-model="modalEdit.title" type="text">

            <span>Descrição:</span>
            <textarea v-model="modalEdit.description" name="" id="" cols="30" rows="10" spellcheck="false"></textarea>
          </form>
        </div>

        <div class="modalFooter">
          <div id="checkbox">
            <input type="checkbox" id="check" name="check" :class="modalEdit.checked ? 'active' : ''" v-model="modalEdit.checked" @click="modalEdit.checked = !modalEdit.checked">
            <label for="check" v-show="modalEdit.checked">Concluído</label>
            <label for="check" v-show="!modalEdit.checked">Não Concluído</label>
          </div>
          
          <span @click="changeCategoryEdit('urgent')">
            <button id="categoryEditUrgent">
              
            </button>
            Urgente
          </span>
          
          <span @click="changeCategoryEdit('important')">
            <button id="categoryEditImportant">
              
            </button>
            Importante
          </span>
          
          <span @click="changeCategoryEdit('others')">
            <button id="categoryEditOthers">
              
            </button>
            Outras
          </span>

          <button id="cancelEdit" @click="clearEditTaskData()">
            Cancelar
          </button>

          <button id="saveButton" @click="saveEdit()">
            Salvar
          </button>
        </div>
      </div>
    </div>

    <div id="modalDelete" class="modalDelete">
      <div class="modal-content">
        <div id="icon">
          <font-awesome-icon icon="fa-regular fa-trash-can" />
        </div>

        <div>
          <h3>Tem certeza que deseja <span>excluir</span> essa tarefa?</h3>
          <span id="subTitle">Esta ação não pode ser desfeita</span>

          <button id="cancel" @click="cancelDelete()">
            Cancelar
          </button>
          
          <button id="confirm" @click="confirmDelete(idItemDelete)">
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import '../assets/css/stylus.styl';
import Navbar from '../components/Navbar';
import '../assets/js/scrypt.js';
window.onclick = function(event) {
  let modal = document.getElementById('myModal')
  let modalDelete = document.getElementById("modalDelete");
  let modalEdit = document.getElementById("modalEdit");
  
  if (event.target == modal) {
    document.getElementById("myModal").style.display = 'none';
    document.getElementById("categoryImportant").classList.remove('buttonActive');
    document.getElementById("categoryOthers").classList.remove('buttonActive');
    document.getElementById("categoryUrgent").classList.remove('buttonActive');
  }

  if (event.target == modalDelete) {
    document.getElementById("modalDelete").style.display = 'none';
  }
  
  if (event.target == modalEdit) {
    document.getElementById("categoryEditImportant").classList.remove('buttonActive');
    document.getElementById("categoryEditUrgent").classList.remove('buttonActive');
    document.getElementById("categoryEditOthers").classList.remove('buttonActive');
    document.getElementById("modalEdit").style.display = 'none';
  }

  
}
export default {
  data(){
    return{
      title: '',
      description: '',
      category: '',
      descCategory: '',
      idItemDelete: '',
      degree: '',
      inputSearch: '',
      arrayFiltered:[

      ],
      modalEdit:{
        id: '',
        title: 'abc',
        checked: undefined,
        description: '',
        category: '',
        descCategory: '',
        degree: ''
      },
      tasks:[
        /*{ id: 1, title: "Planejar desenvolvimento do app TodoList",  description: "adasd", checked: true, category: 'urgent', descCategory: 'Urgente' },
        { id: 2, title: "Criar projeto Vue.js", description: "adasd", checked: false, category: 'important', descCategory: 'Importante' },
        { id: 3, title: "Montar telas HTML/CSS", description: "adasd", checked: false, category: 'important', descCategory: 'Importante' },*/
      ]
    }
  },
  methods: {
    login(){
      this.$emit("alterViewEmit", "Início");
    },
    inputFocus(){
      document.getElementById('searchTaskInput').focus();
    },
    checkItem(item){
      var index = this.tasks.findIndex(element => element.id == item.id)
      var element = { id: Date.now(), title: item.title, description: item.description, degree: item.degree, checked: !item.checked, category: item.category, descCategory: item.descCategory}

      Vue.set(this.tasks, index, element)
      if(window) {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));

        if(this.inputSearch.trim() == ''){
          this.arrayFiltered = this.tasks;
          this.orderArray();
          this.verify();
        } else{
          this.arrayFiltered = this.tasks.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()));
          this.orderArray();
        }
        
      }
    },
    editItem(item){
      this.modalEdit.id = item.id;
      this.modalEdit.title = item.title;
      this.modalEdit.checked = false;
      this.modalEdit.description = item.description;
      
      if(item.category == 'urgent'){
        document.getElementById("categoryEditImportant").classList.remove('buttonActive');
        document.getElementById("categoryEditOthers").classList.remove('buttonActive');
        document.getElementById("categoryEditUrgent").classList.add('buttonActive');
        this.modalEdit.category = 'urgent'
        this.modalEdit.descCategory = 'Urgente'
      }
      else if(item.category == 'important'){
        document.getElementById("categoryEditImportant").classList.add('buttonActive');
        document.getElementById("categoryEditOthers").classList.remove('buttonActive');
        document.getElementById("categoryEditUrgent").classList.remove('buttonActive');
        this.modalEdit.category = 'important'
        this.modalEdit.descCategory = 'Importante'
      } else if(item.category == 'others'){
        document.getElementById("categoryEditImportant").classList.remove('buttonActive');
        document.getElementById("categoryEditOthers").classList.add('buttonActive');
        document.getElementById("categoryEditUrgent").classList.remove('buttonActive');
        this.modalEdit.category = 'others'
        this.modalEdit.descCategory = 'Outras'
      }
      
      document.getElementById("modalEdit").style.display = 'flex';
    }, 
    deleteItem(item){
      document.getElementById("modalDelete").style.display = 'flex';
      this.idItemDelete = item.id;
    },
    saveEdit(){
      var index = this.tasks.findIndex(element => element.id == this.modalEdit.id)
      var element = { id: Date.now(), title: this.modalEdit.title, description: this.modalEdit.description, degree: this.modalEdit.degree, checked: this.modalEdit.checked, category: this.modalEdit.category, descCategory: this.modalEdit.descCategory}

      Vue.set(this.tasks, index, element)
      this.clearEditTaskData();
      
      if(window) {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        if(this.inputSearch.trim() == ''){
          this.arrayFiltered = this.tasks;
          this.orderArray();
          this.verify();
        } else{
          this.orderArray();
          this.arrayFiltered = this.tasks.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()))
          this.verify();
        }
      }
    },
    verify(){ // aqui temos que ver qual opção está ativa para filtrar apenas eles
      var allCategories = document.getElementById('allCategories').classList.contains("active")
      var onlyUrgent = document.getElementById('onlyUrgent').classList.contains("active")
      var onlyImportant = document.getElementById('onlyImportant').classList.contains("active")
      var onlyOthers = document.getElementById('onlyOthers').classList.contains("active")
      var onlyFinished = document.getElementById('onlyFinished').classList.contains("active")

      if(allCategories) this.filterTasks('all');
      if(onlyUrgent) this.filterTasks('urgent');
      if(onlyImportant) this.filterTasks('important');
      if(onlyOthers) this.filterTasks('others');
      if(onlyFinished) this.filterTasks('finished');
    },
    confirmDelete(id){
      if(window) {
        var novoArray = this.tasks.filter(element => element.id != id)
        this.tasks = novoArray;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.cancelDelete();
        if(this.inputSearch.trim() == ''){
          this.arrayFiltered = this.tasks;
          this.verify();
          this.orderArray();
        } else{
          this.orderArray();
          this.arrayFiltered = this.tasks.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()));
        }
      }
    },
    newTask(){
      this.title = '';
      this.description = '';
      this.category = '';
      document.getElementById("myModal").style.display = 'flex';
    },
    clearNewTaskData(){
      this.title = '';
      this.description = '';
      this.category = '';
      document.getElementById("myModal").style.display = 'none';
      document.getElementById("categoryImportant").classList.remove('buttonActive');
      document.getElementById("categoryOthers").classList.remove('buttonActive');
      document.getElementById("categoryUrgent").classList.remove('buttonActive');
    },
    clearEditTaskData(){
      this.modalEdit.id = '';
      this.modalEdit.title = '';
      this.modalEdit.description = '';
      this.modalEdit.category = '';
      document.getElementById("modalEdit").style.display = 'none';
      document.getElementById("categoryEditImportant").classList.remove('buttonActive');
      document.getElementById("categoryEditOthers").classList.remove('buttonActive');
      document.getElementById("categoryEditUrgent").classList.remove('buttonActive');
    },
    cancelDelete(){
      document.getElementById("modalDelete").style.display = 'none';
    },
    activeClass(value){
      document.getElementById('allCategories').classList.remove("active")
      document.getElementById('onlyUrgent').classList.remove("active")
      document.getElementById('onlyImportant').classList.remove("active")
      document.getElementById('onlyOthers').classList.remove("active")
      document.getElementById('onlyFinished').classList.remove("active")
      
      document.getElementById(value).classList.add("active")
    },
    addTask(){
      if(this.title.trim() == ""){
        alert("Título não pode ser vazio");
        return;
      }

      if(window) {
        if(this.tasks != null){
          if(this.tasks.length > 0){
            this.tasks.push({ id: Date.now(), title: this.title, description: this.description, degree: this.degree, checked: false, category: this.category, descCategory: this.descCategory })
          } else{
            this.tasks[0] = { id: Date.now(), title: this.title, description: this.description, degree: this.degree, checked: false, category: this.category, descCategory: this.descCategory }
          }
        } else{
          this.tasks = [{ id: Date.now(), title: this.title, description: this.description, degree: this.degree, checked: false, category: this.category, descCategory: this.descCategory }]
        }
        
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
      this.clearNewTaskData();
      if(this.inputSearch.trim() == ''){
        this.arrayFiltered = this.tasks;
        this.orderArray();
        this.verify();
      } else{
        this.orderArray();
        this.arrayFiltered = this.tasks.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()));
        this.verify();
      }
    },
    changeCategory(value){
      if(value == 'urgent'){
        document.getElementById("categoryImportant").classList.remove('buttonActive');
        document.getElementById("categoryOthers").classList.remove('buttonActive');
        document.getElementById("categoryUrgent").classList.add('buttonActive');
        this.category = 'urgent'
        this.descCategory = 'Urgente'
        this.degree = 3;
      }
      else if(value == 'important'){
        document.getElementById("categoryUrgent").classList.remove('buttonActive');
        document.getElementById("categoryOthers").classList.remove('buttonActive');
        document.getElementById("categoryImportant").classList.add('buttonActive');
        this.category = 'important'
        this.descCategory = 'Importante'
        this.degree = 2;
      }
      else if(value == 'others'){
        document.getElementById("categoryUrgent").classList.remove('buttonActive');
        document.getElementById("categoryImportant").classList.remove('buttonActive');
        document.getElementById("categoryOthers").classList.add('buttonActive');
        this.category = 'others'
        this.descCategory = 'Outras'
        this.degree = 1;
      }
    },
    changeCategoryEdit(value){
      if(value == 'urgent'){
        document.getElementById("categoryEditImportant").classList.remove('buttonActive');
        document.getElementById("categoryEditOthers").classList.remove('buttonActive');
        document.getElementById("categoryEditUrgent").classList.add('buttonActive');
        this.modalEdit.category = 'urgent'
        this.modalEdit.descCategory = 'Urgente'
        this.modalEdit.degree = 3;
      }
      else if(value == 'important'){
        document.getElementById("categoryEditUrgent").classList.remove('buttonActive');
        document.getElementById("categoryEditOthers").classList.remove('buttonActive');
        document.getElementById("categoryEditImportant").classList.add('buttonActive');
        this.modalEdit.category = 'important'
        this.modalEdit.descCategory = 'Importante'
        this.modalEdit.degree = 2;
      }
      else if(value == 'others'){
        document.getElementById("categoryEditUrgent").classList.remove('buttonActive');
        document.getElementById("categoryEditImportant").classList.remove('buttonActive');
        document.getElementById("categoryEditOthers").classList.add('buttonActive');
        this.modalEdit.category = 'others'
        this.modalEdit.descCategory = 'Outras'
        this.modalEdit.degree = 1;
      }
    },
    orderArray(){
      this.tasks = JSON.parse(localStorage.getItem('tasks')).sort((a, b) => {
        const numberA = a.degree;
        const numberB = b.degree;
        if (numberA > numberB) {
          return -1;
        }
        if (numberA < numberB) {
          return 1;
        }
        
        // Números iguais
        return 0;
      });
    },
    quant(){
      if(this.tasks == null) return 0;
      
      var count = this.tasks.filter(element => element.checked != true).length
      return count;
    },
    filterTasks(value){
      if(value == 'all'){
        if(this.inputSearch.trim() == ''){
          this.arrayFiltered = this.tasks;
        } else{
          this.orderArray();
          this.arrayFiltered = this.tasks.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()));
        }
      } else if(value == 'finished'){
        this.arrayFiltered = this.tasks.filter(element => element.checked == true)
        if(this.inputSearch.trim() != ''){
          this.orderArray();
          this.arrayFiltered = this.arrayFiltered.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()));
        }
      } else{
        this.arrayFiltered = this.tasks.filter(element => element.category == value)
        if(this.inputSearch.trim() != ''){
          this.arrayFiltered = this.arrayFiltered.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()));
        }
      }
    }
  },
  components: {
    Navbar
  },
  filters: {
    showMsgTasks(value){
      var msg = value == 0 ? 'nenhuma tarefa' : value == 1 ? value + ' tarefa' : value + ' tarefas'
      return msg
    },
    
    totalUrgent(value){
      let data = value.filter(element => element.category == 'urgent').length;
      return data;
    },
    
    totalImportant(value){
      let data = value.filter(element => element.category == 'important').length;
      return data
    },
    totalOthers(value){
      let data = value.filter(element => element.category == 'others').length;
      return data
    },
  },
  watch:{
    'inputSearch' () {
      this.orderArray();
      if(this.inputSearch.trim() == ''){
        this.arrayFiltered = this.tasks
        this.verify();
      } else{ // filtrar de acordo com o que está selecionado () urgentes... importantes..
        this.arrayFiltered = this.tasks.filter(element => element.title.toLowerCase().match(this.inputSearch.toLowerCase()) || element.description.toLowerCase().match(this.inputSearch.toLowerCase()));
        this.verify();
      }
    }
  },
  created(){
    if(window) {
      if(localStorage.getItem('tasks') == null){
        localStorage.setItem("tasks", JSON.stringify([]))
      }
      this.orderArray();
      this.arrayFiltered = this.tasks;
    } 
  }

}
</script>


