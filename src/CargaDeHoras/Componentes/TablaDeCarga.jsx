import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    marginRight: 20,
    marginLeft: 10,
    width: 200,
  },
  texto: {
    marginLeft: -10,
    marginBottom: 60,
    fontWeight: 550,
    fontSize: 18,
    textDecorationLine: 'underline',
    color: "#212121",
  },
  idSeleccionado: {
    marginLeft: 100,
    marginTop: -90,
  },
  texto6: {
    marginTop: -49,
    marginRight: -20,
    float: 'right',
  },
  campo1: {
    marginTop: theme.spacing(-4),
    marginLeft: theme.spacing(0),
  },
  campo2: {
    marginTop: theme.spacing(-7),
    marginLeft: theme.spacing(25),
    width: 70,
  },
}));

const api = axios.create({
  baseURL: `https://psa-bac-carga-de-horas.herokuapp.com`
})

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function TablaDeCarga(props) {

  var url = "/cargas/personas/" + props.idPersona + "/proyectos/" + props.idProyecto + "/tareas/" + props.idTarea;

  var horasIniciales = 0.25;

  var fechaInicial = new Date().toLocaleDateString('en-CA');

  const classes = useStyles();

  const [fecha, setFecha] = React.useState(fechaInicial);

  const [horas, setHoras] = React.useState(horasIniciales);

  const [idRegistro, setIdRegistro] = React.useState(null);

  const [esPatch, setEsPatch] = React.useState(false);

  const [openEliminar, setOpenEliminar] = React.useState(false);

  const [openConfirmar, setOpenConfirmar] = React.useState(false);

  const [openConfirmar2, setOpenConfirmar2] = React.useState(false);

  React.useEffect(() => {
    if (props.idRegistro != null) {
      setFecha(props.fecha);
      setHoras(props.horas);
      setIdRegistro(props.idRegistro);
      setEsPatch(true);
    }
  }, [props.fecha, props.horas, props.idRegistro, props.update])

  const handleClickConfirmar = () => {
    if (esPatch) {
      setOpenConfirmar2(true);
      api.patch(url + "/registros/" + idRegistro, horas,
        { headers: { 'Content-Type': 'application/json' } })
        .then(function () {
          props.setUpdateRegistros(!props.updateRegistros)
        })
    } else {
      setOpenConfirmar(true);
      const bodyPost = {
        "cantidadHoras": horas,
        "fechaTrabajada": fecha
      };
      api.post(url, bodyPost).then(function () {
        props.setUpdateRegistros(!props.updateRegistros)
      })
    }
  };

  const handleClickEliminar = () => {
    setEsPatch(false)
    setFecha(fechaInicial)
    setHoras(horasIniciales)
    setOpenEliminar(false);
    api.delete(url + "/registros/" + idRegistro).then(function () {
      props.setUpdateRegistros(!props.updateRegistros)
    })
  };

  const handleClickLimpiar = () => {
    setEsPatch(false);
    setFecha(fechaInicial);
    setHoras(horasIniciales);
  }

  const handleClickAbrirEliminar = () => {
    setOpenEliminar(true);
  };

  const handleCerrarEliminar = () => {
    setOpenEliminar(false);
  };

  const handleCerrarConfirmar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenConfirmar(false);
  };

  const handleCerrarConfirmar2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenConfirmar2(false);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Typography variant='body1' className={classes.texto}>
        Carga:
        </Typography>
      {esPatch &&
        (<TextField
          className={classes.idSeleccionado}
          value={"ID: " + idRegistro}
          id="outlined-basic"
          variant="outlined"
          style={{ width: 100 }}
          disabled={true}
          inputProps={{ style: { textAlign: 'center', color: 'black' } }} >
        </TextField>)
      }
      <div>
        <TextField
          id="date"
          label="Fecha trabajada"
          type="date"
          value={fecha}
          inputProps={{
            max: new Date().toLocaleDateString('en-CA'),
          }}
          onChange={(event) => {
            setFecha(event.target.value)
          }}
          className={classes.campo1}
          InputLabelProps={{
            shrink: true,
          }}
          disabled={esPatch}
          variant='outlined'
        />
        <TextField
          id="Cantidad de horas"
          label="Cantidad de horas"
          type="number"
          value={horas}
          InputProps={{ inputProps: { min: 0.25, max: 24, step: 0.25 } }}
          onChange={(event) => {
            if (event.target.value > 24) {
              setHoras(24)
            } else {
              if (event.target.value <= 0 || String(event.target.value).length === 0) {
                setHoras(0.25)
              } else {
                setHoras(event.target.value)
              }
            }
          }}
          className={classes.campo2}
          style={{ width: 80 }}
          variant='outlined'
        />
      </div>
      <div className={classes.texto4}>
        <Typography component={'span'} variant='body2' >
          <IconButton
            color="primary"
            aria-label="confirmar"
            onClick={() => handleClickConfirmar()}
          >
            <CheckIcon />
          </IconButton>
            Confirmar
          <Snackbar open={openConfirmar} autoHideDuration={6000} onClose={handleCerrarConfirmar}>
            <Alert onClose={handleCerrarConfirmar} severity="success">
              El registro se cargó con éxito.
            </Alert>
          </Snackbar>
          <Snackbar open={openConfirmar2} autoHideDuration={6000} onClose={handleCerrarConfirmar2}>
            <Alert onClose={handleCerrarConfirmar2} severity="success">
              El registro se actualizó con éxito.
            </Alert>
          </Snackbar>
        </Typography>
      </div>
      <div className={classes.texto6}>
        <Typography component={'span'} variant='body2'>
          <IconButton
            color="inherit"
            aria-label="limpiar"
            onClick={() => handleClickLimpiar()}
          >
            <SettingsBackupRestoreIcon />
          </IconButton>
            Limpiar
        </Typography>
      </div>
      <div className={classes.texto5}>
        {esPatch &&
          <Typography component={'span'} variant='body2'>
            <IconButton
              color="secondary"
              aria-label="eliminar"
              onClick={() => handleClickAbrirEliminar()}
            >
              <BlockIcon />
            </IconButton>
            Eliminar
            <Dialog
              open={openEliminar}
              onClose={handleCerrarEliminar}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Confirme"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  ¿Está seguro de que quiere borrar este registro?
          </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickEliminar} color="primary">
                  Sí
          </Button>
                <Button onClick={handleCerrarEliminar} color="primary" autoFocus>
                  No
          </Button>
              </DialogActions>
            </Dialog>
          </Typography>

        }
      </div>
    </form>
  );
}