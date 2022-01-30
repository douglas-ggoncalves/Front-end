<template>
    <div id="myDiv">
        <h3>{{ pokemon.name | firstBig }}</h3>
        <div>
            <img :src="currentImg" style="" alt="">
        </div>
        <button @click="mudarSprite()">Mudar Sprite</button>
    </div>
</template>
<script>

import axios from "axios";
export default {
    data(){
        return{
            isFront: true,
            currentImg: '',
            pokemons: [
                {
                    back_default: '',
                    front_default: ''
                }
            ]
        }
    },
    props :{
        pokemon: Object
    }, created: function(){
        axios.get(this.pokemon.url).then(res => {
            this.pokemons.front_default = res.data.sprites.front_default
            this.pokemons.back_default = res.data.sprites.back_default
            this.currentImg = this.pokemons.front_default;
        }).catch(err => {
            console.log("Erro: " +err)
        })
    }, methods: {
        mudarSprite: function(){
            if(this.isFront){
                this.currentImg = this.pokemons.back_default
                this.isFront = false
            } else{
                this.currentImg = this.pokemons.front_default
                this.isFront = true
            }
        }
    }, filters: {
        firstBig: function(value){
            return value.substr(0, 1).toUpperCase() + value.substring(1)
        }
    }
}
</script>

<style scoped>
    @media (max-width: 900px) {
        div#myDiv{
            max-width: 90% !important;
        }
    }

    div#myDiv{
        border: 1px solid black;
        max-width: 50%;
        margin: 1rem auto;
        padding: 1rem;
        text-align: center;
    }

    button{
        padding: .5rem .7rem;
        cursor: pointer;
        background: none;
        outline: none;
        border: 1px solid gray;
    }

    button:hover{
        background: gray;
        color: white;
    }
</style>