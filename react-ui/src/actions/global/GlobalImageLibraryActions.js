import { 
   GET_ALL_GLOBAL_IMAGE_LIBRARY_SUCCESS,
   GET_ALL_GLOBAL_IMAGE_LIBRARY_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_IMAGE_LIBRARY_SUCCESS,
   EDIT_GLOBAL_IMAGE_LIBRARY_SUCCESS,
   RENDER_GLOBAL_IMAGE_LIBRARY_TO_EDIT,
   GET_ALL_GLOBAL_IMAGE_LIBRARY_PAGE_SUCCESS,
   GET_ALL_GLOBAL_IMAGE_LIBRARY_PAGE_FAIL
} from '../../types';
import GlobalImageLibraryService from '../../services/GlobalImageLibraryService';

// Action creator for getting all items --<
export const getGlobalImageLibraryList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalImageLibraryService.getAll();
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_IMAGE_LIBRARY_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_IMAGE_LIBRARY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for getting all items --<
export const getGlobalImageLibraryPageList = (pageNumber,pageCount, filters) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalImageLibraryService.getPageList(pageNumber,pageCount, filters);
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_IMAGE_LIBRARY_PAGE_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_IMAGE_LIBRARY_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalImageLibrary = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalImageLibraryService.add(data);

        if (globalPromptTag) {
            dispatch({ type: ADD_GLOBAL_IMAGE_LIBRARY_SUCCESS });
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

export const renderGlobalImageLibraryToEdit = item => {
    return {
        type: RENDER_GLOBAL_IMAGE_LIBRARY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalImageLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalImageLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_IMAGE_LIBRARY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalImageLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalImageLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_IMAGE_LIBRARY_SUCCESS });
            
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
export const deleteGlobalImageLibrary = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const data = await GlobalImageLibraryService.delete(id);

        if (refresh) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};