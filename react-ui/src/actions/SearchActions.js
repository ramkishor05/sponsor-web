import {
    ADD_SEARCH_VALUE,
    REMOVE_SEARCH_VALUE,
    SHOW_LOADER, REMOVE_LOADER,
    SET_SPONSOR_ID
} from '../types';



/**
 * User Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} callBack
 */
export const addSearch = (data) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        dispatch({ type: ADD_SEARCH_VALUE, payload: data });
        dispatch({ type: SET_SPONSOR_ID, payload: data });
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};

/**
 * User Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} callBack
 */
export const deleteSearch = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        dispatch({ type: REMOVE_SEARCH_VALUE});
       // dispatch({ type: SET_SPONSOR_ID, payload: null });
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};
