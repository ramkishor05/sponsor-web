import {axios} from './index';
import config from '../config';

const ENDPOINT=`${config.ACCOUNT_SERVER_HOST}/api/global/user/sponsor/royalty`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    all(){
        return axios.get(ENDPOINT, {},{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    },
    getPageList(pageNumber,pageCount) {
        return axios.get(ENDPOINT+"/page/data"+`/${pageNumber}/count/${pageCount}`)
                        .then(response => Promise.resolve(response.data.data))
                        .catch(error => Promise.reject(error));
    }

};