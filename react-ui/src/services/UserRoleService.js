import config from '../config';
import {axios} from './index';

var endpoint = config.AUTH_SERVER_HOST+`/api/global/user/role`;

const headers = {
    "Content-Type": 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type',
    'Access-Control-Allow-Credentials': true,
    'Accept':'*',
    "no-cors": ''
};
export default {
   
    getAll() {
        return axios.get(endpoint,  {headers: headers})
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    },
    getAllByType(type) {
        return axios.get(endpoint+`/${type}`,  {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    update(id, data) {
        return axios.put(endpoint+`/${id}`, data,  {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    add(user) {
        return axios.post(endpoint, user,  {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(endpoint+`/${id}`,  {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    get(id) {
        return axios.delete(endpoint+`/${id}`,  {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }    
};