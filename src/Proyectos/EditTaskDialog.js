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

    function handleChangeName(e) {
        task.name = e.target.value
        setTask(
            task
        );
    }

    function handlenDescriptionChange(e) {
        task.description = e.target.value
        setTask(
            task
        );
    }

    function handleEstimationChange(e) {
        task.estimation = e.target.value
        setTask(
            task
        );
    }

    function handlePriorityChange(e) {
        task.priority = e.target.value
        setTask(
            task
        );
    }

    function handleStateChange(e) {
        task.state = e.target.value
        setTask(
            task
        );
    }

    function handleChangeSelect(event) {
        task.resourceLoad = {}
        task.resourceLoad.id = parseInt(event.target.value);
        let pj = personsLists.find(p => p.numLegajo === task.resourceLoad.id);
        task.resourceLoad.name = pj.nombre + ' ' + pj.apellido;
        setTask(
            task
        );
    };

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
                        <Input autoFocus type="text" defaultValue={task.name} id="text-name" aria-describedby="name" onChange={handleChangeName} />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="text-description"> Descripcion </InputLabel>
                        <Input autoFocus type="text" defaultValue={task.description} id="text-description" aria-describedby="Descripcion" onChange={handlenDescriptionChange} />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="text-estimation"> Estimacion (hs) </InputLabel>
                        <Input autoFocus type="number" defaultValue={task.estimation} id="text-estimation" aria-describedby="Estimacion (hs)" onChange={handleEstimationChange} />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="select-encargado"> Encargado </InputLabel>
                        <Select
                            native
                            value={task.resourceName}
                            onChange={handleChangeSelect}
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
                            input={<Input id="select-state" />}
                            value={task.state}
                            onChange={handleStateChange}
                        >
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

                            value={task.priority}
                            onChange={handlePriorityChange}
                        >
                            <option value={"Baja"}>Baja</option>
                            <option value={"Media"}>Media</option>
                            <option value={"Alta"}>Alta</option>a
                        </Select>
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