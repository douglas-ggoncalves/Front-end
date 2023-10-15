<template>
  <v-container fluid id="home">
    <SideBar ref="sidebarRef" />

    <v-theme-provider id="main">
      <v-row>
        <v-col class="d-flex justify-start align-center leftColNav" :cols="9" :md="9" :lg="3">
          <v-img src="../../assets/img/profilePhoto.png"></v-img>
      
          <h3 class="ml-lg-4">DOUGLAS GONÇALVES</h3>
        </v-col>

        <v-col class="d-none d-lg-flex justify-center align-center" :lg="6">
          <ul>
            <li v-for="(link, index) in linksInComputed" :key="index">
              <a color="white" :href="`#${link.url}`">{{ link.title }}</a>
            </li>
          </ul>
        </v-col>

        <v-col class="d-flex justify-end align-center" :cols="3" :md="3" :lg="3">
          <v-btn
            class="d-lg-none"
            icon
            color="white"
            v-bind="attrs"
            v-on="on"
            v-on:click="drawer = !drawer"
            @click="toggleSideBar"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>

          <v-menu
            open-on-hover
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="white"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-translate</v-icon>
              </v-btn>
            </template>

            <v-list style="text-align:center" class="p-0 m-0">
              <v-list-item-title style="font-weight: bold;" class="mb-2" v-t="'message.titleLanguage'"><v-divider class="mt-2"/></v-list-item-title>
              
              <v-list-item-group
                v-model="languageIndex"
                mandatory
                @change="changeLanguage(item)"
                color="primary"
              >
                <v-list-item
                  v-for="(item, index) in this.$t('items')"
                  :key="index"
                >
                  <v-list-item-title>{{ item.state }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>

          <v-btn
            icon
            color="white"
            v-bind="attrs"
            v-on="on"
            v-on:click="alterTheme()"
          >
            <v-icon>{{ themeDark ? "mdi-white-balance-sunny" : "mdi-weather-night" }} </v-icon>
          </v-btn>

        </v-col>
      </v-row>
    </v-theme-provider>
  </v-container>
</template>

<script>
import '../../assets/style.css'
import SideBar from './SideBar.vue'

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
  },
  data(){
    return{
      themeDark: true,
      languageIndex: 0,
      drawer: null,
    }
  },
  methods: {
    alterTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.themeDark = !this.$vuetify.theme.dark;
      const bodyElement = document.getElementsByTagName("body")[0];
    
      if (this.$vuetify.theme.dark == true) {
        bodyElement.classList = "darkScrollbar";
      } else {
        bodyElement.classList = "";
      }
    },
    changeLanguage(){
      var language = this.languageIndex == 0 ?  "pt": "en";

      this.$i18n.locale = language;
    },
    toggleSideBar() {
      this.$refs.sidebarRef.toggleSidebar();
    }
  },
  computed: {
    linksInComputed() {
      return this.$t('links');
    }
  },
  components: {
    SideBar
  }
}
</script>

<style lang="scss" scoped>
  .theme--dark.v-application{
    #home{
      background-color: #121212 !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      ul{
        li{
          a{
            color: white !important;
          }
    
          &:hover{
            border-bottom: 1px solid white;
          }
        }
      }
    }
  }

  .theme--light.v-application{
    #home{
      background-color: #FFFFFF !important;
      border-bottom: 1px solid rgba(19, 11, 11, 0.1);

      ul{
        li{
          a{
            color: black !important;
          }
  
          &:hover{
            border-bottom: 1px solid black;
          }
        }
      }
    }
  }

  #home{
    >div#main{
      display: flex;
      align-items: center;
      width: 100%;
      height: 8vh;
      position: sticky;
      z-index: 6 !important;
      top: 0;
      left: 0;
      right: 0;

      div.leftColNav{
        >div{
          display: inline-flex; 
          border-radius: 50%;
          height: 48px !important;
          max-height: 48px !important;
          max-width: 48px !important;
          width: 48px !important;
        }

        h3{
          display: inline;
          font-size: 1.0rem;
          margin-left: 8px !important;
        }
      }

      ul{
        padding-left: 0;

        li{
          font-size: 1.15rem;
          display: inline;
          margin: 0 .5rem;
          border-bottom: 1px solid transparent;
        }
      }
    }
  }

  @media (max-width: 345px) { 
    #home{
      div.leftColNav{
        padding-left: 0 !important;
        margin-left: 0 !important;

        div.v-avatar.teal{
          display: none;
        }
      }

      h3{
        font-size: 0.85rem !important;
      }
    }
  }

  @media (min-width: 1264px) { 
    #home{
      div.leftColNav{
        >div{
          height: 54px !important;
          max-height: 54px !important;
          max-width: 54px !important;
          width: 54px !important;
        }
      }
    } 
  }
</style>