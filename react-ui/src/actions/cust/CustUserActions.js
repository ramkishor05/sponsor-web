import { 
    GET_ALL_VENDOR_USER_LIST_SUCCESS, VENDOR_USER_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_USER_TO_EDIT, VENDOR_USER_EDIT_SUCCESS, GET_FINISHING_VENDOR_USER_LIST,VENDOR_USER_DELETE_SUCCESS
} from '../../types';

import CustUserService from '../../services/CustUserService';

// Action creator for getting all vendorUsers --<
export const getCustUserList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUsers = await CustUserService.getAll();

        if (vendorUsers) {
            dispatch({ type: GET_ALL_VENDOR_USER_LIST_SUCCESS, payload: vendorUsers });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorUser --<
export const addCustUser = (data, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await CustUserService.add(data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_ADD_SUCCESS });
        }

        getCustUserList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToCustUserEdit = vendorUser => {
    return {
        type: VENDOR_USER_TO_EDIT,
        payload: vendorUser,
    };
};

export const editCustUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await CustUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await CustUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteCustUser = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await CustUserService.update(id, data);

        if (vendorUser) {
            dispatch({ type: VENDOR_USER_DELETE_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingCustUserList = minimum => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorUser = await CustUserService.find(minimum);

        if (vendorUser) {
            dispatch({ type: GET_FINISHING_VENDOR_USER_LIST, payload: vendorUser });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
