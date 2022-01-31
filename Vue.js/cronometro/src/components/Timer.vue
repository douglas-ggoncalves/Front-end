<template>
  <div>
    <h2>{{ time }}</h2>

    <button @click="initial()">Iniciar</button>
    <button @click="stop()">Parar</button>
    <button @click="reload()">Reiniciar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myInterval: true,
    };
  },
  props: {
    time: String,
  },
  methods: {
    initial: function () {
      this.myInterval = setInterval(this.start, 1);
    },

    start: function () {
      console.log("bb");
    },
    stop: function () {
      clearInterval(this.myInterval);
    },
    reload: function () {
      console.log("reiniciar");
      this.time = '00:00:00'
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "DS-Digital";
  src: local("DS-Digital"), url("../fonts/DS-DIGI.TTF") format("truetype");
}

button {
  cursor: pointer;
  padding: 0.7rem 1.7rem;
  background: none;
  color: white;
  border: 1px solid rgb(88, 84, 84);
  margin: 0 0.3rem;
  font-style: 1.5rem;
}

h2 {
  font-family: "DS-Digital";
  color: rgba(216, 144, 35, 0.979);
  font-size: 5.5rem;
}
</style>