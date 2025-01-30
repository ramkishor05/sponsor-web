import React from 'react';

// material-ui
import { Link, Typography, Stack } from '@material-ui/core';

//-----------------------|| FOOTER - AUTHENTICATION 2 & 3 ||-----------------------//

const AuthFooter = () => {
    return (
        <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2" component={Link} href="https://unlimits.com" target="_blank" underline="hover">
                {/*unlimits.com*/}
            </Typography>
            <Typography variant="subtitle2" component={Link} href="https://unlimits.com" target="_blank" underline="hover">
                {/*&copy; unlimits.com*/}
            </Typography>
        </Stack>
    );
};

export default AuthFooter;
