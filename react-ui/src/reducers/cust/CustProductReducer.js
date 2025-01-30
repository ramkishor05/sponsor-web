import { 
    GET_ALL_CUST_PRODUCTS_SUCCESS, CUST_PRODUCT_ADD_SUCCESS,
    SHOW_CUST_PRODUCT_LOADER, REMOVE_CUST_PRODUCT_LOADER,
    CUST_PRODUCT_TO_EDIT, CUST_PRODUCT_EDIT_SUCCESS, GET_FINISHING_CUST_PRODUCTS
} from '../../types';

const INITIAL_STATE = {
    custProductList: [],
    custProductList_finishing: [],
    custProduct: {
        id: '',
        title: '',
        name: '',
        desc: '',
        stockQnt: 0,
        purchasePrice: 0,
        purchaseUnit: 1,
        wholePrice: 0,
        wholeUnit: 1,
        retailPrice: 0,
        retailUnit: 1
    },
    show_cust_product_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_CUST_PRODUCTS_SUCCESS:
            return { ...state, custProductList: action.payload, show_cust_product_loader: false };

        case SHOW_CUST_PRODUCT_LOADER:
            return { ...state, show_cust_product_loader: true };
    
        case REMOVE_CUST_PRODUCT_LOADER:
            return { ...state, show_cust_product_loader: false };

        case CUST_PRODUCT_ADD_SUCCESS:
            return { ...state, show_cust_product_loader: false };

        case CUST_PRODUCT_TO_EDIT:
            return { ...state, custProduct: action.payload };

        case CUST_PRODUCT_EDIT_SUCCESS:
            return { ...state, show_cust_product_loader: false };

        case GET_FINISHING_CUST_PRODUCTS:
            return { ...state, show_cust_product_loader: false, custProductList_finishing: action.payload };

        default:
            return state;
    }
};

