<template>
  <div id="app">
    <nav>
      <h3>Cinemax</h3>
    </nav>

    <input type="text" placeholder="Digite o nome do filme">
    <button>Buscar</button>
    <hr>
    <h5>Alguns de nossos filmes favoritos</h5>

    <Movie :movies='movies' />
  </div>
</template>

<script>
import Movie from './components/Movie.vue'

export default {
  name: 'App',
  data(){
    return {
      movies: [
        {
          id:1,
          title: 'Homem Aranha',
          date: 2008
        },
        {
          id:2,
          title: 'Iron Man',
          date: 2008
        }
      ]
    }
  },
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
}

nav {
  width: 100%;
  padding: 0.5rem;
  background-color: black;
  margin-bottom: 1.5rem;
}

h3{
  color: rgb(248, 244, 244);
}

button{
  margin-left: .3rem;
}

hr{
  width: 75%;
}

</style>
