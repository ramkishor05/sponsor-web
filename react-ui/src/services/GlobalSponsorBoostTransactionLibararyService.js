import config from '../config';
import {axios} from './index';

var endpoint = config.ACCOUNT_SERVER_HOST+`/api/global/user/sponsor/boost`;

export default {
    getAll() {
        return axios.get(endpoint)
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    },
    tree(){
        return axios.get(endpoint+'/tree', { })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    account(){
        return axios.get(endpoint+'/current', { })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(endpoint+'/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(endpoint, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(endpoint, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(endpoint+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getPageList(pageNumber,pageCount) {
        return axios.get(endpoint)
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    }
};