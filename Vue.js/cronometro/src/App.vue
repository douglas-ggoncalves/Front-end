<template>
  <div id="app">
    <div>
      <h1>Cronômetro</h1>
      <h3>Cronômetro com Vue</h3>
      <Timer/>
    </div>
  </div>
</template>

<script>
import Timer from './components/Timer.vue'

export default {
  name: 'App',
  components: {
    Timer
  },
  data(){
    return{
      
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
  display: flex;
  justify-content: center;
  height: 100%;
}

h1 {
  color: white;
}

h3 {
  color: rgba(255, 255, 255, 0.94);
}
</style>
