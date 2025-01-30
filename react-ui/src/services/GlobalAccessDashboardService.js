import {axios} from './index';
import config from '../config';

const CUST_DASHBOARD_URL=`${config.AUTH_SERVER_HOST}/api/global/dashboard`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    getAll() {
        return axios.get(CUST_DASHBOARD_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    find(){
        return axios.get(CUST_DASHBOARD_URL,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(CUST_DASHBOARD_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(CUST_DASHBOARD_URL, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(CUST_DASHBOARD_URL+`/${id}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }, 
    getByDate(from, to){
        return axios.get(CUST_DASHBOARD_URL+`/filter?from=${from}&to=${to}`,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};