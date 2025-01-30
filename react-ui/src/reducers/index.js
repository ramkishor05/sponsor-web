import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import LoaderReducer from './LoaderReducer';
import SearchReducer from './SearchReducer';

import CustomizationReducer from './CustomizationReducer';
import AccountReducer from './AccountReducer';
import UserReducer from './UserReducer';
import UserVendorReducer from './UserVendorReducer';
import AccessSponsorReducer from './AccessSponsorReducer';
import UserRoleReducer from './UserRoleReducer';
import UserMenuGroupReducer from './UserMenuGroupReducer';

import GlobalDashboardReducer from './global/GlobalDashboardReducer';
import GlobalCategoryGroupReducer from './global/GlobalCategoryGroupReducer';
import GlobalCategoryReducer from './global/GlobalCategoryReducer';
import GlobalTagGroupReducer from './global/GlobalTagGroupReducer';
import GlobalTagItemReducer from './global/GlobalTagItemReducer';
import GlobalPromptReducer from './global/GlobalPromptReducer';
import GlobalSponsorReducer from './global/GlobalSponsorReducer';
import GlobalUnitGroupReducer from './global/GlobalUnitGroupReducer';
import GlobalUnitReducer from './global/GlobalUnitReducer';
import GlobalCountFreqReducer from './global/GlobalCountFreqReducer';
import GlobalCurrencyGroupReducer from './global/GlobalCurrencyGroupReducer';
import GlobalCurrencyItemReducer from './global/GlobalCurrencyItemReducer';
import GlobalVendorReducer from './global/GlobalVendorReducer';
import GlobalMenuGroupReducer from './global/GlobalMenuGroupReducer';
import GlobalMenuItemReducer from './global/GlobalMenuItemReducer';
import GlobalRoleMenuGroupReducer from './global/GlobalRoleMenuGroupReducer';
import GlobalRoleMenuItemReducer from './global/GlobalRoleMenuItemReducer';
import GlobalEmployeeReducer from './global/GlobalEmployeeReducer';
import GlobalCustomerReducer from './global/GlobalCustomerReducer';
import GlobalUserReducer from './global/GlobalUserReducer';
import GlobalSupplierReducer from './global/GlobalSupplierReducer';


import CustRoleReducer from './cust/CustRoleReducer';
import CustDashboardReducer from './cust/CustDashboardReducer';
import CustCategoryGroupReducer from './cust/CustCategoryGroupReducer';
import CustCategoryItemReducer from './cust/CustCategoryItemReducer';
import CustUnitGroupReducer from './cust/CustUnitGroupReducer';
import CustUnitReducer from './cust/CustUnitReducer';
import CustCountFreqReducer from './cust/CustCountFreqReducer';
import CustCurrencyGroupReducer from './cust/CustCurrencyGroupReducer';
import CustCurrencyItemReducer from './cust/CustCurrencyItemReducer';
import CustProductReducer from './cust/CustProductReducer';
import CustSaleReducer from './cust/CustSaleReducer';
import CustPurchaseReducer from './cust/CustPurchaseReducer';
import CustCustomerReducer from './cust/CustCustomerReducer';
import CustBusinessReducer from './cust/CustBusinessReducer';
import CustSupplierReducer from './cust/CustSupplierReducer';
import CustEmployeeReducer from './cust/CustEmployeeReducer';
import CustUserReducer from './cust/CustUserReducer';
import GlobalCountryReducer from './global/GlobalCountryReducer';
import CustTransationReducer from './cust/CustTransationReducer';
import GlobalImageLibraryReducer from './global/GlobalImageLibraryReducer';
import GlobalMindSetLibraryReducer from './global/GlobalMindSetLibraryReducer';
import GlobalReProgramLibraryReducer from './global/GlobalReProgramLibraryReducer';
import GlobalAffirmationLibraryReducer from './global/GlobalAffirmationLibraryReducer';
import GlobalSponsorBoostTransactionReducer from './global/GlobalSponsorBoostTransactionReducer';
import GlobalBussinessAccountReducer from './global/GlobalBussinessAccountReducer';
import GlobalBussinessWalletReducer from './global/GlobalBussinessWalletReducer';

