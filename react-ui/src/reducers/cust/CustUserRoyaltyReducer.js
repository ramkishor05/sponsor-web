import { 
    GET_ALL_CUST_USER_ROYALTY_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    userRoyaltyPage:{
        "totalCount": 0,
        "pageCount": 0,
        "totalPages": 0,
        "elements":[]
    }
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_CUST_USER_ROYALTY_SUCCESS:
            return { ...state, userRoyaltyPage: action.payload};

        default:
            return state;
    }
};









