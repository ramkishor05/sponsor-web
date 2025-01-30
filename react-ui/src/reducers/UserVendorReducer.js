import { 
    USER_GET_VENDOR_LIST_SUCCESS,
    USER_GET_VENDOR_SUCCESS, 
    USER_UPDATE_VENDOR_SUCCESS,
    USER_ADD_VENDOR_SUCCESS
} from '../types';

const INITIAL_STATE = {
    userVendorList: [],
    userVendorList_finishing: [],
    userVendor: {
        id: '',
        title: '',
        name: '',
        phoneNumber: '',
        mobileNumber: '',
        emailAddress: '',
        permamentAddress: '',
        presentAddress: ''
    }
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case USER_GET_VENDOR_LIST_SUCCESS:
            return { ...state, userVendorList: action.payload};

        case USER_GET_VENDOR_SUCCESS:
            return { ...state, userVendor: action.payload};

        case USER_ADD_VENDOR_SUCCESS:
            return { ...state, userVendor: action.payload };

        case USER_UPDATE_VENDOR_SUCCESS:
            return { ...state, userVendor: action.payload };
        default:
            return state;
    }
};

