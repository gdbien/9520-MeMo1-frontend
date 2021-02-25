import React, { useContext } from 'react'
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
import { ContextoTareas } from '../Contexto/ContextoTareas';

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

const useStyles = makeStyles({
  root: {
    marginTop: 60,
    marginLeft: 0,
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



const TablaProyecto = (props) => {

  const { dataNueva, setDataNueva } = useContext(ContextoTareas);

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
    var id = Object.values(row)[0];
    setDataNueva(id);
  };

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


export default TablaProyecto