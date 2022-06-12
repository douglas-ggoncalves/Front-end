<template>
  <div id="main" @keypress="teste($event)">
    <div >
      <input type="text" :value="input" disabled />

      <div id="operators"></div>

      <div class="elements">
        <button @click="number(7)">7</button>
        <button @click="number(8)">8</button>
        <button @click="number(9)">9</button>
        <button @click="operator('+')">+</button>
      </div>

      <div class="elements">
        <button @click="number(4)">4</button>
        <button @click="number(5)">5</button>
        <button @click="number(6)">6</button>
        <button @click="operator('-')">-</button>
      </div>

      <div class="elements">
        <button @click="number(1)">1</button>
        <button @click="number(2)">2</button>
        <button @click="number(3)">3</button>
        <button @click="operator('x')">&times;</button>
      </div>

      <div class="elements">
        <button @click="operator('.')">.</button>
        <button @click="number(0)">0</button>
        <button @click="operator('C')">C</button>
        <button @click="operator('/')">&divide;</button>
      </div>

      <div class="elements" id="buttonEqual">
        <button @click="operator('=')">=</button>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/style.css'
export default {
  data() {
    return {
      input: '0'
    };
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
      } else if(value == "="){
        this.input = this.calc()
      } else{
        if (value != ".") {
          if(this.hasOperatorMath("+") || this.hasOperatorMath("-") || this.hasOperatorMath("/") || this.hasOperatorMath("x")){
            this.input = this.calc()
          } else{
            this.input += value;
          }
        }
        else if (value == ".") if(!this.verifyPoint()) this.input += value;
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
    verifyPoint(){
      if(this.input[this.input.length -1] == ".") return true;
    },
    teste(event){
      if(event.key == 0 || event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 
      || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8 || event.key == 9) 
      this.number(event.key);
      console.log("testado " + event.key)
    }
  },
 
};
</script>
