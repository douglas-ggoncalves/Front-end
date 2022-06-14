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
              <p style="font-style: italic">
                "É sua determinação e persistência que farão de você uma pessoa
                de sucesso."
              </p>
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
            Um verdadeiro amante do conhecimento, sempre procurando aprender
            mais e compartilhar informações, tecnólogo em análise e
            desenvolvimento de sistemas (2019 - 2021),
          </span>

          <h3>Habilidades e Competências</h3>
          <span>
            Abaixo listo as tecnologias que tive a oportunidade de trabalhar até
            o momento.
            <br />
            Meu Github é público, ativo e recebe toda a experiência que tenho
            como desenvolvedor atualmente:
            <a target="blank" href="https://github.com/douglas-ggoncalves">github.com/douglas-ggoncalves</a>
          </span>
          <div id="elements">
            <div class="animate__animated animate__fadeInLeft" id="dadLeft">
              <div>
                <p>Node.js</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="85"
                ></v-progress-linear>
              </div>

              <div>
                <p>HTML 5</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="90"
                ></v-progress-linear>
              </div>

              <div>
                <p>SASS</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="90"
                ></v-progress-linear>
              </div>

              <div>
                <p>JavaScript / ES6</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="70"
                ></v-progress-linear>
              </div>

              <div>
                <p>MySQL / SQLServer</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="75"
                ></v-progress-linear>
              </div>
            </div>

            <div class="animate__animated animate__fadeInRight" id="dadRight">
              <div>
                <p>Vue.js</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="80"
                ></v-progress-linear>
              </div>

              <div>
                <p>CSS 3</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="90"
                ></v-progress-linear>
              </div>

              <div>
                <p>Bootstrap</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="90"
                ></v-progress-linear>
              </div>

              <div>
                <p>jQuery</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="70"
                ></v-progress-linear>
              </div>

              <div>
                <p>Git</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="85"
                ></v-progress-linear>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="containerPort" :fluid="true" v-if="select == 'Portfólio'">
      <v-row class="px-sm-2 px-md-3 px-lg-3">
        <v-col
          v-for="project in projects"
          :key="project.id"
          :cols="11"
          :sm="6"
          :md="5"
          :lg="4"
        >
          <v-card class="">
            <!-- max-width="374" -->
            <v-img :src='"../assets/img/"+ project.title + ".png"'></v-img> 
            <!-- height="267"  -->

            <v-card-title>{{ project.title }}</v-card-title>

            <!--
              <v-card-text>
                <div>{{ project.description }}</div>
              </v-card-text>
            -->

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Ferramentas Usadas</v-card-title>

            <v-card-text>
              <v-chip-group column>
                <v-tooltip
                  v-for="(tech, index) in project.tech"
                  :key="index"
                  bottom
                >
                  <template v-slot:activator="{ on, attrs }">
                    
                    <v-icon
                      :color="technologies[tech.code].color"
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-{{ technologies[tech.code].icon }}
                    </v-icon>
                  </template>

                  <span>{{ technologies[tech.code].desc }}</span>
                </v-tooltip>
              </v-chip-group>
            </v-card-text>

            <v-card-actions color="deep-purple lighten-2">
              <a
                v-if="!project.link"
                target="blank"
                :href="`https://douglas-ggoncalves.github.io/Front-end/${project.title}`"
                >Acessar Site</a
              >
              <a v-if="project.link" target="blank" :href="`${project.link}`"
                >Acessar Site</a
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="containerContato" :fluid="true" v-if="select == 'Contato'">
      <v-row no-gutters>
        <v-col :cols="10" :sm="6">
          <h3>Entre em contato comigo</h3>
          <div>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <a target="blank" href="https://github.com/douglas-ggoncalves">
                  <v-icon color="purple" v-bind="attrs" v-on="on">
                    mdi-github
                  </v-icon>
                </a>
              </template>
              <span>Visite minha página no Github</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <a target="blank" href="https://api.whatsapp.com/send?phone=5562993751777&text=Olá">
                  <v-icon color="green" v-bind="attrs" v-on="on">
                    mdi-whatsapp
                  </v-icon>
                </a>
              </template>
              <span>Entre em contato comigo pelo Whatsapp</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <a target="blank" href="mailto:douglasrnn62@gmail.com">
                  <v-icon color="red" v-bind="attrs" v-on="on">
                    mdi-gmail
                  </v-icon>
                </a>
              </template>
              <span>Entre em contato comigo por e-mail</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <a target="blank" href="mailto:douglasdepaula10@hotmail.com">
                  <v-icon color="blue" v-bind="attrs" v-on="on">
                    mdi-microsoft-outlook
                  </v-icon>
                </a>
              </template>
              <span>Entre em contato comigo por e-mail</span>
            </v-tooltip>
          </div>

          <form>

          <h3>Fique à vontade para enviar sua mensagem</h3>
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
import "animate.css";
//import axios from "axios";

