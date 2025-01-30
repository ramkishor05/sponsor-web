import { 
   GET_ALL_GLOBAL_SPONSOR_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_FAIL,
   GET_GLOBAL_SPONSOR_TODAY_SUCCESS,
   GET_GLOBAL_SPONSOR_YESTERDAY_SUCCESS,
   GET_GLOBAL_SPONSOR_LONG_SUCCESS,
   ADD_GLOBAL_SPONSOR_SUCCESS,
   ADD_GLOBAL_SPONSOR_FAIL,
   GET_ALL_GLOBAL_SPONSOR_PAGE_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_PAGE_FAIL,
   GET_GLOBAL_SPONSOR_TREE_SUCCESS,
   GET_GLOBAL_SPONSOR_ACCOUNT_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    globalSponsorList: [],
    globalSponsorList_today: [],
    globalSponsorList_yesterday: [],
    globalSponsorList_long: [],
    globalSponsorPageData: {
        elements: []
    },
    globalSponsorTree:{

    },
    globalSponsorAccount:{

    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_GLOBAL_SPONSOR_PAGE_SUCCESS:
            return { ...state, globalSponsorPageData:{
                elements: action.payload
            } };
       case GET_GLOBAL_SPONSOR_TREE_SUCCESS:
            return { ...state, globalSponsorTree: action.payload};
        case GET_GLOBAL_SPONSOR_ACCOUNT_SUCCESS:
                return { ...state, globalSponsorAccount: action.payload};    
        case GET_ALL_GLOBAL_SPONSOR_PAGE_FAIL:
            return { ...state };

        case GET_ALL_GLOBAL_SPONSOR_SUCCESS:
            return { ...state, globalSponsorList: action.payload };

        case GET_ALL_GLOBAL_SPONSOR_FAIL:
            return { ...state };

        case GET_GLOBAL_SPONSOR_TODAY_SUCCESS:
            return { ...state, globalSponsorList_today: action.payload };

        case GET_GLOBAL_SPONSOR_YESTERDAY_SUCCESS:
            return { ...state, globalSponsorList_yesterday: action.payload };

        case GET_GLOBAL_SPONSOR_LONG_SUCCESS:
            return { ...state, globalSponsorList_long: action.payload };

        case ADD_GLOBAL_SPONSOR_SUCCESS:
            return { ...state, openAddGlobalSponsorModal: false };

        case ADD_GLOBAL_SPONSOR_FAIL:
            return { ...state };
    
        default:
            return state;
    }
};









