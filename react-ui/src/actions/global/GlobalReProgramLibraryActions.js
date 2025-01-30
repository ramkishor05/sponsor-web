import { 
   GET_ALL_GLOBAL_REPROGRAM_LIBRARY_SUCCESS,
   GET_ALL_GLOBAL_REPROGRAM_LIBRARY_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_REPROGRAM_LIBRARY_SUCCESS,
   EDIT_GLOBAL_REPROGRAM_LIBRARY_SUCCESS,
   RENDER_GLOBAL_REPROGRAM_LIBRARY_TO_EDIT,
   GET_ALL_GLOBAL_REPROGRAM_LIBRARY_PAGE_SUCCESS,
   GET_ALL_GLOBAL_REPROGRAM_LIBRARY_PAGE_FAIL
} from '../../types';
import GlobalReProgramLibraryService from '../../services/GlobalReProgramLibraryService';

// Action creator for getting all items --<
export const getGlobalReProgramLibraryList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalReProgramLibraryService.getAll();
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_REPROGRAM_LIBRARY_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_REPROGRAM_LIBRARY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalReProgramLibraryPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalReProgramLibraryService.getPageList(pageNumber, pageCount);
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_REPROGRAM_LIBRARY_PAGE_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_REPROGRAM_LIBRARY_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalReProgramLibrary = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalReProgramLibraryService.add(data);

        if (globalPromptTag) {
            dispatch({ type: ADD_GLOBAL_REPROGRAM_LIBRARY_SUCCESS });
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

export const renderGlobalReProgramLibraryToEdit = item => {
    return {
        type: RENDER_GLOBAL_REPROGRAM_LIBRARY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalReProgramLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalReProgramLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_REPROGRAM_LIBRARY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalReProgramLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalReProgramLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_REPROGRAM_LIBRARY_SUCCESS });
            
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
export const deleteGlobalReProgramLibrary = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalReProgramLibraryService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};