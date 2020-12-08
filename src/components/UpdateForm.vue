<template>
    <div id="update">
        <h1>Editando produto</h1>
        <form @submit.prevent="submit()">
            <div class="label">
                <label>Nome do produto</label>
                <input :class="{'input-error': $v.product.name.$invalid && anyError}" type="text" v-model.trim="$v.product.name.$model">
            </div>
            
            <div class="label">
                <label>Quantidade</label>
                <input :class="{'input-error': $v.product.quantity.$invalid && anyError}" type="text" v-model.trim="$v.product.quantity.$model" >
            </div>

            <div class="label">
                <label>Preço</label>
                <input :class="{'input-error': $v.product.price.$invalid && anyError}" type="text" v-model.trim="$v.product.price.$model" >
            </div>   

            <div class="errors" v-if="anyError">
                <div class="error" v-if="!$v.product.name.required">O campo de nome é obrigatório</div>
                
                <div class="error" v-if="!$v.product.quantity.integer">Só é aceito numeros inteiros em quantidade.</div>
                <div class="error" v-if="!$v.product.quantity.required">O campo de quantidade é obrigatório</div>


                <div class="error" v-if="!$v.product.price.minValue">O preço n pode ser 0.</div>
                <div class="error" v-if="!$v.product.price.decimal">Só é aceito numeros no preço separados por <strong>ponto</strong>.</div>
                <div class="error" v-if="!$v.product.price.required">O campo de preço é obrigatório</div>

            </div>

            <div>
                <button type="submit">Salvar</button>
                <button @click.prevent="closeForm()">Cancelar</button>
            </div>
            
        </form>
    </div>
</template>

<script>

import {required, minValue, integer, decimal} from 'vuelidate/lib/validators';

export default {
    name: 'UpdateForm',
    data(){
        return {
            anyError: false,
        }
    },

    methods: {
         closeForm() {
            this.$emit('close');
        },

        submit() {
            if(this.$v.product.$invalid) {
                this.anyError = true;
            } else {
                if(this.anyError) {
                    this.anyError = false;
                }

                this.$emit('submited', {'produto':this.product});
            }
        }
    },

    props: [
        'product'
    ],

    validations: {
        product: {
            name: {
                required
            },
            quantity: {
                required,
                integer
            },
            price: {
                required,
                minValue: minValue(0.1),
                decimal
            }
        }
    },

}
</script>

<style scoped>
    #update {
        width: 100vw;
        min-height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 1px 1px 10px 0px #ccc;
    }
    
    .label {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    .label label {
        font-size: 20px;
    }

    .label input {
        margin-top: 5px;
    }
</style>