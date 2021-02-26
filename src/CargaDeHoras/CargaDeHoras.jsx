import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import Navbar from './Componentes/NavBar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useLocation } from "react-router-dom";
import TablaRegistro from './Componentes/TablaRegistro'
import { withRouter } from 'react-router-dom';
import TablaDeCarga from './Componentes/TablaDeCarga';
import CheckIcon from '@material-ui/icons/Check';
import BlockIcon from '@material-ui/icons/Block';

const estilos = makeStyles(theme => ({
    tabla: {
        marginTop: 0,
        marginLeft: 100,
        float: 'left',
    },
    tabla2: {
        marginTop: -25,
        marginBottom: 250,
        marginRight: 250,
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
        marginTop: 0,
        marginLeft: 60,
    },
    texto4: {
        marginTop: 95,
        marginLeft: 400,
    },
    texto5: {
        marginLeft: 400,
    },
    backButton: {
        
    },

}))

const CargaDeHoras = (props) => {
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
                    onClick={props.history.goBack}
                >
                    <ArrowBackIcon/>
                </IconButton>
                Volver
            </Typography>

            <Typography variant='h6'className={classes.texto2}>
                Tarea: {location.state.tarea}
            </Typography>

            <Typography variant='h6'className={classes.texto3}>
                Código de Tarea: {location.state.codigo}
            </Typography>

            <div className={classes.tabla2}>
                <TablaRegistro titulo='Registros'/> 
            </div>

            <div className={classes.tabla}>
                <TablaDeCarga/>
            </div>
            
            <div className={classes.texto4}>
            <Typography variant='body6' >
                <IconButton 
                    color="primary" 
                    aria-label="confirmar" 
                >
                    <CheckIcon/>
                </IconButton>
                Confirmar
            </Typography>
            </div>
            <div  className={classes.texto5}>
            <Typography variant='body6'>
                <IconButton 
                    color="secondary" 
                    aria-label="eliminar" 
                >
                <BlockIcon/>
            </IconButton>
                Eliminar
            </Typography>
            </div>
            
        </div>
    )
}
export default withRouter(CargaDeHoras) 
