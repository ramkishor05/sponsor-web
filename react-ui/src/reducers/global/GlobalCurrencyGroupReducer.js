import { 
   GET_ALL_GLOBAL_CURRENCY_GROUP_SUCCESS,
   GET_ALL_GLOBAL_CURRENCY_GROUP_FAIL,
   GET_GLOBAL_CURRENCY_GROUP_TODAY_SUCCESS,
   GET_GLOBAL_CURRENCY_GROUP_YESTERDAY_SUCCESS,
   GET_GLOBAL_CURRENCY_GROUP_LONG_SUCCESS,
   ADD_GLOBAL_CURRENCY_GROUP_SUCCESS,
   ADD_GLOBAL_CURRENCY_GROUP_FAIL,
   RENDER_GLOBAL_CURRENCY_GROUP_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    globalCurrencyGroupList: [],
    globalCurrencyGroupList_today: [],
    globalCurrencyGroupList_yesterday: [],
    globalCurrencyGroupList_long: [],
    globalCurrencyGroup_to_edit: {
        id: '',
        name: '',
        desc: '',
        typeId: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_CURRENCY_GROUP_SUCCESS:
            return { ...state, globalCurrencyGroupList: action.payload };

        case GET_ALL_GLOBAL_CURRENCY_GROUP_FAIL:
            return { ...state };

        case GET_GLOBAL_CURRENCY_GROUP_TODAY_SUCCESS:
            return { ...state, globalCurrencyGroupList_today: action.payload };

        case GET_GLOBAL_CURRENCY_GROUP_YESTERDAY_SUCCESS:
            return { ...state, globalCurrencyGroupList_yesterday: action.payload };

        case GET_GLOBAL_CURRENCY_GROUP_LONG_SUCCESS:
            return { ...state, globalCurrencyGroupList_long: action.payload };

        case ADD_GLOBAL_CURRENCY_GROUP_SUCCESS:
            return { ...state, openAddGlobalCategoryGroupModal: false };

        case ADD_GLOBAL_CURRENCY_GROUP_FAIL:
            return { ...state };

        case RENDER_GLOBAL_CURRENCY_GROUP_TO_EDIT:
            return { ...state, globalCurrencyGroup_to_edit: action.payload };
    
        default:
            return state;
    }
};









