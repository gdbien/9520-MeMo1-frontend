import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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

export default function TablaDeCarga(props) {
  const classes = useStyles();

  const [fecha, setFecha] = React.useState(new Date().toLocaleDateString('en-CA'));

  const [horas, setHoras] = React.useState(0);

  React.useEffect(() => {
    setFecha(props.fecha);
    setHoras(props.horas);
  }, [props.fecha, props.horas])
  

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
            console.log(event.target.value)
          }}
          className={classes.campo1}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="Cantidad de horas"
          label="Cantidad de horas"
          type="number"
          value={horas}
          InputProps={{ inputProps: { min: 0, max: 24, step:"0.25"} }}
          onChange={(event) => {
            setHoras(event.target.value)
            console.log(event.target.value)
          }}
          variant="outlined"
          className={classes.campo2}
          style = {{width: 80}}
        />
      </div>
    </form>
  );
}