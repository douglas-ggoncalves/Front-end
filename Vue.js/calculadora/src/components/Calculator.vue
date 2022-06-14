<template>
  <div id="main">
    <div>
      <input type="text" :value="input" disabled />

      <div id="operators"></div>

      <div class="elements">
        <button class="btn" id="7" @click="number(7)">7</button>
        <button class="btn" id="8" @click="number(8)">8</button>
        <button class="btn" id="9" @click="number(9)">9</button>
        <button class="btn" id="+" @click="operator('+')">+</button>
      </div>

      <div class="elements">
        <button class="btn" id="4" @click="number(4)">4</button>
        <button class="btn" id="5" @click="number(5)">5</button>
        <button class="btn" id="6" @click="number(6)">6</button>
        <button class="btn" id="-" @click="operator('-')">-</button>
      </div>

      <div class="elements">
        <button class="btn" id="1" @click="number(1)">1</button>
        <button class="btn" id="2" @click="number(2)">2</button>
        <button class="btn" id="3" @click="number(3)">3</button>
        <button class="btn" id="*" @click="operator('x')">&times;</button>
      </div>

      <div class="elements">
        <button class="btn" id="." @click="operator('.')">.</button>
        <button class="btn" id="0" @click="number(0)">0</button>
        <button class="btn" @click="operator('C')">C</button>
        <button class="btn" id="/" @click="operator('/')">&divide;</button>
      </div>

      <div class="elements" id="buttonEqual">
        <button class="btn" id="Enter" @click="operator('=')">=</button>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/style.css'
import $ from 'jquery'

$(function(){
  $(".btn").click(function(){
    $(".btn").blur();
  });
});

$(document.body).keyup(function(event) {
  if(event.key == ',') event.key = '.'
  var element = document.getElementById(event.key);
  if(element != undefined) element.click();
});

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
      if (value == "C") this.input = 0; 
      else if(value == "=") this.input = this.calc();
      else {
        if (value != ".") {
          if(this.hasOperatorMath("+") || this.hasOperatorMath("-") || this.hasOperatorMath("/") || this.hasOperatorMath("x") || this.hasOperatorMath("*")){
            this.input = this.calc() + value
          } else {
            this.input += value;
          }
        } else if (value == ".") {
          if(this.hasOperatorMath("+") || this.hasOperatorMath("-") || this.hasOperatorMath("/") || this.hasOperatorMath("x") || this.hasOperatorMath("*")){
            if(!this.verifyPoint(1)) this.input += value;
          } else { 
            if(!this.verifyPoint(0)) this.input += value 
          }
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
    verifyPoint(value){
      var more, sub, multX, mult, div;
      if(this.input.toString().includes("+")) more = true;  
      if(this.input.toString().includes("-")) sub = true;  
      if(this.input.toString().includes("x")) multX = true;  
      if(this.input.toString().includes("*")) mult = true;  
      if(this.input.toString().includes("/")) div = true;

      if(value == 0) {
        if(this.input.toString().includes(".")) return true;
      } else if(value == 1){
       if(more && this.input.toString().split('+')[1].includes(".")) return true;
       if(sub && this.input.toString().split('-')[1].includes(".")) return true;
       if(multX && this.input.toString().split('x')[1].includes(".")) return true;
       if(mult && this.input.toString().split('*')[1].includes(".")) return true;
       if(div && this.input.toString().split('/')[1].includes(".")) return true;
      }
    }
  },
};
</script>
