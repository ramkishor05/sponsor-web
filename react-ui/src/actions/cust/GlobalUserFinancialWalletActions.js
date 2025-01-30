import GlobalUserFinancialWalletService from "../../services/GlobalUserFinancialWalletService";
import { REMOVE_LOADER, SHOW_LOADER , GET_CUST_USER_WALLET_SUCCESS, GET_CUST_USER_WALLET_FAIL} from "../../types";


// Action creator for getting all items --<
export const getUserFinancialWallet = (sponsorId) => async dispatch => {
    try {
         
        dispatch({ type: SHOW_LOADER });
        const userWallet = await GlobalUserFinancialWalletService.find(sponsorId);

        if (userWallet) {
            dispatch({ type: GET_CUST_USER_WALLET_SUCCESS, payload: userWallet.data });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: GET_CUST_USER_WALLET_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};