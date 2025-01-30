import { 
   GET_ALL_CUST_TRANSATION_SUCCESS,
   GET_ALL_CUST_TRANSATION_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_CUST_TRANSATION_SUCCESS,
   EDIT_CUST_TRANSATION_SUCCESS,
   RENDER_CUST_TRANSATION_TO_EDIT,
   GET_FILTED_CUST_TRANSATION_SUCCESS,
   GET_FILTED_CUST_TRANSATION_FAIL
} from '../../types';
import CustTransationService from '../../services/CustTransationService';

// Action creator for getting all items --<
export const getCustTransationList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custTransationList = await CustTransationService.getAll();

        if (custTransationList) {
            dispatch({ type: GET_ALL_CUST_TRANSATION_SUCCESS, payload: custTransationList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_CUST_TRANSATION_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for getting all items --<
export const getCustTransationFiltedList = (startDate, endDate, serviceType) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custTransationList = await CustTransationService.getFilted(startDate, endDate, serviceType);

        if (custTransationList) {
            dispatch({ type: GET_FILTED_CUST_TRANSATION_SUCCESS, payload: custTransationList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_FILTED_CUST_TRANSATION_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustTransation = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custTransation = await CustTransationService.add(data);

        if (custTransation) {
            dispatch({ type: ADD_CUST_TRANSATION_SUCCESS });
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

export const renderCustTransationToEdit = item => {
    return {
        type: RENDER_CUST_TRANSATION_TO_EDIT,
        payload: item,
    };
};

export const editCustTransation = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custTransation = await CustTransationService.update(id, data);

        if (custTransation) {
            dispatch({ type: EDIT_CUST_TRANSATION_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustTransation = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const custTransation = await CustTransationService.update(id, data);

        if (custTransation) {
            dispatch({ type: EDIT_CUST_TRANSATION_SUCCESS });
            
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
export const deleteCustTransation = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_cust_category_group = await CustTransationService.delete(id);

        if (deleted_cust_category_group) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};