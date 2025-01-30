import { REMOVE_SEARCH_VALUE, ADD_SEARCH_VALUE} from '../types';

const INITIAL_STATE = {
    searchValue:''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_SEARCH_VALUE:
            return { ...state, searchValue: action.payload };

        case REMOVE_SEARCH_VALUE:
            return { ...state, searchValue: null};

        default:
            return state;
    }
    
};

