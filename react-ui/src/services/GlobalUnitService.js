import {axios} from './index';
import config from '../config';

const GLOBAL_UNIT_URL=`${config.ITEM_SERVER_HOST}/api/global/unit`;

const headers = {
    'Content-Type': 'application/json'
  };
export default {
    getAll() {
        return axios.get(GLOBAL_UNIT_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    getByDate(from, to) {
        return axios.get(GLOBAL_UNIT_URL+'/filter', { params: {from, to} })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    add(unit) {
        return axios.post(GLOBAL_UNIT_URL, unit)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    update(id, unit) {
        return axios.put(GLOBAL_UNIT_URL+`/${id}`, unit)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    delete(id) {
        return axios.delete(GLOBAL_UNIT_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};
