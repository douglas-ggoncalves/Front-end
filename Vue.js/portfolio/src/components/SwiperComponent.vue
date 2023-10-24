<template>
  <v-app>
    <v-main>
      <v-container>
        <swiper
          :navigation="true"
          :effect="'coverflow'"
          :grabCursor="true"
          :centeredSlides="true"
          :slidesPerView="'3'"
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
    </v-main>
  </v-app>
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
      }
    },
    setup() {
      return {
        modules: [EffectCoverflow, Pagination, Navigation],
      };
    },
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