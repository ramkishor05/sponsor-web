import {
   SHOW_LOADER, 
   REMOVE_LOADER, 
   GET_MENU_GROUP_LIST_SUCCESS, 
   GET_MENU_GROUP_LIST_FAIL,
   GET_USER_MENU_GROUP_LIST_SUCCESS,
   GET_USER_MENU_GROUP_LIST_FAIL,
   ADD_MENU_GROUP_SUCCESS,
   UPDATE_MENU_GROUP_SUCCESS,
   DELETE_MENU_GROUP_SUCCESS,
   GET_MENU_GROUP_SUCCESS,
   GET_USER_ROLE_MENUITEAMS
} from '../../types';
import MenuGroupService from '../../services/GlobalMenuGroupService';


/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getMenuGroupByRoleId = (roleId, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await MenuGroupService.findByRoleId(roleId);
        if (menuGroups) {
            if (callBack) {
                callBack(menuGroups);
            }
            dispatch({ type: GET_USER_MENU_GROUP_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_USER_MENU_GROUP_LIST_FAIL, payload: null });
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
export const getMenuGroupList = (callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await MenuGroupService.getAll();
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_MENU_GROUP_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_MENU_GROUP_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};


// Action creator for adding addMenuGroup --<
export const addMenuGroup = (data, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await MenuGroupService.add(data);

        if (menuGroup) {
            dispatch({ type: ADD_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuGroup --<
export const editMenuGroup = (id,data, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await MenuGroupService.update(id, data);

        if (menuGroup) {
            dispatch({ type: UPDATE_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuGroup --<
export const deleteMenuGroup = (id, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await MenuGroupService.delete(id);

        if (menuGroup) {
            dispatch({ type: DELETE_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addMenuGroup --<
export const getMenuGroup = (id, refreshMenuGroupList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroup = await MenuGroupService.delete(id);

        if (menuGroup) {
            dispatch({ type: GET_MENU_GROUP_SUCCESS });
        }
        refreshMenuGroupList && refreshMenuGroupList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

