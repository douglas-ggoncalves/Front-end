<template>
  <div id="content">
    <v-container :fluid="true" v-if="select == 'Início'" id="Início">
      <v-row no-gutters>
        <v-col :cols="10">
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
      </v-row>
    </v-container>

    <v-container id="Sobre" :fluid="true" v-if="select == 'Sobre'">
      <v-row no-gutters>
        <v-col :cols="10" :md="8" :lg="6"> 
          <h3>Sobre mim</h3> 

          <p>Título...........</p>
          <span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, repudiandae nihil. Excepturi, maxime voluptatem ex doloremque autem nostrum est distinctio pariatur incidunt impedit quam a quaerat quas eum dolorum veritatis.
          </span>
          <div style="border: 1px solid white; background-color: white">

          </div>

          <p>Habilidades e Competências</p>

          <div class="elements text-left"> 

            <div class="separate">
              <div>
                <p>Node.js (Express, Sequelize...)</p>
                <v-progress-linear color="primary accent-4" value="85"></v-progress-linear>
              </div>

              <div>
                <p>Vue.js (Router, Vuetify)</p>
                <v-progress-linear color="primary accent-4" value="80"></v-progress-linear>
              </div>
            </div>
            
            <div class="separate">
              <div>
                <p>HTML 5</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>

              <div>
                <p>CSS 3</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>
            </div>
            
            <div class="separate">
              <div>
                <p>SASS</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>

              <div>
                <p>Bootstrap</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>
            </div>
            
            <div class="separate">
              <div>
                <p>JavaScript / ES6</p>
                <v-progress-linear color="primary accent-4" value="70"></v-progress-linear>
              </div>

              <div>
                <p>JQuery</p>
                <v-progress-linear color="primary accent-4" value="70"></v-progress-linear>
              </div>
            </div>
            
            <div class="separate">
              <div>
                <p>MySQL / SQLServer</p>
                <v-progress-linear color="primary accent-4" value="75"></v-progress-linear>
              </div>

              <div>
                <p>Git</p>
                <v-progress-linear color="primary accent-4" value="85"></v-progress-linear>
              </div>
            </div>
          </div>
          
          <div>
          <v-sparkline
            :value="value"
            :gradient="gradient"
            :smooth="10 || false"
            :padding="8"
            :line-width="2"
            :stroke-linecap="'round'"
            :gradient-direction="'top'"
            :fill="false"
            :type="'trend'"
            :auto-line-width="false"
            auto-draw
          ></v-sparkline>

          <div>
            <p style="font-style: italic;">"É sua determinação e persistência que farão de você uma pessoa de sucesso."</p>
          </div>
          </div>

        </v-col>
      </v-row>
    </v-container>

    <v-container :fluid="true" v-if="select == 'Portfólio'">
      <v-row no-gutters>
        <v-col :sm="12"> View da aba portfólio ainda não criada </v-col>
      </v-row>
    </v-container>

    <v-container id="Contato" :fluid="true" v-if="select == 'Contato'">
      <v-row no-gutters>
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
const gradients = [
  ['#222']
]

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
      gradient: gradients[5],
      value: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
      gradients,
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
