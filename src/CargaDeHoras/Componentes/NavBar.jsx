import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {makeStyles} from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom'
import { Typography } from '@material-ui/core';

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
                    <Typography variant="body2">
                        Inicio
                    </Typography>
                </Link>

                <ArrowForwardIosIcon className={classes.flechitas}/>

                <Link to="/personas">
                    <Typography variant="body2">
                        Personas
                    </Typography>
                </Link>
               
            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Navbar)