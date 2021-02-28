import React from 'react'
import { makeStyles, Typography, IconButton } from '@material-ui/core'
import Navbar from './Componentes/NavBar'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useLocation } from "react-router-dom";
import TablaProyecto from './Componentes/TablaProyecto'
import TablaTarea from './Componentes/TablaTarea'
import { withRouter } from 'react-router-dom';

const estilos = makeStyles(theme => ({
    tabla: {
        marginTop: 0,
        marginLeft: 150,
        float: 'left',
    },
    tabla2: {
        marginTop: 0,
        marginRight: 150,
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
    backButton: {
        
    },

}))


const Empleado = (props) => {
    const classes = estilos();

    const location = useLocation();
    
    const [projectId, setProjectId] = React.useState(null);

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
                Persona: {location.state.nombre}
            </Typography>

            <Typography variant='h6'className={classes.texto3}>
                Número de Legajo: {location.state.legajo}
            </Typography>

            <div className={classes.tabla}>
             <TablaProyecto titulo='Proyectos' setProjectId={setProjectId}/> 
            </div>
            
            <div className={classes.tabla2}>
             <TablaTarea titulo='Tareas' projectId={projectId}/> 
            </div>
        </div>
    )
}
export default withRouter(Empleado)