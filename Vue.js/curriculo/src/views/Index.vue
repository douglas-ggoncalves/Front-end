<template>
  <div id="content">
    <v-container :fluid="true" v-if="select == 'Início'" id="containerInício">
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

            <v-btn large rounded color="primary" @click="alterViewEmit()">
              Saiba Mais
            </v-btn>
          </div>
        </v-col>

        <v-col class="mt-5 pt-5" :cols="6">
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

            <div class="animate__animated animate__backInUp">
              <p style="font-style: italic;">"É sua determinação e persistência que farão de você uma pessoa de sucesso."</p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="containerSobre" :fluid="true" v-if="select == 'Sobre'">
      <v-row no-gutters>
        <v-col :cols="10" :md="8" :lg="6"> 
          <h3>Sobre mim</h3> 

          <span>
            Um verdadeiro amante do conhecimento, sempre procurando aprender mais e compartilhar informações, tecnólogo em análise e desenvolvimento de sistemas (2019 - 2021), 
          </span>

          <h3>Habilidades e Competências</h3>
          <span>
            Abaixo listo as tecnologias que tive a oportunidade de trabalhar até o momento.
            <br> Meu Github é público, ativo e recebe toda a experiência que tenho como programador atualmente:
            <a target="blank" href="https://github.com/douglas-ggoncalves">github.com/douglas-ggoncalves</a>
          </span>
          <div id="elements">
            <div class="animate__animated animate__fadeInLeft" id="dadLeft">
              <div>
                <p>Node.js</p>
                <v-progress-linear color="primary accent-4" value="85"></v-progress-linear>
              </div>

              <div>
                <p>HTML 5</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>

              <div>
                <p>SASS</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>

              <div>
                <p>JavaScript / ES6</p>
                <v-progress-linear color="primary accent-4" value="70"></v-progress-linear>
              </div>

              <div>
                <p>MySQL / SQLServer</p>
                <v-progress-linear color="primary accent-4" value="75"></v-progress-linear>
              </div>
            </div>

            <div class="animate__animated animate__fadeInRight" id="dadRight">
              <div>
                <p>Vue.js</p>
                <v-progress-linear color="primary accent-4" value="80"></v-progress-linear>
              </div>

              <div>
                <p>CSS 3</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>

              <div>
                <p>Bootstrap</p>
                <v-progress-linear color="primary accent-4" value="90"></v-progress-linear>
              </div>

              <div>
                <p>jQuery</p>
                <v-progress-linear color="primary accent-4" value="70"></v-progress-linear>
              </div>

              <div>
                <p>Git</p>
                <v-progress-linear color="primary accent-4" value="85"></v-progress-linear>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container :fluid="true" v-if="select == 'Portfólio'">
      <v-row no-gutters>
        <v-col :cols="12">
          
  <span v-for="(project, index) in projects" :key="index">
    <div>
      {{ projects[index] }}
    </div>
  </span>

     
     <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>

       <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>

       <v-card
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="deep-purple lighten-2"
        text
      >
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>

        </v-col>
      </v-row>
    </v-container>

    <v-container id="containerContato" :fluid="true" v-if="select == 'Contato'">
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
import 'animate.css';

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
      projects: [
        {
          id: 0,
          title: 'Título do primeiro projeto',
          image: '',
          link: 'https://douglas-ggoncalves.github.io/Front-end/Age%20Sport/',
          descricao: '',
          technologies: [
            {
              id: 0,
              desc: 'HTML 5',
              
            },{
              id: 1,
              desc: 'CSS 3'
            }
          ]
        },
        {
          id: 1,
          title: 'Título do segundo projeto',
          image: '',
          link: 'https://douglas-ggoncalves.github.io/Front-end/Age%20Sport/',
          descricao: '',
          technologies: [
            {
              id: 0,
              desc: 'Javascript',
              
            },{
              id: 1,
              desc: 'Bootstrap'
            }
          ]
        }
      ]
    };
  },
  methods: {
    alterViewEmit() {
      this.$emit("alterViewEmit", "Sobre");
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
