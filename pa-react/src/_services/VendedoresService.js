import axios from 'axios';

export class VendedoresService {

    getProductsSmall() {
        return axios.get('data/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('data/products.json').then(res => res.data.data);
    }

    getVendedores() {
        return axios.get('http://pa7.test/api/vendedores').then(res => res.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('data/products-orders-small.json').then(res => res.data.data);
    }
}