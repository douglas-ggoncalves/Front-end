<template>
  <div>
    <h2>
      {{ time.hoursA }}{{ time.hoursB }}:{{ time.minutesA }}{{ time.minutesB }}:{{ time.secondsA }}{{ time.secondsB }}
    </h2>

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
    time: Object,
  },
  methods: {
    initial: function () {
      this.myInterval = setInterval(this.start, 1000);
    },
    start: function () {
      this.time.secondsB += 1;
      if (this.time.secondsB == 10) {
        this.time.secondsA += 1;
        this.time.secondsB = 0;
        if (this.time.secondsA == 6) {
          this.time.minutesB += 1;
          this.time.secondsA = 0;
        }
      }

      if (this.time.minutesB == 10) {
        this.time.minutesA += 1;
        this.time.minutesB = 0;
        if (this.time.minutesA == 6) {
          this.time.hoursB += 1;
          this.time.minutesA = 0;
        }
      }

      if (this.time.hoursB == 10) {
        this.time.hoursA += 1;
        this.time.hoursB = 0;
      }

      if (this.time.hoursA == 2 && this.time.hoursB == 4) {
        this.reload();
      }
    },
    stop: function () {
      clearInterval(this.myInterval);
    },
    reload: function () {
      //this.stop();
      this.time.hoursA = 0;
      this.time.hoursB = 0;
      this.time.minutesA = 0;
      this.time.minutesB = 0;
      this.time.secondsA = 0;
      this.time.secondsB = 0;
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