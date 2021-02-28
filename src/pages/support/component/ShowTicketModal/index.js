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
    const { state, dispatch } = useContext(TicketContext);

    const handleClose = () => {
        dispatch({ type: 'CLOSE_SHOW_TICKET' });
    };

    const handleSaveClick = () => {
        dispatch({ type: 'LOADING' });
        TicketService.modifyTicket(state.actualTicket)
            .then(() => {
                dispatch({ type: 'TICKET_SAVED' });
            })
            .then(() => {
                const data = {};
                TicketService.searchFullTicket(data)
                    .then(result => {
                        dispatch({ type: 'LIST_TICKETS', tickets: result.results });
                        dispatch({ type: 'FINISH_LOADING' });
                    });
            });

    };

    const handleDeleteClick = () => {
        dispatch({ type: 'LOADING' });
        TicketService.deleteTicket(state.actualTicket)
            .then(() => dispatch({ type: 'CLOSE_SHOW_TICKET' }))
            .then(() => {
                const data = {};
                TicketService.searchFullTicket(data)
                    .then(result => {
                        dispatch({ type: 'LIST_TICKETS', tickets: result.results });
                        dispatch({ type: 'FINISH_LOADING' });
                    });
            });
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={state.showTicket}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={true}>
                    <div className={classes.paper}>
                        <FullTicketInfo/>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={JSON.stringify(state.originalTicket) === JSON.stringify(state.actualTicket)}
                                onClick={handleSaveClick}
                            >
                                Guardar
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={handleDeleteClick}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default ShowTicketModal;
