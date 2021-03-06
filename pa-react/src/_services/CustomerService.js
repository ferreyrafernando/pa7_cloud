import axios from 'axios'

export class CustomerService {

    /*
    getCustomersMedium() {
        return axios.get('assets/demo/data/customers-medium.json')
            .then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('assets/demo/data/customers-large.json')
                .then(res => res.data.data);
    }
    */


   getCustomersSmall() {
        return axios.get('data/customers-small.json')
                .then(res => res.data.data);
    }

    getCustomersMedium() {
        return axios.get('data/customers-medium.json')
                .then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('data/customers-large.json')
                .then(res => res.data.data);
    }

    getCustomersXLarge() {
        return axios.get('data/customers-xlarge.json')
                .then(res => res.data.data);
    }
    
}
