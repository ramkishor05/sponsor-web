import { 
    GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS, VENDOR_CUSTOMER_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_CUSTOMER_TO_EDIT, VENDOR_CUSTOMER_EDIT_SUCCESS, GET_FINISHING_VENDOR_CUSTOMER_LIST,VENDOR_CUSTOMER_DELETE_SUCCESS
} from '../../types';

import CustCustomerService from '../../services/CustCustomerService';

// Action creator for getting all vendorCustomers --<
export const getCustCustomerList = () => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomers = await CustCustomerService.getAll();

        if (vendorCustomers) {
            dispatch({ type: GET_ALL_VENDOR_CUSTOMER_LIST_SUCCESS, payload: vendorCustomers });
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorCustomer --<
export const addCustCustomer = (data, refreshCustCustomerList, clear, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await CustCustomerService.add(data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_ADD_SUCCESS });
        }

        getCustCustomerList();

        clear && clear();

        successNotification && successNotification();
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToCustCustomerEdit = vendorCustomer => {
    return {
        type: VENDOR_CUSTOMER_TO_EDIT,
        payload: vendorCustomer,
    };
};

export const editCustCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await CustCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await CustCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteCustCustomer = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await CustCustomerService.update(id, data);

        if (vendorCustomer) {
            dispatch({ type: VENDOR_CUSTOMER_DELETE_SUCCESS });
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
            
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingCustCustomerList = minimum => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorCustomer = await CustCustomerService.find(minimum);

        if (vendorCustomer) {
            dispatch({ type: GET_FINISHING_VENDOR_CUSTOMER_LIST, payload: vendorCustomer });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
