import {axios} from './index';
import config from '../config';

const CUST_UNIT_URL=`${config.ITEM_SERVER_HOST}/api/cust/unit`;

const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_UNIT_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    getByDate(from, to) {
        return axios.get(CUST_UNIT_URL+'/filter', { params: {from, to} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    add(unit) {
        return axios.post(CUST_UNIT_URL, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    update(id, unit) {
        return axios.put(CUST_UNIT_URL+`/${id}`, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    delete(id) {
        return axios.delete(CUST_UNIT_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};
