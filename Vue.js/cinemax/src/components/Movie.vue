<template>

  <div id="main">
    <h2>Filmes Populares</h2>

    <div class="data">
      <div class="elements" v-for="movie in movie.moviesPopular" :key="movie.id">
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path">
          <h3>{{ movie.title }}</h3>
          <h4>Data de lançamento: {{ movie.release_date }}</h4>
        </div>
    </div>

    <h2>Filmes Mais Bem Avaliados</h2>
    <div class="data">
      <div class="elements" v-for="movie in movie.moviesTopRated" :key="movie.id">
          <img :src="'https://image.tmdb.org/t/p/w500/' + movie.backdrop_path">
          <h3>{{ movie.title }}</h3>
          <h4>Média de votos {{ movie.vote_average }}</h4>
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
    movie: Object
  }, computed: {
      
  }
};
</script>

<style scoped>

.data {
  display: flex;
  margin: 0 2rem;
  /*flex-wrap: wrap;*/ 
  overflow-y: scroll;
}

#main .elements {
  flex-grow: 1;
  margin-right: .5rem;
}

#main >h2{
  text-align: left;
}

h2{
  font-family: 'Source Sans Pro', Arial, sans-serif;
  margin: 3rem 0 1rem 2rem;
}

h3{
  color: #212529 !important;
  font-family: 'Source Sans Pro', Arial, sans-serif;
}



</style>

<style>
 /* width */
::-webkit-scrollbar {
  width: 10px;
  height: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  background: none;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(185, 179, 179);
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(153, 150, 150);
}
</style>