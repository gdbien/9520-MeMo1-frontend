import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Container, CssBaseline, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { green } from "@material-ui/core/colors";
import EditIcon from '@material-ui/icons/Edit';
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import CircularProgress from '@material-ui/core/CircularProgress';

function getEditButton(onClickListener) {
    return (<IconButton aria-label="edit"
        color="secondary" onClick={onClickListener}>
        <EditIcon fontSize="medium" />
    </IconButton>);
}

function getDeleteButton(onClickListener) {
    return (<IconButton aria-label="delete" onClick={onClickListener}>
        <DeleteIcon fontSize="medium" />
    </IconButton>);
}

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    margin: {
        margin: theme.spacing(1),
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
    
                    setCurrentTask(fields);
                    
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
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
    const [openDeleteDialog, setDeleteDialog] = React.useState(false);
    const [openEditDialog, setEditDialog] = React.useState(false);

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);
    const [currentTask, setCurrentTask] = React.useState(null);
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Nueva Tarea</h2>
        </div>
    );

    React.useEffect(() => {
        fetch('https://psa-projects.herokuapp.com/projects/project?id='+props.projectId)
            .then(res => res.json())
            .then( result => {
                    setIsLoaded(true);
                    setTasks(result.tasksList);
                }).catch(error => {
                    setIsLoaded(true);
                    setError(error);
                })
    },[props.projectId])

    if (error) {
        return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>
            <CircularProgress />
            <h5 >
            Loading...
            </h5>
            </div>;
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <Container fixed>
                <IconButton aria-label="new" className={classes.margin}>
                    <AddCircleIcon fontSize="large" onClick={handleOpen}
                        style={{ color: green[500] }} />
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </Container>
            {openEditDialog ?
                <EditDialog taskId={currentTask.taskId}/> : <div> </div>
            }

            {openDeleteDialog ?
                <DeleteDialog taskId={currentTask.taskId}/> : <div> </div>
            }
            <Container fixed>
                { ( tasks === undefined ) ?
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
    )
}