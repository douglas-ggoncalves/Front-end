<template>
  <div id="serie">
    <div class="container-fluid" id="banner">
      <div class="row px-xl-3" style="z-index: 5;">
        <div class="d-none d-md-block" id="background" :style="{'background-image': `url(https://image.tmdb.org/t/p/w500/${serie.backdrop_path}`}"/>

        <div class="col-12 col-md-4 col-xl-3 d-flex justify-content-center py-3">
          <img :src="'https://image.tmdb.org/t/p/w500/' + serie.poster_path">
        </div>

        <div class="col-12 col-md-8 col-xl-7"> 
          <div id="content">
            <h1>{{ serie.name }} <span style="font-size: 1.3rem">{{ serie.first_air_date | convertDate }}</span></h1>

              <div id="years" v-if="this.serieCert.rating != '' && this.serieCert.rating != null">
                <span :class="{ 
                isGreen: this.serieCert.rating == 'L', 
                isBlue: this.serieCert.rating == '10',
                isYellow: this.serieCert.rating == '12',
                isOrange: this.serieCert.rating == '14',
                isRed: this.serieCert.rating == '16',
                isBlack: this.serieCert.rating == '18'
                }">
                  {{ this.serieCert.rating }}
                </span>
              </div>
              
              <span v-for="(serieGenres, index) in serie.genres" :key="index">
                {{ serieGenres.name }}<span v-if="serie.genres.length > index + 1">,</span>
              </span>

            <div id="sinopse">
              <h6>{{ serie.tagline }}</h6>
              <h3>Sinopse</h3>
              {{ serie.overview }}
              <span v-if="serie.overview == null || serie.overview == ''">
                Esta série não possui sinopse.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid" id="media">
      <div class="row" id="rowElenc">
        <h4>Atores Principais</h4>
        <carousel class="mt-0" navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" 
          :autoplayTimeout="5000" autoplay  :perPageCustom="[[0, 1], [450, 2], [768, 3], [1024, 4], [1300, 5]]">
          <slide v-for="pers in this.listElenc" :key="pers.profile_path" class="text-center ">
            <a class="text-center" target="_blank" :href="`/pessoa/${pers.id}`">
              <div class="elements">
                <img :src="'https://image.tmdb.org/t/p/w500/' + pers.profile_path">
              </div>
              <div style="display: flex; align-items-center; width: 100%; height: 100%">
                <div style="width: 100%;">
                  <h5>
                    {{ pers.name }}
                  </h5>
                  <hr>
                  <span>
                    {{ pers.character }}
                  </span>
                </div>
              </div>
            </a>
          </slide>
        </carousel>
      </div>
      
      <div class="row">
        <h4>Midia</h4>

        <div id="divButtons">
          <button class="select" @click="videoShow = true; imageShow = false; posterShow = false" :class="{btnActive: videoShow}">Vídeos {{ this.serieVideos.length }}</button>
          <button class="select" @click="videoShow = false; imageShow = true;  posterShow = false" :class="{btnActive: imageShow}">Imagens {{ this.serieImages.length }}</button>
          <button class="select" @click="videoShow = false; imageShow = false; posterShow = true" :class="{btnActive: posterShow}">Pôsteres {{ this.seriePoster.length }}</button>
        </div>

        <carousel navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" :autoplayTimeout="5000" autoplay 
           :perPageCustom="[[100, 1], [728, 2],[1200, 3]]" v-show="videoShow">
          <h6 v-if="serieVideos.length == 0">Sem Vídeos Disponíveis</h6>

          <slide v-for="serie in this.serieVideos" :key="serie.id" class="text-center">
            <iframe width="93%" height="315" :src="`https://www.youtube.com/embed/${serie.key}?controls=1`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

            <div>
              <h3>
                {{ serie.name }}
              </h3>
            </div>
          </slide>
        </carousel>
          
        <carousel navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" :autoplayTimeout="5000" autoplay 
           :perPageCustom="[[100, 1], [728, 2],[1024, 3]]" v-show="imageShow">
          <h6 v-if="serieImages.length == 0">Sem Imagens Disponíveis</h6>

          <slide v-for="img in this.serieImages" :key="img.file_path" class="text-center">
            <a target="_blank" :href="`https://www.themoviedb.org/t/p/original/${img.file_path}`">
              <div class="elements">
                <img :src="'https://image.tmdb.org/t/p/w500/' + img.file_path">
              </div>
            </a>
          </slide>
        </carousel>
        
        <carousel navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" :autoplayTimeout="5000" autoplay 
          :perPageCustom="[[0, 1], [600, 2], [768, 3], [1024, 4], [1200, 5]]" v-show="posterShow">
          <h6 v-if="seriePoster.length == 0">Sem Pôsteres Disponíveis</h6>

          <slide v-for="post in this.seriePoster" :key="post.file_path" class="text-center">
            <a target="_blank" :href="`https://www.themoviedb.org/t/p/original/${post.file_path}`">
              <div class="elements">
                <img :src="'https://image.tmdb.org/t/p/w500/' + post.file_path">
              </div>
            </a>
          </slide>
        </carousel>
      </div>

      <div class="row mt-5">
        <h4 style="margin-bottom: 0; line-height: 1;">Recomendamos</h4>
        <carousel  navigationEnabled :navigationPrevLabel="'<'" :navigationNextLabel="'>'" :loop="true" :autoplayTimeout="5000" autoplay 
          :perPageCustom="[[0, 1], [600, 2], [768, 3], [1024, 4], [1200, 5]]">
          <slide v-for="serie in serieSimilar" :key="serie.file_path">
            <a target="_blank" :href="serie.id">
              <div class="elements">
                <img :src="'https://image.tmdb.org/t/p/w500/' + serie.poster_path">
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
      serieCert: '',
      videoShow: false,
      serieVideos: [],
      imageShow: true,
      serieImages: [],
      posterShow: false,
      seriePoster: [],
      serieSimilar: [],
      listElenc: [],
      serie: {}
    }
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth
    await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}?api_key=${this.apiV3Auth}&language=pt-BR&append_to_response=releases`).then(res=> {
      this.serie = res.data
    }).catch(err => {
      console.log(err)
    })
    var aux = [];
    await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/content_ratings?api_key=d6f0ef55abc9bbf18dbe5089523aad16&language=pt-BR&append_to_response=releases`).then(res=> {
      aux = res.data.results
    }).catch(err => {
      console.log(err)
    })
    var x = _.find( aux, function(serie) { return serie.iso_3166_1 == 'BR'; })
    this.serieCert = x

    await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/videos?api_key=${this.apiV3Auth}&language=pt-BR`)
    .then(res => {
      this.serieVideos = res.data.results;
    }).catch(err => {
      console.log(err)
    })
    
    await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/images?api_key=${this.apiV3Auth}`)
    .then(res => {
      this.serieImages = res.data.backdrops;
    }).catch(err => {
      console.log(err)
    })
    
    await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/images?api_key=${this.apiV3Auth}`)
    .then(res => {
      res.data.posters.forEach(element => {
        if(element.iso_639_1 == 'pt'){
          this.seriePoster.push(element)
        }
      })
    }).catch(err => {
      console.log(err)
    })

    await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/recommendations?api_key=${this.apiV3Auth}&language=pt-BR`)
    .then(res => {
      res.data.results.forEach(element => {
        if(element.poster_path != null){
          this.serieSimilar.push(element)
        }
      })
    }).catch(err => {
      console.log(err)
    })

    await axios.get(`https://api.themoviedb.org/3/tv/${this.$route.params.id}/credits?api_key=${this.apiV3Auth}&language=pt-BR`)
    .then(res => {
      res.data.cast.forEach(element => {
        if(this.listElenc.length <= 15){
          if(element.known_for_department == 'Acting' && element.profile_path != null){
            this.listElenc.push(element)
          }
        }
      }
    )
    }).catch(err => {
      console.log(err)
    })
    this.listElenc = _.orderBy(this.listElenc, ['popularity'], ['desc'])
  
  },
  filters: {
    convertDate(value){
      var string = value.split('-');
      return `( ${string[0]} )`; 
    }
  }
}
</script>