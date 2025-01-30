import {
    GET_ROLE_MENU_ITEM_LIST_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    roleMenuItems: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ROLE_MENU_ITEM_LIST_SUCCESS:
            return { ...state, roleMenuItems: action.payload };
        default:
            return state;
    }
};

