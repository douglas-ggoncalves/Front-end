<template>
  <div id="movie">
    <div class="container-fluid">
      <div id="background" :style="{'background-image': `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}"/>
        
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">

      <div id="content">
        <h1>{{ movie.original_title }}</h1>
        <div>
          <div v-for="(movieCert, index) in movie.releases.countries" :key="index" id="years">
            <span v-if="movieCert.iso_3166_1 == 'BR'" 
            :class="{ 
             isGreen: movieCert.certification == 'L', 
             isBlue: movieCert.certification == '10',
             isYellow: movieCert.certification == '12',
             isOrange: movieCert.certification == '14',
             isRed: movieCert.certification == '16',
             isBlack: movieCert.certification == '18'
             }">
              {{ movieCert.certification }}
            </span>

          </div>

<br>
          {{ movie.releases.countries[12] }}
          <br>
          {{ movie.releases.countries[13] }}
<br>
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
</template>

<script>
//import _ from "lodash";
import axios from "axios";
import  script from "../../assets/js/script.js";
import  "../../assets/css/style.css";


export default {
  data(){
    return{
      apiV3Auth: "",
      movie: {}
    }
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth
    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.apiV3Auth}&language=pt-BR&append_to_response=releases`).then(res=> {
      this.movie=res.data
    }).catch(err => {
      console.log(err)
    })
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