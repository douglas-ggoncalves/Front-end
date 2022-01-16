<template>
  <div class="elements">
     <h4>1 Real brasileiro equivale a </h4>
     <h3>0,18 Dólar Americano</h3>

    <div class="divConvert">
        <input type="text" value="1">

        <select name="select" >
            <option value="valor1" selected>{{ teste }}</option>
            <option value="valor1">Real Brasileiro</option>
        </select>
    </div>

    <div class="divConvert">
        <input type="text" value="5.28">

        <select name="select">
            <option value="valor1" selected>Dólar Americano</option>
        </select>
    </div>


  </div>
</template>

<script>
export default {
    data(){
        return {
            Coin: Object
        }
    }, props: {
        teste: String
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
        padding: .5rem 1.5rem;
    }

    input{
        background: none;
        display: inline-block !important;
        border: 1px solid rgb(133, 133, 133);
        border-radius: 6px;
        height: 100%;
        padding-left: .7rem;
        color: rgba(255, 255, 255, 0.627);
        width: 120px;
    }

    h3{
        color: rgba(255, 255, 255, 0.815);
    }

    h4{
        color: rgba(255, 255, 255, 0.527);
    }

    select{
        cursor: pointer;
        background: none !important;
        color: rgba(255, 255, 255, 0.527);
        height: 100% !important;
        margin-left: .5rem;
        border: 1px solid rgb(133, 133, 133) !important;
        padding-top: .1rem;
        padding-bottom: .1rem;
        width: 140px;
        border-radius: 6px;
        padding-left: .5rem;
        padding-right: .5rem;
        background: rgb(32, 33, 36) !important ;
    }

    div.divConvert{
        height: 26px;
        margin-bottom: .8rem;
    }
</style>