import { 
   GET_ALL_GLOBAL_MINDSET_LIBRARY_SUCCESS,
   GET_ALL_GLOBAL_MINDSET_LIBRARY_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_MINDSET_LIBRARY_SUCCESS,
   EDIT_GLOBAL_MINDSET_LIBRARY_SUCCESS,
   RENDER_GLOBAL_MINDSET_LIBRARY_TO_EDIT,
   GET_ALL_GLOBAL_MINDSET_LIBRARY_PAGE_SUCCESS,
   GET_ALL_GLOBAL_MINDSET_LIBRARY_PAGE_FAIL
} from '../../types';
import GlobalMindSetLibraryService from '../../services/GlobalMindSetLibraryService';

// Action creator for getting all items --<
export const getGlobalMindSetLibraryList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalMindSetLibraryService.getAll();
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_MINDSET_LIBRARY_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_MINDSET_LIBRARY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalMindSetLibraryPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalMindSetLibraryService.getPageList(pageNumber, pageCount);
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_MINDSET_LIBRARY_PAGE_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_MINDSET_LIBRARY_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalMindSetLibrary = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalMindSetLibraryService.add(data);

        if (globalPromptTag) {
            dispatch({ type: ADD_GLOBAL_MINDSET_LIBRARY_SUCCESS });
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

export const renderGlobalMindSetLibraryToEdit = item => {
    return {
        type: RENDER_GLOBAL_MINDSET_LIBRARY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalMindSetLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalMindSetLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_MINDSET_LIBRARY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalMindSetLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalMindSetLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_MINDSET_LIBRARY_SUCCESS });
            
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
export const deleteGlobalMindSetLibrary = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalMindSetLibraryService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};