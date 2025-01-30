import {
    GET_USER_MENU_GROUP_LIST_SUCCESS
} from '../types';

const INITIAL_STATE = {
    userMenuGroups: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_USER_MENU_GROUP_LIST_SUCCESS:
                return { ...state, userMenuGroups: action.payload };
        default:
            return state;
    }
};

