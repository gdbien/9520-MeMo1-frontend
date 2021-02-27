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
import { useHistory } from "react-router-dom";

const columns = [
  {
    id: 'numLegajo',
    label: 'Legajo N°',
    minWidth: 50,
    align: 'center'
  },
  {
    id: 'nombre',
    label: 'Nombres',
    minWidth: 100,
    align: 'center'
  },
  {
    id: 'apellido',
    label: 'Apellidos',
    minWidth: 100,
    align: 'center',
  },
];

const useStyles = makeStyles({
  root: {
    marginTop: 80,
    marginLeft: 200,
    width: '60%',
  },
  container: {
    maxHeight: 440,
  },
});

const api = axios.create({
  baseURL: `https://psa-bac-carga-de-horas.herokuapp.com`
})

const TablaEmpleado = () => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [data, setData] = React.useState([]); //Datos tabla
  //Manejar errores
  const [iserror, setIserror] = React.useState(false)
  const [errorMessages, setErrorMessage] = React.useState([])

  React.useEffect(() => {
    api.get("/personas")
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        setErrorMessage(["No se pudieron cargar los empleados"])
        setIserror(true)
      })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const history = useHistory();

  const handleRoute = (row) => {
    var nombre = Object.values(row)[1] + ' ' + Object.values(row)[2];
    var id = Object.values(row)[0];
    history.push({
      pathname: '/personas/' + Object.values(row)[0],
      state: { nombre: nombre, legajo: id}
    })
  }

  return (
    <Paper className={classes.root}>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.numLegajo} onClick={() => handleRoute(row)}>
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


export default TablaEmpleado