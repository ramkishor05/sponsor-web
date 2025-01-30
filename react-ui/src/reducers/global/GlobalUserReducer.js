import { 
    GET_ALL_GLOBAL_USER_SUCCESS,
    GET_ALL_GLOBAL_USER_PAGE_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalUserPageData: {
        pageCount: 7
    },
    globalUserList: [],
    globalUserList_finishing: [],
    globalUser: {
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
    show_global_user_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_GLOBAL_USER_SUCCESS:
            return { ...state, globalUserList: action.payload};
       case GET_ALL_GLOBAL_USER_PAGE_SUCCESS:
                return { ...state, globalUserPageData: action.payload };
        default:
            return state;
    }
};

