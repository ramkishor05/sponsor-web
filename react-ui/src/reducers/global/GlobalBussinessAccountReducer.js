import { 
    GET_GLOBAL_BUSSINESS_ACCOUNT_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    bussinessAccount:{
        balance:0.0,
        transactions:[]
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_GLOBAL_BUSSINESS_ACCOUNT_SUCCESS:
            return { ...state, bussinessAccount: action.payload};
        default:
            return state;
    }
};









