<template>
    <div>
        <span :class="{'checked': task.checked}" v-if="editOn">{{ task.descricao }}</span>
        <input v-else v-model="task.descricao">

        <v-tooltip color="warning" bottom v-show="editOn">
            <template v-slot:activator="{ on, attrs }">
                <v-icon color="warning" dark v-bind="attrs" v-on="on" @click="edit()" style="cursor: pointer">
                    mdi-pencil
                </v-icon>
            </template>
            <span>Editar</span>
        </v-tooltip>

        <v-tooltip v-show="editOn == false" color="primary" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-show="editOn == false" color="primary" dark v-bind="attrs" v-on="on" @click="save()" style="cursor: pointer">
                    mdi-content-save
                </v-icon>
            </template>
            <span>Salvar</span>
        </v-tooltip>

        <v-tooltip color="red" bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon @click="destroy()" color="error" dark v-bind="attrs" v-on="on" style="cursor: pointer">
                    mdi-delete
                </v-icon>
            </template>
            <span>Excluir</span>
        </v-tooltip>
        
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
            editOn: true,
            checkOn: false
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

.checked{
    text-decoration: line-through; 
}
</style>
