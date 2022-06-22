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

    <Movie :movie="movie"/>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";
import Movie from "./components/Movie.vue";
import  "./assets/css/style.css";
import _ from "lodash";

export default {
  name: "App",
  data() {
    return {
      apiV3Auth: "d6f0ef55abc9bbf18dbe5089523aad16",
      minDate: '',
      maxDate: '',
      aux: [],
      auxTop: [],
      movie: {
        filmesEmCartaz: [],
        moviesPopular: [],
        moviesTopRated: [],
        moviesUpcoming: []
      },
    };
  },
  components: {
    Movie,
  },
  async created(){

    for(var a=1; a <= 67; a++) {
      await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiV3Auth}&language=pt-BR&page=${a}`).then(res=> {
        this.minDate = res.data.dates.minimum;
        this.maxDate = res.data.dates.maximum;

        res.data.results.forEach(element => {
         if(new Date(element.release_date) > new Date(this.minDate)){
          if(element.backdrop_path != null && element.popularity > '100'){
            this.aux.push(element)
          }
         }
        })
      })
    }
    this.movie.filmesEmCartaz = _.orderBy(this.aux, ['popularity'], ['desc'])

    for(var i=1; i<=10; i++) {
      await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiV3Auth}&language=pt-BR&page=${i}`).then(res=> {
        res.data.results.forEach(element => {
          if(element.popularity > 1000){
            this.movie.moviesPopular.push(element)
          }
        })
      });
    }

    for(var x=1; x <= 50; x++) {
      await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiV3Auth}&language=pt-BR&page=${x}`).then(res=> {
        res.data.results.forEach(element => {
          if(element.vote_average > 8.0){
            this.auxTop.push(element)
          }
        })
      })
    }
    this.movie.moviesTopRated = _.orderBy(this.aux, ['vote_average'], ['desc'])


    var millisecondsInOneDay = 86400000;
    let today = Math.round(new Date() / millisecondsInOneDay);
    var parts;
    var mydate;
    var split;
    var split1;
    var split2;
    var split3;
  
    for(var z=1; z <= 10; z++) {
      await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiV3Auth}&language=pt-BR&page=${z}`).then(res=> {
        res.data.results.forEach(element => {
          if(element.original_language == 'en' || element.original_language == 'pt'){
            parts = element.release_date.split('-');
            mydate = Math.round(new Date(parts[0], parts[1] - 1, parts[2]) / millisecondsInOneDay)
            if(element.backdrop_path != null){
              if((mydate - today) < 30 && (mydate - today) > 0){
                split = element.release_date.split("-")
                split1 = split[0]
                split2 = split[1]
                split3 = split[2]
                element.release_date = `${split3}-${split2}-${split1}` 
                this.movie.moviesUpcoming.push(element)
              }
            }
          }
        })
      })
    }

    
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
