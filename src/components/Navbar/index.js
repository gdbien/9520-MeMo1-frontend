import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import logo from './../../static/PSA_LOGO.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingBottom: "20px",
    },
    button: {
        marginLeft: "25px",
    }
}));

export default function PSANavBar() {
    const classes = useStyles();

    const history = useHistory();

    const routeChange = () =>{
        let path = `/`;
        history.push(path);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <img src={logo} style={{maxWidth: "70px"}} onClick={routeChange}/>
                    <Button color="inherit" className={classes.button} href="/support">Soporte</Button>
                    <Button color="inherit" className={classes.button} href="/projects">Proyectos</Button>
                    <Button color="inherit" className={classes.button} href="/personas">Personas</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

