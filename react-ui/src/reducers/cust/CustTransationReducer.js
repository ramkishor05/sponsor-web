import { 
   GET_ALL_CUST_TRANSATION_SUCCESS,
   GET_ALL_CUST_TRANSATION_FAIL,
   GET_CUST_TRANSATION_TODAY_SUCCESS,
   GET_CUST_TRANSATION_YESTERDAY_SUCCESS,
   GET_CUST_TRANSATION_LONG_SUCCESS,
   ADD_CUST_TRANSATION_SUCCESS,
   ADD_CUST_TRANSATION_FAIL,
   RENDER_CUST_TRANSATION_TO_EDIT,
   GET_FILTED_CUST_TRANSATION_SUCCESS,
   GET_FILTED_CUST_TRANSATION_FAIL
} from '../../types';

const INITIAL_STATE = {
    custTransationList: [],
    custTransationList_today: [],
    custTransationList_yesterday: [],
    custTransationList_long: [],
    custTransation_to_edit: {
        id: '',
        name: '',
        desc: '',
        typeId: ''
    },
    custTransationFiltedList: [],
    bussinessAccount:{
        balance:0.0,
        transactions:[]
    },
    bussinessWallet:{
        balance:0.0,
        transactions:[]
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_TRANSATION_SUCCESS:
            return { ...state, custTransationList: action.payload , 
                bussinessAccount: action.payload};

        case GET_ALL_CUST_TRANSATION_FAIL:
            return { ...state };

        case GET_FILTED_CUST_TRANSATION_SUCCESS:
            return { ...state, custTransationFiltedList: action.payload };

        case GET_FILTED_CUST_TRANSATION_FAIL:
            return { ...state };

        case GET_CUST_TRANSATION_TODAY_SUCCESS:
            return { ...state, custTransationList_today: action.payload };

        case GET_CUST_TRANSATION_YESTERDAY_SUCCESS:
            return { ...state, custTransationList_yesterday: action.payload };

        case GET_CUST_TRANSATION_LONG_SUCCESS:
            return { ...state, custTransationList_long: action.payload };

        case ADD_CUST_TRANSATION_SUCCESS:
            return { ...state, openAddGlobalTransationModal: false };

        case ADD_CUST_TRANSATION_FAIL:
            return { ...state };

        case RENDER_CUST_TRANSATION_TO_EDIT:
            return { ...state, custTransation_to_edit: action.payload };
    
        default:
            return state;
    }
};









