import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import UIColor from '../views/utilities/Color';
import MinimalLayout from '../layout/MinimalLayout';

const UnauthRoutes = () => {
    const location = useLocation();

    return (
        <Route path={['/noaccess','/pageNotFound']}>
             <MinimalLayout>
                <Switch location={location} key={location.pathname}>
                    <Route exact path="/noaccess" component={UIColor} />
                    <Route exact path="/pageNotFound" component={UIColor} />
                </Switch>
            </MinimalLayout>
        </Route>
    );
};

export default UnauthRoutes;