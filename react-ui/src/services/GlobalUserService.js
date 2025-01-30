import config from '../config';
import {axios} from './index';

const VENDOR_USER_URL=config.AUTH_SERVER_HOST+"/api/global/user/detail";

const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(VENDOR_USER_URL,{
            headers: headers,
            params: { type:  "USER"}
        })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get('items/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(VENDOR_USER_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(VENDOR_USER_URL+`/${id}`, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(VENDOR_USER_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getPageList(pageNumber,pageCount, filters) {
        return axios.get(VENDOR_USER_URL+"/page/data"+`/${pageNumber}/count/${pageCount}`,{
            headers: headers,
            params: filters
        })
        .then(response => Promise.resolve(response.data.data))
        .catch(error => Promise.reject(error));
    }
};