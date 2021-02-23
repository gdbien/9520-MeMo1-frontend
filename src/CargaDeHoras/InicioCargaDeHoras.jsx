import React from 'react'
import Navbar from './Componentes/NavBar'
import BarraBusqueda from './Componentes/BarraBusqueda'
import TablaEmpleado from './Componentes/TablaEmpleado'


//definimos propiedades para un mismo cajon, parece que son dos, pero son dos definiciones
//para un mismo cajon
const InicioCargaDeHoras = () => {

    return (
        <div>
            <Navbar />
            <BarraBusqueda />
            <TablaEmpleado />
        </div>
    )
}

export default InicioCargaDeHoras