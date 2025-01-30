import {
    SHOW_LOADER, REMOVE_LOADER,
    GET_CUST_ROLES_SUCCESS,
    GET_CUST_ROLES_FAIL,
    GET_CUST_ROLE_SUCCESS, 
    GET_CUST_ROLE_FAIL,
    DELETE_CUST_ROLE_SUCCESS,
    DELETE_CUST_ROLE_FAIL, 
    ADD_CUST_ROLE_SUCCESS, 
    ADD_CUST_ROLE_FAIL,
    UPDATE_CUST_ROLE_SUCCESS,
    UPDATE_CUST_ROLE_FAIL
} from '../../types';
import CustRoleService from '../../services/CustRoleService';


/**
 * CustRole Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} callBack
 */
export const addCustRole = (data, callBack) => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const custRole = await CustRoleService.add(data);
        if (custRole) {
            dispatch({ type: ADD_CUST_ROLE_SUCCESS, payload: custRole });
            if (callBack) {
                callBack();
            }
        }
    } catch (error) {
        dispatch({ type: ADD_CUST_ROLE_FAIL, payload: '' });
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

/**
 * CustRole Action - For updating the user details in the system.
 *
 * @param {Number} id
 * @param {Object} data
 * @param {Function} callBack
 */
export const updateCustRole = (id, data, callBack) => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const custRole = await CustRoleService.update(id, data);

        if (custRole) {
            dispatch({ type: UPDATE_CUST_ROLE_SUCCESS, payload: custRole });

            if (callBack) {
                callBack();
            }
        }
    } catch (error) {
        dispatch({ type: UPDATE_CUST_ROLE_FAIL, payload: error });
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

/**
 * CustRole Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} callBack
 */
export const deleteCustRole = (id, callBack) => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const custRole = await CustRoleService.delete(id);

        if (custRole) {
            dispatch({ type: DELETE_CUST_ROLE_SUCCESS, payload: custRole });
            if (callBack) {
                callBack();
            }
        }
    } catch (error) {
        dispatch({ type: DELETE_CUST_ROLE_FAIL, payload: error });
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

/**
 * CustRole Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} callBack
 */
export const getCustRole = (id, callBack) => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const custRole = await CustRoleService.get(id);

        if (custRole) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_CUST_ROLE_SUCCESS ,payload :  custRole});
        }
    } catch (error) {
        dispatch({ type: GET_CUST_ROLE_FAIL ,payload :  error});
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

// Action creator for getting all users.
export const getCustRoleList = () => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const users = await CustRoleService.getAll();

        if (users) {
            dispatch({ type: GET_CUST_ROLES_SUCCESS, payload: users });
        }
    } catch (error) {
        dispatch({ type: GET_CUST_ROLES_FAIL, payload: [] });
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};
