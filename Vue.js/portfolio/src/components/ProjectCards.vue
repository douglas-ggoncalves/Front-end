<template>
  <v-container fluid id="projects">
    <v-row class="d-flex justify-center">
      <v-col class="" :cols="12" :lg="10" :xl="8">
        <v-row>
          <h1>{{ $t('titleProjectCards') }}</h1>
        </v-row>

        <v-row class="d-sm-flex justify-sm-start pb-0 itens">
          <v-col class="d-sm-flex" :cols="12" :lg="10" :xl="8">
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

        <v-row class="text-center mt-0 itens">
          <v-col :cols="12">
            <v-col
              class="pb-0 px-0 pb-sm-3 pl-lg-3"
              :cols="12"
            >
              <v-card
                color="surface-variant"
                variant="tonal"
                v-if="sortedProjects.length == 0"
                style="padding: 0 0.4rem !important;"
              >
                <v-card-text class="font-weight-black">
                  {{ $t("noProjectsFound") }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col :cols="12">
        <swiper
          :key="swiperKey"
          :navigation="true"
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="swiperOptions.slidesPerView"
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

          <swiper-slide v-for="(project, index) in sortedProjects" :key="index" style="border-radius: 8px !important;">
            <img 
              :src="project.src" 
              style="max-width: 100%; height: auto; object-fit: contain;  border-radius: 8px;"
            />

            <div class="content" style="">
              <v-card>
                <div class="projectTitle">
                  <h2>{{ project.title }}</h2>
                </div>
                <v-divider class="border-opacity-20 mx-4"></v-divider>

                <v-card-text style="padding-bottom: 10px !important; padding-top: 0 !important;">
                  <div class="projectSubTitle">
                    <h2>{{ $t('subTitleProjectCards') }}</h2>
                  </div>
                  <v-btn 
                    :class="getClassIcon(tech.code)"
                    :prepend-icon="getIcon(tech.code)"
                    variant="outlined" 
                    density="comfortable" 
                    v-for="(tech, index) in project.tech" :key="index"
                  >
                    <span>{{ getLanguageTitle(tech.code) }}</span>
                    <v-tooltip
                      activator="parent"
                      location="bottom"
                    >
                      {{ getLanguageTitle(tech.code) }}
                    </v-tooltip>
                  </v-btn>
                </v-card-text>

                <v-card-actions>
                   <a
                    v-if="!project.link && !project.doc"
                    target="blank"
                    :href="`https://douglas-ggoncalves.github.io/Front-end/${project.title}`"
                    >{{ $t('accessWebsite') }}</a
                  >
                  <a v-if="project.link && !project.doc" target="blank" :href="`${project.link}`"
                    >{{ $t('accessWebsite') }}</a
                  >
                  <a v-if="project.doc" target="blank" :href="`${project.doc}`"
                    >Acessar Documentação</a
                  >
                </v-card-actions>
              </v-card>
            </div>
          </swiper-slide>
        </swiper>

      </v-col>
    </v-row>
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
        swiperOptions: {
          slidesPerView: 2.8
        },
        arrayProjects: [
          { title: "Burger", data: "16-04-2022", relevance: 10, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }], src: require('@/assets/img/Burger.png') },
          {  title: "Coffee", data: "17-05-2022", relevance: 10, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }], src: require('@/assets/img/Coffee.png')},
          { title: "Age Sport", data: "14-05-2022", relevance: 9, tech: [{ code: 0 }, { code: 1 }, { code: 2 }, { code: 3 }], src: require('@/assets/img/Age Sport.png')},
          { title: "BeatUp", data: "15-04-2022", relevance: 8, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }], src: require('@/assets/img/BeatUp.png')},
          { title: "Construction", data: "15-06-2022", relevance: 7, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }], src: require('@/assets/img/Construction.png')},
          { title: "DentalCare", data: "15-07-2022", relevance: 8, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }], src: require('@/assets/img/DentalCare.png')},
          { title: "Education Site", data: "15-07-2022", relevance: 8, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 },{ code: 3 }], src: require('@/assets/img/Education Site.png')},
          { title: "Finans", data: "15-01-2022", relevance: 7, tech: [{ code: 0 }, { code: 1 }, { code: 2 }], src: require('@/assets/img/Finans.png')},
          { title: "Illustration", data: "15-07-2022", relevance: 7, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }], src: require('@/assets/img/Illustration.png')},
          { title: "Maximus", data: "15-07-2022", relevance: 8, tech: [{ code: 0 }, { code: 1 }, { code: 2 }], src: require('@/assets/img/Maximus.png')},
          { title: "Online Education", data: "18-06-2022", relevance: 8, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }], src: require('@/assets/img/Online Education.png')},
          { title: "Travel Website", data: "16-06-2022", relevance: 10, tech: [{ code: 0 }, { code: 1 }, { code: 2 }], src: require('@/assets/img/Travel Website.png')},
          { title: "API de Usuários", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 6 }, { code: 10 }, { code: 15 }, { code: 8 }], doc: "https://github.com/douglas-ggoncalves/Full-Stack/tree/main/API%20de%20Usuarios", src: require('@/assets/img/API de Usuários.png')},
          { title: "Calculadora", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 1 }], link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/calculadora/dist", src: require('@/assets/img/Calculadora.png')},
          { title: "Cinemax", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 10 }, { code: 16 }], src: require('@/assets/img/Cinemax.png')},
          { title: "Cronômetro", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 1 }], link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/cronometro/dist", src: require('@/assets/img/Cronômetro.png')},
          { title: "Facilita Tasks", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 0 }, { code: 1 }, { code: 18 }], link: "https://facilitatasks.netlify.app/", src: require('@/assets/img/Facilita Tasks.png')},
          { title: "Gerador de Senhas", data: "16-06-2022", relevance: 10, tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 3 }], src: require('@/assets/img/Gerador de Senhas.png')},
          { title: "Gestão Financeira", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 1 }, { code: 5 }, { code: 17 }], link: "https://gestao-financeira.netlify.app", src: require('@/assets/img/Gestão Financeira.png')},
          { title: "Guia Perguntas", data: "16-06-2022", relevance: 7, tech: [{ code: 6 }, { code: 13 }, { code: 1 }, { code: 5 }, { code: 3 }, { code: 8 }], doc: "https://github.com/douglas-ggoncalves/Node.js/blob/main/Guia%20Perguntas/README.md", src: require('@/assets/img/Guia Perguntas.png')},
          { title: "Lista de Tarefas", data: "16-06-2022", relevance: 7, tech: [{ code: 4 }, { code: 1 }, { code: 17 }], link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/tarefas/dist", src: require('@/assets/img/Lista de Tarefas.png')},
          { title: "Mata Mosquito", data: "16-06-2022", relevance: 7.6, tech: [{ code: 0 }, { code: 1 }, { code: 3 }], src: require('@/assets/img/Mata Mosquito.png')},
          { title: "Pokedex", data: "16-06-2022", relevance: 8.2, tech: [{ code: 4 }, { code: 1 }, { code: 10 }], link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/pokedex/dist", src: require('@/assets/img/Pokedex.png')},
          { title: "Realiza Assessoria", data: "16-06-2022", relevance: 6.9, tech: [{ code: 6 }, { code: 13 }, { code: 1 }, { code: 3 }, { code: 8 }], doc: "https://github.com/douglas-ggoncalves/Node.js/blob/main/Realiza/README.md", src: require('@/assets/img/Realiza Assessoria.png')},
          { title: "Sistema Maximus", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 6 }, { code: 1 }, { code: 5 }, { code: 2 }, { code: 16 }, { code: 7 }], doc: "https://github.com/douglas-ggoncalves/Full-Stack/tree/main/Sistema%20Maximus/backnode#readme", src: require('@/assets/img/Sistema Maximus.png')},
          { title: "Spotify", data: "16-01-2022", relevance: 9, tech: [{ code: 0 }, { code: 1 }, { code: 2 }], src: require('@/assets/img/Spotify.png')},
          { title: "Conversor de Moedas", data: "16-06-2022", relevance: 10, tech: [{ code: 4 }, { code: 1 }, { code: 10 }], link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/conversor/dist", src: require('@/assets/img/Conversor de Moedas.png')},
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
      updateSlidesPerView() {
        if (window.innerWidth < 420) {
          this.swiperOptions.slidesPerView = '1'; // '1'
        }
        else if (window.innerWidth >= 420  && window.innerWidth < 768) {
          this.swiperOptions.slidesPerView = '1.25'; // '1'
        } 
        else if (window.innerWidth >= 768  && window.innerWidth < 992){
          this.swiperOptions.slidesPerView = '1.5';
        }
        else if (window.innerWidth >= 992  && window.innerWidth < 1064){
          this.swiperOptions.slidesPerView = '1.8';
        }
        else if (window.innerWidth >= 1064  && window.innerWidth < 1400){
          this.swiperOptions.slidesPerView = '2.05';
        }
        else {
          this.swiperOptions.slidesPerView = '2.8';
        }

        // Força a atualização do Swiper
        this.$nextTick(() => {
          if (this.$refs.mySwiper && this.$refs.mySwiper.swiper) {
            this.$refs.mySwiper.swiper.update();
          }
        });
      },
      toggle () {
        if (this.selectAllLanguage) {
          this.selectedLanguages = []
        } else {
          this.selectedLanguages = this.languages.slice()
        }
      },
      getLanguageTitle(code) {
        const language = this.languages.find(language => language.code === code);
        return language ? language.title : 'Código não encontrado';
      },
      getIcon(code) {
        const language = this.languages.find(language => language.code === code);
        return language ? language.icon : 'Código não encontrado';
      },
      getClassIcon(code) {
        const language = this.languages.find(language => language.code === code);
        return language ? language.className : 'Código não encontrado';
      }
    },
    created(){
      
    },
    mounted() {
      var allSkills = this.$tm('allSkills');

      this.languages = allSkills.filter(element => element.title !== "Git" && element.title !== "GitHub");
      this.selectedLanguages = this.languages.slice();

      this.updateSlidesPerView();
      window.addEventListener('resize', this.updateSlidesPerView);
    },
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

