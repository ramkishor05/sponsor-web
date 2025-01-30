import { 
    GET_ALL_VENDOR_EMPLOYEE_LIST_SUCCESS, VENDOR_EMPLOYEE_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_EMPLOYEE_TO_EDIT, VENDOR_EMPLOYEE_EDIT_SUCCESS, GET_FINISHING_VENDOR_EMPLOYEE_LIST,VENDOR_EMPLOYEE_DELETE_SUCCESS
} from '../../types';

import CustEmployeeService from '../../services/CustEmployeeService';

// Action creator for getting all vendorEmployees --<
export const getCustEmployeeList = () => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployees = await CustEmployeeService.getAll();

        if (vendorEmployees) {
            dispatch({ type: GET_ALL_VENDOR_EMPLOYEE_LIST_SUCCESS, payload: vendorEmployees });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorEmployee --<
export const addCustEmployee = (data, clear, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await CustEmployeeService.add(data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_ADD_SUCCESS });
        }
        getCustEmployeeList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToCustEmployeeEdit = vendorEmployee => {
    return {
        type: VENDOR_EMPLOYEE_TO_EDIT,
        payload: vendorEmployee,
    };
};

export const editCustEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await CustEmployeeService.update(id, data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await CustEmployeeService.update(id, data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const deleteCustEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await CustEmployeeService.update(id, data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_DELETE_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingCustEmployeeList = minimum => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await CustEmployeeService.find(minimum);

        if (vendorEmployee) {
            dispatch({ type: GET_FINISHING_VENDOR_EMPLOYEE_LIST, payload: vendorEmployee });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
