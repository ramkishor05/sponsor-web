import { 
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_FAIL,
   GET_GLOBAL_SPONSOR_BOOST_TRANSACTION_TODAY_SUCCESS,
   GET_GLOBAL_SPONSOR_BOOST_TRANSACTION_YESTERDAY_SUCCESS,
   GET_GLOBAL_SPONSOR_BOOST_TRANSACTION_LONG_SUCCESS,
   ADD_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS,
   ADD_GLOBAL_SPONSOR_BOOST_TRANSACTION_FAIL,
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_FAIL
} from '../../types';

const INITIAL_STATE = {
    globalSponsorBoostTransactionList: [],
    globalSponsorBoostTransactionList_today: [],
    globalSponsorBoostTransactionList_yesterday: [],
    globalSponsorBoostTransactionList_long: [],
    globalSponsorBoostTransactionPageData: {
        elements: []
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_SUCCESS:
            return { ...state, globalSponsorBoostTransactionPageData:{
                elements: action.payload
            } 
        };
        case GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_FAIL:
            return { ...state };

        case GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS:
            return { ...state, globalSponsorBoostTransactionList: action.payload };

        case GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_FAIL:
            return { ...state };

        case GET_GLOBAL_SPONSOR_BOOST_TRANSACTION_TODAY_SUCCESS:
            return { ...state, globalSponsorBoostTransactionList_today: action.payload };

        case GET_GLOBAL_SPONSOR_BOOST_TRANSACTION_YESTERDAY_SUCCESS:
            return { ...state, globalSponsorBoostTransactionList_yesterday: action.payload };

        case GET_GLOBAL_SPONSOR_BOOST_TRANSACTION_LONG_SUCCESS:
            return { ...state, globalSponsorBoostTransactionList_long: action.payload };

        case ADD_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS:
            return { ...state, openAddGlobalSponsorBoostTransactionModal: false };

        case ADD_GLOBAL_SPONSOR_BOOST_TRANSACTION_FAIL:
            return { ...state };
    
        default:
            return state;
    }
};









