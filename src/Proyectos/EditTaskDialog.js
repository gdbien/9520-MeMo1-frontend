import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import DialogContent from '@material-ui/core/DialogContent';
import FormHelperText from "@material-ui/core/FormHelperText";
import { URL } from './Projects'

const useStyles = makeStyles((theme) => ({
    formControl: {
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
    create: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }

}));

export default function EditTaskDialog({ currentTask, personsLists, handleExternalClose }) {
    const classes = useStyles();

    const [popOpen, setPopOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [task, setTask] = React.useState(currentTask);

    const [valid, setValid] = React.useState(false);
    const [nameInvalid, setNameInvalid] = React.useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = React.useState(false);
    const [estimationInvalid, setEstimationInvalid] = React.useState(false);
    const [totalHoursInvalid, setTotalHoursInvalid] = React.useState(false);
    const [resourceInvalid, setResourceInvalid] = React.useState(false);
    const [stateInvalid, setStateInvalid] = React.useState(false);
    const [priorityInvalid, setPriorityInvalid] = React.useState(false);

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
        const response = await fetch(URL + '/tasks', {
            method: 'put',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Request-Headers': 'application/json',
                'Access-Control-Request-Method': 'put',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        setIsLoading(false);
        setPopOpen(false);
        window.location.reload();
    }

    function updateValid() {
        setValid(!(nameInvalid | descriptionInvalid | estimationInvalid | totalHoursInvalid | resourceInvalid | stateInvalid | priorityInvalid))
    }

    function handleChangeSelect(event) {
        task.resourceId = parseInt(event.target.value);
        let pj = personsLists.find(p => p.numLegajo === task.resourceId);
        task.resourceName = pj.nombre + ' ' + pj.apellido;
        setTask(
            task
        );
    };

    function handleChangeName(event) {
        setNameInvalid(event.target.value == "");
        updateValid();
        task.name = event.target.value;
        setTask(
            task
        );
    };

    function handleChangeDesc(event) {
        setDescriptionInvalid(event.target.value == "");
        updateValid();
        task.description = event.target.value;
        setTask(
            task
        );
    };

    function handleChangeHours(event) {
        setTotalHoursInvalid(event.target.value == 0);
        updateValid();
        task.totalHours = parseInt(event.target.value);
        setTask(
            task
        );
    };

    function handleChangeEs(event) {
        setEstimationInvalid(event.target.value == 0);
        updateValid();
        task.estimation = parseInt(event.target.value);
        setTask(
            task
        );
    };


    function handlePriorityChange(event) {
        setPriorityInvalid(event.target.value == "");
        updateValid();
        task.priority = event.target.value
        setTask(
            task
        );
    }

    function handleStateChange(event) {
        setStateInvalid(event.target.value == "");
        updateValid();
        task.state = event.target.value
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
            id="editDialog"
        >
            <DialogTitle id="alert-dialog-title">{"Modificacion de tareas"}</DialogTitle>
            <DialogContent>
                <form className={classes.create}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="text-name"> Nombre </InputLabel>
                        <Input id="text-name" aria-describedby="name" defaultValue={task.name} error={nameInvalid} onChange={handleChangeName} />
                        {nameInvalid && <FormHelperText id="my-helper-text">El nombre no puede estar vacio</FormHelperText>}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="text-desc"> Descripcion </InputLabel>
                        <Input required id="text-desc" aria-describedby="desc" defaultValue={task.description} error={descriptionInvalid} onChange={handleChangeDesc} />
                        {descriptionInvalid && <FormHelperText id="my-helper-text">La descripcion no puede estar vacia</FormHelperText>}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="text-total-hours"> Horas Totales </InputLabel>
                        <Input required id="text-total-hours" aria-describedby="total-hours" defaultValue={task.totalHours}
                            type="number" onChange={handleChangeHours} error={totalHoursInvalid} />
                        {totalHoursInvalid && <FormHelperText id="my-helper-text">La horas totales no pueden ser cero.</FormHelperText>}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="text-estimation"> Estimacion </InputLabel>
                        <Input required id="text-estimation" aria-describedby="estimation" defaultValue={task.estimation}
                            type="number" onChange={handleChangeEs} error={estimationInvalid} />
                        {estimationInvalid && <FormHelperText id="my-helper-text">La estimacion tiene que ser mayor a cero.</FormHelperText>}
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-encargado"> Encargado </InputLabel>
                        <Select
                            required
                            native
                            defaultValue={task.resourceName}
                            onChange={handleChangeSelect}
                            error={resourceInvalid}
                            input={<Input id="select-encargado" />}
                        >
                            {personsLists.map((person) => (
                                <option value={person.numLegajo}>
                                    {person.nombre + ' ' + person.apellido}
                                </option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Estado</InputLabel>
                        <Select
                            native
                            inputProps={{
                                name: 'state',
                                id: 'age-native-simple',
                            }}
                            error={stateInvalid}
                            defaultValue={task.state}
                            onChange={handleStateChange}
                        >
                            <option aria-label="None" value="" />
                            <option value={"En progreso"}>En progreso</option>
                            <option value={"Bloqueada"}>Bloqueada</option>
                            <option value={"Finalizada"}>Finalizada</option>
                        </Select>
                        {stateInvalid && <FormHelperText id="my-helper-text">Debe seleccionar un estado.</FormHelperText>}
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-simple">Prioridad</InputLabel>
                        <Select
                            native
                            inputProps={{
                                name: 'state',
                                id: 'age-native-simple',
                            }}
                            error={priorityInvalid}
                            defaultValue={task.priority}
                            onChange={handlePriorityChange}
                        >
                            <option aria-label="None" value="" />
                            <option value={"Baja"}>Baja</option>
                            <option value={"Media"}>Media</option>
                            <option value={"Alta"}>Alta</option>
                        </Select>
                        {priorityInvalid && <FormHelperText id="my-helper-text">Debe seleccionar una prioridad.</FormHelperText>}
                    </FormControl>
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClosePop} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleAcceptPop} color="primary" autoFocus>
                    Modificar tarea
                </Button>
            </DialogActions>
        </Dialog>
        </div>);
    }

}