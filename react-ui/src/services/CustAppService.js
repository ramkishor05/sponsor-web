import {axios} from './index';

export default {
    getAll(url) {
        return axios.get(url)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    add(url, item) {
        let headers={
            ...item
        }
        return axios.post(url, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(url, id, item) {
        item['id']=id;
        let headers={
            ...item
        }
        return axios.put(url, item,{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    delete(url, id) {
        return axios.delete(url+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};