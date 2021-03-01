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
import ResourceService from "../../service/resource";
import TaskService from "../../service/task";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        width: 500,
        height: 500,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    margin: {
        margin: theme.spacing(1),
    },
    circularProgress: {
        display: "flex",
        justifyContent: "center"
    },
    create: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function TasksModal() {
    const classes = useStyles();

    const [persons, setPersons] = React.useState([]);
    const [projects, setProjects] = React.useState([]);

    const { state, dispatch } = useContext(TicketContext);

    var new_task = {
        "projectId": 0,
        "name": "",
        "description": "",
        "estimation": 0,
        "totalHours": 0,
        "tickets": [state.actualTicket["id"]],
        "resourceId": 0,
        "resourceName": ""
    };

    React.useEffect(() => {
        fetch('https://psa-bac-carga-de-horas.herokuapp.com/personas')
            .then(res => res.json())
            .then(
                (result) => {
                    setPersons(result);
                }
            )
    }, []);

    React.useEffect(() => {
        fetch('http://psa-projects.herokuapp.com/projects')
            .then(res => res.json())
            .then(
                (result) => {
                    setProjects(result);
                }
            )
    }, []);

    const createNewTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_task)
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
                dispatch({ type: 'CLOSE_CREATE_TASK' })
                dispatch({ type: 'FINISH_LOADING' });
            });
    };

    const handleClose = () => {
        dispatch({ type: 'CLOSE_CREATE_TASK' });
    };

    const handleChangeSelect = (event) => {
        new_task.resourceId = parseInt(event.target.value);
        const pj = persons.find(p => p.numLegajo === new_task.resourceId);
        new_task.resourceName = pj.nombre + ' ' + pj.apellido;

        console.log(new_task);
    };

    const handleChangeName = (event) => {
        new_task.name = event.target.value;
    };

    const handleChangeDesc = (event) => {
        new_task.description = event.target.value;
    };

    const handleChangeHours = (event) => {
        new_task.totalHours = parseInt(event.target.value);
    };

    const handleChangeEst = (event) => {
        new_task.estimation = parseInt(event.target.value);
    };

    const handleChangeProject = (event) => {
        new_task.projectId = event.target.value;
        console.log(new_task);
    };

    return (
        <div>
            <Dialog disableBackdropClick disableEscapeKeyDown open={true} onClose={handleClose}>
                <DialogTitle>Nueva Tarea</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-name"> Nombre </InputLabel>
                            <Input id="text-name" aria-describedby="name" onChange={handleChangeName} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-desc"> Descripcion </InputLabel>
                            <Input id="text-desc" aria-describedby="desc" onChange={handleChangeDesc} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-total-hours"> Horas Totales </InputLabel>
                            <Input id="text-total-hours" aria-describedby="total-hours"
                                   type="number" onChange={handleChangeHours} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-estimation"> Estimacion </InputLabel>
                            <Input id="text-estimation" aria-describedby="estimation"
                                   type="number" onChange={handleChangeEst} />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-encargado"> Encargado </InputLabel>
                            <Select
                                native
                                value={new_task.resourceId}
                                onChange={handleChangeSelect}
                                input={<Input id="select-encargado" />}
                            >
                                {persons.map((person) => (
                                    <option value={person.numLegajo}>
                                        {person.nombre + ' ' + person.apellido}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-project"> Proyecto </InputLabel>
                            <Select
                                native
                                value={new_task.projectId}
                                onChange={handleChangeProject}
                                input={<Input id="select-project" />}
                            >
                                {projects.map((project) => (
                                    <MenuItem value={project.codeId}>{project.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createNewTask} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

