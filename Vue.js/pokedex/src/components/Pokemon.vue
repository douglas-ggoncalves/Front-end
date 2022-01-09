<template>
    <div id="myDiv">
        <h3>{{ pokemon.name }}</h3>
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/201.png" style="" alt="">
        <h3>{{ pokemon.url }}</h3>
        <button>Mudar Sprite</button>
    </div>
</template>

<script>
export default {
    props :{
        pokemon: Object
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