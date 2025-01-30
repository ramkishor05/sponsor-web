import { 
    GET_GLOBAL_BUSSINESS_WALLET_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    bussinessWallet:{
        balance:0.0,
        transactions:[]
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_GLOBAL_BUSSINESS_WALLET_SUCCESS:
            return { ...state, bussinessWallet: action.payload};

        default:
            return state;
    }
};









