import {
    GET_ALL_PURCHASES_SUCCESS, GET_ALL_PURCHASES_SUPPLIER_SUCCESS,
    GET_PURCHASES_TODAY_SUCCESS, GET_PURCHASES_YESTERDAY_SUCCESS, GET_PURCHASES_LONG_SUCCESS,
    PURCHASE_TO_EDIT, 
} from '../../types';

const INITIAL_STATE = {
    custPurchaseList: [],
    custPurchaseList_today: [],
    custPurchaseList_yesterday: [],
    custPurchaseList_long: [],
    custPurchaseListBySupplier: [],
    cust_purchase_to_edit: {
        retailQnt: 0.00,
        wholeQnt: 0.00,
        customerId: 0,
        productId: 0,
        userId: 0,
        custProductRetailPurchaseList: [],
        custProductWholePurchaseList: []
    },
    custCartList: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_PURCHASES_SUCCESS:
            return { ...state, custPurchaseList: action.payload };
        case GET_ALL_PURCHASES_SUPPLIER_SUCCESS:
            return { ...state, custPurchaseListBySupplier: action.payload };
        case GET_PURCHASES_TODAY_SUCCESS:
            return { ...state, custPurchaseList_today: action.payload };

        case GET_PURCHASES_YESTERDAY_SUCCESS:
            return { ...state, custPurchaseList_yesterday: action.payload };

        case GET_PURCHASES_LONG_SUCCESS:
            return { ...state, custPurchaseList_long: action.payload };

        case PURCHASE_TO_EDIT:
            return { ...state, purchase_to_edit: action.payload };

        default:
            return state;
    }
};



