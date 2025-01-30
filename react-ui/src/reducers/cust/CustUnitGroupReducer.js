import { 
    GET_ALL_CUST_UNIT_GROUPS_SUCCESS,
    GET_ALL_CUST_UNIT_GROUPS_FAIL,
    GET_CUST_UNIT_GROUPS_TODAY_SUCCESS, 
    GET_CUST_UNIT_GROUPS_YESTERDAY_SUCCESS, 
    GET_CUST_UNIT_GROUPS_LONG_SUCCESS,
    ADD_CUST_UNIT_GROUP_SUCCESS, 
    ADD_CUST_UNIT_GROUP_FAIL,
    RENDER_CUST_UNIT_GROUP_TO_EDIT,
} from '../../types';

const INITIAL_STATE = {
    custUnitGroupList: [],
    custUnitGroupList_today: [],
    custUnitGroupList_yesterday: [],
    custUnitGroupList_long: [],
    cust_unit_group_to_edit: {
        name: '',
        unitGroupId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_UNIT_GROUPS_SUCCESS:
            return { ...state, custUnitGroupList: action.payload };

        case GET_ALL_CUST_UNIT_GROUPS_FAIL:
            return { ...state };

        case GET_CUST_UNIT_GROUPS_TODAY_SUCCESS:
            return { ...state, custUnitGroupList_today: action.payload };

        case GET_CUST_UNIT_GROUPS_YESTERDAY_SUCCESS:
            return { ...state, custUnitGroupList_yesterday: action.payload };

        case GET_CUST_UNIT_GROUPS_LONG_SUCCESS:
            return { ...state, custUnitGroupList_long: action.payload };

        case ADD_CUST_UNIT_GROUP_SUCCESS:
            return { ...state, openAddCustUnitGroupModal: false };

        case ADD_CUST_UNIT_GROUP_FAIL:
            return { ...state };

        case RENDER_CUST_UNIT_GROUP_TO_EDIT:
            return { ...state, cust_unit_group_to_edit: action.payload };
    
        default:
            return state;
    }
};









