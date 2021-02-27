import React from 'react'
import Navbar from './Componentes/NavBar'
import BarraBusqueda from './Componentes/BarraBusqueda'
import TablaEmpleado from './Componentes/TablaEmpleado'
import Empleado from './Empleado'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CargaDeHoras from './CargaDeHoras';

const InicioRecursos = () => {

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
                <BarraBusqueda />
                <TablaEmpleado />
                </div>
            </Route>
        </Switch>
      </Router>
    )
}

export default InicioRecursos