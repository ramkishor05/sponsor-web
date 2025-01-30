import {axios} from './index';
import config from '../config';

const CUST_PURCHASE_URL=`${config.ORDERING_SERVER_HOST}/api/cust/order/purchases`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_PURCHASE_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }, 
    getAllBySupplier(supplierId) {
        return axios.get(CUST_PURCHASE_URL+`/supplier/${supplierId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getAllByUser(userId) {
        return axios.get(CUST_PURCHASE_URL+`/user/${userId}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(CUST_PURCHASE_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(CUST_PURCHASE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_PURCHASE_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(CUST_PURCHASE_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }, 
    getByDate(from, to){
        return axios.get(CUST_PURCHASE_URL+`/filter?from=${from}&to=${to}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getByDate(supplierId,from, to){
        return axios.get(CUST_PURCHASE_URL+`/filter/supplier/`+supplierId+`?from=${from}&to=${to}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};