import {axios} from './index';
import config from '../config';

const CUST_CATEGERY_GROUP_URL=`${config.ITEM_SERVER_HOST}/api/cust/categorygroup`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_CATEGERY_GROUP_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(CUST_CATEGERY_GROUP_URL+'/find', { params: { minimum } },{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(CUST_CATEGERY_GROUP_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_CATEGERY_GROUP_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(CUST_CATEGERY_GROUP_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};