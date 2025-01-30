import { 
    GET_ALL_GLOBAL_UNITS_SUCCESS, 
    GET_ALL_GLOBAL_UNITS_FAIL,
    GET_GLOBAL_UNITS_TODAY_SUCCESS,
    GET_GLOBAL_UNITS_YESTERDAY_SUCCESS, 
    GET_GLOBAL_UNITS_LONG_SUCCESS,
    ADD_GLOBAL_UNIT_SUCCESS, 
    ADD_GLOBAL_UNIT_FAIL, EDIT_GLOBAL_UNIT_SUCCESS,
    RENDER_GLOBAL_UNIT_TO_EDIT,
} from '../../types';

import GlobalUnit from '../../services/GlobalUnitService';

// Action creator for getting all Unit entries in the system.
export const getGlobalUnitList = () => async dispatch => {
    try {
        let units = await GlobalUnit.getAll();

        if (units) {
            dispatch({ type: GET_ALL_GLOBAL_UNITS_SUCCESS, payload: units });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_GLOBAL_UNITS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for getting Unit entries according to specified dates in the system.
export const getGlobalUnitByDate = (from, to, day) => async dispatch => {
    try {
        let units = await GlobalUnit.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (units) {
            if (day === 'today') {
                dispatch({ type: GET_GLOBAL_UNITS_TODAY_SUCCESS, payload: units });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_GLOBAL_UNITS_YESTERDAY_SUCCESS, payload: units });
            } else if (day === 'long') {
                dispatch({ type: GET_GLOBAL_UNITS_LONG_SUCCESS, payload: units });
            } else {
                dispatch({ type: GET_ALL_GLOBAL_UNITS_SUCCESS, payload: units });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_GLOBAL_UNITS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for adding Unit transaction to the system.
export const addGlobalUnit = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let unit = await GlobalUnit.add(data);

        if (unit) {
            dispatch({ type: ADD_GLOBAL_UNIT_SUCCESS });
            
            refresh && refresh();
    
            clear && clear();

            successNotification && successNotification();
        }

    } catch (error) {
        dispatch({ type: ADD_GLOBAL_UNIT_FAIL });
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for editing Unit transactions to the system.
export const editGlobalUnit = (id, data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let unit = await GlobalUnit.update(id, data);

        if (unit) {
            dispatch({ type: EDIT_GLOBAL_UNIT_SUCCESS });

            refresh && refresh();

            clear && clear();

            successNotification && successNotification();
        }
    } catch(error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering a Unit to edit in the system.
export const renderGlobalUnitToEdit = payload => {
    return {
        type: RENDER_GLOBAL_UNIT_TO_EDIT,
        payload,
    };
};

export const deleteGlobalUnit = (id, refresh) => async dispatch => {
    try {
        const deleted_Unit = await GlobalUnit.delete(id);

        if (deleted_Unit) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};
