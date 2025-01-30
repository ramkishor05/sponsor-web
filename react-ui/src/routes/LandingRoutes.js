import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import GuestGuard from '../utils/route-guard/GuestGuard';
import LandingLayout from '../layout/LandingLayout';
import Loadable from '../component/Loadable';

// landing routing
const LandingPage = Loadable(lazy(() => import('../views/pages/LandingPage')));

//-----------------------|| AUTH ROUTING ||-----------------------//

const LandingRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/landing']}>
            <LandingLayout>
                <Switch location={location} key={location.pathname}>
                   <Route path="/landing" exact component={LandingPage} />
                </Switch>
            </LandingLayout>
        </Route>
    );
};

export default LandingRoutes;
