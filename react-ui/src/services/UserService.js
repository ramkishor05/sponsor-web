import config from '../config';
import {axios} from './index';

var endpoint = config.AUTH_SERVER_HOST+`/api/global/user/detail`;

var custendpoint = config.AUTH_SERVER_HOST+`/api/cust/user`;

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
    saveCustUser(user) {
        return axios.post(custendpoint, user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    deleteCustUser(username) {
        return axios.delete(custendpoint+`/username/${username}`)
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
    },
    exists(username) {
        return axios.get(endpoint+`/exists/${username}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    updateProfile(data) {
        return axios.put(endpoint+'/profile/', data)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getUserProfile(id) {
        return axios.get(endpoint+'/profile/'+`${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    updateOnboarding(id, onboarding, idenNo) {
        return axios.put(endpoint+'/onboarding/'+`${id}`+'/'+`${onboarding}`+'/'+`${idenNo}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};