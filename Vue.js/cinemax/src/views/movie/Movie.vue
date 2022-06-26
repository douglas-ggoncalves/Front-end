<template>
  <div id="movie">
    <div class="container-fluid" id="banner">
      <div class="row px-xl-3">
        <div class="d-none d-md-block" id="background" :style="{'background-image': `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}"/>
      </div>

      <div class="row px-xl-3" style="z-index: 5;">

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
      <div class="row px-xl-3">
        <h4>Atores</h4>
        <carousel :paginationEnabled="true" :perPageCustom="[[100, 1], [728, 2],[1024, 5]]">
          <slide v-for="pers in this.listElenc" :key="pers.profile_path" class="text-center">
            <a target="blank" :href="`https://www.themoviedb.org/t/p/original/${pers.profile_path}`">
              <img :src="'https://image.tmdb.org/t/p/w500/' + pers.profile_path">

              <div>
                Ver perfil
              </div>
            </a>
            <h6>
              {{ pers.name }}
            </h6>
            Personagens: {{ pers.character }}

          </slide>
        </carousel>
      </div>


      <div class="row px-xl-3">
        <h4>Midia</h4>

        <div>
          <button class="select" @click="videoShow = true; imageShow = false; posterShow = false" :class="{btnActive: videoShow}">Vídeos {{ this.movieVideos.length }}</button>
          <button class="select" @click="videoShow = false; imageShow = true;  posterShow = false" :class="{btnActive: imageShow}">Imagens {{ this.movieImages.length }}</button>
          <button class="select" @click="videoShow = false; imageShow = false; posterShow = true" :class="{btnActive: posterShow}">Pôsteres {{ this.moviePoster.length }}</button>
        </div>

        <carousel :paginationEnabled="true" :perPageCustom="[[100, 1], [728, 2],[1200, 3]]" v-if="videoShow">
          <slide v-for="movie in this.movieVideos" :key="movie.id" class="text-center">
            <iframe width="93%" height="315" :src="`https://www.youtube.com/embed/${movie.key}?controls=1`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            <div>
              <h3>
                {{ movie.name }}
              </h3>
            </div>
          </slide>
        </carousel>
          
        <carousel :paginationEnabled="true" :perPageCustom="[[100, 1], [728, 2],[1024, 3]]" v-if="imageShow"> <!-- :perPage="3"  -->
          <slide v-for="img in this.movieImages" :key="img.file_path" class="text-center">
            <a target="blank" :href="`https://www.themoviedb.org/t/p/original/${img.file_path}`">
              <img :src="'https://image.tmdb.org/t/p/w500/' + img.file_path">

              <div>
                Acessar imagem
              </div>
            </a>
          </slide>
        </carousel>
        
        <carousel :paginationEnabled="true" :perPageCustom="[[100, 1], [728, 2],[1024, 3]]" v-if="posterShow"> <!-- :perPage="3"  -->
          <slide v-for="post in this.moviePoster" :key="post.file_path" class="text-center">
            <a target="blank" :href="`https://www.themoviedb.org/t/p/original/${post.file_path}`">
              <img style="max-height: 520px" :src="'https://image.tmdb.org/t/p/w500/' + post.file_path">
              <div>
                Acessar pôster
              </div>
            </a>
          </slide>
        </carousel>
      </div>

      <div class="row px-xl-3 mt-5">
        <h4 style="margin-bottom: 0; line-height: 1;">Filmes similares</h4>

        <carousel :perPageCustom="[[768, 3], [1024, 5]]">
          <slide v-for="movie in movieSimilar" :key="movie.file_path" class="text-center">
            <a :href="movie.id">
              <img style="max-height: 400px" class="img-fluid" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path">
              <div>
                {{ movie.title }}
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
      movieVideos: [],
      imageShow: true,
      movieImages: [],
      posterShow: false,
      moviePoster: [],
      movieSimilar: [],
      listElenc: [],
      movie: {}
    }
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth
    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}?api_key=${this.apiV3Auth}&language=pt-BR&append_to_response=releases`).then(res=> {
      this.movie = res.data
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    var x = _.find(this.movie.releases.countries, function(movie) { return movie.iso_3166_1 == 'BR'; })
    this.movieCert = x

    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/videos?api_key=${this.apiV3Auth}&language=pt-BR`)
    .then(res => {
      this.movieVideos = res.data.results;
    }).catch(err => {
      console.log(err)
    })
    
    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/images?api_key=${this.apiV3Auth}`)
    .then(res => {
      this.movieImages = res.data.backdrops;
    }).catch(err => {
      console.log(err)
    })
    
    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/images?api_key=${this.apiV3Auth}`)
    .then(res => {
      res.data.posters.forEach(element => {
        if(element.iso_639_1 == 'pt'){
          this.moviePoster.push(element)
        }
      })
    }).catch(err => {
      console.log(err)
    })

    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/similar?api_key=${this.apiV3Auth}&language=pt-BR`)
    .then(res => {
      res.data.results.forEach(element => {
        if(element.poster_path != null){
          this.movieSimilar.push(element)
        }
      })
    }).catch(err => {
      console.log(err)
    })

    await axios.get(`https://api.themoviedb.org/3/movie/${this.$route.params.id}/credits?api_key=${this.apiV3Auth}&language=pt-BR`)
    .then(res => {
      res.data.cast.forEach(element => {
        if(element.known_for_department == 'Acting' && element.profile_path != null){
          this.listElenc.push(element)
        }
      }
      )

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