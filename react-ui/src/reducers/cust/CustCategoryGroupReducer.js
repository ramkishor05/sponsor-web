import { 
   GET_ALL_CUST_CATEGERY_GROUP_SUCCESS,
   GET_ALL_CUST_CATEGERY_GROUP_FAIL,
   GET_CUST_CATEGERY_GROUP_TODAY_SUCCESS,
   GET_CUST_CATEGERY_GROUP_YESTERDAY_SUCCESS,
   GET_CUST_CATEGERY_GROUP_LONG_SUCCESS,
   ADD_CUST_CATEGERY_GROUP_SUCCESS,
   ADD_CUST_CATEGERY_GROUP_FAIL,
   RENDER_CUST_CATEGERY_GROUP_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    custCategoryGroupList: [],
    custCategoryGroupList_today: [],
    custCategoryGroupList_yesterday: [],
    custCategoryGroupList_long: [],
    custCategoryGroup_to_edit: {
        id: '',
        name: '',
        desc: '',
        typeId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_CATEGERY_GROUP_SUCCESS:
            return { ...state, custCategoryGroupList: action.payload };

        case GET_ALL_CUST_CATEGERY_GROUP_FAIL:
            return { ...state };

        case GET_CUST_CATEGERY_GROUP_TODAY_SUCCESS:
            return { ...state, custCategoryGroupList_today: action.payload };

        case GET_CUST_CATEGERY_GROUP_YESTERDAY_SUCCESS:
            return { ...state, custCategoryGroupList_yesterday: action.payload };

        case GET_CUST_CATEGERY_GROUP_LONG_SUCCESS:
            return { ...state, custCategoryGroupList_long: action.payload };

        case ADD_CUST_CATEGERY_GROUP_SUCCESS:
            return { ...state, openAddGlobalCategoryGroupModal: false };

        case ADD_CUST_CATEGERY_GROUP_FAIL:
            return { ...state };

        case RENDER_CUST_CATEGERY_GROUP_TO_EDIT:
            return { ...state, custCategoryGroup_to_edit: action.payload };
    
        default:
            return state;
    }
};









