import React from 'react'
import {Box, Grid, InputBase} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(12),
        border: '5px solid black'
    }, 
    gridItemLeft: {
        marginLeft: theme.spacing(20)
    },
    grid: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10)
    }

  }));

//Cajas de texto->Box
//bgcolor es background color
//m es de margin y lo toma para todos los lados
//para especificar ponemos mr para right ml para left, mx para right y left,
//my para arriba y abajo, mt para top
//p es de padding, que es el margen interior
//border tamaño del borde
//borderColor
//Grid para armar una grilla, puedo hacer una grilla con cajas
//las Grids tienen 12 espacios, yo le puedo indicar cuantos utilizar
//y de que tamaño van a ser con item xs={tam}
/*            <div style={{border: '14px solid red'}}>
                <p>test</p>
 </div >*/
 //Falta con un map ir creando empleados en la grid
const Caja = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper style={{maxHeight: 200, overflow: 'auto'}}>
            <Grid container className={classes.grid}>

                <Grid item xs={3} className={classes.gridItemLeft}>
                    <Box border={2}>
                        legajo
                    </Box>
                </Grid>

                <Grid item xs={3}>
                    <Box border={2}>
                        nombre
                    </Box>
                </Grid>

                <Grid item xs={3}>
                    <Box border={2}>
                        apellido
                    </Box>
                </Grid>
                
            </Grid>
            </Paper>
        </div>
    )
}

export default Caja