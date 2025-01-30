import { 
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_FAIL,
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS,
   GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_FAIL,
   SHOW_LOADER,
   REMOVE_LOADER,
   ADD_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS,
   EDIT_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS
} from '../../types';
import GlobalSponsorBoostTransactionLibararyService from '../../services/GlobalSponsorBoostTransactionLibararyService';

// Action creator for getting all items --<
export const getGlobalSponsorBoostTransactionList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsorBoostTransactionList = await GlobalSponsorBoostTransactionLibararyService.getAll();
        if (globalSponsorBoostTransactionList) {
            dispatch({ type: GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS, payload: globalSponsorBoostTransactionList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_FAIL });
        dispatch({ type: REMOVE_LOADER });
        //console.log(error);
    }
};

export const getGlobalSponsorBoostTransactionPageList = (pageNumber, pageCount) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsorBoostTransactionList = await GlobalSponsorBoostTransactionLibararyService.getPageList(pageNumber, pageCount);
        if (globalSponsorBoostTransactionList) {
            dispatch({ type: GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_SUCCESS, payload: globalSponsorBoostTransactionList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_GLOBAL_SPONSOR_BOOST_TRANSACTION_PAGE_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding item --<
export const addGlobalSponsorBoostTransaction = (data, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsorBoostTransaction = await GlobalSponsorBoostTransactionLibararyService.add(data);

        if (globalSponsorBoostTransaction) {
            dispatch({ type: ADD_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS });
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

export const editGlobalSponsorBoostTransaction = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsorBoostTransaction = await GlobalSponsorBoostTransactionLibararyService.update(id, data);

        if (globalSponsorBoostTransaction) {
            dispatch({ type: EDIT_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalSponsorBoostTransaction = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const globalSponsorBoostTransaction = await GlobalSponsorBoostTransactionLibararyService.update(id, data);

        if (globalSponsorBoostTransaction) {
            dispatch({ type: EDIT_GLOBAL_SPONSOR_BOOST_TRANSACTION_SUCCESS });
            
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
export const deleteGlobalSponsorBoostTransaction = (id, refresh) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const deleted_global_category = await GlobalSponsorBoostTransactionLibararyService.delete(id);

        if (deleted_global_category) {
            refresh && refresh();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
    }
};