<template>
  <v-container fluid class="d-flex align-center" id="HomePage">
    <v-row class="d-flex justify-center text-center">
      <v-col :cols="12" :md="10" :xl="6" class="animate__animated animate__lightSpeedInRight">
        <h1>Douglas Gonçalves</h1>
        <h2>
          Minha missão como desenvolvedor é entregar aplicações de forma ágil e com design responsivo, mantendo sempre alto padrão de qualidade e desempenho, em busca de soluções inovadoras.
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import 'animate.css';

export default {
  data(){
    return{
    }
  }
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
  }

  .v-theme--light{
    h1{
      background: -webkit-linear-gradient(315deg, rgba(34,125,104,1) 0%, rgba(131,185,198,1) 22%, rgba(66,211,146,1) 92%);
    }
  }

  div#HomePage{
    height: 92vh !important;
    border-bottom: 1px solid greenyellow;

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