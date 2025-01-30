import Axios from 'axios';
const WIFI = `localhost`;

// Setup the baseURL or api endpoint
export const axios = Axios.create({
    baseURL: `http://${WIFI}:5000`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Intercept each request and set the bearer token for user
axios.interceptors.request.use(async config => {
    let account = await JSON.parse(localStorage.getItem('pos-account'));
    if (account) {
        if(account.token && account.token!=='' && account.token!=='null'){
             config.headers.common['Authorization'] = account.token;
        } else{
            delete config.headers.common.Authorization;
        }/*
        if(account.ownerId && account.ownerId!==''){
            config.headers.common.ownerId = account.ownerId;
        } else{
            delete config.headers.common.ownerId
        }
        
        if(account.businessId && account.businessId!==''){
            config.headers.common.businessId = account.businessId;
        }else {
            delete config.headers.common.businessId
        }*/
        /*

        if(account.userId&& account.userId!==''){
            config.headers.common.userId = account.userId;
        } else {
            delete config.headers.common.userId;
        }
        */
	    
    }
    config.headers.common["Content-Type"]= 'application/json';
    config.headers.common['Accept']='*';
    config.headers.common['access-control-allow-origin']= "*";
    config.headers.common["Content-Type"]= 'application/json';
    config.headers.common['Access-Control-Allow-Origin']= "*";
    config.headers.common['Access-Control-Allow-Headers']='Content-Type';
    config.headers.common['Accept']='*';
    config.headers.common["no-cors"]= ''
    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log('call the refresh token api here')
        // Handle 401 error, e.g., redirect to login or refresh token
      }
      return Promise.reject(error)
    },
  )

