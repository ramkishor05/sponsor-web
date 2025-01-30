import { 
    GET_CUST_USER_ACCOUNT_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    userAccount:{
        balance:0.0,
        transactions:[]
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CUST_USER_ACCOUNT_SUCCESS:
            return { ...state, userAccount: action.payload};
        default:
            return state;
    }
};









