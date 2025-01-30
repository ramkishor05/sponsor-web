import {
    GET_MENU_GROUP_LIST_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    menuGroups: [],
    userMenuGroups: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_MENU_GROUP_LIST_SUCCESS:
            return { ...state, menuGroups: action.payload };
        default:
            return state;
    }
};

