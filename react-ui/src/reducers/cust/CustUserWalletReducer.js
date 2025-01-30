import { 
    GET_CUST_USER_WALLET_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    userWallet:{
        balance:0.0,
        transactions:[]
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CUST_USER_WALLET_SUCCESS:
            return { ...state, userWallet: action.payload};

        default:
            return state;
    }
};









