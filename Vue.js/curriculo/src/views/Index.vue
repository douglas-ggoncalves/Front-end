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
            Sou um desenvolvedor com vivência em construção de projetos bem
            elaborados, apaixonado pelo o que faço, sou de fácil relacionamento e
            focado em resultados, estou sempre em busca de aprender algo que me
            ajude a ser um desenvolvedor cada vez melhor.
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
                  value="85"
                ></v-progress-linear>
              </div>

              <div>
                <p>MySQL / SQLServer</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="90"
                ></v-progress-linear>
              </div>
            </div>

            <div class="animate__animated animate__fadeInRight" id="dadRight">
              <div>
                <p>Vue.js</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="85"
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
                  value="95"
                ></v-progress-linear>
              </div>

              <div>
                <p>C#</p>
                <v-progress-linear
                  color="primary accent-4"
                  value="85"
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
            <v-btn class="mt-15" large rounded color="primary" @click="alterViewEmit2()">
              VER MAIS
            </v-btn>
        </v-col>
      </v-row>
    </v-container>

    <v-container id="containerPort" :fluid="true" v-if="select == 'Portfólio'">
      

      <v-row class="px-sm-2 px-md-3 px-lg-3">
        <v-col :cols="12">
          <v-btn class="mb-5" large rounded color="primary" @click="alterViewEmit3()">
              Entrar em Contato
            </v-btn>
        </v-col>

        <v-col
          v-for="(project, index) in projects"
          :key="index"
          :cols="11"
          :sm="6"
          :md="5"
          :lg="4"
        >
          <v-card class="">
            <v-img :src='"../assets/img/"+ project.title + ".png"'></v-img> 

            <v-card-title>{{ project.title }}</v-card-title>

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
          </v-card>
        </v-col>

        <v-col :cols="12">
          <v-btn class="mt-15" large rounded color="primary" @click="alterViewEmit3()">
              Entrar em Contato
            </v-btn>
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
            <v-dialog
              v-model="dialogLoading"
              hide-overlay
              persistent
              width="300"
            >
              <v-card
                color="black"
                dark
              >
                <v-card-text class="pt-2">
                  Por favor aguarde
                  <v-progress-linear
                    indeterminate
                    color="white"
                    class="mb-0 mt-5"
                  ></v-progress-linear>
                </v-card-text>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialog" persistent max-width="290" >
              <v-card>
                <v-card-title class="text-h5">
                  Recebi seu contato
                </v-card-title>

                <v-card-text>
                  Vou te retornar o mais breve possível.
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Confirmar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          <h3>Fique à vontade para enviar sua mensagem</h3>
            <v-alert v-if="errorAlert" type="error">
              Todos os campos abaixo devem ser corretamente preenchidos.
            </v-alert>

            <v-text-field
              v-model="name"
              value=""
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
import js from "../assets/js/scrypt.js";
import "animate.css";
import emailjs from '@emailjs/browser';

Vue.use(Vuetify);
const gradients = [["#222"]];

export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(100) },
    email: { required, email }
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
      projects: [],
      technologies: [],
      dialog: false,
      dialogLoading: false,
      errorAlert: false
    };
  },
  methods: {
    alterViewEmit() {
      this.$emit("alterViewEmit", "Sobre");
    },
    alterViewEmit2() {
      this.$emit("alterViewEmit", "Portfólio");
    },
    alterViewEmit3() {
      this.$emit("alterViewEmit", "Contato");
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
      this.errorAlert = false;
      this.$v.name.$touch();
      this.$v.email.$touch();

      if(!this.$v.name.$error && !this.$v.name.$error && this.message != "" && !this.$v.email.$error && !this.$v.email.$invalid) {
        this.dialogLoading = true;
        emailjs.send("service_9lvidxf","template_6mgonib",{
          from_name: this.name,
          message: this.message,
          reply_to: this.email,
        }, "POSv9ZHRx2ZrZatua").then(() => {
          this.name = '';
          this.email = '';
          this.message = '';
          this.$v.$reset();
          this.dialogLoading = false;
          this.dialog = true;
        })
      } else{
        this.errorAlert = true;
      }
    }
  },
  props: {
    select: String,
  },
  created() {
    this.projects = js.projects;
    this.technologies = js.technologies;
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
