import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
    Container,
    CssBaseline,
    FormControl,
    IconButton,
    Input,
    InputLabel, Select,
    Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green } from "@material-ui/core/colors";
import EditIcon from '@material-ui/icons/Edit';
import DeleteTaskDialog from "./DeleteTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import {URL} from './Projects'

function getEditButton(onClickListener) {
    return (<IconButton aria-label="edit"
        color="secondary" onClick={onClickListener}>
        <EditIcon fontSize="small" />
    </IconButton>);
}

function getDeleteButton(onClickListener) {
    return (<IconButton aria-label="delete" onClick={onClickListener}>
        <DeleteIcon fontSize="small" />
    </IconButton>);
}

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


export default function TasksList(props) {

    const columns = [
        { field: 'taskId', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Nombre', width: 180 },
        { field: 'description', headerName: 'Descripcion', width: 250 },
        { field: 'priority', headerName: 'Prioridad', width: 170 },
        { field: 'state', headerName: 'Estado', width: 130 },
        { field: 'estimation', headerName: 'Estimacion', width: 170 },
        { field: 'totalHours', headerName: 'Horas Totales', width: 170 },
        { field: 'creationDate', headerName: 'Fecha de Creacion', width: 190 },
        { field: 'projectId', headerName: 'Project ID', width: 120 },
        { field: 'resources', headerName: 'Recursos', width: 150 },
        { field: 'tickets', headerName: 'Tickets', width: 150 },
        { field: 'person', headerName: 'Encargado', width: 150 },
        {
            field: "edit",
            headerName: "Editar",
            disableClickEventBubbling: true,
            renderCell: function (params) {
                function onEdit() {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });

                    setCurrentTask(thisRow);
                    setEditDialog(true);
                }

                return getEditButton(onEdit);
            }
        },
        {
            field: "delete",
            headerName: "Borrar",
            disableClickEventBubbling: true,
            renderCell: function (params) {
                const onDelete = () => {
                    const api = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });

                    setCurrentTask(thisRow);
                    setDeleteDialog(true);
                };

                return getDeleteButton(onDelete);
            }
        }
    ]

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openDeleteDialog, setDeleteDialog] = React.useState(false);
    const [openEditDialog, setEditDialog] = React.useState(false);

    const [tasks, setTasks] = React.useState([]);
    const [currentTask, setCurrentTask] = React.useState(null);

    const [name, setName] = React.useState(null);

    const [persons, setPersons] = React.useState([]);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);

    var new_task = {
        "projectId": 0,
        "name": "",
        "description": "",
        "estimation": 0,
        "totalHours": 0,
        "resourceLoad": {
            "name": "",
            "id": 0
        }
    };

    new_task.projectId = parseInt(props.projectId);;

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createNewTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_task)
        };
        fetch(URL + '/tasks', requestOptions)

        handleClose();
        window.location.reload();
    };

    const handleChangeSelect = (event) => {
        new_task.resourceLoad.id = parseInt(event.target.value);
        const pj = persons.find(p => p.numLegajo === new_task.resourceLoad.id);
        new_task.resourceLoad.name = pj.nombre + ' ' + pj.apellido;
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

    const body = (
        <div>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
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
                                value={new_task.resourceName}
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

    React.useEffect(() => {
        fetch('https://psa-bac-carga-de-horas.herokuapp.com/personas')
            .then(res => res.json())
            .then(
                (result) => {
                    setPersons(result);
                }
            )
    }, [])

    React.useEffect(() => {
        fetch(URL + '/projects/project?id=' + props.projectId)
            .then(res => res.json())
            .then(result => {
                setIsLoaded(true);
                setTasks(result.tasksList);
            }).catch(error => {
                setIsLoaded(true);
                setError(error);
            })
    }, [props.projectId])

    if (error) {
        return <div> Error: {error.message}</div>;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            
            { (!isLoaded) ?
                <div>
                    <CircularProgress className={useStyles.circularProgress} />
                    <h5 >
                        Cargando datos...
                    </h5>
                </div>  : <div></div>
            }
            
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" color="secondary">
                    {name}
                </Typography>
            </Container>

            <Container fixed>
                <IconButton aria-label="new" className={classes.margin} onClick={handleOpen}>
                    <AddCircleIcon fontSize="large" style={{ color: green[500] }} />
                </IconButton>
                {body}
            </Container>
            {openEditDialog ?
                <EditTaskDialog currentTask={currentTask} handleExternalClose={() => setEditDialog(false)} /> : <div> </div>
            }

            {openDeleteDialog ?
                <DeleteTaskDialog taskId={currentTask.taskId} handleExternalClose={() => setDeleteDialog(false)} /> : <div> </div>
            }
            <Container fixed>
                {(tasks === undefined) ?
                    <h5 >
                        No hay tareas para este proyecto
                </h5>


                    : <div style={{ height: 400, width: '100%' }}>
                        <DataGrid rows={tasks.map((task) => {
                            task["id"] = task.taskId;
                            return task;
                        })} columns={columns} pageSize={5} />

                    </div>}
                    </Container>
                </React.Fragment>
    );
}