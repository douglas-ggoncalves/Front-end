<template>
  <div id="person">


    <div class="container-fluid">
        <div class="row">
            <div class="col-12 col-md-3" id="colLeft">
                <img :src="`https://image.tmdb.org/t/p/w500/${this.person.profile_path}`" alt="Imagem">
                <div>
                    <h4>Informações pessoais</h4>
                    <a target="_blank" v-if="this.networksId.facebook_id != null && this.networksId.facebook_id != ''" :href="`https://facebook.com/${this.networksId.facebook_id}`">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a target="_blank" v-if="this.networksId.twitter_id != null && this.networksId.twitter_id != ''" :href="`https://twitter.com/${this.networksId.twitter_id}`">
                        <i class="fa-brands fa-twitter"></i>
                    </a>
                    <a target="_blank" v-if="this.networksId.instagram_id != null && this.networksId.instagram_id != ''" :href="`https://instagram.com/${this.networksId.instagram_id}`">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                </div>

                <div>
                    <div v-if="this.person.deathday == null">
                        <h5>Nascimento</h5>
                        {{ this.person.birthday | convertDateBirthday}}
                    </div>
                    
                    <div v-if="this.person.deathday != null">
                        <h5>Nascimento</h5>
                        {{ this.person.birthday | convertDate}}

                        <h5>Falecimento</h5>
                        {{ this.person.deathday +'*'+ this.person.birthday | convertDateDeath}}
                    </div>
                    
                    <h5>Gênero</h5>
                    {{ this.person.gender | alterGender }}
                    <h5>Naturalidade</h5>
                    {{ this.person.place_of_birth }}
                </div>
                <hr>
            </div>
            
            <div class="col-12 offset-md-1 col-md-6 offset-lg-0 col-lg-9">
                <h2>{{ this.person.name }}</h2>

                <h4>Biografia</h4>
                
                <span v-if="this.person.biography != null && this.person.biography != ''">
                    {{ this.person.biography }}
                </span>
                <span v-else>
                    Biografia não disponível
                </span>

                <h4>Conhecido por</h4>
                <carousel :perPageCustom="[[768, 3], [1024, 5]]">
                    <slide v-for="(part) in participationFiltred" :key="part.id" class="text-center">
                        <span>
                            <a v-if="part.media_type == 'movie'" target="ablank" :href="`/filme/${part.id}`">
                                <img style="max-height: 400px" class="img-fluid" :src="'https://image.tmdb.org/t/p/w500/' + part.poster_path">
                                <div>
                                    {{ part.title }}
                                </div>
                            </a>

                            <a v-else target="ablank" :href="`/serie/${part.id}`">
                                <img style="max-height: 400px" class="img-fluid" :src="'https://image.tmdb.org/t/p/w500/' + part.poster_path">
                                <div>
                                    {{ part.title }}
                                </div>
                            </a>
                        </span>
                    </slide>
                </carousel>

                <h4 class="mt-5">Participações</h4>
                <ul class="timeline">
                    <li v-for="(part,index) in participation" :key="index">
                        <span v-if="part.media_type == 'movie'">
                            <a target="_blank" :href="`/filme/${part.id}`">{{ part.title }}</a>
                            <span>{{ part.release_date | convertDate }}</span>
                            <span v-if="part.character != undefined && part.character != ''">
                                como {{ part.character }}
                            </span>
                        </span>
                        
                        <span v-else>
                            <a target="_blank" :href="`/serie/${part.id}`">{{ part.title }}</a>
                            <span>{{ part.release_date | convertDate }}</span>
                            <span v-if="part.character != undefined && part.character != ''">
                                como {{ part.character }}
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
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
      person: [],
      networksId: [],
      participation:[],
      participationFiltred:[],
      testeeee: [
        
      ],
    }
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth
    
    await axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}?api_key=${this.apiV3Auth}&language=pt-BR&append_to_response=releases`)
    .then(res => {
        this.person = res.data
    }).catch(err => {
        console.log(err)
    })
    
    await axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}/external_ids?api_key=${this.apiV3Auth}&language=pt-BR&append_to_response=releases`)
    .then(res => {
        this.networksId = res.data
    }).catch(err => {
        console.log(err)
    })
    
    await axios.get(`https://api.themoviedb.org/3/person/${this.$route.params.id}/combined_credits?api_key=${this.apiV3Auth}&language=pt-BR&append_to_response=releases`)
    .then(res => {
        res.data.cast.forEach(element => {
            var existPostInArray = _.find(this.participation, function(part) { return part.poster_path == element.poster_path})
            if(!existPostInArray){
                if(element.poster_path != null && element.poster_path != ''){
                    if(element.media_type == 'movie'){
                        this.participation.push({id: element.id, title: element.title, release_date: element.release_date, character: element.character, media_type: 'movie', popularity: element.popularity, poster_path: element.poster_path})
                    }
                    else if(element.media_type == 'tv'){
                        this.participation.push({id: element.id, title: element.name, release_date: element.first_air_date, character: element.character, media_type: 'tv', poster_path: element.poster_path})
                    }
                }
            }
        });

        res.data.crew.forEach(element => {
            var existPostInArray = _.find(this.participation, function(part) { return part.poster_path == element.poster_path})
            if(!existPostInArray){
                if(element.poster_path != null && element.poster_path != ''){
                    if(element.media_type == 'movie'){
                        this.participation.push({id: element.id, title: element.title, release_date: element.release_date, character: element.character, media_type: 'movie', popularity: element.popularity, poster_path: element.poster_path})
                    }
                    else if(element.media_type == 'tv'){
                        this.participation.push({id: element.id, title: element.name, release_date: element.first_air_date, character: element.character, media_type: 'tv', poster_path: element.poster_path})
                    }
                }
            }
        });
    }).catch(err => {
        console.log(err)
    })
    //console.log(this.participation)

    this.participationFiltred = _.orderBy(this.participation, ['popularity'], ['desc'])
    this.participationFiltred = _.slice(this.participationFiltred, [0], [10])
    this.participation = _.orderBy(this.participation, ['release_date'], ['desc'])
    //this.participation = _.orderBy(this.participation, ['first_air_date'], ['desc'])

  
  },
  filters: {
    convertDate(value){
        if(value == undefined || value == ''){
            return ''
        }
        var string = value.split('-');
        return `${string[2]}/${string[1]}/${string[0]}`; 
    },
    convertDateBirthday(value){
        var currentDate = new Date();
        var anoAtual = currentDate.getFullYear();
        var string = value.split('-');
        var age = anoAtual - string[0];
        var currentMonth =  currentDate.getMonth() + 1; 

        if(currentMonth < string[1]){
           age--; 
        } else {
            if(currentMonth == string[1]){ 
                if(new Date().getDate() < string[2] ){ 
                    age--; 
                }
            }
        }
        return `${string[2]}/${string[1]}/${string[0]} (${age} Anos de idade)`; 
    },
    convertDateDeath(value){
        var dates = value.split("*")
        var dateDeath = dates[0].split("-")
        var dateNasc = dates[1].split("-")
        var idadeMorte = dateDeath[0] - dateNasc[0]
        var age = idadeMorte

        if(dateDeath[1] < dateNasc[1]){
            age--; 
            } else {
                if(dateDeath[1] == dateNasc[1]){ 
                    if(new Date().getDate() < dateNasc[2] ){ 
                        age--; 
                    }
                }
            }

        return `${dateDeath[2]}/${dateDeath[1]}/${dateDeath[0]} (${age} Anos de idade)`; 
    },
    alterGender(value){
        if(value == 1){
            return 'Feminino'
        }
        if(value == 2){
            return 'Masculino'
        }
    }
  }
}
</script>