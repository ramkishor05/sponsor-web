import { 
   GET_ALL_CUST_CATEGERY_SUCCESS,
   GET_ALL_CUST_CATEGERY_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_CUST_CATEGERY_SUCCESS,
   EDIT_CUST_CATEGERY_SUCCESS,
   RENDER_CUST_CATEGERY_TO_EDIT
} from '../../types';

import CustCategoryService from '../../services/CustCategoryService';

// Action creator for getting all items --<
export const getCustCategoryList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategoryList = await CustCategoryService.getAll();

        if (custCategoryList) {
            dispatch({ type: GET_ALL_CUST_CATEGERY_SUCCESS, payload: custCategoryList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CATEGERY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCategory = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategory = await CustCategoryService.add(data);

        if (custCategory) {
            dispatch({ type: ADD_CUST_CATEGERY_SUCCESS });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderCustCategoryToEdit = item => {
    return {
        type: RENDER_CUST_CATEGERY_TO_EDIT,
        payload: item,
    };
};

export const editCustCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategory = await CustCategoryService.update(id, data);

        if (custCategory) {
            dispatch({ type: EDIT_CUST_CATEGERY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCategory = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategory = await CustCategoryService.update(id, data);

        if (custCategory) {
            dispatch({ type: EDIT_CUST_CATEGERY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteCustCategory = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_cust_category = await CustCategoryService.delete(id);

        if (deleted_cust_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        dispatch({ type: REMOVE_LOADER });

        console.log(error);
    }
};