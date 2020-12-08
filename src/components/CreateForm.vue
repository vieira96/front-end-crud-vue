<template>
    <div id="create">
        <h1>Novo produto</h1>
        <form @submit.prevent="submit()">
            <input :class="{'input-error': $v.produto.name.$invalid && anyError}" type="text" placeholder="Nome do produto..." v-model.trim="$v.produto.name.$model">
            <input :class="{'input-error': $v.produto.quantity.$invalid && anyError}" type="text" placeholder="Quantidade..." v-model.trim="$v.produto.quantity.$model">
            <input :class="{'input-error': $v.produto.price.$invalid && anyError}" type="text" placeholder="Preço... Ex: R$: 10" v-model.trim="$v.produto.price.$model">
            
            <div class="errors" v-if="anyError">
                <div class="error" v-if="!$v.produto.name.required">O campo de nome é obrigatório</div>
                
                <div class="error" v-if="!$v.produto.quantity.minValue">A quantidade não pode ser menor que 1. </div>
                <div class="error" v-if="!$v.produto.quantity.integer">Só é aceito numeros inteiros em quantidade.</div>
                <div class="error" v-if="!$v.produto.quantity.required">O campo de quantidade é obrigatório</div>

                <div class="error" v-if="!$v.produto.price.minValue">O preço n pode ser menor que 1.</div>
                <div class="error" v-if="!$v.produto.price.decimal">Só é aceito numeros no preço separados por <strong>ponto</strong>.</div>
                <div class="error" v-if="!$v.produto.price.required">O campo de preço é obrigatório</div>

            </div>
            <div>
                <button type="submit">Enviar</button>
                <button @click.prevent="closeForm()">Cancelar</button>
            </div>
            
        </form>
    </div>
</template>

<script>

import {required, minValue, integer, decimal} from 'vuelidate/lib/validators';

export default {
    name: 'CreateForm',
    
    data(){
        return {
            produto: {
                name: '',
                quantity: '',
                price: ''
            },

            anyError: false,


        }
    },

    validations: {
        produto: {
            name: {
                required
            },
            quantity: {
                required,
                minValue: minValue(1),
                integer
            },
            price: {
                required,
                minValue: minValue(1),
                decimal
            }
        }
    },

    methods: {
        closeForm() {
            this.produto.name = '';
            this.produto.quantity = '';
            this.produto.price = '';
            this.$emit('close');
        },

        submit() {
            if(this.$v.produto.$invalid) {
                this.anyError = true
            } else {
                this.anyError = false;
                this.produto.price;
                this.$emit('submited', {'produto':this.produto});
                this.produto.name = '';
                this.produto.quantity = '';
                this.produto.price = '';
            }
        }
    }
}
</script>

<style>
    #create {
        width: 100vw;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 1px 10px 0px #ccc;
    }

    h1 {
        margin-right: 10px;
    }

    form {
        max-width: 700px;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form input {
        width: 80%;
        padding: 10px;
        margin: 10px 0px;
        border-radius: 20px;
        outline: none;
        border: 1px solid #ccc;
    }

 
    form button {
        padding: 10px 60px;
        margin: 10px 0;
        cursor: pointer;
        margin-right: 5px;
    }

    .error {
        padding: 10px;
        border: 1px solid #ec2828;
        background-color: rgb(230, 102, 102);
        color: #fff;
        width: 100%;
        margin-bottom: 5px;
    }

    .input-error {
        border: 1px solid #ec2828;
    }
</style>