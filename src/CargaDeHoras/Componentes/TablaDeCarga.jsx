import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

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
  campo1: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(0),
  },
  campo2: {
    marginTop: theme.spacing(-6),
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

  React.useEffect(() => {
    setFecha(props.fecha);
    setHoras(props.horas);
    setIdRegistro(props.idRegistro);
  }, [props.fecha, props.horas, props.idRegistro])

  const handleClickConfirmar = () => {
    if (false/*esPatch*/) {
      //Caso PATCH (se le pasa a la url tambien el idRegistro)
      const bodyPatch = {
        "cantHoras": horas
      };
      api.patch(url + "/registros/" + idRegistro);
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
    api.delete(url + "/registros/" + idRegistro);
  };

  return (

    <form className={classes.root} noValidate autoComplete="off">
      <Typography variant='body1' className={classes.texto}>
        Carga:
        </Typography>
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
          //disabled={esPatch}
        />
        <TextField
          id="Cantidad de horas"
          label="Cantidad de horas"
          type="number"
          value={horas}
          InputProps={{ inputProps: { min: 0.25, max: 24, step: "0.25" } }}
          onChange={(event) => {
            setHoras(event.target.value)
          }}
          variant="outlined"
          className={classes.campo2}
          style={{ width: 80 }}
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
      <div className={classes.texto5}>
        <Typography variant='body2'>
          <IconButton
            color="secondary"
            aria-label="eliminar"
            onClick={() => handleClickEliminar()}
          >
        <BlockIcon />
        </IconButton>
            Eliminar
        </Typography>
      </div>
    </form>
  );
}