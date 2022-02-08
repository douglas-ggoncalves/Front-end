<template>

  <div id="main">
      <h5>Filmes Populares</h5>

    <div id="data">
      <div class="elements" v-for="movie in moviesPopular" :key="movie.id">
          <h3>{{ movie.title }}</h3>
          
          <!-- <h3>{{ movie.backdrop_path }}</h3> -->
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path">

          <h4>Data de lançamento: {{ movie.release_date }}</h4>
        </div>
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
#data {
  display: flex;
  width: 100%;
  padding: 2rem;
  /*flex-wrap: wrap;*/ 
  overflow-y: scroll;
}

#main .elements {
  flex-grow: 1;
}

</style>