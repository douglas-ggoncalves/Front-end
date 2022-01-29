<template>
  <div class="elements">
     <h4> 1 {{ nameBy }} equivale a </h4>
     <h3> {{ priceHighBy }} {{ nameTo }} </h3>

    <div class="divConvert">
        <input type="text" maxlength="13" v-model="numberBy" @keyup="numberByFunction($event)">

        <select name="select" id="selectBy" @change="updateCoinBy()">
            <option v-for="XMLCoins in coinsXML" :key="XMLCoins.sigla" :value="XMLCoins.nome" :id="XMLCoins.sigla"> {{ XMLCoins.nome }} </option>
        </select>
    </div>

    <div class="divConvert">
        <input type="text" maxlength="14" v-model="numberTo" @keyup="numberToFunction($event)">

        <select name="select" id="selectTo" @change="updateCoinTo()">
            <option v-for="XMLCoins in coinsXML" :key="XMLCoins.sigla" :value="XMLCoins.nome" :id="XMLCoins.sigla"> {{ XMLCoins.nome }} </option>
        </select>
    </div>

    <button @click="inverseCoins()">
        <span>Inverter Moedas </span>
        <i class="fas fa-sync-alt"></i>
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return {
            numberBy: 1,
            siglaBy: 'BRL',
            nameBy: 'Real Brasileiro',
            priceHighBy: 0,
            numberTo: 1,
            nameTo: 'Dólar Americano',
            siglaTo: 'USD',
            priceHighTo: 0
        }
    }, props: {
        coinsXML: Array
    }, methods: {
        updateCoinBy: function (){
            var selectBy = document.getElementById('selectBy');
            this.nameBy = selectBy.options[selectBy.selectedIndex].value;
            this.siglaBy = selectBy.options[selectBy.selectedIndex].id;

            var selectTo = document.getElementById('selectTo');

            if(selectBy.options[selectBy.selectedIndex].id == selectTo.options[selectTo.selectedIndex].id) {
                alert("Ocorreu um erro, opções inválidas")
            } else {
                for(var x=0; x<selectTo.options.length; x++){
                    selectTo.options[x].style.display='block'
                }
                selectBy.options[selectTo.selectedIndex].style.display = 'none'
                selectTo.options[selectBy.selectedIndex].style.display = 'none'
            }

            axios.get(`https://economia.awesomeapi.com.br/json/${this.siglaBy}-${this.siglaTo}`).then(res => {
                axios.get(`https://economia.awesomeapi.com.br/json/${this.siglaTo}-${this.siglaBy}`).then(ress => {
                    this.priceHighBy = (res.data[0].high * 1).toFixed(2);
                    this.numberTo = (this.priceHighBy * this.numberBy).toFixed(2);
                    this.priceHighTo = (ress.data[0].high * 1).toFixed(2);
                });
            }).catch(() => {
                alert(`As moedas selecionadas não possuem conversão até o exato momento (${this.siglaBy} - ${this.siglaTo}), a página será carregada`)
                document.location.reload(true);
            })
        },
        updateCoinTo: function (){
            var selectTo = document.getElementById('selectTo');
            this.nameTo = selectTo.options[selectTo.selectedIndex].value;
            this.siglaTo = selectTo.options[selectTo.selectedIndex].id;

            var selectBy = document.getElementById('selectBy');

            if(selectBy.options[selectBy.selectedIndex].id == selectTo.options[selectTo.selectedIndex].id) {
                alert("Ocorreu um erro, opções inválidas")
            } else {
                for(var x=0; x<selectBy.options.length; x++){
                    selectBy.options[x].style.display='block'
                }
                selectBy.options[selectTo.selectedIndex].style.display = 'none'
                selectTo.options[selectBy.selectedIndex].style.display = 'none'
            }

            axios.get(`https://economia.awesomeapi.com.br/json/${this.siglaBy}-${this.siglaTo}`).then(res => {
                axios.get(`https://economia.awesomeapi.com.br/json/${this.siglaTo}-${this.siglaBy}`).then(ress => {
                    this.priceHighBy = (res.data[0].high * 1).toFixed(2);
                    this.numberTo = (this.priceHighBy * this.numberBy).toFixed(2);
                    this.priceHighTo = (ress.data[0].high * 1).toFixed(2);
                })
            }).catch(() => {
                alert(`As moedas selecionadas não possuem conversão até o exato momento (${this.siglaTo} - ${this.siglaBy}), a página será carregada`)
                document.location.reload(true);
            })
        },
        numberByFunction: function (element) { 
            if(element.key.match(/\d+/g)){ //se elemento digitado for número
                this.numberTo = (this.priceHighBy * this.numberBy).toFixed(2);
                if(this.numberTo == 'NaN'){
                    console.log('valores inválidos')  
                }

            } else if(element.key == 'Backspace' || element.key == 'Delete'){
                if(this.numberBy.length == 0) {
                    this.numberBy = 1
                } else{
                    this.numberTo = (this.priceHighBy * this.numberBy).toFixed(2);
                }
            } else if(element.key == ',' || element.key == '.'){
                this.numberBy = this.numberBy.replace(",", ".")

                if(this.numberBy.split(".").length - 1 > 1){ // se tiver mais de um ponto no input
                    var aux = this.numberBy.lastIndexOf("."); // pega indice do último ponto digitado
                    this.numberBy = this.numberBy.slice(0 , aux) // remove o ponto adicional e o que tiver na frente
                } 
            } else{
                this.numberBy = this.numberBy.replace(/[^0-9.]/g, ''); // retira o que não estiver entre 0 e 9 e não for ponto
            }
        },
        numberToFunction: function (element) { 
            if(element.key.match(/\d+/g)){ //se elemento digitado for número
                this.numberBy = (this.priceHighTo * this.numberTo).toFixed(2);
            } else if(element.key == 'Backspace' || element.key == 'Delete'){
                if(this.numberTo.length <= 0) {
                    this.numberTo = 0
                } else{
                    this.numberBy = (this.priceHighTo * this.numberTo).toFixed(2);
                }
            } else if(element.key == ',' || element.key == '.'){
                this.numberTo = this.numberTo.replace(",", ".")
                if(this.numberTo.split(".").length - 1 > 1){ // se tiver mais de um ponto no input
                    var aux = this.numberTo.lastIndexOf("."); // pega indice do último ponto digitado
                    this.numberTo = this.numberTo.slice(0 , aux) // remove o ponto adicional e o que tiver na frente
                } 
            } else{
                this.numberTo = this.numberTo.replace(/[^0-9.]/g, ''); // retira o que não estiver entre 0 e 9 e não for ponto
            }
        }, 
        inverseCoins: function(){
            var auxNumber = this.numberBy;
            var auxSigla = this.siglaBy;
            var auxName = this.nameBy;
            var auxPrice = this.priceHighBy;

            this.nameBy = this.nameTo;
            this.siglaBy = this.siglaTo;
            this.priceHighBy = this.priceHighTo;
            this.numberBy = this.numberTo

            this.nameTo = auxName;
            this.siglaTo = auxSigla;
            this.priceHighTo = auxPrice;
            this.numberTo = auxNumber

            var auxSelectBy = document.getElementById("selectBy").options
            for(var i=0; i< auxSelectBy.length; i++){
                if(auxSelectBy[i].id == this.siglaBy){
                    auxSelectBy[i].setAttribute("selected", "selected");
                } else{
                    auxSelectBy[i].removeAttribute("selected");
                }
            }
            
            var auxSelect = document.getElementById("selectTo").options
            for(var x=0; x< auxSelect.length; x++){
                if(auxSelect[x].id == this.siglaTo){
                    auxSelect[x].setAttribute("selected", "selected");
                } else{
                    auxSelect[x].removeAttribute("selected");
                }
            }
        }
        
    }, created(){
        axios.get(`https://economia.awesomeapi.com.br/json/${this.siglaBy}-${this.siglaTo}`).then(res => {
            axios.get(`https://economia.awesomeapi.com.br/json/${this.siglaTo}-${this.siglaBy}`).then(ress => {
                document.getElementById("selectTo").options.USD.setAttribute("selected", "selected") // definimos a option que tem o dólar como selecionada
                
                this.priceHighBy = (res.data[0].high * 1).toFixed(2);
                this.numberBy = (1 * 1).toFixed(0);
                this.numberTo = (this.priceHighBy * this.numberBy).toFixed(2);
                this.priceHighTo = (ress.data[0].high * 1).toFixed(2);

                var selectBy = document.getElementById('selectBy');
                var selectTo = document.getElementById('selectTo');
                
                if(selectBy.options[selectBy.selectedIndex].id == selectTo.options[selectTo.selectedIndex].id) {
                    alert("Ocorreu um erro, opções inválidas")
                } else {
                    selectBy.options[selectTo.selectedIndex].style.display = 'none'
                    selectTo.options[selectBy.selectedIndex].style.display = 'none'
                }
            });
        });
    }
};
</script>

