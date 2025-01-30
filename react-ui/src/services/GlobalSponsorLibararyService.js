import {axios} from './index';
import config from '../config';

const GLOBAL_CATEGORY_URL=`${config.ACCOUNT_SERVER_HOST}/api/global/user/sponsor`;

export default {
    getAll() {
        return axios.get(GLOBAL_CATEGORY_URL)
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    },
    changeStatus(sponsorId, status){
        return axios.patch(GLOBAL_CATEGORY_URL+'/change/status', { }, {params: {sponsorId: sponsorId, status}}).then(response => Promise.resolve(response.data)).catch(error => Promise.reject(error));
    },
    tree(sponsorId){
        return axios.get(GLOBAL_CATEGORY_URL+'/tree', {headers: {
            sponsorId
        }}).then(response => Promise.resolve(response.data)).catch(error => Promise.reject(error));
    },
    account(sponsorId){
        return axios.get(GLOBAL_CATEGORY_URL+'/current', { headers: {
            sponsorId
        }}).then(response => Promise.resolve(response.data))
        .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(GLOBAL_CATEGORY_URL+'/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(item) {
        return axios.post(GLOBAL_CATEGORY_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(GLOBAL_CATEGORY_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(GLOBAL_CATEGORY_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getPageList(pageNumber,pageCount, sponsorId) {
        return axios.get(GLOBAL_CATEGORY_URL, { headers: { sponsorId } })
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    }
};