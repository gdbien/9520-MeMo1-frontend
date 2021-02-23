import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import Navbar from './Componentes/NavBar'
import TablaTarea from './Componentes/TablaTarea'
import TablaProyecto from './Componentes/TablaProyecto'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const estilos = makeStyles(theme => ({
    tabla: {
        marginTop: -20,
        marginRight: -100,
        float: 'left',
    },
    tabla2: {
        marginTop: -20,
        marginLeft: -100,
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

const Empleado = () => {
    const classes = estilos();
    return (
        
        <div>
            <Navbar/>
            <Typography variant='h5' className={classes.texto1}>
            <IconButton 
                    color="inherit" 
                    aria-label="back" 
                    className={classes.backButton} 
                    
                >
                    <ArrowBackIcon/>
                </IconButton>
                Volver
            </Typography>

            <Typography variant='h6'className={classes.texto2}>
                Empleado: X
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