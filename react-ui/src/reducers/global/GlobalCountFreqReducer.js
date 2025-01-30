import { 
   GET_ALL_GLOBAL_COUNT_FREQ_SUCCESS,
   GET_ALL_GLOBAL_COUNT_FREQ_FAIL,
   GET_GLOBAL_COUNT_FREQ_TODAY_SUCCESS,
   GET_GLOBAL_COUNT_FREQ_YESTERDAY_SUCCESS,
   GET_GLOBAL_COUNT_FREQ_LONG_SUCCESS,
   ADD_GLOBAL_COUNT_FREQ_SUCCESS,
   ADD_GLOBAL_COUNT_FREQ_FAIL,
   RENDER_GLOBAL_COUNT_FREQ_TO_EDIT
} from '../../types';

const INITIAL_STATE = {
    globalCountFreqList: [],
    globalCountFreqList_today: [],
    globalCountFreqList_yesterday: [],
    globalCountFreqList_long: [],
    globalCountFreq_to_edit: {
        name: '',
        amount: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_COUNT_FREQ_SUCCESS:
            return { ...state, globalCountFreqList: action.payload };

        case GET_ALL_GLOBAL_COUNT_FREQ_FAIL:
            return { ...state };

        case GET_GLOBAL_COUNT_FREQ_TODAY_SUCCESS:
            return { ...state, globalCountFreqList_today: action.payload };

        case GET_GLOBAL_COUNT_FREQ_YESTERDAY_SUCCESS:
            return { ...state, globalCountFreqList_yesterday: action.payload };

        case GET_GLOBAL_COUNT_FREQ_LONG_SUCCESS:
            return { ...state, globalCountFreqList_long: action.payload };

        case ADD_GLOBAL_COUNT_FREQ_SUCCESS:
            return { ...state, openAddGlobalCountFreqModal: false };

        case ADD_GLOBAL_COUNT_FREQ_FAIL:
            return { ...state };

        case RENDER_GLOBAL_COUNT_FREQ_TO_EDIT:
            return { ...state, globalCountFreq_to_edit: action.payload };
    
        default:
            return state;
    }
};









