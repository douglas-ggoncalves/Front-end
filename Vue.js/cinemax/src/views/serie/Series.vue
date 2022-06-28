<template>
  <div id="main">
    <div class="data text-center">
      <h2>Séries Populares</h2>
      <button v-if="this.serie.seriesPopular.length == 0" class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only"> Buscando os dados...</span>
      </button>

      <carousel :loop="true" :autoplayTimeout="5000" autoplay :perPageCustom="[[0, 1], [400, 2], [768, 3], [1024, 5]]">
        <slide v-for="serie in serie.seriesPopular" :key="serie.id">
          <a :href="'serie/'+serie.id">
            <div class="elements">
              <img class="img-fluid" :src="'https://image.tmdb.org/t/p/w500/' + serie.poster_path">
            </div>
          </a>
        </slide>
      </carousel>
    </div>
    
    <div class="data text-center">
      <h2>Séries Bem Avaliadas</h2>
      <button v-if="this.serie.seriesTopRated.length == 0" class="btn btn-dark" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span class="sr-only"> Buscando os dados...</span>
      </button>

      <carousel :perPageCustom="[[0, 1], [400, 2], [768, 3], [1024, 5]]">
        <slide v-for="serie in serie.seriesTopRated" :key="serie.id">
          <a :href="'serie/'+serie.id">
            <div class="elements">
              <div>
                <img :src="'https://image.tmdb.org/t/p/w500/' + serie.poster_path">
                <button>
                  {{ serie.vote_average }}
                </button>
              </div>
            </div>
          </a>
        </slide>
      </carousel>
    </div>

    <div class="data text-center">
      <h2>Novos arrays...</h2>
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
      apiV3Auth: "",
      aux: [],
      auxTop: [],
      serie:{
        seriesPopular: [],
        seriesTopRated: [],
      }
    };
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth;
    for(var i=1; i<=10; i++) {
      await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${this.apiV3Auth}&language=pt-BR&page=${i}`).then(res=> {
        res.data.results.forEach(element => {
          if(element.popularity > 800 && element.poster_path != null){
            this.serie.seriesPopular.push(element)
          }
        })
      });
    }

    for(var x=1; x <= 10; x++) {
      await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiV3Auth}&language=pt-BR&page=${x}`).then(res=> {
        res.data.results.forEach(element => {
          if(element.vote_average > 8.4 && element.poster_path != null){
            if(element.original_language == 'en' || element.original_language == 'pt'){
                this.auxTop.push(element)
            }
          }
        })
      })
    }
    this.serie.seriesTopRated = _.orderBy(this.auxTop, ['vote_average'], ['desc'])

   
  }
};
</script>