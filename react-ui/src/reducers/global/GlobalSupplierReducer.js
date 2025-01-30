import { 
    GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS, VENDOR_SUPPLIER_ADD_SUCCESS,
    SHOW_VENDOR_SUPPLIER_LOADER, REMOVE_VENDOR_SUPPLIER_LOADER,
    VENDOR_SUPPLIER_TO_EDIT, VENDOR_SUPPLIER_EDIT_SUCCESS, GET_FINISHING_VENDOR_SUPPLIER_LIST
} from '../../types';

const INITIAL_STATE = {
    globalSupplierList: [],
    globalSupplierList_finishing: [],
    globalSupplier: {
        id: '',
        title: '',
        name: '',
        phoneNumber: '',
        mobileNumber: '',
        emailAddress: '',
        permamentAddress: '',
        presentAddress: '',
        vendorId: 0
    },
    show_global_customer_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_SUPPLIER_LIST_SUCCESS:
            return { ...state, globalSupplierList: action.payload, show_global_customer_loader: false };

        case SHOW_VENDOR_SUPPLIER_LOADER:
            return { ...state, show_global_customer_loader: true };
    
        case REMOVE_VENDOR_SUPPLIER_LOADER:
            return { ...state, show_global_customer_loader: false };

        case VENDOR_SUPPLIER_ADD_SUCCESS:
            return { ...state, show_global_customer_loader: false };

        case VENDOR_SUPPLIER_TO_EDIT:
            return { ...state, globalSupplier: action.payload };

        case VENDOR_SUPPLIER_EDIT_SUCCESS:
            return { ...state, show_global_customer_loader: false };

        case GET_FINISHING_VENDOR_SUPPLIER_LIST:
            return { ...state, show_global_customer_loader: false, globalSupplierList_finishing: action.payload };

        default:
            return state;
    }
};

