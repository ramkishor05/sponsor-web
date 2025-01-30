import {
    USERNAME_CHANGED, PASSWORD_CHANGED,
    GET_USERS_SUCCESS, 
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    ALREADY_EXISTS_SUCCESS,
    GET_USER_ROLE_MENUITEAMS,
    GET_USER_SUCCESS,
    GET_USER_FAIL
} from '../types';

const INITIAL_STATE = {
    users: [],
    username : '',
    password: '',
    userDetail: {

    },
    exists: false,
    open_add_user_modal: false,
    open_edit_user_modal: false,
    open_delete_user_modal: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ALREADY_EXISTS_SUCCESS:
                return { ...state, 'exists': action.payload };
                
        case USERNAME_CHANGED:
                return { ...state, 'username': action.payload };

        case PASSWORD_CHANGED:
            return { ...state, 'password' : action.payload };

        case GET_USER_SUCCESS:
            return { ...state, userDetail: action.payload };

        case GET_USER_FAIL:
                return { ...state, userDetail: action.payload};

        case GET_USERS_SUCCESS:
            return { ...state, users: action.payload };

        case USER_UPDATE_SUCCESS:
            return { ...state, userDetail: action.payload };

        case USER_UPDATE_FAIL:
            return { ...state };

        case USER_UPDATE_PROFILE_SUCCESS:
                return {
                     ...state, 
                    userDetail : {
                        ...state.userDetail,
                        userProfile: action.payload
                    } 
                };
    
        case USER_UPDATE_PROFILE_FAIL:
                return { ...state };
        case GET_USER_PROFILE_SUCCESS:
            return {
                    ...state, 
                userDetail : {
                    ...state.userDetail,
                    userProfile: action.payload
                } 
            };
        
        case GET_USER_PROFILE_FAIL:
            return { ...state };
        
        default:
            return state;
    }
};

