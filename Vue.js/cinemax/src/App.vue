<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <h3>Cinemax</h3>
      </router-link>
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
}

nav {
  width: 100%;
  padding: 0.5rem;
  background-color: black;
  margin-bottom: 1.5rem;
}

h3 {
  color: rgb(248, 244, 244);
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
  text-decoration: none;
}

</style>
