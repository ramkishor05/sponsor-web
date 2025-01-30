import { 
    GET_ALL_VENDOR_LIST_SUCCESS,GET_VENDOR_SUCCESS, VENDOR_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_TO_EDIT, VENDOR_EDIT_SUCCESS, GET_FINISHING_VENDOR_LIST
} from '../../types';

import CustVendorService from '../../services/CustVendorService';

// Action creator for getting all vendors --<
export const getCustVendorList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const vendors = await CustVendorService.getAll();

        if (vendors) {
            dispatch({ type: GET_ALL_VENDOR_LIST_SUCCESS, payload: vendors });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};