import CustUserAccountReducer from './cust/CustUserAccountReducer';
import CustUserWalletReducer from './cust/CustUserWalletReducer';
import CustUserRoyaltyReducer from './cust/CustUserRoyaltyReducer';
import BusinessAccountReducer from './BusinessAccountReducer';



//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    loaderReducer: LoaderReducer,
    searchReducer: SearchReducer,
    accountReducer: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'pos-'
        },
        AccountReducer
    ),
    customization: CustomizationReducer,
    userReducer: UserReducer,
    userRoleReducer: UserRoleReducer,
    userMenuGroupReducer: UserMenuGroupReducer,
    userVendorReducer: UserVendorReducer,
    accessSponsorReducer: AccessSponsorReducer,
    businessAccountReducer: BusinessAccountReducer, 
    globalDashboardReducer: GlobalDashboardReducer,
    globalMenuGroupReducer: GlobalMenuGroupReducer,
    globalMenuItemReducer: GlobalMenuItemReducer,
    globalRoleMenuGroupReducer: GlobalRoleMenuGroupReducer,
    globalRoleMenuItemReducer: GlobalRoleMenuItemReducer,
    globalVendorReducer: GlobalVendorReducer,
    globalCategoryGroupReducer: GlobalCategoryGroupReducer,
    globalCategoryReducer: GlobalCategoryReducer,
    globalTagGroupReducer: GlobalTagGroupReducer,
    globalTagItemReducer: GlobalTagItemReducer,
    globalPromptReducer: GlobalPromptReducer,
    globalSponsorReducer: GlobalSponsorReducer,
    globalSponsorBoostTransactionReducer: GlobalSponsorBoostTransactionReducer,
    globalMindSetLibraryReducer: GlobalMindSetLibraryReducer,
    globalReProgramLibraryReducer: GlobalReProgramLibraryReducer,
    globalAffirmationLibraryReducer: GlobalAffirmationLibraryReducer,
    globalImageLibraryReducer: GlobalImageLibraryReducer,
    globalCountryReducer: GlobalCountryReducer,
    globalCurrencyGroupReducer: GlobalCurrencyGroupReducer,
    globalCurrencyItemReducer: GlobalCurrencyItemReducer,
    globalUnitGroupReducer:GlobalUnitGroupReducer,
    globalUnitReducer: GlobalUnitReducer,
    globalCountFreqReducer: GlobalCountFreqReducer,
    globalEmployeeReducer: GlobalEmployeeReducer,
    globalCustomerReducer: GlobalCustomerReducer,
    globalSupplierReducer: GlobalSupplierReducer,
    globalUserReducer: GlobalUserReducer,
    globalBussinessAccountReducer: GlobalBussinessAccountReducer,
    globalBussinessWalletReducer: GlobalBussinessWalletReducer,

    custRoleReducer: CustRoleReducer,
    custDashboardReducer: CustDashboardReducer,
    custProductReducer: CustProductReducer,
    custCategoryGroupReducer: CustCategoryGroupReducer,
    custCategoryItemReducer: CustCategoryItemReducer,
    custUnitGroupReducer:CustUnitGroupReducer,
    custUnitReducer: CustUnitReducer,
    custCountFreqReducer: CustCountFreqReducer,
    custCurrencyGroupReducer: CustCurrencyGroupReducer,
    custCurrencyItemReducer: CustCurrencyItemReducer,
    custSaleReducer:CustSaleReducer,
    custPurchaseReducer:CustPurchaseReducer,
    custCustomerReducer: CustCustomerReducer,
    custBusinessReducer: CustBusinessReducer,
    custSupplierReducer: CustSupplierReducer,
    custEmployeeReducer: CustEmployeeReducer,
    custUserReducer: CustUserReducer,
    custTransationReducer: CustTransationReducer,
    custUserAccountReducer: CustUserAccountReducer,
    custUserWalletReducer: CustUserWalletReducer,
    custUserRoyaltyReducer: CustUserRoyaltyReducer
});

export default reducer;
