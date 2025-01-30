import { 
    GET_ALL_CUST_UNITS_SUCCESS, 
    GET_ALL_CUST_UNITS_FAIL,
    GET_CUST_UNITS_TODAY_SUCCESS,
    GET_CUST_UNITS_YESTERDAY_SUCCESS, 
    GET_CUST_UNITS_LONG_SUCCESS,
    ADD_CUST_UNIT_SUCCESS, 
    ADD_CUST_UNIT_FAIL, EDIT_CUST_UNIT_SUCCESS,
    RENDER_CUST_UNIT_TO_EDIT,
    SHOW_LOADER,
    REMOVE_LOADER,
} from '../../types';

import CustUnitService from '../../services/CustUnitService';

// Action creator for getting all Unit entries in the system.
export const getCustUnitList = () => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        let units = await CustUnitService.getAll();

        if (units) {
            dispatch({ type: GET_ALL_CUST_UNITS_SUCCESS, payload: units });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        dispatch({ type: GET_ALL_CUST_UNITS_FAIL, payload: error });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for getting Unit entries according to specified dates in the system.
export const getCustUnitByDate = (from, to, day) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        let units = await CustUnitService.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (units) {
            if (day === 'today') {
                dispatch({ type: GET_CUST_UNITS_TODAY_SUCCESS, payload: units });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_CUST_UNITS_YESTERDAY_SUCCESS, payload: units });
            } else if (day === 'long') {
                dispatch({ type: GET_CUST_UNITS_LONG_SUCCESS, payload: units });
            } else {
                dispatch({ type: GET_ALL_CUST_UNITS_SUCCESS, payload: units });
            }
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        dispatch({ type: GET_ALL_CUST_UNITS_FAIL, payload: error });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for adding Unit transaction to the system.
export const addCustUnit = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let unit = await CustUnitService.add(data);

        if (unit) {
            dispatch({ type: ADD_CUST_UNIT_SUCCESS });
            
            refresh && refresh();
    
            clear && clear();

            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        dispatch({ type: ADD_CUST_UNIT_FAIL });
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for editing Unit transactions to the system.
export const editCustUnit = (id, data, refresh, clear, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        let unit = await CustUnitService.update(id, data);

        if (unit) {
            dispatch({ type: EDIT_CUST_UNIT_SUCCESS });

            refresh && refresh();

            clear && clear();

            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for rendering a Unit to edit in the system.
export const renderCustUnitToEdit = payload => {
    return {
        type: RENDER_CUST_UNIT_TO_EDIT,
        payload,
    };
};

export const deleteCustUnit = (id, refresh) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const deleted_Unit = await CustUnitService.delete(id);

        if (deleted_Unit) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};
