import { 
    GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS, VENDOR_SUPPLIER_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_SUPPLIER_TO_EDIT, VENDOR_SUPPLIER_EDIT_SUCCESS, GET_FINISHING_VENDOR_SUPPLIER_LIST,VENDOR_SUPPLIER_DELETE_SUCCESS
} from '../../types';

import CustSupplierService from '../../services/CustSupplierService';

// Action creator for getting all vendorSuppliers --<
export const getCustSupplierList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorSuppliers = await CustSupplierService.getAll();

        if (vendorSuppliers) {
            dispatch({ type: GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS, payload: vendorSuppliers });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorSupplier --<
export const addCustSupplier = (data, clear, successNotification, errorNotification) => async dispatch => {

    try {    
        dispatch({ type: SHOW_LOADER });

        const vendorSupplier = await CustSupplierService.add(data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_ADD_SUCCESS });
        }

        getCustSupplierList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToCustSupplierEdit = vendorSupplier => {
    return {
        type: VENDOR_SUPPLIER_TO_EDIT,
        payload: vendorSupplier,
    };
};

export const editCustSupplier = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorSupplier = await CustSupplierService.update(id, data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustSupplier = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorSupplier = await CustSupplierService.update(id, data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteCustSupplier = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorSupplier = await CustSupplierService.update(id, data);

        if (vendorSupplier) {
            dispatch({ type: VENDOR_SUPPLIER_DELETE_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingCustSupplierList = minimum => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorSupplier = await CustSupplierService.find(minimum);

        if (vendorSupplier) {
            dispatch({ type: GET_FINISHING_VENDOR_SUPPLIER_LIST, payload: vendorSupplier });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
