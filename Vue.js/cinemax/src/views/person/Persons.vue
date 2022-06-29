<template>
  <div id="persons">
    <div class="container-fluid">
        <div class="row">
            <div class="col-10 col-sm-6 col-md-4 col-lg-3 col-xl-2 elements" v-for="u in users" :key="u.id">
                <div class="first">
                    <a :href="`/pessoa/${u.id}`">
                        <img :src="`https://image.tmdb.org/t/p/w500/${u.profile_path}`" alt="">
                    </a>
                </div>
                <div class="second">
                    <a :href="`/pessoa/${u.id}`">
                        {{ u.name }}
                    </a>
                </div>
            </div>
            <nav aria-label="Page navigation example"> 
                <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{disabled: valuePage <= 1}">
                        <a class="page-link" :href="`/pessoa&page=${parseInt(valuePage) - 1}`">Anterior</a>
                    </li>

                    <li v-for="(index) in totalPages" :key="index"  class="page-item">
                        <a v-if="parseInt(index +1) <= valuePage && parseInt(index +1) >= valuePage" class="page-link" 
                            :href="`/pessoa&page=${index}`"> {{ index }} </a>

                        <a v-else-if="valuePage == index" class="page-link selected" href="#"> {{ index }}</a>
                        
                        <a v-else-if="parseInt(index -1) >= valuePage && parseInt(index -1) <= valuePage" class="page-link" 
                        :href="`/pessoa&page=${index}`"> {{ index }} </a>
                    </li>

                    <li class="page-item" :class="{disabled: valuePage >= totalPages}">
                        <a class="page-link" :href="`/pessoa&page=${parseInt(valuePage) + 1}`">Próximo</a>
                    </li>
                </ul>
            </nav>
        </div>

        
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
//import _ from "lodash";

Vue.component('multiselect', Multiselect)
Vue.use(VueCarousel);

export default {
  data() {
    return {
      apiV3Auth: "",
      users: [],
      valuePage: '',
      totalPages: [],
    };
  },
  async created(){
    this.apiV3Auth = script.apiV3Auth;
    this.valuePage = this.$route.params.id;

    

    if(this.valuePage != undefined && this.valuePage != ""){
        await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=d6f0ef55abc9bbf18dbe5089523aad16&language=pt-BR&page=${this.valuePage}`).then(res=> {
            this.totalPages = res.data.total_pages;
            res.data.results.forEach(element => {
                if(element.profile_path != null && element.profile_path != ''){
                    this.users.push(element)
                }
            })
        }).catch(() =>{
            //this.$router.push({name: 'Persons', params: { id: '14' }}) 
            this.$router.push({ redirect: window.location.href = '/pessoa&page=1' });
        })
    }
    else{
        await axios.get(`https://api.themoviedb.org/3/person/popular?api_key=d6f0ef55abc9bbf18dbe5089523aad16&language=pt-BR&page=1`).then(res=> {
            this.totalPages = res.data.total_pages;
            
            res.data.results.forEach(element => {
                if(element.profile_path != null && element.profile_path != ''){
                    this.users.push(element)
                }
            })
        })
    }
  }
};
</script>