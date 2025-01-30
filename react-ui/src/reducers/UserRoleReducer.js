import {
    GET_USER_ROLES_SUCCESS, 
    USER_ROLE_UPDATE_PROFILE_SUCCESS,
    USER_ROLE_UPDATE_PROFILE_FAIL,
    GET_USER_ROLE_PROFILE_SUCCESS,
    GET_USER_ROLE_PROFILE_FAIL,
    USER_ROLE_UPDATE_SUCCESS, USER_ROLE_UPDATE_FAIL,
    OPEN_ADD_USER_ROLE_MODAL, OPEN_EDIT_USER_ROLE_MODAL, OPEN_DELETE_USER_ROLE_MODAL,ALREADY_EXISTS_SUCCESS
} from '../types';

const INITIAL_STATE = {
    userRoleList: [],
    userRole : {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case GET_USER_ROLES_SUCCESS:
            return { ...state, userRoleList: action.payload };

        case USER_ROLE_UPDATE_SUCCESS:
            return { ...state, userRole: action.payload };

        case USER_ROLE_UPDATE_FAIL:
            return { ...state };

        case GET_USER_ROLE_PROFILE_FAIL:
                    return { ...state };
        case OPEN_ADD_USER_ROLE_MODAL:
            return { ...state, open_add_user_modal: action.payload };

        case OPEN_EDIT_USER_ROLE_MODAL:
            return { ...state, open_edit_user_modal: action.payload };

        case OPEN_DELETE_USER_ROLE_MODAL:
            return { ...state, open_delete_user_modal: action.payload };

        default:
            return state;
    }
};

