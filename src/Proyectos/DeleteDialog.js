import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function DeleteDialog({taskId}) {

    const [popOpen, setPopOpen] = React.useState(true);
    const [mustDelete, setMustDelete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    
    const handleAcceptPop = () => {
        setPopOpen(false);
        setIsLoading(true);
        setMustDelete(true);
    };
    
    const handleClosePop = () => {
        setPopOpen(false);
        window.location.reload();
    };

    const DeleteTask = async () => {
        const response = await fetch('https://psa-projects.herokuapp.com/tasks/tasks?id=' + taskId,  {
                method: 'delete'
                })
        console.log(response)
        setIsLoading(false);
        setMustDelete(false);
        setPopOpen(false);
    }

    if(mustDelete) {
        DeleteTask()
    }

    if(isLoading){
        return (<CircularProgress />)
    }else{
        return ( <Dialog
            open={popOpen} 
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"¿Esta seguro de borrar esta tarea?"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClosePop} color="primary">
                    No
            </Button>
                <Button onClick={handleAcceptPop} color="primary" autoFocus>
                    Si
            </Button>
            </DialogActions>
        </Dialog>);
    }
    
}