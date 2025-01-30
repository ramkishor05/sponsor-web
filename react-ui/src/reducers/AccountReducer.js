// action - state management
import MenuGroupService from '../services/GlobalMenuGroupService';

import {
    ACCOUNT_INITIALIZE,LOGIN_SUCCESS, LOGIN_FAIL, 
    LOGOUT_SUCCESS, SET_OWNER_ACCOUNT, 
    SET_BUSSINESS_ACCOUNT, SET_USER_ACCOUNT,
    SET_SPONSOR_ID
} from '../types';

const collapse=(item)=>{
    let paths=[];
    item.children.map((menu) => {
        switch (menu.type) {
            case 'collapse':
                paths.push(...collapse(menu))
            break;
            case 'item':
                paths.push(menu.url);
            break
            default:
                break;
        }
    });
    return paths
}

export const initialState = {
    token: null,
    isLoggedIn: false,
    isInitialized: false,
    businessId: null,
    ownerId : null,
    userId: null,
    loadMenuGroupByRole : async (roleId)=>{
        return await MenuGroupService.findByRoleId(roleId);
    },
    defaultPath: (roleMenuGroups, location,isLoggedIn)=>{
        if(!isLoggedIn){
            return "/login";
        } else{
            if(!roleMenuGroups){
                return location.pathname;
            }
            for(let roleMenuGroupIndex in roleMenuGroups){
                let roleMenuGroup= roleMenuGroups[roleMenuGroupIndex];
                let roleMenuItems= roleMenuGroup.menuItems;
                for(let menuItemIndex in roleMenuItems){
                    let menuItem= roleMenuItems[menuItemIndex];
                    if(menuItem.disabled){
                        continue;
                    }
                    if(location.pathname===menuItem.url){
                        return menuItem.url;
                    }
                }
            }
            for(let roleMenuGroupIndex in roleMenuGroups){
                let roleMenuGroup= roleMenuGroups[roleMenuGroupIndex];
                let roleMenuItems= roleMenuGroup.menuItems;
                for(let menuItemIndex in roleMenuItems){
                    let menuItem= roleMenuItems[menuItemIndex];
                    if(menuItem.disabled){
                        continue;
                    }
                    if(menuItem.homePage){
                        return menuItem.url;
                    }
                }
            }
        }
        return '/invalidUrl';
    },
    contains : (id, userRole) => {
        return userRole.roleMenuItems.find(roleEndpoint=>roleEndpoint.type===id) !=null;
     },
     filter: (itemChildrenList, userRole)=>{
        let roleMenuItems= userRole.roleMenuItems;
        return itemChildrenList.filter(itemChildren=>roleMenuItems.find(roleEndpoint=>roleEndpoint.url===itemChildren.url) !=null)
     },
     paths: (userRole) => {
       let paths=[];
       userRole.roleMenuItems.forEach(roleEndpoint=>{
        paths.push(roleEndpoint.url);
       })
       return  paths;
    },
     urls: (menuItem) => {
        let roleEndPointBuild= [];
        menuItem.items.forEach(item => {
            item.children.map((menu) => {
                switch (menu.type) {
                    case 'collapse':
                        //paths.push(...collapse(menu))
                    break;
                    case 'item':
                        roleEndPointBuild.push({title:menu.title, type:item.id, url:menu.url })
                    break
                    default:
                        break;
                }
            });
        })
        let roleEndPointObjects= {
            "id": "GlobalUserEndpoint",
            "order": 1,
            "objects": [

            ]
        };

        roleEndPointBuild.forEach(roleEndPoint=>{
             let roleEndPointObject= {
                "id": "UserEndpoint_"+roleEndPoint.title.replace(" ", "_"),
                "type": "com.brijframwork.authorization.model.EOUserEndpoint",
                "name": "GlobalUserEndpoint",
                "properties": roleEndPoint
            }
            roleEndPointObjects.objects.push(roleEndPointObject)
        })

        return roleEndPointObjects;
    }
};

//-----------------------|| ACCOUNT REDUCER ||-----------------------//

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case ACCOUNT_INITIALIZE: {
            const { isLoggedIn,  token } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialized: true,
                token,
                businessId :null,
                ownerId: null,
                sponsorId: null
            };
        }
        
        case LOGIN_SUCCESS: {
            return {
                ...state,
                token: action.payload,
                isLoggedIn: true,
                businessId :null,
                ownerId: null,
                sponsorId: null
            };
        }

        case LOGIN_FAIL:
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                businessId :null,
                ownerId: null,
                sponsorId: null
            };
        }
        
        case SET_BUSSINESS_ACCOUNT:
              return { ...state, businessId:action.payload };
        case SET_OWNER_ACCOUNT:
              return { ...state, ownerId:action.payload };
        case SET_SPONSOR_ID:
           return { ...state, sponsorId:action.payload };
        case SET_USER_ACCOUNT:
                return { ...state, userId:action.payload };
        default: {
            return { ...state };
        }
    }
};

export default accountReducer;
