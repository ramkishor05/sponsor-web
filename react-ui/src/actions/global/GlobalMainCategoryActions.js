import { 
   GET_ALL_GLOBAL_CATEGERY_GROUP_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_GROUP_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_CATEGERY_GROUP_SUCCESS,
   EDIT_GLOBAL_CATEGERY_GROUP_SUCCESS,
   RENDER_GLOBAL_CATEGERY_GROUP_TO_EDIT,
   GET_ALL_GLOBAL_CATEGERY_GROUP_PAGE_SUCCESS,
   GET_ALL_GLOBAL_CATEGERY_GROUP_PAGE_FAIL
} from '../../types';
import GlobalMainCategoryService from '../../services/GlobalMainCategoryService';

// Action creator for getting all items --<
export const getGlobalCategoryGroupList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroupList = await GlobalMainCategoryService.getAll();
        if (globalCategoryGroupList) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_SUCCESS, payload: globalCategoryGroupList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for getting all items --<
export const getGlobalCategoryGroupPageList = (pageNumber,pageCount, filters) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroupList = await GlobalMainCategoryService.getPageList(pageNumber,pageCount, filters);
        if (globalCategoryGroupList) {
            dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_PAGE_SUCCESS, payload: globalCategoryGroupList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_CATEGERY_GROUP_PAGE_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};



// Action creator for adding item --<
export const addGlobalCategoryGroup = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroup = await GlobalMainCategoryService.add(data);

        if (globalCategoryGroup) {
            dispatch({ type: ADD_GLOBAL_CATEGERY_GROUP_SUCCESS });
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

export const renderGlobalCategoryGroupToEdit = item => {
    return {
        type: RENDER_GLOBAL_CATEGERY_GROUP_TO_EDIT,
        payload: item,
    };
};

export const editGlobalCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroup = await GlobalMainCategoryService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_GROUP_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalCategoryGroup = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {

        dispatch({ type: SHOW_LOADER });

        const globalCategoryGroup = await GlobalMainCategoryService.update(id, data);

        if (globalCategoryGroup) {
            dispatch({ type: EDIT_GLOBAL_CATEGERY_GROUP_SUCCESS });
            
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
export const deleteGlobalCategoryGroup = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category_group = await GlobalMainCategoryService.delete(id);

        if (deleted_global_category_group) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};