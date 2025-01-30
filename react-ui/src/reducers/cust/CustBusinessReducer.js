import { 
    GET_ALL_VENDOR_BUSINESS_LIST_SUCCESS, VENDOR_BUSINESS_ADD_SUCCESS,
    SHOW_VENDOR_BUSINESS_LOADER, REMOVE_VENDOR_BUSINESS_LOADER,
    VENDOR_BUSINESS_TO_EDIT, VENDOR_BUSINESS_EDIT_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    custBusinessList: [],
    custBusiness: {
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
    show_cust_business_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_VENDOR_BUSINESS_LIST_SUCCESS:
            return { ...state, custBusinessList: action.payload, show_cust_business_loader: false };

        case SHOW_VENDOR_BUSINESS_LOADER:
            return { ...state, show_cust_business_loader: true };
    
        case REMOVE_VENDOR_BUSINESS_LOADER:
            return { ...state, show_cust_business_loader: false };

        case VENDOR_BUSINESS_ADD_SUCCESS:
            return { ...state, show_cust_business_loader: false };

        case VENDOR_BUSINESS_TO_EDIT:
            return { ...state, custBusiness: action.payload };

        case VENDOR_BUSINESS_EDIT_SUCCESS:
            return { ...state, show_cust_business_loader: false };

        default:
            return state;
    }
};

