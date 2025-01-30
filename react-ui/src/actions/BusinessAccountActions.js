import BusinessAccountService from '../services/BusinessAccountService';
import { 
    ADD_BUSINESS_ACCOUNT, 
    EDIT_BUSINESS_ACCOUNT, 
    REMOVE_BUSINESS_ACCOUNT, 
    ADD_BUSINESS_BANK_ACCOUNT, 
    EDIT_BUSINESS_BANK_ACCOUNT,
    REMOVE_BUSINESS_BANK_ACCOUNT, 
    ADD_BUSINESS_UPI_ACCOUNT, 
    EDIT_BUSINESS_UPI_ACCOUNT, 
    REMOVE_BUSINESS_UPI_ACCOUNT,
    SHOW_LOADER,
    GET_BUSINESS_ACCOUNT,
    REMOVE_LOADER} from '../types';

    
/**
 * User Action - For logging user into the system.
 *
 * @param {Object} param0
 * @param {Function} _clearCredentials
 */
export const addBusinessAccount = (payload, _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        BusinessAccountService.add(payload).then(reponse=>{
            if (_clearCredentials) {
                _clearCredentials();
            }
            dispatch({ type: ADD_BUSINESS_ACCOUNT, payload: reponse.data });
        }).catch(error=>{
            console.log("error=",error);
        })
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

export const editBusinessAccount = (id,payload, _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        BusinessAccountService.update(id, payload).then(reponse=>{
            if (_clearCredentials) {
                _clearCredentials();
            }
            dispatch({ type: ADD_BUSINESS_ACCOUNT, payload: reponse.data });
        }).catch(error=>{
            console.log("error=",error);
        })
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

export const getBusinessAccount = ( _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        BusinessAccountService.find().then(reponse=>{
            if (_clearCredentials) {
                _clearCredentials();
            }
            dispatch({ type: GET_BUSINESS_ACCOUNT, payload: reponse.data });
        }).catch(error=>{
            console.log("error=",error);
        })
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

export const deleteBusinessAccount = (id, _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        BusinessAccountService.delete(id).then(reponse=>{
            if (_clearCredentials) {
                _clearCredentials();
            }
            dispatch({ type: REMOVE_BUSINESS_ACCOUNT, payload: reponse.data });
        }).catch(error=>{
            console.log("error=",error);
        })
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: REMOVE_LOADER });
    }
};
