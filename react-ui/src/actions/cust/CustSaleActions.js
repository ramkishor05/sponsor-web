import { 
    GET_ALL_SALES_SUCCESS,
    GET_SALES_TODAY_SUCCESS, GET_SALES_YESTERDAY_SUCCESS, GET_SALES_LONG_SUCCESS,
    SALE_TO_EDIT,
    SHOW_LOADER,
    REMOVE_LOADER,
    ADD_TO_CART,
    ADD_CHARGE_TO_CART,
    ADD_ITEM_TO_CART,
    ADD_PAYMENT_TO_CART,
    CART_TO_EDIT,
    SALE_CART_DETAIL,
    REMOVE_VENDOR_CUSTOMER_LOADER
} from '../../types';
import CustSaleService from '../../services/CustSaleService';
import CustCartSaleService from '../../services/CustCartSaleService';

// Action creator for getting all sales.
export const getCustSaleList = () => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let sales = await CustSaleService.getAll();

        if (sales) {
            dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for getting all sales.
export const getCustSaleListByCustomer = (customerId) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let sales = await CustSaleService.getAllByCustomer(customerId);

        if (sales) {
            dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};


// Action creator for getting all sales.
export const getCustSaleListByUser = (userId) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let sales = await CustSaleService.getAllByUser(userId);

        if (sales) {
            dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};


// Action creator for getting sales according to date.
export const getCustSaleListByDate = (from, to, day) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let sales = await CustSaleService.getByDate(from, to);

        if (sales) {
            if (day === 'today') {
                dispatch({ type: GET_SALES_TODAY_SUCCESS, payload: sales });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_SALES_YESTERDAY_SUCCESS, payload: sales });
            } else if (day === 'long') {
                dispatch({ type: GET_SALES_LONG_SUCCESS, payload: sales });
            } else {
                dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
            }
        }
        dispatch({ type: REMOVE_LOADER });

    } catch(error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for adding sales.
export const addCustSale = (data, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let sale = await CustSaleService.add(data);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();
            
            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};

// Action creator for rendering a specific sale to edit.
export const renderSaleToEdit = payload => {
    return {
        type: SALE_TO_EDIT,
        payload,
    };
};

// Action creator for rendering a specific sale to edit.
export const addItemToCart = payload => {
    return {
        type: ADD_ITEM_TO_CART,
        payload,
    };
};

export const addChargeToCart = payload => {
    return {
        type: ADD_CHARGE_TO_CART,
        payload,
    };
};

export const editCart = cartDetial => async dispatch =>{
    dispatch( {
        type: CART_TO_EDIT,
        payload: cartDetial
    });

    dispatch({ type: SHOW_LOADER });
    const updateCartDetial = await CustCartSaleService.update(cartDetial);

    console.log("updateCartDetial=", updateCartDetial)

    dispatch( {
        type: CART_TO_EDIT,
        payload: cartDetial
    });

    dispatch({ type: REMOVE_LOADER});
};



// Action creator for editing sales in the system.
export const editCustSale = (id, data, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const sale = await CustSaleService.update(id, data);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();

            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for editing sales in the system.
export const deleteCustSale = (id, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        const sale = await CustSaleService.delete(id);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();

            successNotification && successNotification();
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
        dispatch({ type: REMOVE_LOADER });

    }
};

// Action creator for getting all sales.
export const getCustCartByUser = (userId) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

        let cartDetial = await CustCartSaleService.getCartDetial(userId);

        if (cartDetial) {
            dispatch({ type: SALE_CART_DETAIL, payload: cartDetial });
        }
        dispatch({ type: REMOVE_LOADER });

    } catch (error) {
        console.log(error);
        dispatch({ type: REMOVE_LOADER });
    }
};