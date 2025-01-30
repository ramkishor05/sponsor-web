import { 
   GET_ALL_CUST_CATEGERY_GROUP_SUCCESS,
   GET_ALL_CUST_CATEGERY_GROUP_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_CUST_CATEGERY_GROUP_SUCCESS,
   EDIT_CUST_CATEGERY_GROUP_SUCCESS,
   RENDER_CUST_CATEGERY_GROUP_TO_EDIT
} from '../../types';
import CustCategoryGroupService from '../../services/CustCategoryGroupService';

// Action creator for getting all items --<
export const getCustCategoryGroupList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategoryGroupList = await CustCategoryGroupService.getAll();

        if (custCategoryGroupList) {
            dispatch({ type: GET_ALL_CUST_CATEGERY_GROUP_SUCCESS, payload: custCategoryGroupList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_CUST_CATEGERY_GROUP_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustCategoryGroup = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategoryGroup = await CustCategoryGroupService.add(data);

        if (custCategoryGroup) {
            dispatch({ type: ADD_CUST_CATEGERY_GROUP_SUCCESS });
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

export const renderCustCategoryGroupToEdit = item => {
    return {
        type: RENDER_CUST_CATEGERY_GROUP_TO_EDIT,
        payload: item,
    };
};

export const editCustCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategoryGroup = await CustCategoryGroupService.update(id, data);

        if (custCategoryGroup) {
            dispatch({ type: EDIT_CUST_CATEGERY_GROUP_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custCategoryGroup = await CustCategoryGroupService.update(id, data);

        if (custCategoryGroup) {
            dispatch({ type: EDIT_CUST_CATEGERY_GROUP_SUCCESS });
            
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
export const deleteCustCategoryGroup = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_cust_category_group = await CustCategoryGroupService.delete(id);

        if (deleted_cust_category_group) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};