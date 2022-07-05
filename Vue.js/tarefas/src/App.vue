<template>
  <v-app>
    <v-row class="d-flex justify-center">
      <v-col :cols="7">
        <h3>Lista de Tarefas</h3>

        <v-alert v-show="error" type="error">O campo logo a baixo não pode ser vazio.</v-alert>
        <v-text-field v-model="message" @keypress="error = false" label="Descrição da Tarefa"></v-text-field>
        <v-btn depressed color="info" @click="addTask()">Adicionar</v-btn>
      </v-col>
      <v-col v-for="task in tasks" :key="task.id" :cols="7" class="itens">
        <Tasks :task="task" @deleteThisTask="destroyTask($event)"/>
      </v-col>
    </v-row>
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
      tasks: [
        {
          id: 1,
          descricao: 'Acordar Cedo',
          checked: true
        }, {
          id: 2,
          descricao: 'Caminhar',
          checked: false
        }, {
          id: 3,
          descricao: 'Estudar',
          checked: false
        }, {
          id: 4,
          descricao: 'Trabalhar',
          checked: false
        }, 
        {
          id: 5,
          descricao: 'Trabalharrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa adas',
          checked: false
        }
      ]
    }
  },
  components: {
    Tasks
  }, methods: {
    addTask: function(){
      if(this.message.trim() != '') {
        this.tasks.push({ id: Date.now(), descricao: this.message, checked: false })
        this.message = '';
      } else {
        this.error = true;
        this.message = '';
      }
    }, 
    destroyTask($event){
      var id = $event.idTask
      var novoArray = this.tasks.filter(element => element.id != id)
      this.tasks = novoArray;
    }
  }
}
</script>

<style scoped>
.itens{
  word-break: break-all;
  margin-bottom: .5rem;
  margin-top: .5rem;
  background-color: #f4f4f4;
}

</style>
