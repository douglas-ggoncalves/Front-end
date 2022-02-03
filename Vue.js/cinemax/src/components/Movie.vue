<template>
  <div id="main">
    <div v-for="movie in movies" :key="movie.id">
      <h3>{{ movie.title }}</h3>
      
      IMAGEM
      
      <h4>{{ movie.date }}</h4>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    movies: Object
  }
};
</script>

<style scoped>
#main{
  display: flex;
  justify-content: center;
}

#main div{
  border: 1px solid red;
  margin: 2rem;
}
</style>