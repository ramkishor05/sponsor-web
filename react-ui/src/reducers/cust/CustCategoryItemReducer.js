import { 
   GET_ALL_CUST_CATEGERY_SUCCESS,
   GET_ALL_CUST_CATEGERY_FAIL,
   GET_CUST_CATEGERY_TODAY_SUCCESS,
   GET_CUST_CATEGERY_YESTERDAY_SUCCESS,
   GET_CUST_CATEGERY_LONG_SUCCESS,
   ADD_CUST_CATEGERY_SUCCESS,
   ADD_CUST_CATEGERY_FAIL,
   RENDER_CUST_CATEGERY_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    custCategoryItemList: [],
    custCategoryItemList_today: [],
    custCategoryItemList_yesterday: [],
    custCategoryItemList_long: [],
    custCategory_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbCategoryGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_CATEGERY_SUCCESS:
            return { ...state, custCategoryItemList: action.payload };

        case GET_ALL_CUST_CATEGERY_FAIL:
            return { ...state };

        case GET_CUST_CATEGERY_TODAY_SUCCESS:
            return { ...state, custCategoryItemList_today: action.payload };

        case GET_CUST_CATEGERY_YESTERDAY_SUCCESS:
            return { ...state, custCategoryItemList_yesterday: action.payload };

        case GET_CUST_CATEGERY_LONG_SUCCESS:
            return { ...state, custCategoryItemList_long: action.payload };

        case ADD_CUST_CATEGERY_SUCCESS:
            return { ...state, openAddGlobalCategoryModal: false };

        case ADD_CUST_CATEGERY_FAIL:
            return { ...state };

        case RENDER_CUST_CATEGERY_TO_EDIT:
            return { ...state, custCategory_to_edit: action.payload };
    
        default:
            return state;
    }
};









