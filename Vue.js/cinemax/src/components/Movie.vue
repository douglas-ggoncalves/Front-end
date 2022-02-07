<template>

  <div id="main">
    <h5>Filmes Populares</h5>
    0
    <div class="elements" v-for="movie in moviesPopular" :key="movie.id">
      <h3>{{ movie.title }}</h3>
      
      <!-- <h3>{{ movie.backdrop_path }}</h3> -->
      <img :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path">

      <h4>Data de lançamento: {{ movie.release_date }}</h4>
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      
    }
  },
  props: {
    moviesPopular: Array
  }, computed: {
      
    }
};
</script>

<style scoped>
#main {
  display: flex;
  width: 100%;
  /*flex-wrap: wrap;*/ 
  overflow-y: scroll;
}

#main .elements {
  flex-grow: 1;
}

h5 {
  display: block;
  width: 100%;
  margin-bottom: 2.0rem;
}
</style>