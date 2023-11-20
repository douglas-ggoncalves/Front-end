<template>
  <v-container fluid class="d-flex align-center" id="HomePage">
    <v-row class="text-center">
      <v-col>
        <h1 style="">Douglas Gonçalves</h1>

        <h2 style="color: #4672fe; font-size: 1.8rem;">
          Minha missão como desenvolvedor é entregar aplicações com design ágil e responsivo, mantendo sempre alto padrão de qualidade e desempenho, em busca de soluções inovadoras.
        </h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data(){
    return{
    }
  }
}
</script>

<style lang="scss" scoped>
  div#HomePage{
    height: 92vh !important;
    border-bottom: 1px solid greenyellow;

    h1{
      //background: -webkit-linear-gradient(315deg,#42d392 25%,#647eff); 
      background: -webkit-linear-gradient(315deg, black, white, #42d392, greenyellow);

      background-clip: text;
      -webkit-background-clip: text; 
      -webkit-text-fill-color: transparent;
      font-size: 4rem;
      line-height: 2;
    }
  }
</style>