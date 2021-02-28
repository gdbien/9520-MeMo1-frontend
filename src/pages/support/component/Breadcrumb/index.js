import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const SupportBreadcrumbs = () => {
    return (
        <div className="support-breadcrumb">
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                <Link color="inherit" href="/">Home</Link>
                <Typography color="textPrimary">Support</Typography>
            </Breadcrumbs>
        </div>
    );
};

export default SupportBreadcrumbs;
