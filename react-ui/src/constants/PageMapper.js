import GlobalDashboard from "../views/global/dashboard";
import GlobalUserPage from "../views/global/organizations/GlobalUserPage";
import GlobalSponsor from "../views/global/sponsors/GlobalSponsor";
import GlobalLevel from "../views/global/sponsors/GlobalLevel";
import GlobalBoost from "../views/global/sponsors/GlobalBoost";

import CustDashboard from "../views/cust/dashboard";
import CustSponsor from "../views/cust/sponsors/CustSponsor";
import CustLevel from "../views/cust/sponsors/CustLevel";
import CustBoost from "../views/cust/sponsors/CustBoost";
import CustRoyalty from "../views/cust/sponsors/CustRoyalty";
import GlobalBussinessFinancial from "../views/global/accounting/GlobalBussinessFinancial";
import CustUserAccount from "../views/cust/accounting/CustUserAccount";
import GlobalActivity from "../views/global/sponsors/GlobalActivity";
import CustUserWallet from "../views/cust/accounting/CustUserWallet";

export const PageMapper = {
    "/global/dashboard/default": GlobalDashboard,
    "/global/portal/sponsor": GlobalSponsor,
    "/global/portal/level": GlobalLevel,
    "/global/portal/boost": GlobalBoost,
    "/global/portal/financial":GlobalBussinessFinancial,
    "/global/portal/account":CustUserAccount,
    "/global/portal/users":GlobalUserPage,
    "/global/portal/royalty": CustRoyalty,
    "/global/portal/activity": GlobalActivity,

    "/user/portal/dashboard/default": CustDashboard,
    "/user/portal/sponsor": CustSponsor,
    "/user/portal/level": CustLevel,
    "/user/portal/boost": CustBoost,
    "/user/portal/royalty": CustRoyalty,
    "/user/portal/wallet":CustUserWallet,
    "/user/portal/account":CustUserAccount,
}