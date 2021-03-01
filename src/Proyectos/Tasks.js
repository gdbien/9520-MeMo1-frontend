import React from "react";
import Typography from '@material-ui/core/Typography';
import {Container, CssBaseline} from "@material-ui/core";
import TasksList from "./TasksList";
import PSANavBar from "../components/Navbar";

function Tasks(props) {

    return (
        <React.Fragment>
            <PSANavBar />
            <Container maxWidth="sm">
                <Typography variant="h3" gutterBottom align="center" color="primary">
                    Listado de Tareas
                </Typography>
            </Container>
            <Container fixed>
                <TasksList projectId={props.match.params.projectId}/>
            </Container>
        </React.Fragment>
    );
}

export default Tasks;