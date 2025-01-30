
import globalBoostMeta from '../metadata/GlobalBoostMeta'
import globalSponsorMeta from '../metadata/GlobalSponsorMeta'
import globalLevelMeta from '../metadata/GlobalLevelMeta'
import globalUserMeta from '../metadata/GlobalUserMeta'
import globalRoyaltyMeta from '../metadata/GlobalRoyaltyMeta'
import globalActivityMeta from '../metadata/GlobalActivity'


export const MataMapper = {
    "/global/portal/boost": globalBoostMeta,
    "/global/portal/level": globalLevelMeta,
    "/global/portal/sponsor": globalSponsorMeta,
    "/global/portal/users": globalUserMeta,
    "/global/portal/royalty": globalRoyaltyMeta,
    "/global/portal/activity": globalActivityMeta,

    "/user/portal/sponsor": globalSponsorMeta,
    "/user/portal/level": globalLevelMeta,
    "/user/portal/boost": globalBoostMeta,
    "/user/portal/royalty": globalRoyaltyMeta
}