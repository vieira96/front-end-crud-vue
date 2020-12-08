<template>
    <div id="home">

        <CreateForm v-if="createFormOpenned" @close="createFormOpenned = false" @submited="create($event)"/>   
        
        <UpdateForm v-if="updateFormOpenned" :product="product" @close="cancel()" @submited="update($event), updateFormOpenned = false"/>   
        
        <Table v-show="productList.length > 0" :products="productList" @clickedProduct="product = $event.product, updateFormOpenned = true, createFormOpenned = false, scrollToTop()" @deletedProduct="del($event)"/>

        <div class="new-area" v-if="this.updateFormOpenned == false">
            <button @click.prevent="createFormOpenned = true, updateFormOpenned = false, scrollToTop()">Novo Produto</button>    
        
        </div>
    </div>
</template>

<script>

import CreateForm from '../components/CreateForm';
import UpdateForm from '../components/UpdateForm';
import Table from '../components/Table.vue';
import products from '../services/products';

export default {
    name: 'Home',

    data(){
        return {
            createFormOpenned: false,
            updateFormOpenned: false,
            productList: [],
            product: {}

        }
    },

    methods: {
        create(event) {
            products.save(event.produto).then(response => {
                this.productList.push(response.data.result);
            }).finally(
                this.createFormOpenned = false
            );  
        },

        update(event) {
            products.edit(event.produto);
        },

        del(event) {
            if(confirm("Deseja realmente deletar o produto?")){
                products.delete(event.id);
                var filter = this.productList.filter(product => {
                    return product.id != event.id;
                });
                this.productList = filter;
            }
        },

        scrollToTop(){
            window.scrollTo(0, 0);
        },

        cancel(){
            products.list().then(response => {
                this.productList = response.data.results;
            });
            this.updateFormOpenned = false;
        },

    },

    mounted() {
        products.list().then(response => {
            this.productList = response.data.results;
        });
    },

    components: {
        CreateForm,
        Table,
        UpdateForm
    }
}
</script>

<style scoped>

    .new-area {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .new-area button {
        padding: 5px 30px;
        margin: 5px 0;
        cursor: pointer;
    }
</style>