import { 
    GET_ALL_CUST_PRODUCTS_SUCCESS, CUST_PRODUCT_ADD_SUCCESS,
    CUST_PRODUCT_DELETE_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    CUST_PRODUCT_TO_EDIT, CUST_PRODUCT_EDIT_SUCCESS, GET_FINISHING_CUST_PRODUCTS
} from '../../types';
import CustProductService from '../../services/CustProductService';

// Action creator for getting all items --<
export const getCustProductList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const items = await CustProductService.getAll();

        if (items) {
            dispatch({ type: GET_ALL_CUST_PRODUCTS_SUCCESS, payload: items });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addCustProduct = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const item = await CustProductService.add(data);

        if (item) {
            dispatch({ type: CUST_PRODUCT_ADD_SUCCESS });
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

export const renderToCustProductEdit = custProduct => {
    return {
        type: CUST_PRODUCT_TO_EDIT,
        payload: custProduct,
    };
};

export const editCustProduct = (data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const item = await CustProductService.update(data);

        if (item) {
            dispatch({ type: CUST_PRODUCT_EDIT_SUCCESS });
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustProduct = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const item = await CustProductService.update(id, data);

        if (item) {
            dispatch({ type: CUST_PRODUCT_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};


export const deleteCustProduct = (id, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const item = await CustProductService.delete(id);

        if (item) {
            dispatch({ type: CUST_PRODUCT_DELETE_SUCCESS });
            dispatch({ type: REMOVE_LOADER });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingItems = minimum => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const item = await CustProductService.find(minimum);

        if (item) {
            dispatch({ type: GET_FINISHING_CUST_PRODUCTS, payload: item });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
