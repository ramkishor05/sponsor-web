import { 
   GET_ALL_GLOBAL_CATEGERY_GROUP_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_GROUP_FAIL,
   GET_GLOBAL_CATEGERY_GROUP_TODAY_SUCCESS,
   GET_GLOBAL_CATEGERY_GROUP_YESTERDAY_SUCCESS,
   GET_GLOBAL_CATEGERY_GROUP_LONG_SUCCESS,
   ADD_GLOBAL_CATEGERY_GROUP_SUCCESS,
   ADD_GLOBAL_CATEGERY_GROUP_FAIL,
   RENDER_GLOBAL_CATEGERY_GROUP_TO_EDIT,
   GET_ALL_GLOBAL_CATEGERY_GROUP_PAGE_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalCategoryGrouppPageData: {},
    globalCategoryGroupList: [],
    globalCategoryGroupList_today: [],
    globalCategoryGroupList_yesterday: [],
    globalCategoryGroupList_long: [],
    globalCategoryGroup_to_edit: {
        id: '',
        name: '',
        desc: '',
        typeId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_GLOBAL_CATEGERY_GROUP_PAGE_SUCCESS:
            return { ...state, globalCategoryGrouppPageData: action.payload };
        
        case GET_ALL_GLOBAL_CATEGERY_GROUP_SUCCESS:
            return { ...state, globalCategoryGroupList: action.payload };

        case GET_ALL_GLOBAL_CATEGERY_GROUP_FAIL:
            return { ...state };

        case GET_GLOBAL_CATEGERY_GROUP_TODAY_SUCCESS:
            return { ...state, globalCategoryGroupList_today: action.payload };

        case GET_GLOBAL_CATEGERY_GROUP_YESTERDAY_SUCCESS:
            return { ...state, globalCategoryGroupList_yesterday: action.payload };

        case GET_GLOBAL_CATEGERY_GROUP_LONG_SUCCESS:
            return { ...state, globalCategoryGroupList_long: action.payload };

        case ADD_GLOBAL_CATEGERY_GROUP_SUCCESS:
            return { ...state, openAddGlobalCategoryGroupModal: false };

        case ADD_GLOBAL_CATEGERY_GROUP_FAIL:
            return { ...state };

        case RENDER_GLOBAL_CATEGERY_GROUP_TO_EDIT:
            return { ...state, globalCategoryGroup_to_edit: action.payload };
    
        default:
            return state;
    }
};









