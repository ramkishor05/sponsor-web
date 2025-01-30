import { 
   GET_ALL_GLOBAL_CATEGERY_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_FAIL,
   GET_GLOBAL_CATEGERY_TODAY_SUCCESS,
   GET_GLOBAL_CATEGERY_YESTERDAY_SUCCESS,
   GET_GLOBAL_CATEGERY_LONG_SUCCESS,
   ADD_GLOBAL_CATEGERY_SUCCESS,
   ADD_GLOBAL_CATEGERY_FAIL,
   RENDER_GLOBAL_CATEGERY_TO_EDIT,
   GET_ALL_GLOBAL_CATEGERY_PAGE_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalCategoryItemPageData: {},
    globalCategoryList: [],
    globalCategoryList_today: [],
    globalCategoryList_yesterday: [],
    globalCategoryList_long: [],
    globalCategory_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbCategoryGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_CATEGERY_PAGE_SUCCESS:
            return { ...state, globalCategoryItemPageData: action.payload };

        case GET_ALL_GLOBAL_CATEGERY_SUCCESS:
            return { ...state, globalCategoryList: action.payload };

        case GET_ALL_GLOBAL_CATEGERY_FAIL:
            return { ...state };

        case GET_GLOBAL_CATEGERY_TODAY_SUCCESS:
            return { ...state, globalCategoryList_today: action.payload };

        case GET_GLOBAL_CATEGERY_YESTERDAY_SUCCESS:
            return { ...state, globalCategoryList_yesterday: action.payload };

        case GET_GLOBAL_CATEGERY_LONG_SUCCESS:
            return { ...state, globalCategoryList_long: action.payload };

        case ADD_GLOBAL_CATEGERY_SUCCESS:
            return { ...state, openAddGlobalCategoryModal: false };

        case ADD_GLOBAL_CATEGERY_FAIL:
            return { ...state };

        case RENDER_GLOBAL_CATEGERY_TO_EDIT:
            return { ...state, globalCategory_to_edit: action.payload };
    
        default:
            return state;
    }
};









