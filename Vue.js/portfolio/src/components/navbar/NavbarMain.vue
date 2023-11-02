<template>
  <v-container fluid id="home">
    <SideBar ref="sidebarRef" />

    <v-row id="main">
      <v-col class="d-flex justify-start align-center leftColNav" :cols="9" :lg="3">
        <v-img cover src="../../assets/img/profilePhoto.png"></v-img>
    
        <h3 class="ml-1 ml-lg-4 name">DOUGLAS</h3>
        <h3 class="lastName">GONÇALVES</h3>
      </v-col>

      <v-col class="d-none d-lg-flex justify-center align-center navCenter" :lg="6">
        <ul>
          <li v-for="(link, index) in linksInComputed" :key="index">
            <a color="white" @click.prevent="navigateTo(link.url)" style="cursor: pointer;">{{ link.title }}</a>
          </li>
        </ul>
      </v-col>

      <v-col class="d-flex justify-end align-center" :cols="3">
        <v-btn
          variant="text"
          class="d-lg-none"
          icon="mdi-menu"
          v-bind="attrs"
          v-on="on"
          v-on:click="drawer = !drawer"
          @click="toggleSideBar"
        >
        </v-btn>

        <v-btn
          variant="text"
          :icon="themeDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
          v-bind="attrs"
          v-on="on"
          v-on:click="toggleTheme()"
        >
        </v-btn>

        <v-menu open-on-hover open-delay="2" close-delay="2" :location="'bottom'">
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              icon="mdi-translate"
              v-bind="props"
            >
            </v-btn>
          </template>

          <v-list style="text-align:center" class="p-0 m-0">
            <v-list-item-title style="font-weight: bold;" class="mb-2" v-t="'message.titleLanguage'"><v-divider class="mt-2"/></v-list-item-title>
          
              <v-list-item
                v-for="(item, index) in this.$tm('items')" 
                :key="index"
                :value="languageIndex"
                color="primary"
                :active="languageIndex == index"
                :active-color="'primary'"
                @click="changeLanguage(index)"
              >
                <v-list-item-title>{{ item.state }}</v-list-item-title>
              </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

  var temaDark = theme.global.current.value.dark ? true : false;
  this.themeDark = temaDark;

  const bodyElement = document.getElementsByTagName("body")[0];
    
  if (temaDark == true) {
    bodyElement.classList = "darkScrollbar";
  } else {
    bodyElement.classList = "";
  }
}
</script>

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
    navigateTo(targetId) {
    // Encontre o elemento alvo
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Calcule a posição desejada (posição do elemento - 10vh)
      const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (0.08 * vh);
      
      // Rolagem para a posição desejada
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  },
    changeLanguage(item){
      var language = item == 0 ?  "pt": "en";
      this.languageIndex = item;
      
      this.$i18n.locale = language;
    },
    toggleSideBar() {
      this.$refs.sidebarRef.toggleSidebar();
    }
  },
  computed: {
    linksInComputed() {
      return this.$tm('links');
    }
  },
  components: {
    SideBar
  }
}
</script>

<style lang="scss" scoped>
  .v-theme--dark .v-list-item--active {
    color: #2081CE !important;
    background-color: #1F3B51 !important;
  }
      
  .v-theme--dark{
    #home{
      >div#main{
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        background-color: #121212 !important;
      }

      ul{
        li{
          a{
            color: white !important;

            &:hover{
              border-bottom: 1px solid white;
            }
          }
        }
      }
    }
  }

  .v-theme--light .v-list-item--active {
    color: #2D82D6 !important;
    background-color: #E3EEF9 !important;
  }

  .v-theme--light{
    #home{
      >div#main{
        border-bottom: 1px solid rgba(19, 11, 11, 0.1);
        background-color: #FFFFFF !important;
      }

      ul{
        li{
          a{
            color: black !important;

            &:hover{
              border-bottom: 1px solid black;
            }
          }
        }
      }
    }
  }

  #home{
    min-height: 8vh; 
    
    >div#main{
      background-color: #121212 !important;
      display: flex;
      align-items: center;
      width: 100%;
      height: 8vh !important;
      position: fixed;
      z-index: 6 !important;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 !important;

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
        }

        h3.name{
          margin-left: 8px !important;
        }

        h3.lastName{
          margin-left: 6px !important;
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
      >div#main{
        div.leftColNav{
          padding-left: 0 !important;
          margin-left: 0 !important;

          >div{
            height: 36px !important;
            max-height: 36px !important;
            max-width: 36px !important;
            width: 36px !important;
          }

          div.v-avatar.teal{
            display: none;
          }
        }

        h3{
          font-size: 0.85rem !important;
        }
      }
    }
  }

  @media (max-width: 420px) { 
    #home{
      >div#main{
        div.leftColNav{
          h3.lastName{
            display: none !important;
          }
        }
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