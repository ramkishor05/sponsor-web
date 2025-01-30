import config from '../config';
import {axios} from './index';

var endpoint = config.AUTH_SERVER_HOST+`/api/cust/role`;

const headers = {
    'Content-Type': 'application/json'
};
export default {
   
    getAll() {
        return axios.get(endpoint)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getAllByType(type) {
        return axios.get(endpoint+`/${type}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    update(id, data) {
        return axios.put(endpoint+`/${id}`, data)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    add(user) {
        return axios.post(endpoint, user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(endpoint+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    get(id) {
        return axios.delete(endpoint+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }    
};