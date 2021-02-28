import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import {URL} from './Projects'

export default function DeleteDialog({taskId, handleExternalClose}) {

    const [popOpen, setPopOpen] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    
    const handleAcceptPop = () => {
        setPopOpen(false);
        setIsLoading(true);
        deleteTask()
    };
    
    const handleClosePop = () => {
        setPopOpen(false);
        handleExternalClose()
    };

    const deleteTask = async () => {
        const response = await fetch(URL + '/tasks?id=' + taskId,  {
                method: 'delete',
                headers: {
                    'Access-Control-Allow-Origin':'*'
                  }
                })
        console.log(response)
        setIsLoading(false);
        setPopOpen(false);
        window.location.reload();
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