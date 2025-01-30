import { 
   GET_ALL_GLOBAL_COUNTRY_SUCCESS,
   GET_ALL_GLOBAL_COUNTRY_FAIL,
   ADD_GLOBAL_COUNTRY_SUCCESS,
   EDIT_GLOBAL_COUNTRY_SUCCESS,
   SHOW_LOADER,
   REMOVE_LOADER
} from '../../types';
import GlobalCountryService from '../../services/GlobalCountryService';

// Action creator for getting all items --<
export const getGlobalCountryList = () => async dispatch => {
    dispatch({ type: SHOW_LOADER });
    try {
        const globalCategoryList = await GlobalCountryService.getAll();
        if (globalCategoryList) {
            dispatch({ type: GET_ALL_GLOBAL_COUNTRY_SUCCESS, payload: globalCategoryList });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_COUNTRY_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalCountry = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_LOADER });

    try {
        const globalCategory = await GlobalCountryService.add(data);

        if (globalCategory) {
            dispatch({ type: ADD_GLOBAL_COUNTRY_SUCCESS });
            
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

export const editGlobalCountry = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_LOADER });

    try {
        const globalCategory = await GlobalCountryService.update(id, data);

        if (globalCategory) {
            dispatch({ type: EDIT_GLOBAL_COUNTRY_SUCCESS });
                        
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalCountry = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    

    try {
        dispatch({ type: SHOW_LOADER });
        const globalCategory = await GlobalCountryService.update(id, data);

        if (globalCategory) {
            dispatch({ type: EDIT_GLOBAL_COUNTRY_SUCCESS });
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
export const deleteGlobalCountry = (id, refresh) => async dispatch => {
    try {
        const deleted_global_category = await GlobalCountryService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};