import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import {
    Link
} from 'react-router-dom'

const Navbar = (props) => {


    return (
        <AppBar color='transparent'>
            <Toolbar>

                <ArrowForwardIosIcon fontSize="small"/>

                <Link to="/">
                     Inicio
                </Link>

                <ArrowForwardIosIcon fontSize="small"/>

                <Link to="/resources">
                     Recursos
                </Link>

            </Toolbar>
        </AppBar>
    )
}

export default Navbar