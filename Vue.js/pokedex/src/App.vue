<template>
  <div id="app">
    <input type="text" placeholder="Buscar Pokemon" v-model="inputSearch" />
    <div v-for="pokemon in myFunction" :key="pokemon.url">
      <Pokemon :pokemon="pokemon" />
    </div>
  </div>
</template>

<script>
import Pokemon from "./components/Pokemon.vue";
//import _ from 'lodash'
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      inputSearch: "",
      pokemons: [
        {
          name: "",
          url: "",
        },
      ],
    };
  },
  components: {
    Pokemon,
  },
  created() {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=100&offset=200").then((res) => {
        this.pokemons = res.data.results;
      });
  },
  computed: {
    myFunction: function () {
      if(this.inputSearch.trim() == ''){
        return this.pokemons;
      }
      else{
        return this.pokemons.filter(element =>
          element.name.match(this.inputSearch)
        );
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

input {
  background: none;
  border: 2px solid black;
  outline: none;
  color: gray;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 33%;
  border-radius: 24px;
  padding: 0.5rem 0.7rem;
}
</style>
