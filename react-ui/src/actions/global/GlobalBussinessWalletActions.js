import GlobalBussinessWalletService from "../../services/GlobalBussinessWalletService";
import { REMOVE_LOADER, SHOW_LOADER , GET_GLOBAL_BUSSINESS_WALLET_SUCCESS, GET_GLOBAL_BUSSINESS_WALLET_FAIL} from "../../types";


// Action creator for getting all items --<
export const getGlobalBussinessWallet = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const bussinessWallet = await GlobalBussinessWalletService.find();

        if (bussinessWallet) {
            dispatch({ type: GET_GLOBAL_BUSSINESS_WALLET_SUCCESS, payload: bussinessWallet.data });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_GLOBAL_BUSSINESS_WALLET_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};