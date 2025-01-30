import config from '../config';
import {axios} from './index';

const endpoint=config.ACCOUNT_SERVER_HOST+"/api/global/bussiness/account";

const headers = {
    'Content-Type': 'application/json'
};

export default {
    find(){
        return axios.get(endpoint, { })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(endpoint, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(endpoint, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(endpoint+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};