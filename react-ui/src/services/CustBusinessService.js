import config from '../config';
import {axios} from './index';

const BUSINESS_URL=config.CRM_SERVER_HOST+"/api/business";
const headers = {
    'Content-Type': 'application/json',
    'custAppId': 1,
     vendorId: 31
};

export default {
    getAll() {
        return axios.get(BUSINESS_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get('items/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        if(item['vendorId']){
            headers['vendorId']=item['vendorId']
        }
        return axios.post(BUSINESS_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(BUSINESS_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(BUSINESS_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};