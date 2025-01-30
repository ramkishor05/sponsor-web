import { 
   GET_ALL_GLOBAL_CURRENCY_ITEM_SUCCESS,
   GET_ALL_GLOBAL_CURRENCY_ITEM_FAIL,
   GET_GLOBAL_CURRENCY_ITEM_TODAY_SUCCESS,
   GET_GLOBAL_CURRENCY_ITEM_YESTERDAY_SUCCESS,
   GET_GLOBAL_CURRENCY_ITEM_LONG_SUCCESS,
   ADD_GLOBAL_CURRENCY_ITEM_SUCCESS,
   ADD_GLOBAL_CURRENCY_ITEM_FAIL,
   RENDER_GLOBAL_CURRENCY_ITEM_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    globalCurrencyItemList: [],
    globalCurrencyItemList_today: [],
    globalCurrencyItemList_yesterday: [],
    globalCurrencyItemList_long: [],
    globalCurrencyItem_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbCategoryGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_CURRENCY_ITEM_SUCCESS:
            return { ...state, globalCurrencyItemList: action.payload };

        case GET_ALL_GLOBAL_CURRENCY_ITEM_FAIL:
            return { ...state };

        case GET_GLOBAL_CURRENCY_ITEM_TODAY_SUCCESS:
            return { ...state, globalCurrencyItemList_today: action.payload };

        case GET_GLOBAL_CURRENCY_ITEM_YESTERDAY_SUCCESS:
            return { ...state, globalCurrencyItemList_yesterday: action.payload };

        case GET_GLOBAL_CURRENCY_ITEM_LONG_SUCCESS:
            return { ...state, globalCurrencyItemList_long: action.payload };

        case ADD_GLOBAL_CURRENCY_ITEM_SUCCESS:
            return { ...state, openAddGlobalCategoryModal: false };

        case ADD_GLOBAL_CURRENCY_ITEM_FAIL:
            return { ...state };

        case RENDER_GLOBAL_CURRENCY_ITEM_TO_EDIT:
            return { ...state, globalCurrencyItem_to_edit: action.payload };
    
        default:
            return state;
    }
};









