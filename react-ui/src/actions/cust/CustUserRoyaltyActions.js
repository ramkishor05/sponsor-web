import CustUserRoyaltyService from "../../services/CustUserRoyaltyService";
import { REMOVE_LOADER, SHOW_LOADER , GET_ALL_CUST_USER_ROYALTY_SUCCESS, GET_ALL_CUST_USER_ROYALTY_FAIL} from "../../types";


// Action creator for getting all items --<
export const getCustUserRoyaltyPageList = (pageCount, pageSize) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });
        const userRoyaltyPageList = await CustUserRoyaltyService.getPageList(pageCount, pageSize);
        if (userRoyaltyPageList) {
            dispatch({ type: GET_ALL_CUST_USER_ROYALTY_SUCCESS, payload: userRoyaltyPageList });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_ALL_CUST_USER_ROYALTY_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};