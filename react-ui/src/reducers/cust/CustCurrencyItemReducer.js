import { 
   GET_ALL_CUST_CURRENCY_ITEM_SUCCESS,
   GET_ALL_CUST_CURRENCY_ITEM_FAIL,
   GET_CUST_CURRENCY_ITEM_TODAY_SUCCESS,
   GET_CUST_CURRENCY_ITEM_YESTERDAY_SUCCESS,
   GET_CUST_CURRENCY_ITEM_LONG_SUCCESS,
   ADD_CUST_CURRENCY_ITEM_SUCCESS,
   ADD_CUST_CURRENCY_ITEM_FAIL,
   RENDER_CUST_CURRENCY_ITEM_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    custCurrencyItemList: [],
    custCurrencyItemList_today: [],
    custCurrencyItemList_yesterday: [],
    custCurrencyItemList_long: [],
    custCurrencyItem_to_edit: {
        name: '',
        desc: '',
        typeId:'',
        glbCategoryGroupId: 0
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_CURRENCY_ITEM_SUCCESS:
            return { ...state, custCurrencyItemList: action.payload };

        case GET_ALL_CUST_CURRENCY_ITEM_FAIL:
            return { ...state };

        case GET_CUST_CURRENCY_ITEM_TODAY_SUCCESS:
            return { ...state, custCurrencyItemList_today: action.payload };

        case GET_CUST_CURRENCY_ITEM_YESTERDAY_SUCCESS:
            return { ...state, custCurrencyItemList_yesterday: action.payload };

        case GET_CUST_CURRENCY_ITEM_LONG_SUCCESS:
            return { ...state, custCurrencyItemList_long: action.payload };

        case ADD_CUST_CURRENCY_ITEM_SUCCESS:
            return { ...state, openAddGlobalCategoryModal: false };

        case ADD_CUST_CURRENCY_ITEM_FAIL:
            return { ...state };

        case RENDER_CUST_CURRENCY_ITEM_TO_EDIT:
            return { ...state, custCurrencyItem_to_edit: action.payload };
    
        default:
            return state;
    }
};









