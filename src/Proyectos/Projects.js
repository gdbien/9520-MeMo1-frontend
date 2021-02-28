import React from "react";
import ProjectsList from "./ProjectsList";
import Typography from '@material-ui/core/Typography';
import {Container, CssBaseline} from "@material-ui/core";

export const URL = 'https://psa-projects.herokuapp.com'

function Projects() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography variant="h2" gutterBottom align="center" color="primary">
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