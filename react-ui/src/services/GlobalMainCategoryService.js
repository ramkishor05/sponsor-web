import {axios} from './index';
import config from '../config';

const GLOBAL_CATEGERY_GROUP_URL=`${config.ITEM_SERVER_HOST}/api/global/main/category`

export default {
    
    add(item) {
        return axios.post(GLOBAL_CATEGERY_GROUP_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, item) {
        item['id']=id;
        return axios.put(GLOBAL_CATEGERY_GROUP_URL, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(id) {
        return axios.delete(GLOBAL_CATEGERY_GROUP_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getAll() {
        return axios.get(GLOBAL_CATEGERY_GROUP_URL)
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    },
    find(minimum){
        return axios.get(GLOBAL_CATEGERY_GROUP_URL+'/find', { params: { minimum } })
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    },
    getPageList(pageNumber,pageCount, filters) {
        return axios.get(GLOBAL_CATEGERY_GROUP_URL+"/page/data"+`/${pageNumber}/count/${pageCount}`, { params: { ...filters } })
                    .then(response => Promise.resolve(response.data.data))
                    .catch(error => Promise.reject(error));
    }
};