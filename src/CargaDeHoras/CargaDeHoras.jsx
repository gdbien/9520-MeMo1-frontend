import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import Navbar from './Componentes/NavBar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useLocation } from "react-router-dom";
import TablaRegistro from './Componentes/TablaRegistro'
import { withRouter } from 'react-router-dom';
import TablaDeCarga from './Componentes/TablaDeCarga';

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
        marginTop: 75,
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

    const [fecha, setFecha] = React.useState(new Date().toLocaleDateString('en-CA'));

    const [horas, setHoras] = React.useState(0.25);

    const [idRegistro, setIdRegistro] = React.useState(null);

    const [update, setUpdate] = React.useState(false);

    const [updateRegistros, setUpdateRegistros] = React.useState(false);

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
                Código de tarea: {location.state.codigo}
            </Typography>

            <div className={classes.tabla2}>
                <TablaRegistro titulo='Registros' setFecha={setFecha} setHoras={setHoras} setIdRegistro={setIdRegistro} setUpdate={setUpdate} update={update} updateRegistros={updateRegistros}/> 
            </div>

            <div className={classes.tabla}>
                <TablaDeCarga idRegistro={idRegistro} fecha={fecha} horas={horas} idPersona={location.state.legajo} idProyecto={location.state.id} idTarea={location.state.codigo} update={update} setUpdateRegistros={setUpdateRegistros} updateRegistros={updateRegistros}/>
            </div>   
            
        </div>
    )
}
export default withRouter(CargaDeHoras) 
