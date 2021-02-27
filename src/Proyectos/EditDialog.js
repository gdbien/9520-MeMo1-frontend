import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function EditDialog({ task }) {
    const classes = useStyles();

    const [popOpen, setPopOpen] = React.useState(true);
    const [mustEdit, setMustEdit] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleAcceptPop = () => {
        setPopOpen(false);
        setMustEdit(true);
    };

    const handleClosePop = () => {
        setPopOpen(false);
        window.location.reload();
    };

    const DeleteTask = () => {
        setIsLoading(true);
        fetch('http://localhost:8080/tasks?id=' + task.taskId, {
                method: 'patch',
                body: task.json()
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoading(false);
                        window.location.reload();
                    },
                    (error) => {
                        setIsLoading(false);
                        setError(error);
                    }
                )
    }

    if (mustEdit) {
        DeleteTask()
    }

    if (isLoading) {
        return (<CircularProgress />)
    } else {
        return (<Dialog
            open={popOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Modificacion de tareas"}</DialogTitle>

            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre"
                type="text"
                fullWidth
            />

            <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Descripcion"
                type="text"
                fullWidth
            />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Estado</InputLabel>
                <Select
                    native
                    
                    inputProps={{
                        name: 'state',
                        id: 'age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>En curso</option>
                    <option value={20}>Bloqueada</option>
                    <option value={30}>Finalizada</option>
                </Select>
            </FormControl>
            <DialogActions>
                <Button onClick={handleClosePop} color="primary">
                    No
            </Button>
                <Button onClick={handleAcceptPop} color="primary" autoFocus>
                    Si
            </Button>
            </DialogActions>
        </Dialog>);
    }

}