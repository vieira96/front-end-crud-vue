import api from './api';

export default {
    list:() => {
        return api.get('/products')
    },

    save:(produto) => {
        return api.post('/product', produto);
    },

    delete:(id) => {
        return api.delete('/product/'+id+'/delete');
    },

    edit:(produto) => {
        return api.put('/product/'+produto.id+'/edit', produto)
    },

    getProduto: (id) => {
        return api.get('/product/'+id);
    }

}