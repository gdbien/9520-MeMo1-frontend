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

  const columns = [
    { id: 'numLegajo', label: 'Legajo N°', minWidth: 170, format: (value) => value.toLocaleString('en-US') },
    { id: 'nombre', label: 'Nombres', minWidth: 100 },
    {
      id: 'apellido',
      label: 'Apellidos',
      minWidth: 170,
      align: 'right',
    },
  ];
  
  const useStyles = makeStyles({
    root: {
      marginTop: 80,
      marginLeft: 100,
      width: '80%',
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

  const [data, setData] = React.useState([]); //table data
  //for error handling
  const [iserror, setIserror] = React.useState(false)
  const [errorMessages, setErrorMessage] = React.useState([])

  React.useEffect(() => {
    api.get("/personas")
      .then(res => {
        setData(res.data)
        console.log(res.data);
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
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
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