<template>
  <div id="app">
    
</div>
</template>

<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

    data: () => ({ items: ['One', 'Two', 'Three'] }),
  }
</script>

<style>

</style>