import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    barra: {
        backgroundColor: "#88eaf1"
    },
    flechitas: {
        color: "#000000",
        fontSize: "small"
    },
  });


const Navbar = (props) => {

var classes = useStyles();


    return (
        <AppBar className={classes.barra} >
            <Toolbar>

                <ArrowForwardIosIcon className={classes.flechitas}/>

                <Link to="/">
                     Inicio
                </Link>

                <ArrowForwardIosIcon className={classes.flechitas}/>

                <Link to="/resources">
                     Recursos
                </Link>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar