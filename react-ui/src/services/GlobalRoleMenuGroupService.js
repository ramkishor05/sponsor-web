import config from '../config';
import {axios} from './index';

const USER_MENU_URL=config.AUTH_SERVER_HOST+"/api/global/role/menu/group";

const headers = {
    'Content-Type': 'application/json'
};

export default {
    findByRoleId(roleId){
        return axios.get(USER_MENU_URL+'/role/'+roleId,{headers:headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getAll(){
        return axios.get(USER_MENU_URL,{headers:headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    add(roleMenuGroup) {
        return axios.post(USER_MENU_URL, roleMenuGroup)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    update(id, roleMenuGroup) {
        return axios.put(USER_MENU_URL+`/${id}`, roleMenuGroup)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },

    delete(id) {
        return axios.delete(USER_MENU_URL+`/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};