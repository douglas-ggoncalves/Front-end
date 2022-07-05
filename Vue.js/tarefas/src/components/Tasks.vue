<template>
    <div class="main" id="main">
        <span :class="{'checked': task.checked}" v-if="editOn">{{ task.descricao }}</span>
        <v-text-field v-else v-model="task.descricao" @keyup.enter="edit()"></v-text-field>

        <v-tooltip color="warning" bottom v-show="editOn">
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-show="editOn" color="warning" dark v-bind="attrs" v-on="on" @click="edit()" style="cursor: pointer">
                    mdi-pencil
                </v-icon>
            </template>
            <span>Editar</span>
        </v-tooltip>

        <v-tooltip v-show="editOn" color="red" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-show="editOn" @click="destroy()" color="error" dark v-bind="attrs" v-on="on" style="cursor: pointer">
                    mdi-delete
                </v-icon>
            </template>
            <span>Excluir</span>
        </v-tooltip>

        <v-btn depressed color="info" v-show="editOn == false" @click="edit()">Salvar</v-btn>
        <v-btn class="ml-1" depressed color="red" dark v-show="editOn == false" @click="cancel()">Cancelar</v-btn>
        
        <v-tooltip v-show="editOn" color="success" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-show="editOn" color="success" dark v-bind="attrs" v-on="on" @click="check()" style="cursor: pointer">
                    mdi-check
                </v-icon>
            </template>
            <span>Concluir</span>
        </v-tooltip>
    </div>
</template>

<script>

export default {
    data(){
        return {
            editOn: true
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
                this.$emit("updateThisTask")
            }
        }, 
        destroy: function(){
            this.$emit("deleteThisTask", {idTask: this.task.id})
        },
        check: function () {
            if(this.task.checked) {
                this.task.checked = false;
                this.$emit("updateThisTask")
            } else {
                this.task.checked = true;
                this.$emit("updateThisTask")
            }
        },
        cancel: function(){
            this.$emit("cancelUp")
            this.editOn = true
        }
    }
}
</script>

<style scoped>
div.main{
    width: 100%;
}

.checked{
    text-decoration: line-through; 
}

button::after{
    background-color: transparent !important;
}

span{
    margin-right: .3rem;
}

div.v-application--wrap{
  min-height: 100% !important;
}
</style>
