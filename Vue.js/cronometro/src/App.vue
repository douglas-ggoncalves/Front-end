<template>
  <div id="app">
    <div>
      <h1>Cronômetro - Vue.js</h1>
      <Timer :time="time" />
    </div>
  </div>
</template>

<script>
import Timer from "./components/Timer.vue";

export default {
  name: "App",
  components: {
    Timer,
  },
  data() {
    return {
      time: 
        {
          hoursA: 0,
          hoursB: 0,
          minutesA: 0,
          minutesB: 0,
          secondsA: 0,
          secondsB: 0,
        }
    };
  }
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  height: 100%;
}

h1 {
  color: white;
}

h2 {
  color: rgba(255, 255, 255, 0.94);
}
</style>
