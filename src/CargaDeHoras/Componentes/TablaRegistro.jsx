import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import { Typography } from '@material-ui/core'
import { useHistory, useLocation } from "react-router-dom";

const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'cantHoras',
    label: 'Cantidad de Horas',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'fechaTrabajada',
    label: 'Fecha Trabajada',
    minwidth: 100,
    align: 'center'
  },
];

const useStyles = makeStyles({
  root: {
    marginTop: 60,
    marginLeft: 50,
    marginRight: 0,
    width: '125%',
  },
  container: {
    maxHeight: 440,
  },
  texto: {
    fontWeight: 600,
  },
});

const TablaRegistro = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState([]); //Datos tabla
  //Manejar errores
  const [iserror, setIserror] = React.useState(false)
  const [errorMessages, setErrorMessage] = React.useState([])

  const api = axios.create({
    baseURL: `http://psa-bac-carga-de-horas.herokuapp.com/`
  })

  const location = useLocation();

  React.useEffect(() => {
    var lista = location.pathname.split('/');
    var idPersona = lista[2];
    var idProyecto = lista[3];
    var url = "/cargas/personas/" + idPersona + "/proyectos/" + idProyecto + "/tareas/" + location.state.codigo + "/registros";

    const timer = setInterval(() => {
      api.get(url)
        .then(res => {
          setData(res.data)
        })
        .catch(error => {
          setErrorMessage(["No se pudieron obtener los registros"])
          setIserror(true)
      })
    }, 5000); //Ponerle 1s despues osea 1000
    return () => clearInterval(timer);
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const history = useHistory();

  const handleClick = (row) => {
    var idRegistro = Object.values(row)[0];
    var cantHoras = Object.values(row)[1];
    var fecha = Object.values(row)[2];
    props.setIdRegistro(idRegistro);
    props.setFecha(fecha);
    props.setHoras(cantHoras);
    props.setEsPatch(true);
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => handleClick(row)}>
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
        labelRowsPerPage= 'Filas por pagina'
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


export default TablaRegistro