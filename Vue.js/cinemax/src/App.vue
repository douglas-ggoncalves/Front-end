<template>
  <div id="app">
    <nav>
      <h3>Cinemax</h3>
    </nav>

    <input type="text" placeholder="Digite o nome do filme" />
    <button>
      Buscar
    </button>
    <hr>

    <Movie :movie="movie" />
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
        moviesTopRated: [],
        moviesUpcoming: []
      },
    };
  },
  components: {
    Movie,
  },
  created(){
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiV3Auth}&language=pt-BR&page=1`).then(res=> {
      this.movie.moviesPopular = res.data.results
    });

    axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiV3Auth}&language=pt-BR&page=1`).then(res=> {
      this.movie.moviesTopRated = res.data.results
    });

    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiV3Auth}&language=pt-BR`).then(res=> {
        this.movie.moviesUpcoming = res.data.results
    });
  }
};
</script>

<style scoped>
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
  outline: none;
  border-radius: 20px;
  margin-left: 0.3rem;
  padding: .5rem 1rem;
  color: #b1a9a9;
  border: 1px solid #b1a9a9;
  background-color: white;
}

button:hover {
  background-color: rgb(226, 220, 220);
}

hr {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}

input {
  padding:8px 50px 8px 20px;
  width: 50%;
  font-size: 1.05rem;
  border-top:1px solid #b1a9a9 !important;
  border: 3px solid #b1a9a9;
  border-radius:20px;
  outline:none;
}

</style>