.v-theme--dark{
  a{
    color: white !important;
  }

    a{
    &:hover{
      border-bottom: 1px solid white !important;
    }
  }
}

.v-theme--light{
  a{
    color: black !important;
  }

    a{
    &:hover{
      border-bottom: 1px solid black !important;
    }
  }
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

  .v-card-text{
    >button{
      padding: 0 10px;
    }
  }

  .swiper {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 50px;
    
    .swiper-slide{
      .content{
        background: linear-gradient(to bottom,rgba(0,0,0,0),rgba(0,0,0,.75)) !important;
        border-radius: 8px;
        text-align: center;

        div.projectTitle, div.projectSubTitle{
          padding: 12px 0 !important;
        }

        div.v-card-actions{
          padding: 0 !important;
        }

        h2{
          font-size: 1.25rem;
          display: inline;
          margin-left: auto;
        }
        a{
          font-size: 1.15rem;
          display: inline;
          margin: 0 .5rem;
          border-bottom: 1px solid transparent;
        }

        a{
          margin: 0 auto;
        }
      }
    }
    
    .content {
      position: absolute;
      left: 0;
      width: 100%;
      bottom: 0;

      button{
        margin: 2px 4px 2px 0 !important;
      }

      h2, p{
        padding-left: 18px;
      }

      p{
        padding-bottom: 8px;
      }
    }
  }

  .mySwiper {
    .swiper-slide {
      background-position: center;
      background-size: cover;
      min-height: 320px;
      height: auto;
    }
  }

  .tranding-slider-control .swiper-pagination {
    position: relative;
    width: 15rem;
    bottom: 1rem;
  }
}

@media (max-width: 420px) { 
  .mySwiper {
    .swiper-slide {
      max-height: 380px;
    }
  }
}

@media (min-width: 420px) and (max-width: 620px) { 
  .mySwiper {
    .swiper-slide {
      max-height: 420px;
    }
  }
}

@media (min-width: 620px) and (max-width: 1064px) { 
  .mySwiper {
    .swiper-slide {
      max-height: 440px;
    }
  }
}

@media (min-width: 1064px) and (max-width: 1199px) { 
  .mySwiper {
    .swiper-slide {
      max-height: 460px;
    }
  }
}

@media (min-width: 1200px) and (max-width: 1399px) { 
  .mySwiper {
    .swiper-slide {
      min-height: 480px;
    }
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

@media (min-width: 1400px) { 
  .mySwiper {
    .swiper-slide {
      min-height: 480px;
    }
  }
}
</style>