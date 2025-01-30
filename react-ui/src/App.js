import React from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// routing
import Routes from './routes';

// defaultTheme
import theme from './themes';

// project imports
import NavigationScroll from './layout/NavigationScroll';
import Loader from './component/Loader';

//-----------------------|| APP ||-----------------------//

const App = () => {
    const customization = useSelector((state) => state.customization);
    const {show_loader} = useSelector((state) => state.loaderReducer);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
                {
                    show_loader && <Loader></Loader>
                }
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
