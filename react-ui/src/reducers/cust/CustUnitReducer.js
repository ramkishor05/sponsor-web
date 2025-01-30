import {
    GET_ALL_CUST_UNITS_SUCCESS, GET_ALL_CUST_UNITS_FAIL,
    GET_CUST_UNITS_TODAY_SUCCESS, GET_CUST_UNITS_YESTERDAY_SUCCESS, GET_CUST_UNITS_LONG_SUCCESS,
    RENDER_CUST_UNIT_TO_EDIT,
} from '../../types';

const INITIAL_STATE = {
    error: null,
    custUnitList: [],
    custUnitList_today: [],
    custUnitList_yesterday: [],
    custUnitList_long: [],
    cust_unit_to_edit: {
        name: '',
        amount: '',
    },
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_CUST_UNITS_SUCCESS:
            return { ...state, custUnitList: action.payload };

        case GET_ALL_CUST_UNITS_FAIL:
            return { ...state, error: action.payload };

        case GET_CUST_UNITS_TODAY_SUCCESS:
            return { ...state, custUnitS_today: action.payload };

        case GET_CUST_UNITS_YESTERDAY_SUCCESS:
            return { ...state, custUnitS_yesterday: action.payload };

        case GET_CUST_UNITS_LONG_SUCCESS:
            return { ...state, custUnitS_long: action.payload };

        case RENDER_CUST_UNIT_TO_EDIT:
            return { ...state, cust_unit_group_to_edit: action.payload };

        default:
            return state;
    }
}