import GlobalUserFinancialAccountService from "../../services/GlobalUserFinancialAccountService";
import { REMOVE_LOADER, SHOW_LOADER , GET_CUST_USER_ACCOUNT_SUCCESS, GET_CUST_USER_ACCOUNT_FAIL} from "../../types";


// Action creator for getting all items --<
export const getUserFinancialAccount = (sponsorId) => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const userAccount = await GlobalUserFinancialAccountService.find(sponsorId);

        if (userAccount) {
            dispatch({ type: GET_CUST_USER_ACCOUNT_SUCCESS, payload: userAccount.data });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_CUST_USER_ACCOUNT_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

