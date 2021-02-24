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
import TablaTarea from './TablaTarea';

const columns = [
  {
    id: 'codeId',
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

// function createData(codigo, nombre) {
//   return { codigo, nombre };
// }

// const rows = [
//   createData(201, 'Cloud Spring ERP'),
//   createData(300, 'Backend'),
//   createData(400, 'Frontend'),
// ];

const useStyles = makeStyles({
  root: {
    marginTop: 80,
    marginLeft: 100,
    width: '80%',
  },
  container: {
    maxHeight: 440,
  },
  texto: {
    fontWeight: 600,
  },
});



const TablaProyectoTarea = (props) => {
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
    api.get("/projects")
      .then(res => {
        setData(res.data)
        console.log(res.data);
      })
      .catch(error => {
        setErrorMessage(["No se pudieron cargar los proyectos"])
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

  const handleClick = (row) => {
    console.log(row);

    // var id = Object.values(row)[1] + ' ' + Object.values(row)[2];
    // console.log(id)
  };

  return (
    <Paper className={classes.root}>
      <Typography variant='body2' className={classes.texto}>{"Proyectos"} </Typography>
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.codeId} onClick={() => handleClick(row)}>
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


export default TablaProyectoTarea