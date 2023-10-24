<template>
  <v-navigation-drawer 
    class="d-lg-none"
    v-model="drawer"
    absolute
    temporary
  >
    <v-list-item style="height: 8vh;" class="d-lg-none py-0">
      <template v-slot:prepend>
        <v-avatar>
          <v-img
            cover
            src="../../assets/img/profilePhoto.png"
            alt="Douglas"
          />
        </v-avatar>
      </template>

      <v-list-item-title id="abagail">Douglas Gonçalves</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="link in linksInComputed"
        :key="link.title"
        link
      >
        <a :href="link.url" class="v-list-item v-list-item--link">
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </a>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import '../../assets/style.css'

export default {
  data() {
    return {
      drawer: false
    };
  },
  methods: {
    toggleSidebar() {
      this.drawer = !this.drawer;
    }
  },
  computed: {
    linksInComputed() {
      return this.$tm('links');
    }
  },
}
</script>
<style lang="scss" scoped>
  #home v-list-item-icon{
    margin-right: 17px !important;
  }

  @media (min-width: 1264px) { 
    div.v-overlay__scrim{
      opacity: 0 !important;
    }
  }
</style>