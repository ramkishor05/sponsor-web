import { 
   GET_ALL_GLOBAL_TAG_ITEM_SUCCESS,
   GET_ALL_GLOBAL_TAG_ITEM_FAIL,
   GET_GLOBAL_TAG_ITEM_TODAY_SUCCESS,
   GET_GLOBAL_TAG_ITEM_YESTERDAY_SUCCESS,
   GET_GLOBAL_TAG_ITEM_LONG_SUCCESS,
   ADD_GLOBAL_TAG_ITEM_SUCCESS,
   ADD_GLOBAL_TAG_ITEM_FAIL,
   RENDER_GLOBAL_TAG_ITEM_TO_EDIT,
   GET_ALL_GLOBAL_TAG_ITEM_PAGE_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalTagItemPageData: {},
    globalTagItemList: [],
    globalTagItemList_today: [],
    globalTagItemList_yesterday: [],
    globalTagItemList_long: [],
    globalTagItem_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbTagItemGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_TAG_ITEM_PAGE_SUCCESS:
            return { ...state, globalTagItemPageData: action.payload };

        case GET_ALL_GLOBAL_TAG_ITEM_SUCCESS:
            return { ...state, globalTagItemList: action.payload };

        case GET_ALL_GLOBAL_TAG_ITEM_FAIL:
            return { ...state };

        case GET_GLOBAL_TAG_ITEM_TODAY_SUCCESS:
            return { ...state, globalTagItemList_today: action.payload };

        case GET_GLOBAL_TAG_ITEM_YESTERDAY_SUCCESS:
            return { ...state, globalTagItemList_yesterday: action.payload };

        case GET_GLOBAL_TAG_ITEM_LONG_SUCCESS:
            return { ...state, globalTagItemList_long: action.payload };

        case ADD_GLOBAL_TAG_ITEM_SUCCESS:
            return { ...state, openAddGlobalTagItemModal: false };

        case ADD_GLOBAL_TAG_ITEM_FAIL:
            return { ...state };

        case RENDER_GLOBAL_TAG_ITEM_TO_EDIT:
            return { ...state, globalTagItem_to_edit: action.payload };
    
        default:
            return state;
    }
};









