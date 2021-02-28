import * as React from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {
    Container,
    CssBaseline,
    FormControl,
    IconButton,
    Input,
    InputLabel, Select,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {green} from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";


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
    { field: 'person', headerName: 'Encargado', width: 150 },
];

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
    const [open, setOpen] = React.useState(false);

    const [tasks, setTasks] = React.useState([]);
    const [name, setName] = React.useState(null);

    const [persons, setPersons] = React.useState([]);

    var new_task = {
        "projectId": 0,
        "name": "",
        "description": "",
        "estimation": 0,
        "totalHours": 0,
        "resourceName":"",
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
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(new_task)
        };
        fetch('https://psa-projects.herokuapp.com/tasks', requestOptions)

        handleClose();
        /*window.location.reload(false);*/
    };

    const handleChangeSelect = (event) => {
        new_task.resourceName=event.target.value;
    };

    const handleChangeName = (event) => {
        new_task.name=event.target.value;
    };

    const handleChangeDesc = (event) => {
        new_task.description = event.target.value;
    };

    const handleChangeHours = (event) => {
        new_task.totalHours = event.target.value;
    };

    const handleChangeEst = (event) => {
        new_task.estimation = event.target.value;
    };

    const body = (
        <div>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Nueva Tarea</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-name"> Nombre </InputLabel>
                            <Input id="text-name" aria-describedby="name" onChange={handleChangeName}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-desc"> Descripcion </InputLabel>
                            <Input id="text-desc" aria-describedby="desc" onChange={handleChangeDesc}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-total-hours"> Horas Totales </InputLabel>
                            <Input id="text-total-hours" aria-describedby="total-hours"
                                   type="number" onChange={handleChangeHours}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="text-estimation"> Horas Totales </InputLabel>
                            <Input id="text-estimation" aria-describedby="estimation"
                                   type="number" onChange={handleChangeEst}/>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="select-encargado"> Encargado </InputLabel>
                            <Select
                                native
                                value={new_task.resourceName}
                                onChange={handleChangeSelect}
                                input={<Input id="select-encargado"/>}
                            >
                                {persons.map((person) => (
                                    <option value={
                                        {
                                            "legajo": person.numLegajo,
                                            "name": person.nombre + ' ' + person.apellido
                                        }
                                    }>
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
        fetch('https://psa-projects.herokuapp.com/projects/project?id=' + props.projectId)
            .then(res => res.json())
            .then(
                (result) => {
                    setTasks(result.tasksList);
                    setName(result.name);
                }
            )
    },[props.projectId])

    React.useEffect(() => {
        fetch('https://psa-bac-carga-de-horas.herokuapp.com/personas')
            .then(res => res.json())
            .then(
                (result) => {
                    setPersons(result);
                }
            )
    },[])

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
                {body}
            </Container>
            <Container fixed>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid rows={tasks.map((task) => {
                        task["id"] = task.taskId;
                        return task;
                    })} columns={columns} pageSize={5} />
                </div>
            </Container>
        </React.Fragment>
    );
}