import {
    GET_GLOBAL_DASHBOARDS_SUCCESS 
} from '../../types';

const INITIAL_STATE = {
    globalDashboard: {
    }
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_GLOBAL_DASHBOARDS_SUCCESS:
            return { ...state, globalDashboard: action.payload };
        default:
            return state;
    }
};



