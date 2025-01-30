import {axios} from './index';
import config from '../config';

const CUST_SALE_URL=`${config.ORDERING_SERVER_HOST}/api/cust/cart/sale`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    
    getCartDetial(userId) {
        headers['userId']=userId;
        return axios.get(CUST_SALE_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getAll() {
        return axios.get(CUST_SALE_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getAllByCustomer(customerId) {
        return axios.get(CUST_SALE_URL+`/customer/${customerId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getAllByUser(userId) {
        return axios.get(CUST_SALE_URL+`/user/${userId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(CUST_SALE_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(CUST_SALE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(item) {
        return axios.put(CUST_SALE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(CUST_SALE_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }, 
    getByDate(from, to){
        return axios.get(CUST_SALE_URL+`/filter?from=${from}&to=${to}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};