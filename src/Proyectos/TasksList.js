import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {
    Container,
    CssBaseline,
    FormControl,
    IconButton,
    Input,
    InputLabel, MenuItem, Select,
    Typography
} from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';


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
    { field: 'tickets', headerName: 'Tickets', width: 150 }
];

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
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
    create: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function TasksList(props) {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [tasks, setTasks] = React.useState([]);
    const [name, setName] = React.useState(null);


    var new_task = {
        "projectId":0,
        "name":"",
        "description":"",
        "estimation":0,
        "totalHours":0
    };

    new_task.projectId = props.projectId;

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
        fetch('https://psa-projects.herokuapp.com/tasks', requestOptions)
            .then(r => tasks.push(r));
        handleClose();
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h1 id="title" align="center"> Nueva Tarea </h1>
            <form className={classes.create} noValidate autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name">Nombre</InputLabel>
                    <Input id="name" onChange={event => new_task.name = event.target.value} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="description">Descripcion</InputLabel>
                    <Input id="description" onChange={event => new_task.description = event.target.value} />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="priority-label">Prioridad</InputLabel>
                    <Select
                        labelId="priority-label"
                        id="priority"
                        onChange={event => new_task.priority = event.target.value}
                    >
                        <MenuItem value="BAJA">Baja</MenuItem>
                        <MenuItem value="MEDIA">Media</MenuItem>
                        <MenuItem value="ALTA">Alta</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="estimation">Estimación</InputLabel>
                    <Input id="estimation" onChange={event => new_task.estimation = event.target.value}
                           type="number"/>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="totalHours">Horas Totales</InputLabel>
                    <Input id="totalHours" onChange={event => new_task.totalHours = event.target.value}
                           type="number"/>
                </FormControl>
            </form>
            <Button
                variant="contained"
                color="primary"
                className={classes.margin}
                endIcon={<SendIcon />}
                onClick={createNewTask}
            >
                Aceptar
            </Button>
        </div>
    );

    React.useEffect(() => {
        fetch('https://psa-projects.herokuapp.com/projects/project?id='+props.projectId)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setTasks(result.tasksList);
                    setName(result.name);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    },[props.projectId])

    if (error) {
        return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div> Loading...</div>;
    }


    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" color="secondary">
                    {name}
                </Typography>
            </Container>
            <Container fixed>
                <IconButton aria-label="new" className={classes.margin} onClick={handleOpen}>
                    <AddCircleIcon fontSize="large" style={{ color: green[500] }}/>
                </IconButton>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </Container>
            <Container fixed>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={tasks.map((task) => {
                        task["id"] = task.taskId;
                        return task;
                    })} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </Container>
        </React.Fragment>
    )
}