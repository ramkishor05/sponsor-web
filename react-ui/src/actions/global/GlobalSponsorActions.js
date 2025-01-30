import { 
    GET_GLOBAL_SPONSOR_TREE_SUCCESS,
    GET_GLOBAL_SPONSOR_TREE_FAIL,
   GET_ALL_GLOBAL_SPONSOR_PAGE_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_PAGE_FAIL,
   GET_ALL_GLOBAL_SPONSOR_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_SPONSOR_SUCCESS,
   EDIT_GLOBAL_SPONSOR_SUCCESS,
   RENDER_GLOBAL_SPONSOR_TO_EDIT,
   GET_GLOBAL_SPONSOR_ACCOUNT_SUCCESS,
   GET_GLOBAL_SPONSOR_ACCOUNT_FAIL
} from '../../types';
import GlobalSponsorLibararyService from '../../services/GlobalSponsorLibararyService';

// Action creator for getting all items --<
export const getGlobalSponsorList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsorList = await GlobalSponsorLibararyService.getAll();
        if (globalSponsorList) {
            dispatch({ type: GET_ALL_GLOBAL_SPONSOR_SUCCESS, payload: globalSponsorList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_SPONSOR_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalSponsorPageList = (pageNumber, pageCount, sponsorId) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsorList = await GlobalSponsorLibararyService.getPageList(pageNumber, pageCount, sponsorId);
        if (globalSponsorList) {
            dispatch({ type: GET_ALL_GLOBAL_SPONSOR_PAGE_SUCCESS, payload: globalSponsorList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_SPONSOR_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalSponsorAccount = (sponsorId, callBack) => async dispatch => {
    try {
        //debugger;
        dispatch({ type: SHOW_LOADER });
        const response = await GlobalSponsorLibararyService.account(sponsorId);
        if (response) {
            dispatch({ type: GET_GLOBAL_SPONSOR_ACCOUNT_SUCCESS, payload: response.data });
            callBack && callBack(response.data);
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        
        dispatch({ type: GET_GLOBAL_SPONSOR_ACCOUNT_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};


export const getGlobalSponsorTree = (sponsorId) => async dispatch => {
    try {
        //debugger;
        dispatch({ type: SHOW_LOADER });
        const response = await GlobalSponsorLibararyService.tree(sponsorId);
        if (response) {
            dispatch({ type: GET_GLOBAL_SPONSOR_TREE_SUCCESS, payload: response.data });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        
        dispatch({ type: GET_GLOBAL_SPONSOR_TREE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

export const changeSponsorStatus = (sponsorId, status, callback) => async dispatch => {
    try {
        //debugger;
        dispatch({ type: SHOW_LOADER });
        const response = await GlobalSponsorLibararyService.changeStatus(sponsorId, status);
        if (response) {
            callback && callback();
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        
        dispatch({ type: GET_GLOBAL_SPONSOR_TREE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalSponsor = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsor = await GlobalSponsorLibararyService.add(data);

        if (globalSponsor) {
            dispatch({ type: ADD_GLOBAL_SPONSOR_SUCCESS });
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

export const renderGlobalSponsorToEdit = item => {
    return {
        type: RENDER_GLOBAL_SPONSOR_TO_EDIT,
        payload: item,
    };
};

export const editGlobalSponsor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsor = await GlobalSponsorLibararyService.update(id, data);

        if (globalSponsor) {
            dispatch({ type: EDIT_GLOBAL_SPONSOR_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalSponsor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsor = await GlobalSponsorLibararyService.update(id, data);

        if (globalSponsor) {
            dispatch({ type: EDIT_GLOBAL_SPONSOR_SUCCESS });
            
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
export const deleteGlobalSponsor = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalSponsorLibararyService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};