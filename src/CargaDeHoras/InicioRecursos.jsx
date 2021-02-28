import React from 'react'
import Navbar from './Componentes/NavBar'
import TablaEmpleado from './Componentes/TablaEmpleado'
import Empleado from './Empleado'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CargaDeHoras from './CargaDeHoras';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      marginTop: 150,
    },
  });

const InicioRecursos = () => {
    const classes = useStyles();

    return (
        <Router>
        <Switch>
            <Route path="/personas/:empleado/:proyecto">
                <CargaDeHoras/>
            </Route>
            <Route path="/personas/:empleado">
                <Empleado/>
            </Route>
            <Route path="/personas">
                <div>
                <Navbar />
                <div className={classes.root}>
                    <TablaEmpleado/>
                </div>
                </div>
            </Route>
        </Switch>
      </Router>
    )
}

export default InicioRecursos