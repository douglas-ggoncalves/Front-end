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

      <div class="elements" id="teste">
        <button @click="operator('=')">=</button>
      </div>
    </div>
  </div>
</template>

<script>
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
          console.log('caiu no if')
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

<style scoped>
#main {
  border: 1px solid red;
}

#main > div {
  border: 1px solid rgb(185, 179, 179);
  display: inline-block;
  padding: 0.5rem;
  -webkit-box-shadow: 2px 5px 11px -1px rgba(0, 0, 0, 0.87);
  box-shadow: 2px 5px 11px -1px rgba(0, 0, 0, 0.87);
}

input {
  text-align: right;
  padding: 0.5rem;
  background: none;
  font-size: 1.5rem;
  border: 1px solid rgb(185, 179, 179);
}

button {
  cursor: pointer;
  padding: 0.5rem 0.7rem;
  width: 20%;
  font-size: 1.2rem;
  border: 1px solid rgb(185, 179, 179);
}

#operators {
  display: flex;
  justify-content: space-between;
  margin: 0.7rem 0;
}

.elements {
  display: flex;
  justify-content: space-between;
  margin: 0.7rem 0;
}

#teste button {
  background-color: #4d90fe;
  width: 100%;
}
</style>