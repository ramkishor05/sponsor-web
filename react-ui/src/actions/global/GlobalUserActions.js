import { 
    GET_ALL_GLOBAL_USER_SUCCESS, 
    GET_ALL_GLOBAL_USER_PAGE_SUCCESS,
    ADD_GLOBAL_USER_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    EDIT_GLOBAL_USER_SUCCESS,
    DELETE_GLOBAL_USER_SUCCESS
} from '../../types';

import GlobalUserService from '../../services/GlobalUserService';

// Action creator for getting all vendorUsers --<
export const getGlobalUserList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUsers = await GlobalUserService.getAll();

        if (vendorUsers) {
            dispatch({ type: GET_ALL_GLOBAL_USER_SUCCESS, payload: vendorUsers });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

export const getGlobalUserPageList = (pageNumber, pageCount, filters) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUsers = await GlobalUserService.getPageList(pageNumber, pageCount, filters);

        if (vendorUsers) {
            dispatch({ type: GET_ALL_GLOBAL_USER_PAGE_SUCCESS, payload: vendorUsers });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorUser --<
export const addGlobalUser = (data, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await GlobalUserService.add(data);

        if (vendorUser) {
            dispatch({ type: ADD_GLOBAL_USER_SUCCESS });
        }

        getGlobalUserList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const editGlobalUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await GlobalUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: EDIT_GLOBAL_USER_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await GlobalUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: EDIT_GLOBAL_USER_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteGlobalUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await GlobalUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: DELETE_GLOBAL_USER_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

