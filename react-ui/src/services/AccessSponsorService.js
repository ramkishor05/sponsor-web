import config from '../config';
import {axios} from './index';

const endpoint=config.AUTH_SERVER_HOST+"/api/global/user/sponsor";

const headers = {
    'Content-Type': 'application/json',
    'custAppId': 1,
     vendorId: 31
};

export default {
    getAll() {
        return axios.get(endpoint,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(id){
        return axios.get(endpoint+`/${id}`, { })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    findByAccountId(userAccountId){
        return axios.get(endpoint+`/account/${userAccountId}`, { })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        if(item['vendorId']){
            headers['vendorId']=item['vendorId']
        }
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
    },
    changeStatus(item){
        return axios.post(endpoint+"/activity", item,{headers: headers})
        .then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error));
    },
    
    getPageList(pageNumber,pageCount) {
        return axios.get(endpoint+"/page/data"+`/${pageNumber}/count/${pageCount}`)
                        .then(response => Promise.resolve(response.data.data))
                        .catch(error => Promise.reject(error));
    }
};