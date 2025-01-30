import config from '../config';
import {axios} from './index';

var endpoint = config.AUTH_SERVER_HOST+`/api/global/authentication`;

let headers={
    "Content-Type": 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':'Content-Type',
    'Access-Control-Allow-Credentials': true,
    'Accept':'*'
}

export default {
    
    login(user) {
        return axios.post(endpoint+'/login', user ,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    register(user) {
        return axios.post(endpoint+'/register', user ,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    validateToken(token) {
        return axios.post(endpoint+'/token/validate', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
    ,

    expiredToken(token) {
        return axios.post(endpoint+'/token/expired', token)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
    ,
    getUser(token) {
        let headers={};
        headers['Authorization']=token;
        return axios.get(endpoint+'/userdetail', {headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};