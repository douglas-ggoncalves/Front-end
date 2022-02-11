<template>
  <div id="app">
    <nav>
      <h3>Cinemax</h3>
    </nav>

    <input type="text" placeholder="Digite o nome do filme" />
    <button>Buscar</button>
    <hr>

    <Movie :movie="movie" :moviesPopular="moviesPopular" :moviesTopRated="moviesTopRated" />
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
      movie: {
        moviesPopular: [],
        moviesTopRated: []
      },
    };
  },
  components: {
    Movie,
  },
  created(){
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiV3Auth}&language=pt-BR&page=1`).then(res=> {
      this.movie.moviesPopular = res.data.results
    })

    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiV3Auth}&language=pt-BR&page=1`).then(res=> {
      this.movie.moviesTopRated = res.data.results
    })
  }
};
</script>

<style>
#app {
  text-align: center;
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

  /* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: red;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: red;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: red;
}
</style>
