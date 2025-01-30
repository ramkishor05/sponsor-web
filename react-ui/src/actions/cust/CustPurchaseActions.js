import { 
    GET_ALL_PURCHASES_SUCCESS, GET_ALL_PURCHASES_SUPPLIER_SUCCESS,
    GET_PURCHASES_TODAY_SUCCESS, GET_PURCHASES_YESTERDAY_SUCCESS, GET_PURCHASES_LONG_SUCCESS,
    PURCHASE_TO_EDIT,
    SHOW_LOADER,
    REMOVE_LOADER
} from '../../types';
import CustPurchaseService from '../../services/CustPurchaseService';

// Action creator for getting all purchases.
export const getCustPurchaseList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let purchases = await CustPurchaseService.getAll();

        if (purchases) {
            dispatch({ type: GET_ALL_PURCHASES_SUCCESS, payload: purchases });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

export const getCustPurchaseListBySupplier = (supplierId) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        dispatch({ type: GET_ALL_PURCHASES_SUPPLIER_SUCCESS, payload: [] });
        
        let purchases = await CustPurchaseService.getAllBySupplier(supplierId);

        if (purchases) {
            dispatch({ type: GET_ALL_PURCHASES_SUPPLIER_SUCCESS, payload: purchases });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

export const getCustPurchaseListByUser = (userId) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let purchases = await CustPurchaseService.getAllByUser(userId);

        if (purchases) {
            dispatch({ type: GET_ALL_PURCHASES_SUCCESS, payload: purchases });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for getting purchases according to date.
export const getCustPurchaseListByDate = (from, to, day) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let purchases = await CustPurchaseService.getByDate(from, to);

        if (purchases) {
            if (day === 'today') {
                dispatch({ type: GET_PURCHASES_TODAY_SUCCESS, payload: purchases });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_PURCHASES_YESTERDAY_SUCCESS, payload: purchases });
            } else if (day === 'long') {
                dispatch({ type: GET_PURCHASES_LONG_SUCCESS, payload: purchases });
            } else {
                dispatch({ type: GET_ALL_PURCHASES_SUCCESS, payload: purchases });
            }
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for adding purchases.
export const addCustPurchase = (data, refreshPurchases, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let purchase = await CustPurchaseService.add(data);

        if (purchase) {
            refreshPurchases && refreshPurchases();

            clear && clear();
            
            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for rendering a specific purchase to edit.
export const renderPurchaseToEdit = payload => {
    return {
        type: PURCHASE_TO_EDIT,
        payload,
    };
};

// Action creator for editing purchases in the system.
export const editCustPurchase = (id, data, refreshPurchases, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const purchase = await CustPurchaseService.update(id, data);

        if (purchase) {
            refreshPurchases && refreshPurchases();

            clear && clear();

            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for editing purchases in the system.
export const deleteCustPurchase = (id, refreshPurchases, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const purchase = await CustPurchaseService.delete(id);

        if (purchase) {
            refreshPurchases && refreshPurchases();

            clear && clear();

            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};