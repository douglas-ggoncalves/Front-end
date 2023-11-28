<template>
  <v-container fluid class="d-flex align-center" id="Footer">
    <v-row class="d-flex justify-center">
      <v-col class="d-flex justify-center px-0" :cols="12" :lg="10" :xl="8">
        <v-col class="px-0" :cols="12">
          <v-col :cols="12" class="d-flex justify-center mt-5">
            <a
              v-for="(item, index) in this.$tm('socialItems')"
              :key="index"
              :href="item.URL"
              target="_blank"
              class="mx-1"
            >
              <v-btn
                class="buttons"
                :class="item.icon"
                :prepend-icon="'mdi-' + item.icon"
                variant="outlined"
              >
                {{ item.title }}
                <v-tooltip activator="parent" location="bottom">
                  {{ item.tooltipText }}
                </v-tooltip>
              </v-btn>
            </a>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '../assets/style.css'

export default {
  data(){
    return{
      
    }
  },
}
</script>

<style lang="scss" scoped>
  .v-theme--light {
    .buttons{
      color: #000000 !important;
    }
  }

  .v-theme--dark {
    .buttons{
      color: white !important;;
    }
  }

  .v-theme--light{
    h1{
        
    }
  }

  div#Footer{
    
  }


  
</style>