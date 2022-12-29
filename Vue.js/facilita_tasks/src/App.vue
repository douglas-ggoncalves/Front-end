<template>
  <div id="app">
    <Index v-show="viewSelected == 'Início'" v-on:alterViewEmit="alterViewEmit($event)"/>
    <Home v-show="viewSelected == 'Home'" v-on:alterViewEmit="alterViewEmit($event)"/>
  </div>
</template>

<script>
 import Index from './views/Index.vue'
 import Home from './views/Home.vue'

export default {
  name: 'App',
  data() {
    return {
      viewCurrent: "Index",
      viewSelected: "Início"
    }
  },
  components: {
    Index,
    Home
  },
  methods: {
    alterViewEmit(element){
      this.viewSelected = element;
    }
  }
}
</script>

