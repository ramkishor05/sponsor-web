import {axios} from './index';
import config from '../config';

const CUST_CATEGORY_URL=`${config.ITEM_SERVER_HOST}/api/cust/category/item`;
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_CATEGORY_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(CUST_CATEGORY_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(CUST_CATEGORY_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_CATEGORY_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(CUST_CATEGORY_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};