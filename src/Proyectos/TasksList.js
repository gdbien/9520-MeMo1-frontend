import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import {
    Container,
    CssBaseline,
    IconButton,
    Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green } from "@material-ui/core/colors";
import EditIcon from '@material-ui/icons/Edit';
import DeleteTaskDialog from "./DeleteTaskDialog";
import EditTaskDialog from "./EditTaskDialog";
import CreateTaskDialog from "./CreateTaskDialog";
import CircularProgress from '@material-ui/core/CircularProgress';
import { URL } from './Projects'


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
    horizontalContainer: {
        display: "flex",
        flexDirection: "row"
    }
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
    const [openDeleteDialog, setDeleteDialog] = React.useState(false);
    const [openEditDialog, setEditDialog] = React.useState(false);
    const [openCreateDialog, setCreateDialog] = React.useState(false);
    const [persons, setPersons] = React.useState([]);
    const [tasks, setTasks] = React.useState([]);
    const [currentTask, setCurrentTask] = React.useState(null);
    const [name, setName] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        fetch(URL + '/projects/project?id=' + props.projectId)
            .then(res => res.json())
            .then(result => {
                setIsLoaded(true);
                setName(result.name)
                setTasks(result.tasksList);
            }).catch(error => {
                setIsLoaded(true);
                setError(error);
            })
    }, [props.projectId])

    React.useEffect(() => {
        fetch('https://psa-bac-carga-de-horas.herokuapp.com/personas')
            .then(res => res.json())
            .then(
                (result) => {
                    setPersons(result);
                }
            )
    }, [props.projectId])

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

    if (error) {
        return <div> Error: {error.message}</div>;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" color="secondary">
                    {name}
                </Typography>
            </Container>

            { (!isLoaded) ?
                <div>
                    <CircularProgress className={useStyles.circularProgress} />
                    <h5 >
                        Cargando datos...
                    </h5>
                </div>  : <div></div>
            }
            <Container className={classes.horizontalContainer}>
            <IconButton aria-label="new" className={classes.margin} onClick={() => setCreateDialog(true)}>
                <AddCircleIcon fontSize="large" style={{ color: green[500] }} />
            </IconButton>
            </Container>

            {openCreateDialog ?
                <CreateTaskDialog projectId={props.projectId} personsLists={persons} handleExternalClose={() => setCreateDialog(false)} /> : <div> </div>
            }

            {openEditDialog ?
                <EditTaskDialog currentTask={currentTask} personsLists={persons} handleExternalClose={() => setEditDialog(false)} /> : <div> </div>
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