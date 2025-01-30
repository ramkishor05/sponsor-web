import { 
    GET_ALL_DASHBOARDS_SUCCESS,
    GET_DASHBOARDS_TODAY_SUCCESS, GET_DASHBOARDS_YESTERDAY_SUCCESS, GET_DASHBOARDS_LONG_SUCCESS,
    DASHBOARD_TO_EDIT,
    SHOW_LOADER,
    REMOVE_LOADER
} from '../../types';
import CustDashboardService from '../../services/CustDashboardService';

// Action creator for getting all dashboards.
export const getCustDashboardList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let dashboards = await CustDashboardService.getAll();

        if (dashboards) {
            dispatch({ type: GET_ALL_DASHBOARDS_SUCCESS, payload: dashboards });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for getting dashboards according to date.
export const getCustDashboardListByDate = (from, to, day) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let dashboards = await CustDashboardService.getByDate(from, to);

        if (dashboards) {
            if (day === 'today') {
                dispatch({ type: GET_DASHBOARDS_TODAY_SUCCESS, payload: dashboards });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_DASHBOARDS_YESTERDAY_SUCCESS, payload: dashboards });
            } else if (day === 'long') {
                dispatch({ type: GET_DASHBOARDS_LONG_SUCCESS, payload: dashboards });
            } else {
                dispatch({ type: GET_ALL_DASHBOARDS_SUCCESS, payload: dashboards });
            }
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for adding dashboards.
export const addCustDashboard = (data, refreshDashboards, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let dashboard = await CustDashboardService.add(data);

        if (dashboard) {
            refreshDashboards && refreshDashboards();

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

// Action creator for rendering a specific dashboard to edit.
export const renderDashboardToEdit = payload => {
    return {
        type: DASHBOARD_TO_EDIT,
        payload,
    };
};

// Action creator for editing dashboards in the system.
export const editCustDashboard = (id, data, refreshDashboards, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const dashboard = await CustDashboardService.update(id, data);

        if (dashboard) {
            refreshDashboards && refreshDashboards();

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

// Action creator for editing dashboards in the system.
export const deleteCustDashboard = (id, refreshDashboards, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const dashboard = await CustDashboardService.delete(id);

        if (dashboard) {
            refreshDashboards && refreshDashboards();

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