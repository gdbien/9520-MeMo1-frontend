import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import {TicketContext} from "../../reducer";
import TicketService from "../../service/ticket";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    dialog: {
        minHeight: "35%",
        minWidth: "35%",
    },
    button: {
        marginRight: "23px"
    }
}));

const ConfirmationModal = () => {
    const { state, dispatch } = useContext(TicketContext);
    const classes = useStyles();

    const handleClose = () => {
        dispatch({ type: 'CLOSE_CONFIRMATION_MODAL' });
    };

    const handleDelete = () => {
        dispatch({ type: 'LOADING' });
        TicketService.deleteTicket(state.actualTicket)
            .then(() => {
                dispatch({ type: 'CLOSE_CONFIRMATION_MODAL' });
                dispatch({ type: 'CLOSE_SHOW_TICKET' });
            })
            .then(() => {
                const data = {};
                TicketService.searchFullTicket(data)
                    .then(result => {
                        dispatch({ type: 'LIST_TICKETS', tickets: result.results });
                        dispatch({ type: 'FINISH_LOADING' });
                        dispatch({ type: 'SHOW_ALERT', text: "Ticket eliminado correctamente." });
                    });
            });
    };

    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={state.confirmationModal}
                onClose={handleClose}
                className={classes.dialog}
            >
                <DialogTitle>¿Desea eliminar el ticket?</DialogTitle>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmationModal;
