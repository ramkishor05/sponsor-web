import { 
    GET_ALL_GLOBAL_UNITS_SUCCESS, GET_ALL_GLOBAL_UNITS_FAIL,
    GET_GLOBAL_UNITS_TODAY_SUCCESS, GET_GLOBAL_UNITS_YESTERDAY_SUCCESS, GET_GLOBAL_UNITS_LONG_SUCCESS,
    ADD_GLOBAL_UNIT_SUCCESS, ADD_GLOBAL_UNIT_FAIL,
    RENDER_GLOBAL_UNIT_TO_EDIT,
} from '../../types';

const INITIAL_STATE = {
    globalUnitList: [],
    globalUnitList_today: [],
    globalUnitList_yesterday: [],
    globalUnitList_long: [],
    globalUnit_to_edit: {
        name: '',
        unitGroupId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_UNITS_SUCCESS:
            return { ...state, globalUnitList: action.payload };

        case GET_ALL_GLOBAL_UNITS_FAIL:
            return { ...state };

        case GET_GLOBAL_UNITS_TODAY_SUCCESS:
            return { ...state, globalUnitList_today: action.payload };

        case GET_GLOBAL_UNITS_YESTERDAY_SUCCESS:
            return { ...state, globalUnitList_yesterday: action.payload };

        case GET_GLOBAL_UNITS_LONG_SUCCESS:
            return { ...state, globalUnitList_long: action.payload };

        case ADD_GLOBAL_UNIT_SUCCESS:
            return { ...state, openAddGlobalUnitModal: false };

        case ADD_GLOBAL_UNIT_FAIL:
            return { ...state };

        case RENDER_GLOBAL_UNIT_TO_EDIT:
            return { ...state, globalUnit_to_edit: action.payload };
    
        default:
            return state;
    }
};









