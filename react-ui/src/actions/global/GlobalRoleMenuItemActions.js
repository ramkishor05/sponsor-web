import {
   SHOW_LOADER, 
   REMOVE_LOADER, 
   GET_ROLE_MENU_ITEM_LIST_SUCCESS, 
   GET_ROLE_MENU_ITEM_LIST_FAIL,
   ADD_ROLE_MENU_ITEM_SUCCESS,
     UPDATE_ROLE_MENU_ITEM_SUCCESS,
     DELETE_ROLE_MENU_ITEM_SUCCESS,
     GET_ROLE_MENU_ITEM_SUCCESS
} from '../../types';
import RoleMenuItemService from '../../services/GlobalRoleMenuItemService';


/**
 * UserRole Action - For adding a new user in the system.
 *
 * @param {Object} roleId
 * @param {Function} callBack
 */
export const getRoleMenuItemByRoleId = (roleId, callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await RoleMenuItemService.findByRoleId(roleId);
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_ROLE_MENU_ITEM_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_ROLE_MENU_ITEM_LIST_FAIL, payload: null });
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
export const getRoleMenuItemList = (callBack) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const menuGroups = await RoleMenuItemService.getAll();
        if (menuGroups) {
            if (callBack) {
                callBack();
            }
            dispatch({ type: GET_ROLE_MENU_ITEM_LIST_SUCCESS, payload: menuGroups });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch (error) {
        dispatch({ type: GET_ROLE_MENU_ITEM_LIST_FAIL, payload: null });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};


// Action creator for adding addMenuItem --<
export const addRoleMenuItem = (data, refreshRoleMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const roleMenuItem = await RoleMenuItemService.add(data);

        if (roleMenuItem) {
            dispatch({ type: ADD_ROLE_MENU_ITEM_SUCCESS });
        }
        refreshRoleMenuItemList && refreshRoleMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addRoleMenuItem --<
export const editRoleMenuItem = (id, data, refreshRoleMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const roleMenuItem = await RoleMenuItemService.update(id, data);

        if (roleMenuItem) {
            dispatch({ type: UPDATE_ROLE_MENU_ITEM_SUCCESS });
        }
        refreshRoleMenuItemList && refreshRoleMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addRoleMenuItem --<
export const deleteRoleMenuItem = (id, refreshRoleMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const roleMenuItem = await RoleMenuItemService.delete(id);

        if (roleMenuItem) {
            dispatch({ type: DELETE_ROLE_MENU_ITEM_SUCCESS });
        }
        refreshRoleMenuItemList && refreshRoleMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for adding addRoleMenuItem --<
export const getRoleMenuItem = (id, refreshRoleMenuItemList) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const roleMenuItem = await RoleMenuItemService.delete(id);

        if (roleMenuItem) {
            dispatch({ type: GET_ROLE_MENU_ITEM_SUCCESS });
        }
        refreshRoleMenuItemList && refreshRoleMenuItemList();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
};

