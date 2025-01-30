import { 
    SHOW_LOADER, REMOVE_LOADER,
    USER_GET_VENDOR_LIST_SUCCESS,
    USER_GET_VENDOR_SUCCESS, 
    USER_UPDATE_VENDOR_SUCCESS
} from '../types';

import UserVendorService from '../services/UserVendorService';

// Action creator for getting all vendors --<
export const getUserVendorList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const vendors = await UserVendorService.getAll();

        if (vendors) {
            dispatch({ type: USER_GET_VENDOR_LIST_SUCCESS, payload: vendors });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for getting all vendors --<
export const getUserVendor = (id) => async dispatch => {
      try {
        dispatch({ type: SHOW_LOADER });
        const vendor = await UserVendorService.get(id);
        console.log("vendor=",vendor)
        if (vendor) {
            dispatch({ type: USER_GET_VENDOR_SUCCESS, payload: vendor });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};


export const updateUserVendor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendor = await UserVendorService.update(id, data);

        if (vendor) {
            dispatch({ type: USER_UPDATE_VENDOR_SUCCESS, payload: vendor });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};