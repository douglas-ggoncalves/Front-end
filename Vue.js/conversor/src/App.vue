<template>
  <div id="app">
    <h1>Conversor de Moedas</h1>
    <Coin :Coin="teste" />
  </div>
</template>

<script>
import Coin from "./components/Coin.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      teste: 'sasd',
      array: [
        {
          nomeElementos: "<AFN>Afghani do Afeganistão</AFN>",
        },
        {
          nomeElementos: "<MGA>Ariary Madagascarense</MGA>",
        },
        {
          nomeElementos: "<THB>Baht Tailandês</THB>",
        },
      ],
    }
  },
  components: {
    Coin,
  },
  created() {
    axios
      .get("https://economia.awesomeapi.com.br/xml/available/uniq")
      .then((res) => {
        console.log(res.data)
        console.log(this.array)
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
html {
  height: 100%;
  background-color: rgb(32, 33, 36);
  display: flex;
  justify-content: center;
}

div#app {
  text-align: center;
  margin-top: 5rem;
}

h1 {
  color: gray;
}
</style>
