import {axios} from './index';
import config from '../config';

const CUST_PRODUCT_URL=`${config.ITEM_SERVER_HOST}/api/cust/product/stock`;

const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll(productId) {
        return axios.get(CUST_PRODUCT_URL+`/${productId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    getByDate(from, to) {
        return axios.get(CUST_PRODUCT_URL+'/filter', { params: {from, to} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    serach(text) {
        return axios.get(CUST_PRODUCT_URL+'/filter', { params: {text} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    add(PRODUCT) {
        return axios.post(CUST_PRODUCT_URL, PRODUCT,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    update(PRODUCT) {
        return axios.put(CUST_PRODUCT_URL, PRODUCT,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    delete(id) {
        return axios.delete(CUST_PRODUCT_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};
