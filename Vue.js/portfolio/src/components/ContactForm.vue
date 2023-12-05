<template>
  <v-container fluid class="" id="Contact">
    <v-container fluid>
      <v-row class="d-flex justify-center">
        <v-col class="" :cols="12" :lg="10" :xl="8">
          <v-row>
            <h1>{{ $t('titleContact') }}</h1>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="d-flex justify-center">
        <v-col class="d-flex justify-center px-0" :cols="4">
          <v-col class="px-0" :cols="12">
            <v-col :cols="12" class="px-0">
              <v-text-field v-model="name" :label="$t('nameContact')" variant="outlined" :rules="[rules.minCharacters]"></v-text-field>
            </v-col>

            <v-col :cols="12" class="pa-0 pb-2">
              <v-text-field v-model="email" :label="$t('emailContact')" variant="outlined" :rules="[rules.required, rules.email]" />
            </v-col>

            <v-col :cols="12" class="pa-0">
              <v-textarea
                v-model="message"
                counter
                :label="$t('messageContact')"
                maxlength="600"
                single-line
                variant="outlined"
              ></v-textarea>
            </v-col>

            <v-col :cols="12" class="d-flex justify-start pl-0">
              <v-btn variant="outlined" type="submit" :disabled="dialog" :loading="dialog" @click="submit()">
                {{ $t('sendMessage') }}
              </v-btn>
            </v-col>

            <v-dialog
              v-model="dialog"
              :scrim="false"
              persistent
              width="auto"
            >
              <v-card
                color="primary"
              >
                <v-card-text>
                  {{ $t('waitMessage') }}
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-col>

        <v-col class="" :cols="4" style="padding-top: 36px">
          <a
            v-for="(item, index) in this.$tm('socialItems')"
            :key="index"
            :href="item.URL"
            target="_blank"
            class="contactLink"
          >
            <v-btn
              class="buttons"
              :class="item.icon"
              :prepend-icon="'mdi-' + item.icon"
              variant="text"
            >
              {{ item.title }}
              <v-tooltip activator="parent" location="right">
                {{ item.tooltipText }}
              </v-tooltip>
            </v-btn>
          </a>
        </v-col>
      </v-row>

    </v-container>
    <FooterForm />
  </v-container>

</template>

<script>
import { store } from '../store.js'
import '../assets/style.css'
import FooterForm from './FooterForm.vue';
//import emailjs from '@emailjs/browser';

export default {
  
  data() {
    return {
      dialog: false,
      store,
      name: "",
      email: "",
      message: "",
      rules: {
        required: value => !!value || this.$t('msgRequired'), 
        counter: value => value.length <= 20 || this.$t('maxCharacters'), 
        minCharacters: value => value.length >= 3 || this.$t("minCharactersText"), 
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('emailInvalid')
        },
      }
    };
  },
  methods: {
    submit(){
      this.dialog = true;

    }
  },
  watch: {
    dialog (val) {
      if (!val) return

      setTimeout(() => (this.dialog = false), 4000)
    },
  },
  components: {
    FooterForm
  }
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

  #Contact{
    min-height: 92vh !important;
    padding-bottom: 5rem !important;
    padding-top: 5rem !important;

    h1{
      padding-left: 0.4rem !important;
    }

    a{
      display: block;
      margin-bottom: 1rem !important;
    }

    i{
      font-size: 2rem !important;
    }
  }

  
</style>