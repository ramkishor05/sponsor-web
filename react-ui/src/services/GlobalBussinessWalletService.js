import {axios} from './index';
import config from '../config';

const ENDPOINT=`${config.ACCOUNT_SERVER_HOST}/api/global/bussiness/wallet`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    find(){
        return axios.get(ENDPOINT, {},{headers: headers})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};