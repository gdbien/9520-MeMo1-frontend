import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import Navbar from './Componentes/NavBar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TablaProyecto from './Componentes/TablaProyecto'
import TablaTarea from './Componentes/TablaTarea'

const estilos = makeStyles(theme => ({
    tabla: {
        marginTop: 20,
        marginLeft: 350,
        float: 'left',
    },
    tabla2: {
        marginTop: 20,
        marginRight: 350,
        float: 'right',
    },
    texto1: {
        marginTop: 60,
    },
    texto2: {
        marginTop: 40,
        marginLeft: 60,
    },
    texto3: {

    },
    backButton: {
        
    },

}))


const Empleado = (props) => {
    const classes = estilos();

    const location = useLocation();

    return (
        
        <div>
            <Navbar/>
            <Typography variant='h5' className={classes.texto1}>
            <IconButton 
                    color="inherit" 
                    aria-label="back" 
                    className={classes.backButton} 
                    href='/hours'
                >
                    <ArrowBackIcon/>
                </IconButton>
                Volver
            </Typography>

            <Typography variant='h6'className={classes.texto2}>
                Empleado: {location.state.detail}
            </Typography>

            <div className={classes.tabla}>
            <TablaProyecto /> 
            </div>
            
            <div className={classes.tabla2}>
            <TablaTarea /> 
            </div>
        </div>
    )
}
export default Empleado