import {
    GET_ROLE_MENU_GROUP_LIST_SUCCESS
} from '../../types';

const INITIAL_STATE = {
    roleMenuGroups: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ROLE_MENU_GROUP_LIST_SUCCESS:
            return { ...state, roleMenuGroups: action.payload };
        default:
            return state;
    }
};

