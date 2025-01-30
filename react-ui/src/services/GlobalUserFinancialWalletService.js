import {axios} from './index';
import config from '../config';

const ENDPOINT=`${config.ACCOUNT_SERVER_HOST}/api/global/user/financial/wallet`
const headers = {
    'Content-Type': 'application/json'
};

export default {
    find(sponsorId){
        console.log("sponsorId=",sponsorId)
        return axios.get(ENDPOINT, {headers: {
                   sponsorId
               }})
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error));
    }
};