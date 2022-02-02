<template>
  <div id="app">
    <Movie/>
  </div>
</template>

<script>
import Movie from './components/Movie.vue'

export default {
  name: 'App',
  components: {
    Movie
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
  width: 100%;
}
</style>
