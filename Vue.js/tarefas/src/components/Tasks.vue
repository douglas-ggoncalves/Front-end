<template>
  <div>
    <span :class="{'checked': task.checked}" v-if="editOn">{{ task.descricao }} </span>
    <input v-else v-model="task.descricao">

    <button v-show="editOn" @click="edit()">
        <i class="fas fa-edit"></i>
    </button>

    <button v-show="editOn == false" @click="save()">
        <i class="fas fa-save"></i>
    </button>

    <button @click="destroy()">
        <i class="fas fa-trash-alt"></i>
    </button>

    <button v-show="editOn" @click="check()">
        <i class="fas fa-check"></i>
    </button>
  </div>
</template>

<script>

export default {
    data(){
        return {
            editOn: true,
            checkOn: false,
            newDesc: ''
        }
    },
    props: {
        task: Object
    }, 
    methods: {
        edit: function(){
            if(this.editOn) {
                this.editOn = false
            } else {
                this.editOn = true
            }
        }, 
        destroy: function(){
            this.$emit("deleteThisTask", {idTask: this.task.id})
        },
        save: function (){
            this.editOn = true
            this.task.checked = false;
        }, 
        check: function () {
            if(this.task.checked) {
                this.task.checked = false;
            } else {
                this.task.checked = true;
            }
        }
    }
}

</script>

<style scoped>
div{
  display: block;
  margin: .5rem 0;
  color: #2c3e50;
}

button {
    cursor: pointer;
    outline: none;
    border: none;
    background: none;
    padding: 0;
    margin: 0 .2rem
}

i{
    font-size: 10.5rem
}

span, input{
    font-size: 1.1rem;
    color: #2c3e50;
}

.checked{
    text-decoration: line-through; 
}
</style>
