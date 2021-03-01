import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Chip from '@material-ui/core/Chip';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { TicketContext } from "../../reducer";
import ResourceService from "../../service/resource";
import ClientService from "../../service/client";
import TaskService from "../../service/task";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

const useStyles = makeStyles({
    button: {
        float: "right",
        margin: "10px 20px 10px"
    }
});

function Row(props) {
    const { row } = props;
    const classes = useRowStyles();
    const { state, dispatch } = useContext(TicketContext);

    const handleRowClick = (event, id) => {
        dispatch({ type: 'LOADING' });
        const actualTicket = state.tickets.filter(ticket => ticket.id === id);
        const showTicket = { ...actualTicket[0] };

        ResourceService.listResource()
            .then((resp) => {
                dispatch({ type: 'SET_RESOURCE', resource: resp });
            })
            .then(TaskService.getTask(id)
                .then(resp => {
                    dispatch({ type: 'SET_TASK', task: resp })
                    dispatch({ type: 'FINISH_LOADING' });
                    dispatch({ type: 'SHOW_TICKET', actualTicket: showTicket, originalTicket: {...showTicket} });
                })
            );
    };

    return (
        <React.Fragment>
            <TableRow hover className={classes.root} key={row.id} onClick={(event) => handleRowClick(event, row.id)}>
                <TableCell>{row.title}</TableCell>
                <TableCell align="right">{row.severity}</TableCell>
                <TableCell align="right">{row.expiration_date.split("T")[0].replace(/-/g, "/")}</TableCell>
                <TableCell align="center">
                    <Chip label={state.status[row.status]}/>
                </TableCell>
                <TableCell align="right">{row.client_name}</TableCell>
                <TableCell align="right">{row.resource_name}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const TicketTable = () => {
    const { state, dispatch } = useContext(TicketContext);
    const classes = useStyles();

    const handleAddClick = () => {
        dispatch({ type: 'LOADING' });
        ResourceService.listResource()
            .then((resp) => {
                dispatch({ type: 'SET_RESOURCE', resource: resp });
            })
            .then(ClientService.listClient()
                .then((resp) => {
                    dispatch({ type: 'SET_CLIENT', client: resp });
                }))
            .then(TaskService.listProject()
                .then(resp => dispatch({ task: 'SET_PROJECT', project: resp })))
            .then(() => {
                dispatch({ type: 'FINISH_LOADING' });
                dispatch({ type: 'CREATE_TICKET' })
            });
    };

    const handleChangePage = (event, newPage) => {
        return 1;
    };

    const handleChangeRowsPerPage = (event) => {
       return 1;
    };

    return (
        <div className="support-table">
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleAddClick}
            >
                Agregar
            </Button>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Título</TableCell>
                            <TableCell align="right">Severidad</TableCell>
                            <TableCell align="right">Fecha de expiración</TableCell>
                            <TableCell align="center">Estado</TableCell>
                            <TableCell align="right">Cliente</TableCell>
                            <TableCell align="right">Recurso</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.tickets.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={state.tickets.length}
                rowsPerPage={10}
                page={0}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
};

export default TicketTable;
