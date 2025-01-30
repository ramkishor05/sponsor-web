import {
    GET_CUST_ROLES_SUCCESS,
    GET_CUST_ROLES_FAIL,
    GET_CUST_ROLE_SUCCESS, 
    GET_CUST_ROLE_FAIL,
    DELETE_CUST_ROLE_SUCCESS,
    DELETE_CUST_ROLE_FAIL, 
    ADD_CUST_ROLE_SUCCESS, 
    ADD_CUST_ROLE_FAIL,
    UPDATE_CUST_ROLE_SUCCESS,
    UPDATE_CUST_ROLE_FAIL
} from '../../types';

const INITIAL_STATE = {
    custRoleList: [],
    custRole : {}
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case ADD_CUST_ROLE_SUCCESS:
            return { ...state, custRoleList: [...state.custRoleList, action.payload] };

        case ADD_CUST_ROLE_FAIL:
            return { ...state };
        
        case UPDATE_CUST_ROLE_SUCCESS:
            return { ...state, custRole: action.payload };

        case UPDATE_CUST_ROLE_FAIL:
            return { ...state };

        case GET_CUST_ROLE_SUCCESS:
            return { ...state, custRole: action.payload };

        case GET_CUST_ROLE_FAIL:
            return { ...state, custRole: {}};    
        
        case DELETE_CUST_ROLE_SUCCESS:
            return { ...state, custRole: action.payload };

        case DELETE_CUST_ROLE_FAIL:
            return { ...state, custRole: {}};   

        case GET_CUST_ROLES_SUCCESS:
            return { ...state, custRoleList: action.payload };

        case GET_CUST_ROLES_FAIL:
                return { ...state, custRoleList: []};

        default:
            return state;
    }
};

