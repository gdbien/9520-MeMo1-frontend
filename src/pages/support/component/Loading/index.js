import React, { useContext } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { TicketContext } from "../../reducer";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Loading = () => {
    const { state } = useContext(TicketContext);
    const classes = useStyles();

    return (
        <div>
            <Backdrop className={classes.backdrop} open={state.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Loading
