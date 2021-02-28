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
import {URL} from './Projects'

const useStyles = makeStyles((theme) => ({
    formControl: {
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
      marginBottom: theme.spacing(3),
      minWidth: 500,
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

export default function EditTaskDialog({ currentTask , handleExternalClose}) {
    const classes = useStyles();

    const [popOpen, setPopOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [task, setTask] = React.useState(currentTask);

    const handleAcceptPop = () => {
        setPopOpen(false);
        setIsLoading(true);
        editTask()
    };

    const handleClosePop = () => {
        setPopOpen(false);
        handleExternalClose()
    };

    const editTask = async () => {
        const response = await fetch(URL + '/tasks',  {
                method: 'put',
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Request-Headers' : 'application/json',
                    'Access-Control-Request-Method': 'put',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(task)
                })
        console.log(response)
        console.log(task)
        setIsLoading(false);
        setPopOpen(false); 
        window.location.reload();
    }

    function handlenNameChange (e) {
        console.log(e.target.value)
        task.name = e.target.value
        setTask(
            task
        );
    }

    function handlenDescriptionChange (e) {
        task.description = e.target.value
        setTask(
            task
        );
    }

    function handlenEstimationChange (e) {
        task.estimation = e.target.value
        setTask(
            task
        );
    }

    function handlePriorityChange (e) {
        task.priority = e.target.value
        setTask(
            task
        );
    }

    function handleStateChange (e) {
        task.state = e.target.value
        setTask(
            task
        );
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
                    <option value={"En progreso"}>En progreso</option>
                    <option value={"Bloqueada"}>Bloqueada</option>
                    <option value={"Finalizada"}>Finalizada</option>
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
                    <option value={"Baja"}>Baja</option>
                    <option value={"Media"}>Media</option>
                    <option value={"Alta"}>Alta</option>
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