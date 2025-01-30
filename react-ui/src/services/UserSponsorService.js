import config from '../config';
import {axios} from './index';

var endpoint = config.ACCOUNT_SERVER_HOST+`/api/global/user/sponsor`;

export default {
   
    getAll() {
        return axios.get(endpoint)
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