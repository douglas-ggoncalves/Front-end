<template>
  <v-container fluid id="skills">
    <v-row class="d-flex justify-center">
      <v-col class="" :cols="12" :lg="10" :xl="8">
        <v-row>
          <h1>{{ $t('titleProfileSkills') }}</h1>
        </v-row>

        <v-row class="d-flex justify-center itens">
          <v-col v-for="(skill, index) in this.$tm('allSkills')" :key="index" class="d-flex align-center col" :cols="12" :sm="6" :md="4">
            <div class="dadIcon mt-3 mt-md-4">
              <div class="icon">
                <v-icon :class="skill.className">{{ skill.icon }}</v-icon>
              </div>
              <div>
                <h3>{{ skill.title }}</h3>
                <h4 >{{ skill.description }}</h4>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '../assets/style.css'

export default {
  data() {
    return {
      
    };
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
  .v-theme--light div.dadIcon {
    border: 1px solid rgba(19, 11, 11, 0.3);

    &:hover{
      border: 1px solid rgba(19, 11, 11, 0.6);
    }
  }

  .v-theme--dark div.dadIcon {
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover{
      border: 1px solid rgba(255, 255, 255, 0.6);
    }
  }

  #skills{
    h1{
      padding-left: 0.4rem !important;
    }

    div.itens{
      >div{
        display: flex;
        align-items: center;
        padding: 0 0.4rem !important;
    
        div.dadIcon{
          display: flex;
          align-items: center;
          cursor: pointer;
          width: 100%;
          border-radius: 6px;
          padding: 0.8rem;
        }

        &:hover{
          div.icon{
            >i{
              margin-bottom: 0.5rem;
            }
          }
        }

        div.icon{
          transition: all 1.3s !important;
          margin-right: 1rem;

          i{
            transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
            font-size: 40px;
          }

          .HTML5{
            color: #DD4B25;
          }

          .CSS3{
            color: #3595CF;
          }

          .Bootstrap{
            color: #6A37B2;
          }

          .JavaScript{
            color: #EFD81D;
          }

          .TypeScript{
            color: #2F74C0;
          }
          
          .SQLServer{
            color: #031D31;
          }
          
          .MySQL{
            color: #47809D;
          }
          
          .NodeJS{
            color: #74AC5F;
          }
          
          .VueJS{
            color: #3FB27F;
          }
          
          .CSharp{
            color: #642075;
          }
          
          .Sass{
            color: #C76494;
          }

          .Git{
            color: #E84D31;
          }

          .GitHub{
            color: #202B3C;
          }
        }
      }
    }
  }

  @media (max-width: 345px) { 
    #skills{
      h4{
        font-size: 0.9rem !important;
      }

      div.itens{
        >div{
          div.dadIcon{
            padding: 0.5rem;
          }
        }
      }
    }
  }

  @media (min-width: 1264px) { 
    #skills{
      h1{
        padding-left: 1rem !important;
      }

      div.itens{
        >div{
          padding: 0 1rem !important;
        }
      }
    }
  }
</style>