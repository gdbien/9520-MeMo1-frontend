import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Typography } from '@material-ui/core'
import { useHistory, useLocation } from "react-router-dom";

const columns = [
  {
    id: 'taskId',
    label: 'Código',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'name',
    label: 'Nombre',
    minWidth: 100,
    align: 'center'
  },
];

const useStyles = makeStyles({
  root: {
    marginTop: 60,
    marginRight: 240,
    marginLeft: -150,
    width: '125%',
  },
  container: {
    maxHeight: 440,
  },
  texto: {
    fontWeight: 600,
  },
});

/*const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);*/



const TablaTarea = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState([]); //Datos tabla
  //Manejar errores
  const [iserror, setIserror] = React.useState(false)
  const [errorMessages, setErrorMessage] = React.useState([])

  const api = axios.create({
    baseURL: `http://psa-projects.herokuapp.com/`
  })

  React.useEffect(() => {
    if (props.projectId) {
      var url = "/projects/project?id=" + props.projectId;
      api.get(url)
        .then(res => {
          setData(res.data.tasksList)
        })
        .catch(error => {
          setErrorMessage(["No se pudieron cargar las tareas"])
          setIserror(true)
        })
    }
  }, [props.projectId])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const history = useHistory();

  const location = useLocation();

  const handleRoute = (row) => {
    var lista = location.pathname.split('/');
    var nombre = location.state.nombre;
    var legajo = location.state.legajo;
    var id = lista[2];
    var nombreTarea = Object.values(row)[1];
    var codigo = Object.values(row)[0]
    history.push({
      pathname: '/personas/' + id + '/' + props.projectId,
      state: { id: props.projectId, tarea: nombreTarea, codigo: codigo, nombre: nombre, legajo: legajo }
    })
  }

  return (
    <Paper className={classes.root}>
      <Typography variant='body2' className={classes.texto}>{props.titulo} </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.taskId} onClick={() => handleRoute(row)}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        labelRowsPerPage= 'Filas por página'
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


export default TablaTarea