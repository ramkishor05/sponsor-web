import { 
    ADD_BUSINESS_ACCOUNT, 
    EDIT_BUSINESS_ACCOUNT, 
    REMOVE_BUSINESS_ACCOUNT, 
    ADD_BUSINESS_BANK_ACCOUNT, 
    EDIT_BUSINESS_BANK_ACCOUNT,
    REMOVE_BUSINESS_BANK_ACCOUNT, 
    ADD_BUSINESS_UPI_ACCOUNT, 
    EDIT_BUSINESS_UPI_ACCOUNT, 
    REMOVE_BUSINESS_UPI_ACCOUNT,
    GET_BUSINESS_ACCOUNT} from '../types';

const INITIAL_STATE = {
    businessAccount: {
        bankAccount:{
            bankName:'12112',
            accountHolder:'112',
            accountNumber:'212',
            ifsc:'ifsc1212'
        },
        bankUpi:{
            upiHolder:'ram',
            upiId:'ram',
            qrCode:''
        },
        balance:0.0,
        fees:0.0,
        bussinessSponsorId: null
    },
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_BUSINESS_ACCOUNT:
            return { ...state, businessAccount: action.payload };

        case EDIT_BUSINESS_ACCOUNT:
            return { ...state, businessAccount: action.payload };

        case GET_BUSINESS_ACCOUNT:
            return { ...state, businessAccount: action.payload };

        case REMOVE_BUSINESS_ACCOUNT:
            return { ...state, businessAccount: null};

        case ADD_BUSINESS_BANK_ACCOUNT:
            return { ...state, businessAccount: {
                ...state.businessAccount,
                bankAccount: action.payload
            }}

        case EDIT_BUSINESS_BANK_ACCOUNT:
            return { ...state, businessAccount: {
                ...state.businessAccount,
                bankAccount: action.payload
            }}

        case REMOVE_BUSINESS_BANK_ACCOUNT:
             return { ...state, businessAccount: {
                ...state.businessAccount,
                bankAccount: action.payload
            }};

        case ADD_BUSINESS_UPI_ACCOUNT:
            return { ...state, businessAccount: {
                ...state.businessAccount,
                bankUpi: action.payload
            }};

        case EDIT_BUSINESS_UPI_ACCOUNT:
            return { ...state, businessAccount: {
                ...state.businessAccount,
                bankUpi: action.payload
            }}
        case REMOVE_BUSINESS_UPI_ACCOUNT:
            return { ...state, businessAccount: {
                ...state.businessAccount,
                bankUpi: null
            }};
        default:
            return state;
    }
    
};

