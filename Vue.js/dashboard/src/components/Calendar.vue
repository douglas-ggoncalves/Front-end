<template>
  <div>
    <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="dateFormatted" :prepend-inner-icon="'mdi-calendar'" label="Informe a Data *" hint="informe a data desejada" v-bind="attrs" @blur="date = parseDate(dateFormatted)" v-on="on" ></v-text-field>
      <button @click="teste()">
        teste
      </button>
      </template>
      
      <v-date-picker v-model="date" no-title @input="menu1 = false" locale="pt"></v-date-picker>
      
    </v-menu>
  </div>

</template>
<script>

export default {
  data(){
    return{
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: this.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
      menu1: false,
    }
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    teste(){
      console.log("date " + this.date)
      console.log("dateFormatted " + this.dateFormatted)
      this.$emit("deleteThisTask", {pimba: 'aqui vai o pimba'})

    }
  },
}
</script>
