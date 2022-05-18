<template>
  <div id="app">
    <v-app id="inspire">
      <v-card
        dark
        flat
      >
        <v-toolbar
          flat
          height="72"
          style="border: 1px solid white"
        >
          <v-switch
            v-model="$vuetify.theme.dark"
            hint="This toggles the global state of the Vuetify theme"
            inset
            label="Inverter cores"
            persistent-hint class="ml-auto"
          ></v-switch>
        </v-toolbar>
        
        <v-divider class="mb-y" style="border: 1px solid red">
          <v-card-text>
            das
          </v-card-text>
        </v-divider>
      </v-card>
    </v-app>
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