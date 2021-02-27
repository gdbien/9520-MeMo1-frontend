import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import axios from 'axios';
import { Button } from '@material-ui/core';


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
    textDecorationLine: 'underline',
    color: "#212121",
  },
  idSeleccionado: {
    marginLeft: 100,
    marginTop: -50,
  },
  texto6: {
    marginTop: -49,
    marginRight: -20,
    float: 'right',
  },
  campo1: {
    marginTop: theme.spacing(0),
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

export default function TablaDeCarga(props) {

  var url = "/cargas/personas/" + props.idPersona + "/proyectos/" + props.idProyecto + "/tareas/" + props.idTarea;

  var horasIniciales = 0.25;

  var fechaInicial = new Date().toLocaleDateString('en-CA');

  const classes = useStyles();

  const [fecha, setFecha] = React.useState(fechaInicial);

  const [horas, setHoras] = React.useState(horasIniciales);

  const [idRegistro, setIdRegistro] = React.useState(null);

  const [esPatch, setEsPatch] = React.useState(false);

  React.useEffect(() => {
    setFecha(props.fecha);
    setHoras(props.horas);
    setIdRegistro(props.idRegistro);
    setEsPatch(props.esPatch);
  }, [props.fecha, props.horas, props.idRegistro, props.esPatch])

  const handleClickConfirmar = () => {
    if (esPatch) {
      //Caso PATCH (se le pasa a la url tambien el idRegistro)
      //Solo se le pasan las horas, sin {}
      api.patch(url + "/registros/" + idRegistro, horas, { headers: {'Content-Type': 'application/json'}});
    } else {
      //Caso POST (no lleva id de registro)
      const bodyPost = {
        "cantidadHoras": horas,
        "fechaTrabajada": fecha
      }; 
      api.post(url,bodyPost);
    } 
  };

  const handleClickEliminar = () => {
    setEsPatch(false)
    setFecha(fechaInicial)
    setHoras(horasIniciales)
    api.delete(url + "/registros/" + idRegistro);
  };

  const handleClickLimpiar = () => {
    if (esPatch == true) 
      setEsPatch(false);
      setFecha(fechaInicial);
      setHoras(horasIniciales);
  }

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
              inputProps={{style: { textAlign: 'center', color: 'black'}}} >   
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
            setHoras(event.target.value)
          }}
          className={classes.campo2}
          style={{ width: 80}}
          variant='outlined'
        />
      </div>
      <div className={classes.texto4}>
        <Typography variant='body2' >
          <IconButton
            color="primary"
            aria-label="confirmar"
            onClick={() => handleClickConfirmar()}
          >
          <CheckIcon />
          </IconButton>
            Confirmar
        </Typography>
      </div>
      <div className={classes.texto6}>
        <Typography variant='body2'>
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
        (<Typography variant='body2'>
          <IconButton
            color="secondary"
            aria-label="eliminar"
            onClick={() => handleClickEliminar()}
          >
        <BlockIcon />
        </IconButton>
            Eliminar
        </Typography>)
      }
      </div>
    </form>
  );
}