<template>
  <v-container fluid id="ProfileSkills">
    <v-row>
      <h1>{{ $t('titleProfileSkills') }}</h1>
    </v-row>

    <v-row class="d-flex justify-center">
      <v-col v-for="(skill, index) in this.$t('allSkills')" :key="index" class="d-flex align-center col" :cols="6">
        <div>
          <div class="icon">
            <v-icon :class="skill.className">{{ skill.icon }}</v-icon>
          </div>
          <div>
            <h3>{{ skill.title }}</h3>
            <h4>{{ skill.description }}</h4>
          </div>
        </div>
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
  #ProfileSkills{
    >.row{
      div.col{
        >div{
          display: flex;
          align-items: center;
          width: 100%;
          width: 100%;
          margin-top: 1rem;
          margin-bottom: 1rem;
          border: 1px solid white;
          border-radius: 6px;
          padding: 1rem;

          div.icon{
            i{
              font-size: 40px;
            }

            margin-right: 1rem;

            .HTML5{
              color: #DD4B25;
            }

            .CSS3{
              color: #3595CF;
            }
          }
        }
      }
    }
  }
</style>