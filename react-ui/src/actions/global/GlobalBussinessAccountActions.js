import GlobalBussinessAccountService from "../../services/GlobalBussinessAccountService";
import { REMOVE_LOADER, SHOW_LOADER , GET_GLOBAL_BUSSINESS_ACCOUNT_SUCCESS, GET_GLOBAL_BUSSINESS_ACCOUNT_FAIL} from "../../types";


// Action creator for getting all items --<
export const getGlobalBussinessAccount = () => async dispatch => {

    try {
        dispatch({ type: SHOW_LOADER });

        const bussinessAccount = await GlobalBussinessAccountService.find();

        if (bussinessAccount) {
            dispatch({ type: GET_GLOBAL_BUSSINESS_ACCOUNT_SUCCESS, payload: bussinessAccount.data });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        dispatch({ type: GET_GLOBAL_BUSSINESS_ACCOUNT_FAIL });
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};