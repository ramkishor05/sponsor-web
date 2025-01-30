import { 
   GET_ALL_GLOBAL_TAG_ITEM_SUCCESS,
   GET_ALL_GLOBAL_TAG_ITEM_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_TAG_ITEM_SUCCESS,
   EDIT_GLOBAL_TAG_ITEM_SUCCESS,
   RENDER_GLOBAL_TAG_ITEM_TO_EDIT,
   GET_ALL_GLOBAL_TAG_ITEM_PAGE_SUCCESS,
   GET_ALL_GLOBAL_TAG_ITEM_PAGE_FAIL
} from '../../types';
import GlobalTagLibararyService from '../../services/GlobalTagLibararyService';

// Action creator for getting all items --<
export const getGlobalTagItemList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItemList = await GlobalTagLibararyService.getAll();
        if (globalTagItemList) {
            dispatch({ type: GET_ALL_GLOBAL_TAG_ITEM_SUCCESS, payload: globalTagItemList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_TAG_ITEM_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};



export const getGlobalTagItemPageList = (pageNumber, pageCount, filters) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItemList = await GlobalTagLibararyService.getPageList(pageNumber, pageCount, filters);
        if (globalTagItemList) {
            dispatch({ type: GET_ALL_GLOBAL_TAG_ITEM_PAGE_SUCCESS, payload: globalTagItemList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_TAG_ITEM_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalTagItem = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItem = await GlobalTagLibararyService.add(data);

        if (globalTagItem) {
            dispatch({ type: ADD_GLOBAL_TAG_ITEM_SUCCESS });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderGlobalTagItemToEdit = item => {
    return {
        type: RENDER_GLOBAL_TAG_ITEM_TO_EDIT,
        payload: item,
    };
};

export const editGlobalTagItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItem = await GlobalTagLibararyService.update(id, data);

        if (globalTagItem) {
            dispatch({ type: EDIT_GLOBAL_TAG_ITEM_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalTagItem = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalTagItem = await GlobalTagLibararyService.update(id, data);

        if (globalTagItem) {
            dispatch({ type: EDIT_GLOBAL_TAG_ITEM_SUCCESS });
            
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
export const deleteGlobalTagItem = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalTagLibararyService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};