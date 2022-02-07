<template>
  <div id="app">
    <nav>
      <h3>Cinemax</h3>
    </nav>

    <input type="text" placeholder="Digite o nome do filme" />
    <button>Buscar</button>
    <hr>

    <Movie :moviesPopular="moviesPopular" />
  </div>
</template>

<script>
import Movie from "./components/Movie.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      apiV3Auth: "d6f0ef55abc9bbf18dbe5089523aad16",
      
      moviesPopular: []
    };
  },
  components: {
    Movie,
  },
  created(){
    axios.get("https://api.themoviedb.org/3/movie/popular?api_key=d6f0ef55abc9bbf18dbe5089523aad16&language=pt-BR&page=1").then(res=> {
      //console.log(res.data.results)
      this.moviesPopular = res.data.results
    })
  }
};
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

h3 {
  color: rgb(248, 244, 244);
}

button {
  margin-left: 0.3rem;
}

hr {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}
</style>
