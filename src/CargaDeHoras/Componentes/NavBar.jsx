import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {makeStyles } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {
    Link
} from 'react-router-dom'

//esto permite que el navbar tenga alto dinamico
//y no se sobrepone a los botones o lo que haya.
//el margen separa el texto del icono
//flex grow implica que el titulo va a ocupar todo
//el espacio disponible, por lo tanto empuja al boton
//los breakpoints ayudan con la pantalla responsiva (cambios de tamaño)
const useStyles = makeStyles(theme => ({

    menuButton: {
        marginRight: theme.spacing(2),
    },

    title: {
        flexGrow: 1
    },

    appBar: {
       
    },
}))

//Uso props para pasarle la funcion accionAbrir
const Navbar = (props) => {
    const classes = useStyles()
    return (
        <AppBar color='transparent'>
            <Toolbar>

                <ArrowForwardIosIcon fontSize="small"/>

                <Link to="/">
                     Inicio
                </Link>

                <ArrowForwardIosIcon fontSize="small"/>

                <Link to="/hours">
                     Carga de Horas
                </Link>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar