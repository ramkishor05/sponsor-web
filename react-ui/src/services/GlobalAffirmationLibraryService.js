import {axios} from './index';
import config from '../config';

const GLOBAL_CATEGORY_URL=`${config.ITEM_SERVER_HOST}/api/global/affirmation/libarary`;

export default {
    getAll() {
        return axios.get(GLOBAL_CATEGORY_URL)
                    .then(response => Promise.resolve(response.data.data))
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
        console.log("item=",item)
        return axios.put(GLOBAL_CATEGORY_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(GLOBAL_CATEGORY_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getPageList(pageNumber,pageCount) {
        return axios.get(GLOBAL_CATEGORY_URL+"/page/data"+`/${pageNumber}/count/${pageCount}`)
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    }
};