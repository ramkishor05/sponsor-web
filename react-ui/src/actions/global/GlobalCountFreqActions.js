import { 
   GET_ALL_GLOBAL_COUNT_FREQ_SUCCESS,
   GET_ALL_GLOBAL_COUNT_FREQ_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_COUNT_FREQ_SUCCESS,
   EDIT_GLOBAL_COUNT_FREQ_SUCCESS,
   RENDER_GLOBAL_COUNT_FREQ_TO_EDIT
} from '../../types';
import GlobalCountFreqService from '../../services/GlobalCountFreqService';

// Action creator for getting all items --<
export const getGlobalCountFreqList = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCountFreqList = await GlobalCountFreqService.getAll();

        if (globalCountFreqList) {
            dispatch({ type: GET_ALL_GLOBAL_COUNT_FREQ_SUCCESS, payload: globalCountFreqList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_COUNT_FREQ_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for adding item --<
export const addGlobalCountFreq = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCountFreq = await GlobalCountFreqService.add(data);

        if (globalCountFreq) {
            dispatch({ type: ADD_GLOBAL_COUNT_FREQ_SUCCESS });
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

export const renderGlobalCountFreqToEdit = item => {
    return {
        type: RENDER_GLOBAL_COUNT_FREQ_TO_EDIT,
        payload: item,
    };
};

export const editGlobalCountFreq = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCountFreq = await GlobalCountFreqService.update(id, data);

        if (globalCountFreq) {
            dispatch({ type: EDIT_GLOBAL_COUNT_FREQ_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalCountFreq = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalCountFreq = await GlobalCountFreqService.update(id, data);

        if (globalCountFreq) {
            dispatch({ type: EDIT_GLOBAL_COUNT_FREQ_SUCCESS });
            
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
export const deleteGlobalCountFreq = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_CountFreq = await GlobalCountFreqService.delete(id);

        if (deleted_global_CountFreq) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);

        dispatch({ type: REMOVE_LOADER });

    }
};