import { 
   GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS,
   GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS,
   EDIT_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS,
   RENDER_GLOBAL_AFFIRMATION_LIBRARY_TO_EDIT,
   GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_PAGE_SUCCESS,
   GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_PAGE_FAIL
} from '../../types';
import GlobalAffirmationLibraryService from '../../services/GlobalAffirmationLibraryService';

// Action creator for getting all items --<
export const getGlobalAffirmationLibraryList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalAffirmationLibraryService.getAll();
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalAffirmationLibraryPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTagList = await GlobalAffirmationLibraryService.getPageList(pageNumber, pageCount);
        if (globalPromptTagList) {
            dispatch({ type: GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_PAGE_SUCCESS, payload: globalPromptTagList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_AFFIRMATION_LIBRARY_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalAffirmationLibrary = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalAffirmationLibraryService.add(data);

        if (globalPromptTag) {
            dispatch({ type: ADD_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS });
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

export const renderGlobalAffirmationLibraryToEdit = item => {
    return {
        type: RENDER_GLOBAL_AFFIRMATION_LIBRARY_TO_EDIT,
        payload: item,
    };
};

export const editGlobalAffirmationLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalAffirmationLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalAffirmationLibrary = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptTag = await GlobalAffirmationLibraryService.update(id, data);

        if (globalPromptTag) {
            dispatch({ type: EDIT_GLOBAL_AFFIRMATION_LIBRARY_SUCCESS });
            
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
export const deleteGlobalAffirmationLibrary = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalAffirmationLibraryService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};