<template>
  <div id="main">
    <div>
      <input type="text" :value="input" disabled />

      <div id="operators"></div>

      <div class="elements">
        <button id="7" @click="number(7)">7</button>
        <button id="8" @click="number(8)">8</button>
        <button id="9" @click="number(9)">9</button>
        <button id="+" @click="operator('+')">+</button>
      </div>

      <div class="elements">
        <button id="4" @click="number(4)">4</button>
        <button id="5" @click="number(5)">5</button>
        <button id="6" @click="number(6)">6</button>
        <button id="-" @click="operator('-')">-</button>
      </div>

      <div class="elements">
        <button id="1" @click="number(1)">1</button>
        <button id="2" @click="number(2)">2</button>
        <button id="3" @click="number(3)">3</button>
        <button id="*" @click="operator('x')">&times;</button>
      </div>

      <div class="elements">
        <button id="." @click="operator('.')">.</button>
        <button id="0" @click="number(0)">0</button>
        <button @click="operator('C')">C</button>
        <button id="/" @click="operator('/')">&divide;</button>
      </div>

      <div class="elements" id="buttonEqual">
        <button id="Enter" @click="operator('=')">=</button>
      </div>
    </div>
  </div>
</template>

<script>
$(document.body).keyup(function(event) {
  var element = document.getElementById(event.key);
  element == undefined ? alert("O caractere informado não é aceito pela calculadora") : element.click();
});

import '../assets/css/style.css'
import $ from 'jquery'
export default {
  data() {
    return {
      input: '0'
    }
  },
  methods: {
    number (value) {
      if (this.input == 0 && this.input.toString() != '0.') {
        this.input = value;
      } else {
        this.input += value.toString();
      }
    },
    operator (value) {
      if (value == "C") {
        this.input = 0;
      } else if(value == "=") {
        this.input = this.calc()
      } else {
        if (value != ".") {
          if(this.hasOperatorMath("+") || this.hasOperatorMath("-") || this.hasOperatorMath("/") || this.hasOperatorMath("x") || this.hasOperatorMath("*")){
            this.input = this.calc() + value
          } else{
            this.input += value;
          }
        } else if (value == ".") 
          if(this.hasOperatorMath("+") || this.hasOperatorMath("-") || this.hasOperatorMath("/") || this.hasOperatorMath("x") || this.hasOperatorMath("*")){
            if(!this.verifyPoint(1)) this.input += value;
          } 

          else{ 
            if(!this.verifyPoint()) this.input += value 
          }
      }
    },
    calc(){
      if(this.input.toString().includes('x')) return eval(this.input.toString().replace("x","*"));
      return eval(this.input);
    },
    hasOperatorMath(operadorMath){
      if(this.input.toString().includes(operadorMath)) return true; // já tem a operação matemática na tela
      if(!this.input.toString().includes(operadorMath)) return false;
    },
    verifyPoint(teste){
      var more, sub, mult, div;
      if(this.input.toString().includes("+")) more = true;  
      if(this.input.toString().includes("-")) sub = true;  
      if(this.input.toString().includes("x")) mult = true;  
      if(this.input.toString().includes("*")) mult = true;  
      if(this.input.toString().includes("+")) div = true;  
      
      
      //var stringSplit;
      if(teste == undefined) {

      }
      console.log(this.input.toString().split('+'))
      console.log(this.input.toString().split('+')[0])
      console.log(this.input.toString().split('+')[1])
      if(this.input[this.input.length -1] == ".") return true;
    }
  },
};

</script>
