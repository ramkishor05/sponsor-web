import {
   SHOW_LOADER,
    REMOVE_LOADER, 
    GET_ROLE_MENU_GROUP_LIST_SUCCESS,
     GET_ROLE_MENU_GROUP_LIST_FAIL,
     ADD_ROLE_MENU_GROUP_SUCCESS,
     UPDATE_ROLE_MENU_GROUP_SUCCESS,
     DELETE_ROLE_MENU_GROUP_SUCCESS,
     GET_ROLE_MENU_GROUP_SUCCESS
} from '../../types';
import GlobalRoleMenuGroupService from '../../services/GlobalRoleMenuGroupService';


/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getRoleMenuGroupByRoleId = (roleId, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await GlobalRoleMenuGroupService.findByRoleId(roleId);
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_ROLE_MENU_GROUP_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_ROLE_MENU_GROUP_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};

/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getRoleMenuGroupList = (callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await GlobalRoleMenuGroupService.getAll();
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_ROLE_MENU_GROUP_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_ROLE_MENU_GROUP_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};


// Action creator for adding addMenuGroup --<
export const addRoleMenuGroup = (data, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await GlobalRoleMenuGroupService.add(data);

        if (menuGroup) {
            dispatch({ type: ADD_ROLE_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuGroup --<
export const editRoleMenuGroup = (id,data, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await GlobalRoleMenuGroupService.update(id, data);

        if (menuGroup) {
            dispatch({ type: UPDATE_ROLE_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuGroup --<
export const deleteRoleMenuGroup = (id, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await GlobalRoleMenuGroupService.delete(id);

        if (menuGroup) {
            dispatch({ type: DELETE_ROLE_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuGroup --<
export const getRoleMenuGroup = (id, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await GlobalRoleMenuGroupService.delete(id);

        if (menuGroup) {
            dispatch({ type: GET_ROLE_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};
