import { 
   GET_ALL_CUST_CURRENCY_GROUP_SUCCESS,
   GET_ALL_CUST_CURRENCY_GROUP_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_CUST_CURRENCY_GROUP_SUCCESS,
   EDIT_CUST_CURRENCY_GROUP_SUCCESS,
   RENDER_CUST_CURRENCY_GROUP_TO_EDIT
} from '../../types';
import CustCurrencyGroupService from '../../services/CustCurrencyGroupService';

// Action creator for getting all items --<
export const getCustCurrencyGroupList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroupList = await CustCurrencyGroupService.getAll();
        if (globalCategoryGroupList) {
            dispatch({ type: GET_ALL_CUST_CURRENCY_GROUP_SUCCESS, payload: globalCategoryGroupList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CURRENCY_GROUP_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCurrencyGroup = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroup = await CustCurrencyGroupService.add(data);

        if (globalCategoryGroup) {
            dispatch({ type: ADD_CUST_CURRENCY_GROUP_SUCCESS });
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

export const renderCustCurrencyGroupToEdit = item => {
    return {
        type: RENDER_CUST_CURRENCY_GROUP_TO_EDIT,
        payload: item,
    };
};

export const editCustCurrencyGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroup = await CustCurrencyGroupService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_CUST_CURRENCY_GROUP_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCurrencyGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroup = await CustCurrencyGroupService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_CUST_CURRENCY_GROUP_SUCCESS });
            
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
export const deleteCustCurrencyGroup = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category_group = await CustCurrencyGroupService.delete(id);

        if (deleted_global_category_group) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};