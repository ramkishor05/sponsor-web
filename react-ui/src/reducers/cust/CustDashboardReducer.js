import {
    GET_ALL_DASHBOARDS_SUCCESS,
    GET_DASHBOARDS_TODAY_SUCCESS, GET_DASHBOARDS_YESTERDAY_SUCCESS, GET_DASHBOARDS_LONG_SUCCESS,
    DASHBOARD_TO_EDIT, 
} from '../../types';

const INITIAL_STATE = {
    custDashboard: {
        stocks:[]
    },
    custDashboard_today: {
        stocks:[]
    },
    custDashboard_yesterday:{
        stocks:[]
    },
    custDashboard_long: {
        stocks:[]
    },
    cust_dashboard_to_edit: {
        retailQnt: 0.00,
        wholeQnt: 0.00,
        customerId: 0,
        productId: 0,
        userId: 0,
        stocks:[]
    },
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_DASHBOARDS_SUCCESS:
            return { ...state, custDashboard: action.payload };

        case GET_DASHBOARDS_TODAY_SUCCESS:
            return { ...state, custDashboard_today: action.payload };

        case GET_DASHBOARDS_YESTERDAY_SUCCESS:
            return { ...state, custDashboard_yesterday: action.payload };

        case GET_DASHBOARDS_LONG_SUCCESS:
            return { ...state, custDashboard_long: action.payload };

        case DASHBOARD_TO_EDIT:
            return { ...state, dashboard_to_edit: action.payload };

        default:
            return state;
    }
};



