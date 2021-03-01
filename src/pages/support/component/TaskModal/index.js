import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import {FormControl, Input, InputLabel, Select} from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {URL} from "../../../../Proyectos/Projects";
import {useContext} from "react";
import {TicketContext} from "../../reducer";
import TaskService from "../../service/task";
import FormHelperText from "@material-ui/core/FormHelperText";

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
    create: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }

}));


export default function TasksModal() {
    const classes = useStyles();

    const { state, dispatch } = useContext(TicketContext);

    const [valid, setValid] = React.useState(false);
    const [nameInvalid, setNameInvalid] = React.useState(false);
    const [descriptionInvalid, setDescriptionInvalid] = React.useState(false);
    const [estimationInvalid, setEstimationInvalid] = React.useState(false);
    const [totalHoursInvalid, setTotalHoursInvalid] = React.useState(false);
    const [resourceInvalid, setResourceInvalid] = React.useState(false);
    const [projectInvalid, setProjectInvalid] = React.useState(false);
    const [stateInvalid, setStateInvalid] = React.useState(false);
    const [priorityInvalid, setPriorityInvalid] = React.useState(false);

    const [task, setTask] = React.useState({
        "projectId": 0,
        "name": "",
        "description": "",
        "estimation": 0,
        "totalHours": 0,
        "priority": 0,
        "state": "",
        "tickets": [state.actualTicket["id"]],
        "resourceName":"",
        "resourceId":""
    });

    function updateValid(){
        console.log(task);
        setValid(!(nameInvalid | descriptionInvalid | estimationInvalid | totalHoursInvalid | resourceInvalid | stateInvalid | priorityInvalid))
    }

    const createNewTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        };
        console.log(requestOptions);
        fetch(URL + '/tasks', requestOptions)
            .then(() => reloadTicketInfo(state.actualTicket["id"]))
            .catch((err) => {});
    };

    const reloadTicketInfo = (ticketId) => {
        dispatch({ type: 'LOADING' });
        TaskService.getTask(ticketId)
            .then(resp => {
                dispatch({ type: 'SET_TASK', task: resp });
                dispatch({ type: 'CLOSE_CREATE_TASK' });
                dispatch({ type: 'FINISH_LOADING' });
            });
    };

    const handleClose = () => {
        dispatch({ type: 'CLOSE_CREATE_TASK' });
    };

    function handleChangeSelect(event) {
        task.resourceId = parseInt(event.target.value);
        let pj = state.resource.find(p => p.numLegajo === task.resourceId);
        task.resourceName = pj.nombre + ' ' + pj.apellido;
        setTask(task);
    }

    function handleChangeName(event) {
        setNameInvalid(event.target.value === "");
        updateValid();
        task.name = event.target.value;
        setTask(task);
    }

    function handleChangeDesc(event) {
        setDescriptionInvalid(event.target.value === "");
        updateValid();
        task.description = event.target.value;
        setTask(task);
    }

    function handleChangeHours(event) {
        setTotalHoursInvalid(event.target.value === 0);
        updateValid();
        task.totalHours = parseInt(event.target.value);
        setTask(task);
    }

    function handleChangeEs(event) {
        setEstimationInvalid(event.target.value === 0);
        updateValid();
        task.estimation = parseInt(event.target.value);
        setTask(task);
    }

    function handlePriorityChange(event) {
        setPriorityInvalid(event.target.value === "");
        updateValid();
        task.priority = event.target.value;
        setTask(task);
    }

    function handleStateChange(event) {
        setStateInvalid(event.target.value === "");
        updateValid();
        task.state = event.target.value;
        setTask(task);
    }

    function handleProjectSelect(event) {
        setProjectInvalid(event.target.value === "");
        updateValid();
        task.projectId = event.target.value;
        setTask(task);
        console.log(task);
    }

    return (
        <div>
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open
                aria-labelledby="alert-dialog-title"
                id="createDialog">

                <DialogTitle id="alert-dialog-title">{"Crear tarea"}</DialogTitle>
                <DialogContent>
                    <form className={classes.create}>
                        <FormControl required={true}  className={classes.formControl}>
                            <InputLabel id="text-name"> Nombre </InputLabel>
                            <Input id="text-name" aria-describedby="name"  error={nameInvalid} onChange={handleChangeName}/>
                            {nameInvalid && <FormHelperText id="my-helper-text">El nombre no puede estar vacio</FormHelperText>}
                        </FormControl>
                        <FormControl required={true}  className={classes.formControl}>
                            <InputLabel id="text-desc"> Descripcion </InputLabel>
                            <Input required id="text-desc" aria-describedby="desc" error={descriptionInvalid} onChange={handleChangeDesc} />
                            {descriptionInvalid && <FormHelperText id="my-helper-text">La descripcion no puede estar vacia</FormHelperText>}
                        </FormControl>
                        <FormControl required={true} className={classes.formControl}>
                            <InputLabel id="text-total-hours"> Horas Totales </InputLabel>
                            <Input required id="text-total-hours" aria-describedby="total-hours"
                                   type="number" onChange={handleChangeHours} error={totalHoursInvalid}/>
                            {totalHoursInvalid && <FormHelperText id="my-helper-text">La horas totales no pueden ser cero.</FormHelperText>}
                        </FormControl>
                        <FormControl required={true} className={classes.formControl}>
                            <InputLabel id="text-estimation"> Estimacion </InputLabel>
                            <Input required id="text-estimation" aria-describedby="estimation"
                                   type="number" onChange={handleChangeEs} error={estimationInvalid} />
                            {estimationInvalid && <FormHelperText id="my-helper-text">La estimacion tiene que ser mayor a cero.</FormHelperText>}
                        </FormControl>
                        <FormControl required={true} className={classes.formControl}>
                            <InputLabel id="select-encargado"> Encargado </InputLabel>
                            <Select
                                required
                                native
                                value={task.resourceId}
                                onChange={handleChangeSelect}
                                error={resourceInvalid}
                            >
                                {state.resource.map((resource) => (
                                    <option value={resource.numLegajo}>
                                        {resource.nombre + ' ' + resource.apellido}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl required={true} className={classes.formControl}>
                            <InputLabel id="select-project"> Proyecto </InputLabel>
                            <Select
                                required
                                native
                                value={projectInvalid}
                                onChange={handleProjectSelect}
                                error={resourceInvalid}
                                input={<Input id="select-project" />}
                            >
                                {state.project.map((project) => (
                                    <option value={project["codeId"]}>
                                        {project.name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl required={true} className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Estado</InputLabel>
                            <Select
                                native
                                inputProps={{
                                    name: 'state',
                                    id: 'age-native-simple',
                                }}
                                error={stateInvalid}
                                onChange={handleStateChange}
                            >
                                <option aria-label="None" value="" />
                                <option value={"En progreso"}>En progreso</option>
                                <option value={"Bloqueada"}>Bloqueada</option>
                                <option value={"Finalizada"}>Finalizada</option>
                            </Select>
                            {stateInvalid && <FormHelperText id="my-helper-text">Debe seleccionar un estado.</FormHelperText>}
                        </FormControl>

                        <FormControl required={true} className={classes.formControl}>
                            <InputLabel htmlFor="age-native-simple">Prioridad</InputLabel>
                            <Select
                                native
                                inputProps={{
                                    name: 'state',
                                    id: 'age-native-simple',
                                }}
                                error={priorityInvalid}
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
                    <Button onClick={handleClose} color="secondary" variant="contained">
                        Cancelar
                    </Button>
                    <Button onClick={() => {
                        if (valid) {createNewTask();}}}
                            color="primary"
                            variant="contained"
                            disabled={!valid}>
                        Crear tarea
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
};

