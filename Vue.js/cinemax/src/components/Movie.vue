<template>
  <div id="main">
    <div class="data text-center">
      <h2>Filmes em Cartaz</h2>
      <carousel :loop="true" :autoplayTimeout="5000" autoplay :perPageCustom="[[768, 3], [1024, 5]]">
        <slide v-for="(movie, index) in movie.filmesEmCartaz" :key="index" @click="moreMetails(movie.id)">
          <div class="elements">
            <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
          </div>
        </slide>
      </carousel>
    </div>

    <div class="data text-center">
      <h2>Filmes Populares</h2>
      <carousel :perPageCustom="[[768, 3], [1024, 5]]">
        <slide v-for="movie in movie.moviesPopular" :key="movie.id" @click="moreMetails(movie.id)">
          <div class="elements">
            <img class="img-fluid" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
          </div>
        </slide>
      </carousel>
    </div>
    
    <div class="data text-center">
      <h2>Filmes Mais Bem Avaliados</h2>
      <carousel :perPageCustom="[[768, 3], [1024, 5]]">
        <slide v-for="movie in movie.moviesTopRated" :key="movie.id" @click="moreMetails(movie.id)">
          <div class="elements">
            <div>
              <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
              <button>
                {{ movie.vote_average }}
              </button>
            </div>
          </div>
        </slide>
      </carousel>
    </div>

    <div class="data text-center">
      <h2>Filmes Recentemente Lançados</h2>
      <carousel :perPageCustom="[[768, 3], [1024, 5]]">
        <slide v-for="movie in movie.moviesUpcoming" :key="movie.id" @click="moreMetails(movie.id)">
          <div class="elements">
            <span >
              <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path ">
              <h3>{{ movie.id }}</h3>
            </span>
          </div>
        </slide>
      </carousel>
    </div>
    
    <modal class="modal-open" name="moreMetails">
      <div class="container-fluid">
        <div class="row">
          <img class="img-fluid" style="width: 250px" :src="moviePhotoBanner" alt="">
          <img class="img-fluid" :src="moviePhotoBack" alt="">
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import VModal from 'vue-js-modal'
import axios from "axios";
import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import VueCarousel from 'vue-carousel';
import  "../assets/css/style.css";

Vue.component('multiselect', Multiselect)
Vue.use(VueCarousel);

Vue.use(VModal, {
  dynamicDefaults: {height: 'auto', width: 'auto'} 
})

export default {
  data() {
    return {
      apiV3Auth: "d6f0ef55abc9bbf18dbe5089523aad16",
      movieTitle: '',
      moviePhotoBanner: '',
      moviePhotoBack: '',
      movieTagline: '',
      movieOverview: '',
      movieReleaseDate: '',
      movieTimeDuration: '', // runtime(tempo de duração)
      movieGenres: []
    };
  },
  props: {
    movie: Object
  },
  methods: {
    async moreMetails(id){
      await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiV3Auth}&language=pt-BR`).then(res =>{
        this.moviePhotoBanner = 'https://image.tmdb.org/t/p/w500' + res.data.poster_path
        this.moviePhotoBack = 'https://image.tmdb.org/t/p/w500' + res.data.backdrop_path
      }).catch(err => {
        console.log(err)
      })
      this.$modal.show(`moreMetails`);
    }
  }
};
</script>