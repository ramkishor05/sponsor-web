import { 
   GET_ALL_GLOBAL_TAG_GROUP_SUCCESS,
   GET_ALL_GLOBAL_TAG_GROUP_FAIL,
   GET_GLOBAL_TAG_GROUP_TODAY_SUCCESS,
   GET_GLOBAL_TAG_GROUP_YESTERDAY_SUCCESS,
   GET_GLOBAL_TAG_GROUP_LONG_SUCCESS,
   ADD_GLOBAL_TAG_GROUP_SUCCESS,
   ADD_GLOBAL_TAG_GROUP_FAIL,
   RENDER_GLOBAL_TAG_GROUP_TO_EDIT,
   GET_ALL_GLOBAL_TAG_GROUP_PAGE_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalTagGroupPageData : {},
    globalTagGroupList: [],
    globalTagGroupList_today: [],
    globalTagGroupList_yesterday: [],
    globalTagGroupList_long: [],
    globalTagGroup_to_edit: {
        id: '',
        name: '',
        desc: '',
        typeId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_TAG_GROUP_PAGE_SUCCESS:
            return { ...state, globalTagGroupPageData: action.payload };

        case GET_ALL_GLOBAL_TAG_GROUP_SUCCESS:
            return { ...state, globalTagGroupList: action.payload };

        case GET_ALL_GLOBAL_TAG_GROUP_FAIL:
            return { ...state };

        case GET_GLOBAL_TAG_GROUP_TODAY_SUCCESS:
            return { ...state, globalTagGroupList_today: action.payload };

        case GET_GLOBAL_TAG_GROUP_YESTERDAY_SUCCESS:
            return { ...state, globalTagGroupList_yesterday: action.payload };

        case GET_GLOBAL_TAG_GROUP_LONG_SUCCESS:
            return { ...state, globalTagGroupList_long: action.payload };

        case ADD_GLOBAL_TAG_GROUP_SUCCESS:
            return { ...state, openAddGlobalTagGroupModal: false };

        case ADD_GLOBAL_TAG_GROUP_FAIL:
            return { ...state };

        case RENDER_GLOBAL_TAG_GROUP_TO_EDIT:
            return { ...state, globalTagGroup_to_edit: action.payload };
    
        default:
            return state;
    }
};









