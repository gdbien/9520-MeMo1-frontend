import React from 'react'
import Navbar from './Componentes/NavBar'
import BarraBusqueda from './Componentes/BarraBusqueda'
import TablaEmpleado from './Componentes/TablaEmpleado'
import Empleado from './Empleado'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const InicioCargaDeHoras = () => {

    return (
        <Router>
        <Switch>
            <Route path="/hours/empleado" component={Empleado}>
            </Route>
            <Route path="/hours" component={InicioCargaDeHoras}>
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

export default InicioCargaDeHoras