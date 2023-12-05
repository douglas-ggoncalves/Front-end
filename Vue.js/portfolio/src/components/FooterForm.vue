<template>
  <v-container fluid class="d-flex align-center" id="Footer">
    <v-row>
      <v-col class="d-flex justify-center" :cols="12">
        <v-btn prepend-icon="mdi-arrow-up" class="my-arrow" variant="outlined" @click="store.btnUP = !store.btnUP">
          {{ $t('btnFooterDesc') }}
        </v-btn>
      </v-col>

      <v-col class="d-flex justify-center" style="user-select: none;" :cols="12">
        © {{ currentYear }} Douglas Gonçalves | {{ $t('thanksFooter') }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { store } from '../store.js'
import '../assets/style.css'

export default {
  data(){
    return{
      store
    }
  },
  created() {
    this.currentYear = new Date().getFullYear();
  }
}
</script>

<style lang="scss" scoped>
  .v-theme--light {
    .buttons{
      color: #000000 !important;
    }
  }

  .v-theme--dark {
    .buttons{
      color: white !important;;
    }
  }

  div#Footer{
    .buttons{
      border-radius: .25rem !important;
      width: 70px !important;
      height: 38px !important;
    }

    .my-arrow {
      position: absolute; 
      bottom: 1.5%; 
     // left: 50%;
      animation: arrow-bounce 2s infinite;
    }

    @keyframes arrow-bounce {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  }
</style>