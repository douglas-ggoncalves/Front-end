<template>
  <div id="main">
    <div>
      <input type="text" :value="input" disabled />

      <div id="operators"></div>

      <div class="elements">
        <button @click="number(number7)">{{ number7 }}</button>
        <button @click="number(number8)">{{ number8 }}</button>
        <button @click="number(number9)">{{ number9 }}</button>
        <button @click="operator('+')">+</button>
      </div>

      <div class="elements">
        <button @click="number(number4)">{{ number4 }}</button>
        <button @click="number(number5)">{{ number5 }}</button>
        <button @click="number(number6)">{{ number6 }}</button>
        <button @click="operator('-')">-</button>
      </div>

      <div class="elements">
        <button @click="number(number1)">{{ number1 }}</button>
        <button @click="number(number2)">{{ number2 }}</button>
        <button @click="number(number3)">{{ number3 }}</button>
        <button @click="operator('*')">&times;</button>
      </div>

      <div class="elements">
        <button @click="operator('.')">.</button>
        <button @click="number('0')">0</button>
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
      input: 0,
      number0: "0",
      number1: "1",
      number2: "2",
      number3: "3",
      number4: "4",
      number5: "5",
      number6: "6",
      number7: "7",
      number8: "8",
      number9: "9",
    };
  },
  methods: {
    operator: function (value) {
      if (value == "C") {
        this.input = 0;
      } else if (value == "+") {
        if(this.input.toString().includes('+')){
          console.log('já tem mais')
        } else{
          this.input += value;
        }
      }
    },
    number: function (value) {
      if (this.input == 0) {
        this.input = value;
      } else if (this.input != 0) {
        this.input += value;
      }
    },
  },
};
</script>
