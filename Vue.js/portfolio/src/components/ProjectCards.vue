<template>
  <v-container fluid id="projects">
    <v-row class="d-flex justify-center">
      <v-col class="" :cols="12" :lg="10" :xl="8">
        <v-row>
          <h1>{{ $t('titleProjectCards') }}</h1>
        </v-row>

        <v-row class="d-sm-flex justify-sm-start pb-0 itens"> <!-- d-flex justify-start  -->
          <v-col class="d-sm-flex" :cols="12" :lg="10" :xl="8"> <!-- d-flex -->
            <v-col
              class="pb-0 px-0 pb-sm-3 pr-sm-3 pl-lg-3"
              :cols="12"
              :sm="7"
              :md="5"
            >
              <v-select
                v-model="selectedLanguages"
                :item-value="item => item"
                :items="languages"
                :label="$t('titleSelectLanguage')"
                multiple
                variant="outlined"
              >
                <template v-slot:prepend-item>
                  <v-list-item
                    :title="$t('labelSelect')"
                    @click="toggle"
                  >
                    <template v-slot:prepend>
                      <v-checkbox-btn
                        :color="selectedSomeData ? 'white' : undefined"
                        :indeterminate="selectedSomeData && !selectAllLanguage"
                        :model-value="selectedSomeData"
                      ></v-checkbox-btn>
                    </template>
                  </v-list-item>

                  <v-divider class="mt-2"></v-divider>
                </template>
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index < 2">
                    <span>{{ item.title }}</span>
                  </v-chip>
                  <span
                    v-if="index === 2"
                    class="text-grey text-caption align-self-center"
                  >
                    (+ {{ selectedLanguages.length - 2 }} {{ selectedLanguages.length - 2 == 1 ? ($t('spanOther')) : ($t('spanOthers')) }})
                  </span>
                </template>
              </v-select>
            </v-col>
            
            <v-col
              class="pa-0 py-sm-3 "
              :cols="12"
              :sm="5"
              :md="3"
            >
              <v-select
                v-model="orderSelected" 
                item-value="id"
                :label="$t('titleOrderItems')"
                :items="$tm('orderItems')"
                variant="outlined"
              ></v-select>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <swiper
      :key="swiperKey"
      :navigation="true"
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'2.8'"
      :initialSlide="2"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.8,
        slideShadows: true,
      }"
      :spaceBetween="0"
      :pagination="{
        clickable: true
      }"
      
      :modules="modules"
      :clickable="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(project, index) in sortedProjects" :key="index">
        <img 
          class="swiper-image"
          :src="project.src" 
        />

         <div class="content" style="">
            <h2>{{ project.title }}</h2>
            <p>{{ project.relevance }}</p>
          </div>
      </swiper-slide>

    </swiper>
  </v-container>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

  export default {
    components: {
      Swiper,
      SwiperSlide,
    },
    data() {
      return {
        orderSelected: 0,
        arrayProjects: [
          { tech: [{ code: 0 }, { code: 1 }, { code: 2 }, { code: 3 }, { code: 34 }], relevance: 10, title: "Burger", data: "16-04-2022", src: require('@/assets/img/Burger.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }, { code: 9 }], relevance: 10, title: "Coffee", data: "17-05-2022", src: require('@/assets/img/Coffee.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 2 }, { code: 3 }], relevance: 9, title: "Age Sport", data: "14-05-2022", src: require('@/assets/img/Age Sport.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }, { code: 9 }], relevance: 8, title: "BeatUp", data: "15-04-2022", src: require('@/assets/img/BeatUp.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }], relevance: 7, title: "Construction", data: "15-06-2022", src: require('@/assets/img/Construction.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }], relevance: 8, title: "DentalCare", data: "15-07-2022", src: require('@/assets/img/DentalCare.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 },{ code: 3 }], relevance: 8, title: "Education Site", data: "15-07-2022", src: require('@/assets/img/Education Site.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 2 }], relevance: 7, title: "Finans", data: "15-01-2022", src: require('@/assets/img/Finans.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }], relevance: 7, title: "Illustration", data: "15-07-2022", src: require('@/assets/img/Illustration.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 2 }], relevance: 8, title: "Maximus", data: "15-07-2022", src: require('@/assets/img/Maximus.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }], relevance: 8, title: "Online Education", data: "18-06-2022", src: require('@/assets/img/Online Education.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 2 }], relevance: 10, title: "Travel WebSite", data: "16-06-2022", src: require('@/assets/img/Travel Website.png')},
          //
          { tech: [{ code: 4 }, { code: 6 }, { code: 10 }, { code: 15 }, { code: 8 }], relevance: 10, title: "API de Usuários", data: "16-06-2022", src: require('@/assets/img/API de Usuários.png')},
          { tech: [{ code: 4 }, { code: 1 }], relevance: 10, title: "Calculadora", data: "16-06-2022", src: require('@/assets/img/Calculadora.png')},
          { tech: [{ code: 4 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 10 }, { code: 16 }], relevance: 10, title: "Cinemax", data: "16-06-2022", src: require('@/assets/img/Cinemax.png')},
          { tech: [{ code: 4 }, { code: 1 }], relevance: 10, title: "Cronômetro", data: "16-06-2022", src: require('@/assets/img/Cronômetro.png')},
          { tech: [{ code: 4 }, { code: 0 }, { code: 1 }, { code: 18 }], relevance: 10, title: "Facilita Tasks", data: "16-06-2022", src: require('@/assets/img/Facilita Tasks.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }], relevance: 10, title: "Gerador de Senhas", data: "16-06-2022", src: require('@/assets/img/Gerador de Senhas.png')},
          { tech: [{ code: 4 }, { code: 1 }, { code: 5 }, { code: 17 }], relevance: 10, title: "Gestão Financeira", data: "16-06-2022", src: require('@/assets/img/Gestão Financeira.png')},
          { tech: [{ code: 6 }, { code: 13 }, { code: 1 }, { code: 5 }, { code: 3 }, { code: 8 }], relevance: 7, title: "Guia Perguntas", data: "16-06-2022", src: require('@/assets/img/Guia Perguntas.png')},
          { tech: [{ code: 4 }, { code: 1 }, { code: 17 }], relevance: 7, title: "Lista de Tarefas", data: "16-06-2022", src: require('@/assets/img/Lista de Tarefas.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 3 }], relevance: 7.6, title: "Mata Mosquito", data: "16-06-2022", src: require('@/assets/img/Mata Mosquito.png')},
          { tech: [{ code: 4 }, { code: 1 }, { code: 10 }], relevance: 8.2, title: "Pokedex", data: "16-06-2022", src: require('@/assets/img/Pokedex.png')},
          { tech: [{ code: 6 }, { code: 13 }, { code: 1 }, { code: 3 }, { code: 8 }], relevance: 6.9, title: "Realiza Assessoria", data: "16-06-2022", src: require('@/assets/img/Realiza Assessoria.png')},
          { tech: [{ code: 4 }, { code: 6 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 16 }, { code: 7 }], relevance: 10, title: "Sistema Maximus", data: "16-06-2022", src: require('@/assets/img/Sistema Maximus.png')},
          { tech: [{ code: 0 }, { code: 1 }, { code: 2 }], relevance: 9, title: "Spotify", data: "16-01-2022", src: require('@/assets/img/Spotify.png')},
          
        ],
        selectedLanguages: [],
      }
    },
    setup() {
      return {
        modules: [EffectCoverflow, Pagination, Navigation],
      };
    },
    computed: {
      selectAllLanguage () {
        return this.selectedLanguages.length === this.languages.length
      },
      selectedSomeData () {
        return this.selectedLanguages.length > 0
      },
      sortedProjects() {
        // Primeiro filtra os projetos com base nas tecnologias selecionadas
        let objectFiltered = this.arrayProjects.filter(project =>
          project.tech.some(techItem =>
            this.selectedLanguages.find(tech => tech.code === techItem.code) !== undefined
          )
        );

        switch (this.orderSelected) {
          
          case 0: // data
            return objectFiltered.slice().sort((a, b) => {
              const dateA = new Date(a.data.split("-").reverse().join("-"));
              const dateB = new Date(b.data.split("-").reverse().join("-"));
              return dateB - dateA; // Do mais recente para o mais antigo
            });
          case 1: // title
            return objectFiltered.slice().sort((a, b) => a.title.localeCompare(b.title));

          case 2: // relevance
            return objectFiltered.slice().sort((a, b) => b.relevance - a.relevance); // Do mais relevante para o menos relevante

          default:
            return objectFiltered;
        }
      },
    },
    watch: {
      sortedProjects(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$nextTick(() => {
            // Seleciona o primeiro ponto na paginação do Swiper e simula um clique
            const firstPaginationBullet = document.querySelector('.swiper-pagination-bullet:first-child');
            if (firstPaginationBullet) {
              firstPaginationBullet.click();
            }
          });
        }
      }
    },
    methods: {
      toggle () {
        if (this.selectAllLanguage) {
          this.selectedLanguages = []
        } else {
          this.selectedLanguages = this.languages.slice()
        }
      },
    },
    created(){
      
    },
    mounted() {
      var allSkills = this.$tm('allSkills');

      this.languages = allSkills.filter(element => element.title !== "Git" && element.title !== "GitHub");
      this.selectedLanguages = this.languages.slice();
    }
  };
</script>

<style lang="scss" scoped>
#app { height: 100% }

html, body {
  position: relative;
  height: 100%;
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
}
  
#projects{
  margin-top: 4.5rem;

  h1{
    padding-left: 0.4rem !important;
  }

  div.itens{
    >div{
      padding: 0 0.4rem !important;
    }
  }

    
  .swiper {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 50px;
    
    .swiper-slide-active{
      .content{
        background: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.75)) !important;
      }
    }
    
    .content {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;
      //box-sizing: border-box;
     // border-radius: 0 0 8px 8px;
      h2, p{
        padding-left: 18px;
      }

      p{
        padding-bottom: 8px;
      }
    }
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: auto;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: auto;
  }


  .tranding-slider-control .swiper-pagination {
    position: relative;
    width: 15rem;
    bottom: 1rem;
  }
}
@media (min-width: 1264px) { 
  #projects{
    h1{
      padding-left: 1rem !important;
    }

    div.itens{
      >div{
        >div{
          margin-left: 0rem !important;
        }
      }
    }
  }
}
</style>