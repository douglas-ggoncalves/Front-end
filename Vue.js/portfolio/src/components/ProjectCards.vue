<template>
  <v-container fluid id="projects">
    <v-row class="d-flex justify-center">
      <v-col :cols="12" :lg="10" :xl="8">
        <v-row>
          <h1>{{ $t('titleProjectCards') }}</h1>
        </v-row>
      </v-col>

      <v-col :cols="12" :lg="10" :xl="8">
        <v-select
          v-model="selectedLanguages"
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

    </v-row>

    <swiper
      :navigation="true"
      :effect="'coverflow'"
      :grabCursor="true"
      :centeredSlides="true"
      :slidesPerView="'3'"
      :initialSlide="2"
      :coverflowEffect="{
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2.5,
        slideShadows: true,
      }"
      :pagination="{
        clickable: true
      }"
      
      :modules="modules"
      :clickable="true"
      class="mySwiper"
    >
      <swiper-slide v-for="(img, index) in images" :key="index">
        <img 
          class="swiper-image"
          :src="img.src" 
        />
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
        images: [
          { src: require('@/assets/img/Burger.png')},
          { src: require('@/assets/img/Coffee.png')},
          { src: require('@/assets/img/Age Sport.png')},
          { src: require('@/assets/img/BeatUp.png')},
          { src: require('@/assets/img/Construction.png')},
          { src: require('@/assets/img/DentalCare.png')},
          { src: require('@/assets/img/Education Site.png')},
          { src: require('@/assets/img/Finans.png')},
          { src: require('@/assets/img/Illustration.png')},
          { src: require('@/assets/img/Maximus.png')},
          { src: require('@/assets/img/Online Education.png')},
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
      var allSkills = this.$tm('allSkills');

      this.languages = allSkills.filter(element => element.title !== "Git" && element.title !== "GitHub");
      this.selectedLanguages = this.languages.slice();
    }
  };
</script>

<style scoped>
#app { height: 100% }
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.tranding-slider-control .swiper-pagination {
  position: relative;
  width: 15rem;
  bottom: 1rem;
}

/*  ----------------------------------------        */


.swiper-button-prev, .swiper-rtl {
  bottom: var(--swiper-pagination-bottom, 0px);
  top: var(--swiper-pagination-top, auto) !important;
  left: 42%;
  transform: translateX(-42%);
}

.swiper-button-next {
  bottom: var(--swiper-pagination-bottom, 0px) !important;
  top: var(--swiper-pagination-top, auto) !important;
  right: 42% !important;
  transform: translateX(42%);
}

div.swiper-wrapper img {
  max-width: 100% !important;
  border-radius: 0.5rem;
  object-fit: cover !important;
}
.swiper-image {
  max-width: 100%;
  height: 100% !important;
  display: block;
}

.swiper-button-next:after{
  /*font-size: 1.5rem !important;*/
}
</style>