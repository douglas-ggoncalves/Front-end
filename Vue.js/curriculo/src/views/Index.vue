<template>
  <div id="content">
    <v-container
      class=""
      :fluid="true"
      v-if="select == 'Início'"
      id="containerIndex"
    >
      <v-row id="Início" no-gutters>
        <v-col :sm="6">
          <div>
            <h2>Olá, meu nome é <span id="name">Douglas Gonçalves</span></h2>
          </div>

          <div>
            <h3>
              Eu sou um desenvolvedor
              <span class="typed-text">{{ typeValue }}</span>
              <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
            </h3>

            Eu sou um desenvolvedor ...

            <v-btn rounded color="primary" @click="alterViewEmit()">
              Saiba Mais
            </v-btn>
          </div>
        </v-col>
        <!-- 
        <v-col :sm="6">
          <div class="container">
            <h1>Coding is
              <span class="typed-text">{{ typeValue }}</span>
              <span class="cursor" :class="{'typing': typeStatus}">&nbsp;</span>
            </h1>
          </div>
        </v-col>
        -->
      </v-row>
    </v-container>

    <v-container class="" :fluid="true" v-if="select == 'Sobre'">
      <v-row class="mb-6" no-gutters>
        <v-col :sm="12"> View da aba sobre ainda não criada </v-col>
      </v-row>
    </v-container>

    <v-container class="" :fluid="true" v-if="select == 'Portfólio'">
      <v-row class="mb-6" no-gutters>
        <v-col :sm="12"> View da aba portfólio ainda não criada </v-col>
      </v-row>
    </v-container>

    <v-container id="containerContato" :fluid="true" v-if="select == 'Contato'">
      <v-row id="Contato" no-gutters>
        
        <v-col :cols="10" :sm="6">
          <form>
            <h3>
              Entre em contato comigo
            </h3>
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              label="Nome/Razão Social"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              label="E-mail"
              required
              @blur="$v.email.$touch()"
            ></v-text-field>
            
            <v-textarea
              outlined
              v-model="message"
              value=""
              label="Informe uma mensagem"
              required
            ></v-textarea>

            <v-btn class="mx-auto" @click="submit()"> Enviar Mensagem </v-btn>
          </form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Vuetify from "vuetify/lib";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";

import "../assets/js/scrypt.js";
Vue.use(Vuetify);

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(100) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data() {
    return {
      name: "",
      email: "",
      message: "",
      typeValue: "",
      typeStatus: false,
      typeArray: ["Full Stack", "Web", "Autodidata"],
      typingSpeed: 200,
      erasingSpeed: 100,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 0,
    };
  },
  methods: {
    alterViewEmit() {
      this.$emit("alterViewEmit", "Início");
    },
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(
          this.charIndex
        );
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(
          0,
          this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.typeArrayIndex += 1;
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    },
    submit(){

      alert("chegou")
    }
  },
  props: {
    select: String,
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("O nome deve ter no máximo 100 caracteres");
      !this.$v.name.required && errors.push("Nome/razão social obrigatório");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Informe um e-mail válido");
      !this.$v.email.required && errors.push("O campo e-mail é Obrigatório");
      return errors;
    }
  },
};
</script>