<style scoped>
    *{
        outline: none;
    }

    div.elements{
        display: inline-block;
        margin-left: auto;
        margin-right: auto;
        -webkit-box-shadow: 5px 5px 12px -1px rgba(0,0,0,0.89); 
        box-shadow: 5px 4px 12px -1px rgba(0,0,0,0.89);
        padding: .5rem 1.0em;
    }

    input{
        background: none;
        border: 1px solid rgb(133, 133, 133);
        border-radius: 6px;
        height: 100%;
        padding-left: .7rem;
        color: rgba(255, 255, 255, 0.627);
        max-width: 50%;
    }

    h3{
        color: rgba(255, 255, 255, 0.815);
    }

    h4{
        color: rgba(255, 255, 255, 0.527);
    }

    select{
        color: rgba(255, 255, 255, 0.527);
        height: 100% !important;
        margin-left: .5rem;
        border: 1px solid rgb(133, 133, 133) !important;
        max-width: 50%;
        border-radius: 6px;
        padding: .1rem .5rem;
        background: rgb(32, 33, 36) !important ;
        border-color: transparent;
    }

    div.divConvert{
        display: flex;
        height: 24px;
        margin-bottom: .8rem;
        max-width: 100%;
    }

    button{
        margin-top: .5rem;
        margin-bottom: .2rem;
        cursor: pointer;
        background-color: transparent;
        color: rgba(255, 255, 255, 0.815);
        outline: none;
        border: 1px solid rgb(133, 133, 133) !important;
        padding: .5rem .7rem;
    }

    button:hover{
        background-color: white;
        color: black;
    }
</style>