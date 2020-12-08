<template>
    <table id="table">
        <thead>
            <th>Nome do produto</th>
            <th>Quantidade</th> 
            <th>Preço</th>
            <th>Ações</th>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{product.name}}</td>
                <td>{{product.quantity}}</td>
                <td>R$: {{product.price}}</td>
                <td>
                    <button @click.prevent="edit(product)">Editar</button>
                    <button @click.prevent="del(product)">Deletar</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'Table',
    data() {
        return {

        }
    },
    props: [
        'products'
    ],
    methods: {
        edit(product) {
            this.$emit('clickedProduct', {'product':product});
        },

        del(product) {
            this.$emit('deletedProduct', {'id': product.id});
        }
    }

}
</script>

<style scoped>
    table {
        width:100%;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        padding: 15px;
        text-align: left;
    }
    #table tr:nth-child(even) {
        background-color: #eee;
    }
    #table tr:nth-child(odd) {
        background-color: #fff;
    }
        #table th {
        background-color: black;
        color: white;
    }
</style>