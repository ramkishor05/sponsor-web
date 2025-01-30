import { 
   GET_ALL_GLOBAL_COUNTRY_SUCCESS,
   GET_ALL_GLOBAL_COUNTRY_FAIL
} from '../../types';

const INITIAL_STATE = {
    globalCountryList: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_GLOBAL_COUNTRY_SUCCESS:
            return { ...state, globalCountryList: action.payload };

        case GET_ALL_GLOBAL_COUNTRY_FAIL:
            return { ...state };

        default:
            return state;
    }
};









