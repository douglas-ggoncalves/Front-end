<template>
  <div id="app">
    <nav class="col-1 col-lg-5 d-flex justify-content-end">
      <router-link class="mr-auto" style="margin-right: auto" to="/"> <h3>Cinemax</h3> </router-link>
      
      <router-link to="/">Página Inicial</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/">Séries</router-link>
    </nav>

    <!--<input type="text" placeholder="Digite o nome do filme" />
      <button>
        Buscar
      </button>
      <hr>
    -->
    <router-view/>
  </div>
</template>

<script>
import  "./assets/css/style.css";

export default {
  data(){
    return{
      
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;

  -moz-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}

nav {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.8rem;
  background-color: black;
  margin-bottom: 2.5rem;
}

h3 {
  color: rgb(248, 244, 244);
  margin-bottom: 0;
}

h3:hover {
  color: rgb(41, 217, 213);
}

button {
  outline: none;
  border-radius: 20px;
  margin-left: 0.3rem;
  padding: .5rem 1rem;
  color: #b1a9a9;
  border: 1px solid #b1a9a9;
  background-color: white;
}

button:hover {
  background-color: rgb(226, 220, 220);
}

hr {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}

input {
  padding:8px 50px 8px 20px;
  width: 50%;
  font-size: 1.05rem;
  border-top:1px solid #b1a9a9 !important;
  border: 3px solid #b1a9a9;
  border-radius:20px;
  outline:none;
}

a{
  color: white;
  display: inline-block;
  font-size: 1.25rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  font-weight: 500;
  text-decoration: none;
}

a:hover{
  color: rgb(41, 217, 213);
}

</style>
