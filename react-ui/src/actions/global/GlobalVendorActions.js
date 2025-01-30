import { 
    GLOBAL_GET_VENDOR_LIST_SUCCESS,
    GLOBAL_GET_VENDOR_SUCCESS, 
    GLOBAL_ADD_VENDOR_SUCCESS,
    GLOBAL_EDIT_VENDOR_SUCCESS,
    SHOW_LOADER, 
    REMOVE_LOADER
} from '../../types';

import GlobalVendorService from '../../services/GlobalVendorService';

// Action creator for getting all vendors --<
export const getGlobalVendorList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const vendors = await GlobalVendorService.getAll();

        if (vendors) {
            dispatch({ type: GLOBAL_GET_VENDOR_LIST_SUCCESS, payload: vendors });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for getting all vendors --<
export const getGlobalVendor = (id) => async dispatch => {
      try {
        dispatch({ type: SHOW_LOADER });
        const vendor = await GlobalVendorService.get(id);

        if (vendor) {
            dispatch({ type: GLOBAL_GET_VENDOR_SUCCESS, payload: vendor });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for getting all vendors --<
export const deleteGlobalVendor = (id) => async dispatch => {
    try {
      dispatch({ type: SHOW_LOADER });
      const vendor = await GlobalVendorService.delete(id);

      if (vendor) {
          dispatch({ type: GLOBAL_GET_VENDOR_SUCCESS, payload: vendor });
      }
      dispatch({ type: REMOVE_LOADER });
  } catch(error) {
      dispatch({ type: REMOVE_LOADER });
      console.log(error);
  }
};

// Action creator for adding vendor --<
export const addGlobalVendor = (data, refreshGlobalVendorListList, clear, successNotification, errorNotification) => async dispatch => {
       try {

        dispatch({ type: SHOW_LOADER });

        const vendor = await GlobalVendorService.add(data);

        if (vendor) {
            dispatch({ type: GLOBAL_ADD_VENDOR_SUCCESS });
        }

        refreshGlobalVendorListList && refreshGlobalVendorListList();

        clear && clear();

        successNotification && successNotification();
        
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const editGlobalVendor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });

        const vendor = await GlobalVendorService.update(id, data);

        if (vendor) {
            dispatch({ type: GLOBAL_EDIT_VENDOR_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        dispatch({ type: REMOVE_LOADER });
            
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateGlobalVendor = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendor = await GlobalVendorService.update(id, data);

        if (vendor) {
            dispatch({ type: GLOBAL_EDIT_VENDOR_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};
