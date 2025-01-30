import {axios} from './index';
import config from '../config';

const ENDPOINT=`${config.ACCOUNT_SERVER_HOST}/api/cust/user/bank/account`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll(sponsorId){
        return axios.get(ENDPOINT, {headers: {
            sponsorId
        }})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(sponsorId){
        return axios.get(ENDPOINT, {headers: {
            sponsorId
        }})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(sponsorId){
        return axios.get(ENDPOINT, {headers: {
            sponsorId
        }})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(sponsorId){
        return axios.get(ENDPOINT, {headers: {
            sponsorId
        }})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(sponsorId){
        return axios.get(ENDPOINT, {headers: {
            sponsorId
        }})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};