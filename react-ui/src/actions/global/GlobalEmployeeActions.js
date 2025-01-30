import { 
    GET_ALL_VENDOR_EMPLOYEE_LIST_SUCCESS, VENDOR_EMPLOYEE_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_EMPLOYEE_TO_EDIT, VENDOR_EMPLOYEE_EDIT_SUCCESS, GET_FINISHING_VENDOR_EMPLOYEE_LIST,VENDOR_EMPLOYEE_DELETE_SUCCESS
} from '../../types';

import GlobalEmployeeService from '../../services/GlobalEmployeeService';

// Action creator for getting all vendorEmployees --<
export const getGlobalEmployeeList = () => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployees = await GlobalEmployeeService.getAll();

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
export const addGlobalEmployee = (data, clear, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await GlobalEmployeeService.add(data);

        if (vendorEmployee) {
            dispatch({ type: VENDOR_EMPLOYEE_ADD_SUCCESS });
        }
        getGlobalEmployeeList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToGlobalEmployeeEdit = vendorEmployee => {
    return {
        type: VENDOR_EMPLOYEE_TO_EDIT,
        payload: vendorEmployee,
    };
};

export const editGlobalEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await GlobalEmployeeService.update(id, data);

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

export const updateGlobalEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await GlobalEmployeeService.update(id, data);

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

export const deleteGlobalEmployee = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await GlobalEmployeeService.update(id, data);

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

export const getFinishingGlobalEmployeeList = minimum => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const vendorEmployee = await GlobalEmployeeService.find(minimum);

        if (vendorEmployee) {
            dispatch({ type: GET_FINISHING_VENDOR_EMPLOYEE_LIST, payload: vendorEmployee });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
