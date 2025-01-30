import { 
   GET_ALL_GLOBAL_TAG_GROUP_SUCCESS,
   GET_ALL_GLOBAL_TAG_GROUP_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_TAG_GROUP_SUCCESS,
   EDIT_GLOBAL_TAG_GROUP_SUCCESS,
   RENDER_GLOBAL_TAG_GROUP_TO_EDIT,
   GET_ALL_GLOBAL_TAG_GROUP_PAGE_SUCCESS,
   GET_ALL_GLOBAL_TAG_GROUP_PAGE_FAIL
} from '../../types';
import GlobalTagGroupService from '../../services/GlobalTagGroupService';

// Action creator for getting all items --<
export const getGlobalTagGroupList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagGroupList = await GlobalTagGroupService.getAll();
        if (globalTagGroupList) {
            dispatch({ type: GET_ALL_GLOBAL_TAG_GROUP_SUCCESS, payload: globalTagGroupList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_TAG_GROUP_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

export const getGlobalTagGroupPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagGroupList = await GlobalTagGroupService.getPageList(pageNumber, pageCount);
        if (globalTagGroupList) {
            dispatch({ type: GET_ALL_GLOBAL_TAG_GROUP_PAGE_SUCCESS, payload: globalTagGroupList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_TAG_GROUP_PAGE_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};



// Action creator for adding item --<
export const addGlobalTagGroup = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagGroup = await GlobalTagGroupService.add(data);

        if (globalTagGroup) {
            dispatch({ type: ADD_GLOBAL_TAG_GROUP_SUCCESS });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        
        clear && clear();

        errorNotification && errorNotification();
        dispatch({ type: REMOVE_LOADER });

    }
};

export const renderGlobalTagGroupToEdit = item => {
    return {
        type: RENDER_GLOBAL_TAG_GROUP_TO_EDIT,
        payload: item,
    };
};

export const editGlobalTagGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagGroup = await GlobalTagGroupService.update(id, data);

        if (globalTagGroup) {
            dispatch({ type: EDIT_GLOBAL_TAG_GROUP_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalTagGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {

        dispatch({ type: SHOW_LOADER });

        const globalTagGroup = await GlobalTagGroupService.update(id, data);

        if (globalTagGroup) {
            dispatch({ type: EDIT_GLOBAL_TAG_GROUP_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

// Action creator for deleting football transaction from the system.
export const deleteGlobalTagGroup = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category_group = await GlobalTagGroupService.delete(id);

        if (deleted_global_category_group) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};