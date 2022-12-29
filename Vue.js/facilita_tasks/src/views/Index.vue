<template>
  <div>
    <!-- Login Screen -->
    <section id="loginScreen">
      <div class="row">
        <div class="leftSide">
          <div>
            <img src="../assets/img/ImageFacilita.png" alt="">
            <h1 id="facilita">FACILITA</h1><h1 id="tasks">TASKS</h1>
            <h5>Gestão de tarefas especiais</h5>
          </div>
        </div>

        <div class="rightSide">
          <div>
            <h3>Entre com seus dados de acesso.</h3>

            <span>
              Nome de usuário ou e-mail:
            </span>
            <input type="text">

            <span>
              Senha:
            </span>
            <input type="password">

            <button @click="login()">
              Entrar
            </button>

            <a href="#">Esqueci minha senha</a>
          </div>
        </div>
      </div>
    </section>
    <!-- End Login Screen -->
  </div>
</template>

<script>
import '../assets/css/stylus.styl'

export default {
  data(){
    
  },
  methods:{
    login(){
      this.$emit("alterViewEmit", "Home");
    }
  }
}
</script>


