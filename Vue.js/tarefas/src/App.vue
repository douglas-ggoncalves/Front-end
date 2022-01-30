<template>
  <div id="app">
    <h3>Lista de Tarefas</h3>
    <div id="firstDiv">
      <input v-model="message" placeholder="Adicionar Tarefa">
      <button @click="addTask()">Adicionar Tarefa</button>
      <hr>
    </div>

    <div v-for="task in tasks" :key="task.id">
      <Tasks :task="task" @deleteThisTask="destroyTask($event)"/>
    </div>
  </div>
</template>

<script>
import Tasks from './components/Tasks.vue'

export default {
  name: 'App',
  data() {
    return {
      message: '',
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
        alert("Valor inválido, preencha o campo adicionar tarefa antes de adicionar");
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#app #firstDiv{
  margin: .5rem .3rem;
}

input{
  margin: .5rem .1rem;
  height: 100% !important;
  padding: .4em .7rem;
}

hr{
  width: 50%;
  margin-bottom: 1.5rem
}

button {
  cursor: pointer;
  outline: none;
  border: none;
  padding: .5rem .7rem;
  color: white;
  background-color: #18ad22;
}
</style>
