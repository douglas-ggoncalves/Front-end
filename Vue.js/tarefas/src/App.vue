<template>
  <v-app>
    <v-container>
      <v-row class="d-flex justify-center py-5">
        <v-col class="pl-0" :cols="10" :md="7">
          <h3>Lista de Tarefas</h3>
          
          <v-alert v-show="error" type="error">O campo logo abaixo não pode ser vazio.</v-alert>
          <v-text-field v-model="message" @keydown="error = false" @keyup.enter="addTask()" label="Descrição da Tarefa"></v-text-field>
          <v-btn depressed color="info" @click="addTask($event)">Adicionar</v-btn>
        </v-col>

        <v-col v-for="task in tasks" :key="task.id" :cols="10" :md="7" class="itens">
          <Tasks :task="task" @deleteThisTask="destroyTask($event)" @updateThisTask="updateTask()" @cancelUp="cancelUpdate()"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Tasks from './components/Tasks.vue'

export default {
  name: 'App',
  data() {
    return {
      message: '',
      error: false,
      tasks: []
    }
  },
  components: {
    Tasks
  }, 
  methods: {
    addTask: function(){
      if(this.message.trim() != '') {
        if(window) {
          if(this.tasks != null){
            if(this.tasks.length > 0){
              this.tasks.push({ id: Date.now(), descricao: this.message, checked: false })
            } else{
              this.tasks[0] = {id: Date.now(), descricao: this.message, checked: false}
            }
          } else{
            this.tasks = [{id: Date.now(), descricao: this.message, checked: false}]
          }
          
          localStorage.setItem("tasks", JSON.stringify(this.tasks));
          this.message = '';
        }
      } else {
        this.error = true;
        this.message = '';
      }
    }, 
    destroyTask($event){
      if(window) {
        var id = $event.idTask
        var novoArray = this.tasks.filter(element => element.id != id)
        this.tasks = novoArray;
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    },
    updateTask(){
      if(window) {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
      }
    },
    cancelUpdate(){
      if(window) {
        this.tasks = JSON.parse(localStorage.getItem('tasks'))
      }
    }
  }, created(){
    if(window) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'))
    } 
  }
}
</script>

<style scoped>
.itens{
  word-break: break-all;
  margin-bottom: .5rem;
  margin-top: .5rem;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  display: flex;
  align-items: center;
}

h3{
  margin-top: 1rem;
}
</style>
