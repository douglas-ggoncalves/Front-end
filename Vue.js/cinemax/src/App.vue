<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="mr-auto" style="margin-right: auto" to="/"> <h3>Cinemax</h3> </router-link>
        <button class="navbar-toggler ml-auto" @click="viewCollapse()" style="margin-left: auto" type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div id="divCollapse">
          <router-link to="/">Página Inicial</router-link>
          <router-link to="/filmes">Filmes</router-link>
          <router-link to="/series">Séries</router-link>
          <router-link to="/pessoa&page=1">Pessoas</router-link>
        </div>
      </div>
    </nav>

    <div id="navbarToggleExternalContent" v-if="collapseView">
      <div class="bg-dark">
        <ul>
          <li>
            <router-link to="/">Página Inicial</router-link>
          </li>
          <li>
            <router-link to="/filmes">Filmes</router-link>
          </li>
          <li>
            <router-link to="/series">Séries</router-link>
          </li>
          <li>
            <router-link to="/pessoa&page=1">Pessoas</router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import  "./assets/css/style.css";

export default {
  data(){
    return{
      collapseView: false
    }
  },
  methods:{
    viewCollapse(){
      if(this.collapseView){
        this.collapseView = false;
      }
      else if(!this.collapseView){
        this.collapseView = true;
      }
    }
  }
};
</script>

<style scoped>
#app {
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
}

h3 {
  color: rgb(248, 244, 244);
  margin-bottom: 0;
}

h3:hover {
  color: rgb(41, 217, 213);
}

button.navbar-toggler:focus, :focus-visible{
  outline: none;
  box-shadow: none;
}

@media (min-width: 768px) { 
  button.navbar-toggler, #navbarToggleExternalContent{
    display: none;
  }
}

@media (max-width: 768px) { 
  #divCollapse{
    display: none;
  }
}

hr {
  width: 75%;
  margin-left: auto;
  margin-right: auto;
}

.bg-dark{
  padding-bottom: 1rem;
  padding-top: 1rem;
}

#navbarToggleExternalContent .bg-dark{
  padding-top: 0;
}

ul {
  text-align: left !important;
  padding-left: 0.8rem;
  margin-left: 0.8rem;
}

ul li {
  display: block !important;
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