Vue.use(Vuetify);
const gradients = [["#222"]];

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
          id: 1,
          title: "Age Sport",
          description: "descrição projeto Age Sport",
          tech: [{ code: 0 }, { code: 1 }, { code: 2 }, { code: 3 }],
        },
        {
          id: 2,
          title: "BeatUp",
          description: "descrição projeto BeatUp",
          tech: [
            { code: 0 },
            { code: 1 },
            { code: 5 },
            { code: 2 },
            { code: 3 },
            { code: 9 },
          ],
        },
        {
          id: 3,
          title: "Burger",
          description: "descrição projeto Burger",
          tech: [
            { code: 0 },
            { code: 1 },
            { code: 5 },
            { code: 2 },
            { code: 3 },
            { code: 9 },
          ],
        },
        {
          id: 4,
          title: "Coffee",
          description: "descrição projeto Coffee",
          tech: [
            { code: 0 },
            { code: 1 },
            { code: 5 },
            { code: 2 },
            { code: 3 },
            { code: 9 },
          ],
        },
        {
          id: 5,
          title: "Construction",
          description: "descrição projeto Construction",
          tech: [
            { code: 0 },
            { code: 1 },
            { code: 5 },
            { code: 2 },
            { code: 3 },
          ],
        },
        {
          id: 6,
          title: "DentalCare",
          description: "descrição projeto DentalCare",
          tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }],
        },
        {
          id: 7,
          title: "Education Site",
          description: "descrição projeto Education Site",
          tech: [
            { code: 0 },
            { code: 1 },
            { code: 5 },
            { code: 2 },
            { code: 3 },
          ],
        },
        {
          id: 8,
          title: "Finans",
          description: "descrição projeto Finans",
          tech: [{ code: 0 }, { code: 1 }, { code: 2 }],
        },
        {
          id: 9,
          title: "Illustration",
          description: "descrição projeto Illustration",
          tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }],
        },
        {
          id: 10,
          title: "Maximus",
          description: "descrição projeto Maximus",
          tech: [{ code: 0 }, { code: 1 }, { code: 2 }],
        },
        {
          id: 11,
          title: "Online Education",
          description: "descrição projeto Online Education",
          tech: [{ code: 0 }, { code: 1 }, { code: 5 }, { code: 2 }],
        },
        {
          id: 12,
          title: "Spotify",
          description: "descrição projeto Spotify",
          tech: [{ code: 0 }, { code: 1 }, { code: 2 }],
        },
        {
          id: 13,
          title: "Travel Website",
          description: "descrição projeto Travel Website",
          tech: [{ code: 0 }, { code: 1 }, { code: 2 }],
        },
        {
          id: 14,
          title: "Cronômetro",
          description: "descrição projeto Cronômetro",
          link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/cronometro/dist",
          tech: [{ code: 4 }, { code: 1 }],
        },
        {
          id: 15,
          title: "Pokedex",
          description: "descrição projeto Pokedex",
          link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/pokedex/dist",
          tech: [{ code: 4 }, { code: 1 }, { code: 10 }],
        },
        {
          id: 16,
          title: "Conversor de Moedas",
          description: "descrição projeto Conversor de Moedas",
          link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/conversor/dist",
          tech: [{ code: 4 }, { code: 1 }, { code: 10 }],
        },
        {
          id: 17,
          title: "Calculadora",
          description: "descrição projeto Calculadora",
          link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/calculadora/dist",
          tech: [{ code: 4 }, { code: 1 }],
        },
        {
          id: 18,
          title: "Cinemax Não Concluido",
          description: "descrição projeto Cinemax",
          link: "https://douglas-ggoncalves.github.io/Front-end/Vue.js/cinemax/dist",
          tech: [{ code: 4 }, { code: 1 }, { code: 10 }],
        },
        {
          id: 19,
          title: "Sistema Maximus",
          description: "descrição projeto Maximus",
          link: "http://67.207.84.123:8080",
          tech: [
            { code: 4 },
            { code: 6 },
            { code: 1 },
            { code: 5 },
            { code: 2 },
            { code: 7 },
            { code: 11 },
          ],
        },
      ],
      technologies: [
        {
          id: 0,
          desc: "HTML 5",
          icon: "language-html5",
          color: "red",
        },
        {
          id: 1,
          desc: "CSS 3",
          icon: "language-css3",
          color: "blue",
        },
        {
          id: 2,
          desc: "Bootstrap",
          icon: "bootstrap",
          color: "deep-purple",
        },
        {
          id: 3,
          desc: "Javascript",
          icon: "language-javascript",
          color: "yellow",
        },
        {
          id: 4,
          desc: "Vue.js",
          icon: "vuejs",
          color: "green",
        },
        {
          id: 5,
          desc: "Sass",
          icon: "sass",
          color: "pink",
        },
        {
          id: 6,
          desc: "Node.js",
          icon: "nodejs",
          color: "green",
        },
        {
          id: 7,
          desc: "SQLServer",
          icon: "microsoft-access",
          color: "deep-orange",
        },
        {
          id: 8,
          desc: "MySQL",
          icon: "database",
          color: "blue-grey",
        },
        {
          id: 9,
          desc: "jQuery",
          icon: "jquery",
          color: "light-blue",
        },
        {
          id: 10,
          desc: "API",
          icon: "api",
          color: "orange",
        },
        {
          id: 11,
          desc: "Digital Ocean",
          icon: "digital-ocean",
          color: "blue",
        },
        {
          id: 12,
          desc: "AWS",
          icon: "aws",
          color: "orange",
        },
      ],
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
    submit() {
      alert("chegou");
      /*
      axios
        .get("http://67.207.84.123/posts")
        .then((res) => {
          console.log("resposta " + res.data);
        })
        .catch(() => {
          console.log("ocorreu um erro");
        });
        */
    },
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
    },
  },
};
</script>
