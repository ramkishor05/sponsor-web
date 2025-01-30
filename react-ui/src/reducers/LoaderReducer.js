import { SHOW_LOADER, REMOVE_LOADER } from '../types';

const INITIAL_STATE = {
    show_loader: false,
    counter:0
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SHOW_LOADER:
            return { ...state, show_loader: state.counter>1, counter: state.counter+1 };

        case REMOVE_LOADER:
            return { ...state, show_loader: state.counter>1,  counter: state.counter-1};

        default:
            return state;
    }
    
};

