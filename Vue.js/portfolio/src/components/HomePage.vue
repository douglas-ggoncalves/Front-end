<template>
  <v-container fluid class="d-flex align-center" id="HomePage" style="position: relative;">
    <v-row class="d-flex justify-center text-center">
      <v-col :cols="12" :md="10" :xl="6" class="animate__animated animate__lightSpeedInRight">
        <h1>Douglas Gonçalves</h1>
        <h2 class="mb-3">
          {{ $t('titleHomePage') }}
        </h2>
      </v-col>

      <v-col :cols="12">
        <a
          v-for="(item, index) in this.$tm('socialItems')"
          :key="index"
          :href="item.URL"
          target="_blank"
          class="mx-1"
        >
          <v-btn class="buttons" icon variant="outlined">
            <v-tooltip  activator="parent"  location="bottom">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">{{ 'mdi-' + item.icon }}</v-icon>
              </template>
              {{ item.tooltipText }}
            </v-tooltip>
          </v-btn>
        </a>
      </v-col>
    </v-row>
    
    <v-btn icon="mdi-arrow-down" class="my-arrow" variant="outlined" @click="store.btnDown = !store.btnDown"/>
  </v-container>
</template>

<script>
import 'animate.css';
import { store } from '../store.js'
export default {
  data(){
    return{
      store
    }
  },
}
</script>

<style lang="scss" scoped>
  .v-theme--dark{
    h1{
      background: -webkit-linear-gradient(315deg, black, white, #42d392, greenyellow);
    }

    h2{
      opacity: 0.65 !important;
    }

    .buttons{
      color: #29D9D5 !important;
      border-color: #29D9D5 !important;
    }
  }

  .v-theme--light{
    h1{
      background: -webkit-linear-gradient(315deg, rgba(34,125,104,1) 0%, rgba(131,185,198,1) 22%, rgba(66,211,146,1) 92%);
    }

    .buttons{
      color: rgba(0, 0, 0, 0.7) !important;
      border-color: rgba(0, 0, 0, 0.7) !important;
    }
  }

  div#HomePage{
    height: 92vh !important;

    @keyframes arrow-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }

    .buttons{
      border-radius: .25rem !important;
      width: 70px !important;
      height: 38px !important;
    }

    .my-arrow {
      position: absolute; 
      bottom: 5%; 
      left: 50%;
      animation: arrow-bounce 2s infinite;
    }

    h1{
      background-clip: text;
      -webkit-background-clip: text; 
      -webkit-text-fill-color: transparent;
      font-size: 4rem;
      line-height: 2;
    }

    h2{
      font-size: 1.8rem;
    }
  }

  @media (max-width: 545px) { 
    div#HomePage{
      h1{
        font-size: 2rem;
        line-height: 1.3;
        margin-bottom: 1rem;
      }
      h2{
        font-size: 1.25rem;
      }
    }
  }

  @media (min-width: 546px) and (max-width: 1064px) { 
    div#HomePage{
      >div{
        padding-left: 12px;
        padding-right: 12px;
      }
      h1{
        font-size: 3.2rem;
        line-height: 1.3;
      }
      h2{
        font-size: 1.35rem;
      }
    }
  }
</style>