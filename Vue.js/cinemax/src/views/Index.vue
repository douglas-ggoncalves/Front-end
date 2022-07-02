<template>
  <div class="data">
    <div id="title">
      <h2>Os Mais Populares</h2>
      
      <button type="button" class="btn position-relative" 
      :class="{'btn-light': viewMoviePopular,'btn-outline-light': !viewMoviePopular}" @click="viewMoviePopular = true; viewSeriePopular = false;">
          Filmes
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
          {{ this.data.arrayMoviesPopular.length }}
        </span>
      </button>
      
      <button type="button" class="btn position-relative"
      :class="{'btn-light': !viewMoviePopular,'btn-outline-light': viewMoviePopular}" @click="viewMoviePopular = false; viewSeriePopular = true;">
          Séries
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
          {{ this.data.arraySeriesPopular.length }}
        </span>
      </button>
    </div>

    <button v-if="this.data.arrayMoviesPopular.length == 0 && viewMoviePopular" class="btn btn-dark" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span class="sr-only"> Buscando os dados...</span>
    </button>

    <carousel navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" :autoplayTimeout="5000" autoplay 
      :perPageCustom="[[0, 1], [600, 2], [768, 3], [1024, 4], [1200, 5]]" v-show="viewMoviePopular"
      style="max-width: 100%">
      <slide v-for="(data, index) in data.arrayMoviesPopular" :key="index">
        <a :href="'filme/'+data.id">
          <div class="elements">
            <img :src="'https://image.tmdb.org/t/p/w500/' + data.poster_path">
          </div>
        </a>
      </slide>
    </carousel>
      
    <button v-if="this.data.arraySeriesPopular.length == 0 && !viewMoviePopular" class="btn btn-dark" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span class="sr-only"> Buscando os dados...</span>
    </button>
    <carousel navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" :autoplayTimeout="5000" autoplay 
      :perPageCustom="[[0, 1], [600, 2], [768, 3], [1024, 4], [1200, 5]]" v-show="!viewMoviePopular">
      <slide v-for="(data, index) in data.arraySeriesPopular" :key="index">
        <a :href="'serie/'+data.id">
          <div class="elements">
            <img :src="'https://image.tmdb.org/t/p/w500/' + data.poster_path">
          </div>
        </a>
      </slide>
    </carousel>
    
    <h2>Filmes em Cartaz</h2>
    <button :loop="true" :autoplayTimeout="5000" autoplay  v-if="this.data.arrayMoviesInPoster.length == 0" class="btn btn-dark" type="button" disabled>
      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      <span class="sr-only"> Buscando os dados...</span>
    </button>

    <carousel navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" 
      :perPageCustom="[[0, 1], [600, 2], [768, 3], [1024, 4], [1200, 5]]">
      <slide v-for="(movie, index) in data.arrayMoviesInPoster" :key="index">
        <a :href="'filme/'+movie.id">
          <div class="elements">
            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
          </div>
        </a>
      </slide>
    </carousel>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue';
import VueCarousel from 'vue-carousel';
import  "../assets/css/style.css";
import  script from "../assets/js/script.js";
import _ from "lodash";

Vue.use(VueCarousel);

export default {
  data() {
    return {
      apiV3Auth: "",
      viewMoviePopular: true,
      viewSeriePopular: true,
      aux: [],
      minDate: '',
      data: {
        arrayMoviesPopular: [],
        arraySeriesPopular: [],
        arrayMoviesInPoster: [],
      },
    };
  },
  methods: {
    
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth;

    for(var i=1; i<=10; i++) {
      await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${this.apiV3Auth}&language=pt-BR&page=${i}`).then(res=> {
        res.data.results.forEach(element => {
          if(element.popularity > 1000 && element.poster_path != null ){
            this.data.arrayMoviesPopular.push(element)
          }
        })
      });
    }

    for(var y=1; y<=25; y++) {
      await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiV3Auth}&language=pt-BR&page=${y}`).then(res=> {
        res.data.results.forEach(element => {
          if(element.popularity > 800 && element.poster_path != null ){
            this.data.arraySeriesPopular.push(element)
          }
        })
      });
    }

    for(var a=1; a <= 67; a++) {
      await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiV3Auth}&language=pt-BR&page=${a}`).then(res=> {
        this.minDate = res.data.dates.minimum;

        res.data.results.forEach(element => {
         if(new Date(element.release_date) > new Date(this.minDate)){
          if(element.backdrop_path != null && element.popularity > '100'){
            this.aux.push(element)
          }
         }
        })
      })
    }
    this.data.arrayMoviesInPoster = _.orderBy(this.aux, ['popularity'], ['desc'])
  }
};
</script>