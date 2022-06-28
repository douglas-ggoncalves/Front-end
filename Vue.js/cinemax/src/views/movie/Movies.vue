<template>
  <div id="main">
    <div class="data text-center">
      <h2>Filmes em Cartaz</h2>
      <button v-if="this.movie.filmesEmCartaz.length == 0" class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only"> Buscando os dados...</span>
      </button>

      <carousel :loop="true" :autoplayTimeout="5000" autoplay :perPageCustom="[[0, 1], [400, 2], [768, 3], [1024, 5]]">
        <slide v-for="(movie, index) in movie.filmesEmCartaz" :key="index">
          <a :href="'filme/'+movie.id">
            <div class="elements">
              <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
            </div>
          </a>
        </slide>
      </carousel>
    </div>

    <div class="data text-center">
      <h2>Filmes Populares</h2>
      <button v-if="this.movie.moviesPopular.length == 0" class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only"> Buscando os dados...</span>
      </button>

      <carousel :perPageCustom="[[0, 1], [400, 2], [768, 3], [1024, 5]]">
        <slide v-for="movie in movie.moviesPopular" :key="movie.id">
          <a :href="'filme/'+movie.id">
            <div class="elements">
              <img class="img-fluid" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
            </div>
          </a>
        </slide>
      </carousel>
    </div>
    
    <div class="data text-center">
      <h2>Filmes Mais Bem Avaliados</h2>
      <button v-if="this.movie.moviesTopRated.length == 0" class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only"> Buscando os dados...</span>
      </button>

      <carousel :perPageCustom="[[0, 1], [400, 2], [768, 3], [1024, 5]]">
        <slide v-for="movie in movie.moviesTopRated" :key="movie.id">
          <a :href="'filme/'+movie.id">
            <div class="elements">
              <div>
                <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
                <button>
                  {{ movie.vote_average }}
                </button>
              </div>
            </div>
          </a>
        </slide>
      </carousel>
    </div>

    <div class="data text-center">
      <h2>Filmes Recentemente Lançados</h2>
      <button v-if="this.movie.moviesUpcoming.length == 0" class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only"> Buscando os dados...</span>
      </button>

      <carousel :perPageCustom="[[0, 1], [400, 2], [768, 3], [1024, 5]]">
        <slide v-for="movie in movie.moviesUpcoming" :key="movie.id">
          <a :href="'filme/'+movie.id">
            <div class="elements">
              <span>
                <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path ">
                <h3>{{ movie.id }}</h3>
              </span>
            </div>
          </a>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import Multiselect from 'vue-multiselect'
import VueCarousel from 'vue-carousel';
import  "../../assets/css/style.css";
import  script from "../../assets/js/script.js";
import _ from "lodash";

Vue.component('multiselect', Multiselect)
Vue.use(VueCarousel);

export default {
  data() {
    return {
      myResponsive: [[0, 1], [400, 2], [768, 3], [1024, 5]],
      apiV3Auth: "",
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
  methods: {
    
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth;

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
          if(element.vote_average > 8.4){
            this.auxTop.push(element)
          }
        })
      })
    }
    this.movie.moviesTopRated = _.orderBy(this.auxTop, ['vote_average'], ['desc'])

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