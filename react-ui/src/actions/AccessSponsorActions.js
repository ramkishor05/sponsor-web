import {
    GET_ALL_ACCESS_SPONSOR_SUCCESS, 
    GET_ALL_ACCESS_SPONSOR_FAIL,
    ADD_ONE_ACCESS_SPONSOR_SUCCESS,
    ADD_ONE_ACCESS_SPONSOR_FAIL, 
    EDIT_ONE_ACCESS_SPONSOR_SUCCESS,
    EDIT_ONE_ACCESS_SPONSOR_FAIL,
    DELETE_ONE_ACCESS_SPONSOR_SUCCESS,
    DELETE_ONE_ACCESS_SPONSOR_FAIL,
    SHOW_LOADER, 
    REMOVE_LOADER,
    GET_PAGE_ACCESS_SPONSOR_SUCCESS,
    GET_PAGE_ACCESS_SPONSOR_FAIL
} from '../types';
import AccessSponsorService from '../services/AccessSponsorService';

/**
 * AccessSponsor Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} callBack
 */
export const getAccessSponsorByAccountId = (userAccountId, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const accessSponsor = await AccessSponsorService.findByAccountId(userAccountId);
        if (accessSponsor) {
            if (callBack) {
                callBack(accessSponsor.data);
            }
            dispatch({ type: ADD_ONE_ACCESS_SPONSOR_SUCCESS, payload: accessSponsor });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        console.log(error);
        dispatch({ type: ADD_ONE_ACCESS_SPONSOR_FAIL, payload: {} });
        dispatch({ type: REMOVE_LOADER });
    }
};

/**
 * AccessSponsor Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} callBack
 */
export const addAccessSponsor = (data, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const user = await AccessSponsorService.add(data);
        if (user) {
            if (callBack) {
                callBack(data);
            }
            dispatch({ type: ADD_ONE_ACCESS_SPONSOR_SUCCESS, payload: data });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        console.log(error);
        dispatch({ type: ADD_ONE_ACCESS_SPONSOR_FAIL, payload: {} });
        dispatch({ type: REMOVE_LOADER });
    }
};

/**
 * AccessSponsor Action - For updating the user details in the system.
 *
 * @param {Number} id
 * @param {Object} data
 * @param {Function} callBack
 */
export const updateAccessSponsor = (id, data, callBack) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const user = await AccessSponsorService.update(id, data);

        if (user) {
            dispatch({ type: EDIT_ONE_ACCESS_SPONSOR_SUCCESS, payload: data });

            if (callBack) {
                callBack();
            }
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: EDIT_ONE_ACCESS_SPONSOR_FAIL, payload: {} });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};

/**
 * AccessSponsor Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} callBack
 */
export const deleteAccessSponsor = (id, callBack) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const result = await AccessSponsorService.delete(id);

        if (result) {
            dispatch({ type: DELETE_ONE_ACCESS_SPONSOR_SUCCESS, payload: result });
            if (callBack) {
                callBack();
            }
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        console.log(error);
        dispatch({ type: DELETE_ONE_ACCESS_SPONSOR_FAIL, payload: {} });
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for getting all users.
export const getAccessSponsors = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const users = await AccessSponsorService.getAll();

        if (users) {
            dispatch({ type: GET_ALL_ACCESS_SPONSOR_SUCCESS, payload: users });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_ALL_ACCESS_SPONSOR_FAIL, payload: [] });
        dispatch({ type: REMOVE_LOADER });
    }
};

export const getAccessSponsorPageData = (pageNumber,pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const users = await AccessSponsorService.getPageList(pageNumber,pageCount);

        if (users) {
            dispatch({ type: GET_PAGE_ACCESS_SPONSOR_SUCCESS, payload: users });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        console.log(error);
        dispatch({ type: GET_PAGE_ACCESS_SPONSOR_FAIL, payload: [] });
        dispatch({ type: REMOVE_LOADER });
    }
};

