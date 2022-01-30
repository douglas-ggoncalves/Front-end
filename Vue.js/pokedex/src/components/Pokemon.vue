<template>
    <div id="myDiv">
        <h3>{{ pokemon.name | firstBig }}</h3>
        <img :src="currentImg" style="" alt="">
        <h3>{{ pokemon.url }}</h3>
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
                    backDefault: '',
                    frontDefault: ''
                }
            ]
        }
    },
    props :{
        pokemon: Object
    }, created(){
        axios.get(this.pokemon.url).then(res => {
            this.pokemons.backDefault = res.data.sprites.back_default
            this.pokemons.frontDefault = res.data.sprites.front_default
            this.currentImg = this.pokemons.frontDefault;
        });
    }, methods: {
        mudarSprite: function(){
            if(this.isFront){
                this.currentImg = this.pokemons.backDefault
                this.isFront = false
            } else{
                this.currentImg = this.pokemons.frontDefault
                this.isFront = true
            }
        }
    }, filters: {
        firstBig: function(value){
            return value[0].toUpperCase() + value.substring(1)
        }
    }
}
</script>

<style scoped>
    div{
        border: 1px solid black;
        max-width: 95%;
        margin: 1rem auto;
        padding: 1rem;
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