import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import InputCreateTicket from './../InputCreateTicket';
import {TicketContext} from "../../reducer";
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
        margin: "3rem 6rem",
        width: "15%",
    }
}));

const CreateTicketModal = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(TicketContext);

    const handleClose = () => {
        dispatch({ type: 'CLOSE_CREATE_TICKET' });
    };

    const handleOnClick = () => {
        dispatch({ type: 'LOADING' });
        TicketService.createTicket(state.ticketToCreate)
            .then(() => {
                dispatch({ type: 'FINISH_CREATE_TICKET' });
            })
            .then(() => {
                const data = {};
                TicketService.searchFullTicket(data)
                    .then(result => {
                        dispatch({ type: 'LIST_TICKETS', tickets: result.results });
                        dispatch({ type: 'FINISH_LOADING' });
                        dispatch({ type: 'SHOW_ALERT', text: "Ticket creado correctamente." });
                    });
            });
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={state.createTicket}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={true}>
                    <div className={classes.paper}>
                        <div>
                            <h1>Ingrese los datos para el ticket</h1>
                        </div>
                        <InputCreateTicket/>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                disabled={!state.buttonCreateTicket}
                                onClick={handleOnClick}
                            >
                                Crear
                            </Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
};

export default CreateTicketModal;
