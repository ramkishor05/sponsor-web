import {
    GET_MENU_ITEM_LIST_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    menuItems: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_MENU_ITEM_LIST_SUCCESS:
            return { ...state, menuItems: action.payload };
        default:
            return state;
    }
};

