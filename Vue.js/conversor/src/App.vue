<template>
  <div id="app">
    <h1>Conversor de Moedas</h1>
    <Coin :coinsXML="coinsXML"/>
  </div>
</template>

<script>
import Coin from "./components/Coin.vue";
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      palavra: '',
      coinsXML: [
        {
          sigla: "BRL",
          nome: "Real Brasileiro",
        }, {
          sigla: "USD",
          nome: "Dólar Americano",
        }, {
          sigla: "EUR",
          nome: "Euro",
        }, {
          sigla: "AUD",
          nome: "Dólar Australiano",
        }, {
          sigla: "CAD",
          nome: "Dólar Canadense",
        }, {
          sigla: "CHF",
          nome: "Franco Suíço",
        }, {
          sigla: "JPY",
          nome: "Iene Japonês",
        }, {
          sigla: "GBP",
          nome: "Libra Esterlina",
        }
      ],
    }
  },
  components: {
    Coin,
  },
  created() {
    axios
      .get("https://economia.awesomeapi.com.br/xml/available/uniq")
      .then(res => {
        this.palavra = res.data
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
  color: rgba(255, 255, 255, 0.927);
}
</style>
