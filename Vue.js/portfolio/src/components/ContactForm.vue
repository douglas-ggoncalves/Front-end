<template>
  <v-container fluid class="d-flex align-center" id="Contact">
    <v-row class="d-flex justify-center">
      <v-col class="" :cols="12" :lg="10" :xl="8">
        <v-row>
          <h1>{{ $t('titleContact') }}</h1>
        </v-row>
      </v-col>

      <v-col class="d-flex justify-center px-0" :cols="12" :lg="10" :xl="8">
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

          <v-col :cols="12" class="d-flex justify-center pa-0">
            <v-btn variant="outlined" type="submit" :loading="loading">
              {{ $t('sendMessage') }}
            </v-btn>
          </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import '../assets/style.css'

export default {
  data() {
    return {
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
  },
}
</script>

<style lang="scss" scoped>
  #Contact{
    min-height: 92vh !important;
    padding-bottom: 5rem !important;
    padding-top: 5rem !important;
  }

  
</style>