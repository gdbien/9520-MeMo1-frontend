import React from 'react'
import Navbar from './Componentes/NavBar'
import BarraBusqueda from './Componentes/BarraBusqueda'
import Caja from './Componentes/Caja'


//definimos propiedades para un mismo cajon, parece que son dos, pero son dos definiciones
//para un mismo cajon
const InicioCargaDeHoras = () => {

    return (
        <div>
            <Navbar />
            <BarraBusqueda />
            <Caja />
        </div>
    )
}

export default InicioCargaDeHoras