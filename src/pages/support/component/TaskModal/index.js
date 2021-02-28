import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import {TicketContext} from "../../reducer";
import FullTicketInfo from "../FullTicketInfo";
import TicketService from "../../service/ticket";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 0, 2, 9),
        width: "70%",
        minHeight: "70%"
    },
    button: {
        float: "right",
        width: "10%",
        marginTop: "30px",
        marginRight: "30px"
    }
}));

const ShowTicketModal = () => {
    const classes = useStyles();
    const { state } = useContext(TicketContext);

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={state.showCreateTask}
                onClose={false}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={true}>
                    <div className={classes.paper}>
                        asidjaiasdj
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default ShowTicketModal;
