import { 
   GET_ALL_GLOBAL_PROMPT_SUCCESS,
   GET_ALL_GLOBAL_PROMPT_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_PROMPT_SUCCESS,
   EDIT_GLOBAL_PROMPT_SUCCESS,
   RENDER_GLOBAL_PROMPT_TO_EDIT
} from '../../types';
import GlobalPrompLibararyService from '../../services/GlobalPrompLibararyService';
import { GET_ALL_GLOBAL_PROMPT_PAGE_FAIL, GET_ALL_GLOBAL_PROMPT_PAGE_SUCCESS } from '../../types/Global/GlobalPromptTypes';

// Action creator for getting all items --<
export const getGlobalPromptList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptList = await GlobalPrompLibararyService.getAll();
        if (globalPromptList) {
            dispatch({ type: GET_ALL_GLOBAL_PROMPT_SUCCESS, payload: globalPromptList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_PROMPT_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalPromptPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalPromptList = await GlobalPrompLibararyService.getPageList(pageNumber, pageCount);
        if (globalPromptList) {
            dispatch({ type: GET_ALL_GLOBAL_PROMPT_PAGE_SUCCESS, payload: globalPromptList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_PROMPT_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalPrompt = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPrompt = await GlobalPrompLibararyService.add(data);

        if (globalPrompt) {
            dispatch({ type: ADD_GLOBAL_PROMPT_SUCCESS });
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

export const renderGlobalPromptToEdit = item => {
    return {
        type: RENDER_GLOBAL_PROMPT_TO_EDIT,
        payload: item,
    };
};

export const editGlobalPrompt = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPrompt = await GlobalPrompLibararyService.update(id, data);

        if (globalPrompt) {
            dispatch({ type: EDIT_GLOBAL_PROMPT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalPrompt = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalPrompt = await GlobalPrompLibararyService.update(id, data);

        if (globalPrompt) {
            dispatch({ type: EDIT_GLOBAL_PROMPT_SUCCESS });
            
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
export const deleteGlobalPrompt = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalPrompLibararyService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};