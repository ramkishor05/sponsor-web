import { 
    GLOBAL_GET_VENDOR_LIST_SUCCESS,
    GLOBAL_GET_VENDOR_SUCCESS, 
    GLOBAL_ADD_VENDOR_SUCCESS,
    GLOBAL_EDIT_VENDOR_SUCCESS,
} from '../../types';

const INITIAL_STATE = {
    globalVendorList: [],
    globalVendorList_finishing: [],
    globalVendor: {
        id: '',
        title: '',
        name: '',
        phoneNumber: '',
        mobileNumber: '',
        emailAddress: '',
        permamentAddress: '',
        presentAddress: ''
    },
    show_globalVendor_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GLOBAL_GET_VENDOR_LIST_SUCCESS:
            return { ...state, globalVendorList: action.payload};

        case GLOBAL_GET_VENDOR_SUCCESS:
            return { ...state, globalVendor: action.payload};

        case GLOBAL_ADD_VENDOR_SUCCESS:
            return { ...state};

        case GLOBAL_EDIT_VENDOR_SUCCESS:
            return { ...state};

        default:
            return state;
    }
};

