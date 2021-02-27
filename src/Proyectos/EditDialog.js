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
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(3),
      minWidth: 120,
    },
    textField: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function EditDialog({ taskId }) {
    const classes = useStyles();

    const [popOpen, setPopOpen] = React.useState(true);
    const [mustEdit, setMustEdit] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [task, setTask] = React.useState(null);

    const handleAcceptPop = () => {
        setPopOpen(false);
        setMustEdit(true);
        setIsLoading(true);
    };

    const handleClosePop = () => {
        setPopOpen(false);
    };

    const DeleteTask = async () => {
        const response = await fetch('https://psa-projects.herokuapp.com/tasks?id=' + taskId,  {
                method: 'patch'
                })
        console.log(task)
        setIsLoading(false);
        setMustEdit(false);
        setPopOpen(false);  
    }

    if (mustEdit) {
        DeleteTask()
    }

    function handlenNameChange (e) {
        setTask({
            ["name"]: e.target.value
        });
    }

    function handlenDescriptionChange (e) {
        setTask({
            ["description"]: e.target.value
        });
    }

    function handlenEstimationChange (e) {
        setTask({
            ["estimation"]: e.target.value
        });
    }

    function handlePriorityChange (e) {
        setTask({
            ["priority"]: e.target.value
        });
    }

    function handleStateChange (e) {
        setTask({
            ["state"]: e.target.value
        });
    }

    if (isLoading) {
        return (<CircularProgress />)
    } else {
        return (<div><Dialog
            open={popOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Modificacion de tareas"}</DialogTitle>

            <TextField
                className={classes.textField}
                autoFocus
                margin="dense"
                id="name"
                label="Nombre"
                type="text"
                onChange={handlenNameChange}
            />

            <TextField
                className={classes.textField}
                autoFocus
                margin="dense"
                id="description"
                label="Descripcion"
                type="text"
                onChange={handlenDescriptionChange}
            />

            <TextField
                className={classes.textField}
                autoFocus
                margin="dense"
                id="estimation"
                label="Estimacion (hs)"
                type="number"
                onChange={handlenEstimationChange}
            />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Estado</InputLabel>
                <Select
                    native
                    
                    inputProps={{
                        name: 'state',
                        id: 'age-native-simple',
                    }}

                    onChange={handleStateChange}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>En progreso</option>
                    <option value={20}>Bloqueada</option>
                    <option value={30}>Finalizada</option>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Prioridad</InputLabel>
                <Select
                    native
                    
                    inputProps={{
                        name: 'state',
                        id: 'age-native-simple',
                    }}

                    onChange={handlePriorityChange}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Baja</option>
                    <option value={20}>Media</option>
                    <option value={30}>Alta</option>
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
        </Dialog></div>);
    }

}