import {axios} from './index';
import config from '../config';

const CUST_CURRENCY_GROUP_URL=`${config.ITEM_SERVER_HOST}/api/cust/currency/group`

export default {
    getAll() {
        return axios.get(CUST_CURRENCY_GROUP_URL)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(CUST_CURRENCY_GROUP_URL+'/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(CUST_CURRENCY_GROUP_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_CURRENCY_GROUP_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(CUST_CURRENCY_GROUP_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};