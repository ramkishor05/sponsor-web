import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import MainPage from '../views/pages/MainPage';
import MainLayout from './../layout/MainLayout';
import AuthGuard from './../utils/route-guard/AuthGuard';
import { PageMapper } from '../constants/PageMapper'; 
import ViewPage from '../views/pages/ViewPage';
import PageNotFound from '../views/utilities/PageNotFound';
import { MataMapper } from '../constants/MataMapper';
import { updateOnboarding } from '../actions';

//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {

    const location = useLocation();

    const dispatch =useDispatch();

    const {userDetail}= useSelector((state) => state.userReducer);
    const { token } =  useSelector((state) =>state.accountReducer);
    const userMenuGroupReducer = useSelector((state) => state.userMenuGroupReducer);
    
    const getRouteGroups=(menuGroups)=>{
        let list=[];
        if(!menuGroups){
            return list;
        }
        for(let menuGroupIndex in menuGroups){
            let menuGroup= menuGroups[menuGroupIndex];
            if(!menuGroup.disabled && menuGroup.menuItems.length>1)
            list.push(<Route key={menuGroup.id} exact path={menuGroup.url} render={(props) => <MainPage menuGroup={menuGroup} {...props}></MainPage>} />)
            for(let menuItemIdex in menuGroups[menuGroupIndex].menuItems){
                let menuItem= menuGroups[menuGroupIndex].menuItems[menuItemIdex];
                if(!menuItem.disabled){
                    let CustPage= PageMapper[menuItem.url];
                    let metadata= MataMapper[menuItem.url];
                    if(CustPage)
                        list.push(<Route key={menuItem.id} exact path={menuItem.url}  render={(props) => <CustPage metadata={metadata} menuItem={menuItem} menuGroup={menuGroup} userDetail={userDetail} token={token} updateOnboarding={(status)=> menuItem.onBoarding && dispatch(updateOnboarding(userDetail, token, status, menuItem.idenNo ))} {...props} ></CustPage> }/>)
                    else
                        list.push(<Route key={menuItem.id} exact path={menuItem.url} render={(props) => <ViewPage metadata={metadata} menuItem={menuItem} menuGroup={menuGroup}  userDetail={userDetail} token={token} updateOnboarding={(status)=> menuItem.onBoarding && dispatch(updateOnboarding(userDetail, token, status, menuItem.idenNo ))} {...props}></ViewPage>} />)
                }
            }
        }
        return list;
    }

    const getRouteUrls=(menuGroups)=>{
        let list=[];
        if(!menuGroups){
            return list;
        }
        
        for(let menuGroupIndex in menuGroups){
            let menuGroup= menuGroups[menuGroupIndex];
            list.push(menuGroup.url)
            for(let menuItemIdex in menuGroups[menuGroupIndex].menuItems){
                 let menuItem= menuGroups[menuGroupIndex].menuItems[menuItemIdex];
                list.push(menuItem.url)
            }
        }
        return list;
    }

    return (
        <Route
                path={[...getRouteUrls(userMenuGroupReducer?.userMenuGroups),"/invalidUrl"]}
            >
                <MainLayout>
                    <Switch location={location} key={location.pathname}>
                        <AuthGuard>
                            {
                                getRouteGroups(userMenuGroupReducer?.userMenuGroups)
                            }
                            <Route key="invalidUrl" exact path="/invalidUrl" component={PageNotFound} ></Route>
                        </AuthGuard>
                    </Switch>
                </MainLayout>
            </Route>
        );
    
};

export default MainRoutes;

