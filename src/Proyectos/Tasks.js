import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Typography from "@material-ui/core/Typography";

const columns = [
    { field: 'taskId', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'description', headerName: 'Description', width: 130 },
    { field: 'priority', headerName: 'Priority', width: 130 },
    { field: 'state', headerName: 'State', width: 130 },
    { field: 'estimation', headerName: 'Estimation', width: 100 },
    { field: 'totalHours', headerName: 'Total Hours', width: 100 },
    { field: 'creationDate', headerName: 'Creation Date', width: 100 },
    { field: 'projectId', headerName: 'Project ID', width: 100 },
    { field: 'resources', headerName: 'Resources', width: 150 },
    { field: 'tickets', headerName: 'Tickets', width: 150 }
];

export default function Tasks(codeId) {

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [project, setProject] = React.useState(null);

    React.useEffect(() => {
        fetch('https://psa-projects.herokuapp.com/projects/project?id='+codeId.toString())
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProject(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    },[])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if(project === null){
        return(
            <Typography variant="h2" color="secondary" align="center">
            Proyecto no encontrado </Typography>
        );
    } else if(project['taskList'] === []){
        return(<Typography variant="h2" color="primary" align="center">
            No contiene tareas </Typography>
        );
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={project['taskList']} columns={columns} pageSize={5} checkboxSelection />
        </div>
    );
}