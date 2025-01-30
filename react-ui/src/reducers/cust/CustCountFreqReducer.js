import { 
   GET_ALL_CUST_COUNT_FREQ_SUCCESS,
   GET_ALL_CUST_COUNT_FREQ_FAIL,
   GET_CUST_COUNT_FREQ_TODAY_SUCCESS,
   GET_CUST_COUNT_FREQ_YESTERDAY_SUCCESS,
   GET_CUST_COUNT_FREQ_LONG_SUCCESS,
   ADD_CUST_COUNT_FREQ_SUCCESS,
   ADD_CUST_COUNT_FREQ_FAIL,
   RENDER_CUST_COUNT_FREQ_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    custCountFreqList: [],
    custCountFreqList_today: [],
    custCountFreqList_yesterday: [],
    custCountFreqList_long: [],
    custCountFreq_to_edit: {
        name: '',
        amount: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_COUNT_FREQ_SUCCESS:
            return { ...state, custCountFreqList: action.payload };

        case GET_ALL_CUST_COUNT_FREQ_FAIL:
            return { ...state };

        case GET_CUST_COUNT_FREQ_TODAY_SUCCESS:
            return { ...state, custCountFreqList_today: action.payload };

        case GET_CUST_COUNT_FREQ_YESTERDAY_SUCCESS:
            return { ...state, custCountFreqList_yesterday: action.payload };

        case GET_CUST_COUNT_FREQ_LONG_SUCCESS:
            return { ...state, custCountFreqList_long: action.payload };

        case ADD_CUST_COUNT_FREQ_SUCCESS:
            return { ...state, openAddGlobalCountFreqModal: false };

        case ADD_CUST_COUNT_FREQ_FAIL:
            return { ...state };

        case RENDER_CUST_COUNT_FREQ_TO_EDIT:
            return { ...state, custCountFreq_to_edit: action.payload };
    
        default:
            return state;
    }
};









