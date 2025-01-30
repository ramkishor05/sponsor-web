import {axios} from './index';
import config from '../config';

const CUST_UNIT_GROUP_URL=`${config.ITEM_SERVER_HOST}/api/cust/unitgroup`;

const headers = {
    'Content-Type': 'application/json'
  };
export default {
    getAll() {
        return axios.get(CUST_UNIT_GROUP_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    getByDate(from, to) {
        return axios.get(CUST_UNIT_GROUP_URL+'/filter', { params: {from, to} },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    add(unit) {
        return axios.post(CUST_UNIT_GROUP_URL, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    update(id, unit) {
        return axios.put(CUST_UNIT_GROUP_URL+`/${id}`, unit,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    delete(id) {
        return axios.delete(CUST_UNIT_GROUP_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};
