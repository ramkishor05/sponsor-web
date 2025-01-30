import {
    USER_ROLE_UPDATE_PROFILE_SUCCESS, USER_ROLE_UPDATE_PROFILE_FAIL,
    GET_USER_ROLES_SUCCESS,
    USER_ROLE_UPDATE_SUCCESS, USER_ROLE_UPDATE_FAIL,
    GET_USER_ROLE_PROFILE_SUCCESS, GET_USER_ROLE_PROFILE_FAIL,
    OPEN_ADD_USER_ROLE_MODAL, OPEN_EDIT_USER_ROLE_MODAL, OPEN_DELETE_USER_ROLE_MODAL,USER_ROLE_TO_EDIT, SHOW_LOADER, REMOVE_LOADER
} from '../types';
import UserRoleService from '../services/UserRoleService';


/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} callBack
 */
export const addUserRole = (data, callBack) => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const user = await UserRoleService.add(data);
        if (user) {
            if (callBack) {
                callBack();
            }
        }

    } catch (error) {
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

/**
 * UserRole Action - For updating the user details in the system.
 *
 * @param {Number} id
 * @param {Object} data
 * @param {Function} callBack
 */
export const updateUserRole = (id, data, callBack) => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const user = await UserRoleService.update(id, data);

        if (user) {
            dispatch({ type: USER_ROLE_UPDATE_SUCCESS, payload: user });

            if (callBack) {
                callBack();
            }
        }
    } catch (error) {
        dispatch({ type: USER_ROLE_UPDATE_FAIL, payload: parseError(error) });
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

/**
 * UserRole Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} callBack
 */
export const deleteUserRole = (id, callBack) => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const result = await UserRoleService.delete(id);

        if (result) {
            if (callBack) {
                callBack();
            }
        }
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

// Action creator for getting all users.
export const getUserRoleList = () => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const users = await UserRoleService.getAll();

        if (users) {
            dispatch({ type: GET_USER_ROLES_SUCCESS, payload: users });
        }
    } catch (error) {
        console.log(error);
    }
    dispatch({ type: REMOVE_LOADER });
};

// Action creator for opening the Add UserRole modal.
export const openAddUserRoleModal = payload => ({type: OPEN_ADD_USER_ROLE_MODAL, payload });

// Action creator for opening the Edit UserRole modal.
export const openEditUserRoleModal = payload => ({type: OPEN_EDIT_USER_ROLE_MODAL, payload});

// Action creator for opening the Delete UserRole modal.
export const openDeleteUserRoleModal = payload => ({type: OPEN_DELETE_USER_ROLE_MODAL, payload});

// Function for parsing error gotten from server.
const parseError = error => {
    return error;
};

export const renderToUserRoleEdit = user => {
    return {
        type: USER_ROLE_TO_EDIT,
        payload: user,
    };
};