<template>
  <div id="movie">
    <div class="container-fluid" id="banner">
      <div class="row px-xl-3">
        <div class="d-none d-md-block" id="background" :style="{'background-image': `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}"/>

        <div class="col-12 col-md-4 col-xl-3 d-flex justify-content-center">
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
        </div>

        <div class="col-12 col-md-8 col-xl-7 d-flex justify-content-center">
          <div id="content">
            <h1>{{ movie.title }}</h1>

            <div>
              <div id="years">
                <span :class="{ 
                isGreen: this.movieCert.certification == 'L', 
                isBlue: this.movieCert.certification == '10',
                isYellow: this.movieCert.certification == '12',
                isOrange: this.movieCert.certification == '14',
                isRed: this.movieCert.certification == '16',
                isBlack: this.movieCert.certification == '18'
                }">
                  {{ this.movieCert.certification }}
                </span>
              </div>

              {{ movie.release_date | convertDate }} | 
              <span v-for="(movieGenres, index) in movie.genres" :key="index">
                {{ movieGenres.name }}<span v-if="movie.genres.length > index + 1">,</span>
              </span>
              | 
              {{ movie.runtime | minutesForHours }}
            </div>

            <div id="sinopse">
              <h6>{{ movie.tagline }}</h6>
              <h3>Sinopse</h3>
              {{ movie.overview }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid" id="media">
      <div class="row px-xl-3" style="border: 1px solid red">
        <h4>Midia</h4>

        <div>
          <button>Mais Populares</button>
          <button>Vídeos</button>
          <button>Imagens de fundo</button>
          <button>Pôsteres</button>
        </div>

        <carousel :paginationEnabled="false" v-if="videoShow">
          <slide v-for="movie in this.movie.releases.countries" :key="movie.id">
            <a :href="'filme/'+movie.id">
              <div class="elements">
                <img class="img-fluid" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
              </div>
            </a>
          </slide>
      </carousel>


      </div>
    </div>

  </div>
</template>

<script>
import _ from "lodash";
import axios from "axios";
import  script from "../../assets/js/script.js";
import  "../../assets/css/style.css";

export default {
  data(){
    return{
      apiV3Auth: "",
      movieCert: '',
      videoShow: false,
      movie: {}
    }
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth
    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.apiV3Auth}&language=pt-BR&append_to_response=releases`).then(res=> {
      this.movie = res.data
    }).catch(err => {
      console.log(err)
    })
      var x = _.find(this.movie.releases.countries, function(movie) { return movie.iso_3166_1 == 'BR'; })
      this.movieCert = x
      console.log(x);
    
  },
  filters: {
    minutesForHours(value){
      var hours = (value / 60);
      var rhours = Math.floor(hours);
      var minutes = (hours - rhours) * 60;
      var rminutes = Math.round(minutes);
      return rhours + "h " + rminutes + " m."; 
    },
    convertDate(value){
      var string = value.split('-');
      return string[2] + '/' + string[1] +'/'+ string[0]; 
    }
  }
}
</script>