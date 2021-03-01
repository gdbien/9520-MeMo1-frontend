import React from "react";
import ProjectsList from "./ProjectsList";
import Typography from '@material-ui/core/Typography';
import {Container, CssBaseline} from "@material-ui/core";
import PSANavBar from '../components/Navbar'

export const URL = 'https://psa-projects.herokuapp.com'

function Projects() {
    return (
        <React.Fragment>
            <PSANavBar/>
            <Container maxWidth="sm">
                <Typography variant="h3" gutterBottom align="center" color="primary">
                    Project List
                </Typography>
            </Container>
            <Container fixed>
                <ProjectsList />
            </Container>
        </React.Fragment>
        );
}

export default Projects;