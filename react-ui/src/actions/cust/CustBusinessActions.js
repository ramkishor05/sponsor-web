import { 
    GET_ALL_VENDOR_BUSINESS_LIST_SUCCESS, VENDOR_BUSINESS_ADD_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER,
    VENDOR_BUSINESS_TO_EDIT, VENDOR_BUSINESS_EDIT_SUCCESS, GET_FINISHING_VENDOR_BUSINESS_LIST, SET_BUSSINESS_ACCOUNT
} from '../../types';
import CustBusinessService from '../../services/CustBusinessService';

import CustAppService from '../../services/CustAppService';
import config from '../../config';

const ITEM_APP_URL=config.ITEM_SERVER_HOST+'/api/cust/app';

const CRM_APP_URL= config.CRM_SERVER_HOST+'/api/cust/app';

// Action creator for getting all CustBusinessServices --<
export const getCustBusinessList = () => async dispatch => {
    
    try {
        dispatch({ type: SHOW_LOADER });
        const vendorBusinesssList = await CustBusinessService.getAll();

        if (vendorBusinesssList) {
            dispatch({ type: GET_ALL_VENDOR_BUSINESS_LIST_SUCCESS, payload: vendorBusinesssList });
            if(vendorBusinesssList.length==1){
                dispatch({ type: SET_BUSSINESS_ACCOUNT, payload: vendorBusinesssList[0].id });
            }
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

// Action creator for adding vendorBusiness --<
export const addCustBusiness = (data, refreshCustBusinessList, clear, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });
        const vendorBusiness = await CustBusinessService.add(data);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_ADD_SUCCESS });
            const data={
                businessId: vendorBusiness.id,
                appId: 1
            }
            CustAppService.add(ITEM_APP_URL,data);
            CustAppService.add(CRM_APP_URL,data);
        }

        refreshCustBusinessList && refreshCustBusinessList();

        clear && clear();

        successNotification && successNotification();
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToCustBusinessEdit = vendorBusiness => {
    return {
        type: VENDOR_BUSINESS_TO_EDIT,
        payload: vendorBusiness,
    };
};

export const editCustBusiness = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
  
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await CustBusinessService.update(id, data);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_EDIT_SUCCESS });
            const data={
                businessId: vendorBusiness.id,
                appId: 1
            }
           
            CustAppService.add(ITEM_APP_URL,data);
            CustAppService.add(CRM_APP_URL,data);
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
            
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
    

};

export const deleteCustBusiness = (id, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
  
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await CustBusinessService.delete(id);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const updateCustBusiness = (id, data, clearAndRefresh, successNotification, errorNotification) => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await CustBusinessService.update(id, data);

        if (vendorBusiness) {
            dispatch({ type: VENDOR_BUSINESS_EDIT_SUCCESS });
            
            successNotification && successNotification();

            clearAndRefresh && clearAndRefresh();
        }
        
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
        errorNotification && errorNotification();
    }
};

export const getFinishingCustBusinessList = minimum => async dispatch => {
   
    try {
        dispatch({ type: SHOW_LOADER });

        const vendorBusiness = await CustBusinessService.find(minimum);

        if (vendorBusiness) {
            dispatch({ type: GET_FINISHING_VENDOR_BUSINESS_LIST, payload: vendorBusiness });
        }
        dispatch({ type: REMOVE_LOADER });
    } catch(error) {
        dispatch({ type: REMOVE_LOADER });
    }
}; 
