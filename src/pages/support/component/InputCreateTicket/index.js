import React, {useContext} from "react";

import 'date-fns';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import {TicketContext} from "../../reducer";

const useStyles = makeStyles((theme) => ({
    input: {
        width: "80%",
        marginTop: "2rem",
    },
}));

const InputCreateTicket = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(TicketContext);

    const checkCreateTicket = () => {
        return  "title" in state.ticketToCreate &&
            "status" in state.ticketToCreate &&
            "severity" in state.ticketToCreate &&
            "client_id" in state.ticketToCreate;
    };

    const handleOnChange = (event, key) => {
        dispatch({ type: "ADD_TICKET_TO_CREATE", key: key, value: event.target.value});
        if (checkCreateTicket()) {
            dispatch({ type: "SHOW_BUTTON_TO_CREATE" });
        }
    };

    return (
        <div className="input-row">
            <div className="input-column">
                <TextField
                    required
                    id="standard-required"
                    label="Título"
                    defaultValue=""
                    className={classes.input}
                    onChange={(e) => {handleOnChange(e, "title")}}
                />
                <FormHelperText>Obligatorio</FormHelperText>
                <TextField
                    id="outlined-multiline-static"
                    className={classes.input}
                    label="Descripción"
                    multiline
                    rows={10}
                    variant="outlined"
                    onChange={(e) => {handleOnChange(e, "description")}}
                />
            </div>
            <div className="input-column">
                <FormControl className={classes.input} disabled>
                    <InputLabel id="demo-simple-select-required-label">Estado</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={state.ticketToCreate.status}
                        onChange={(e) => {handleOnChange(e, "status")}}
                    >
                        {Object.keys(state.status).map((key) => (
                            <MenuItem value={key}>{state.status[key]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl required className={classes.input}>
                    <InputLabel id="demo-simple-select-required-label">Severidad</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={state.ticketToCreate.severity}
                        onChange={(e) => {handleOnChange(e, "severity")}}
                    >
                        {state.severity.map((severity) => (
                            <MenuItem value={severity}>{severity}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Obligatorio</FormHelperText>
                </FormControl>
                <FormControl className={classes.input}>
                    <InputLabel id="demo-simple-select-required-label">Recurso</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={state.ticketToCreate.resource_id}
                        onChange={(e) => {handleOnChange(e, "resource_id")}}
                    >
                        <MenuItem value={null}>{""}</MenuItem>
                        {state.resource.map((resource) => (
                            <MenuItem value={resource.numLegajo}>{resource.nombre}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl required className={classes.input}>
                    <InputLabel id="demo-simple-select-required-label">Cliente</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={state.ticketToCreate.client_id}
                        onChange={(e) => {handleOnChange(e, "client_id")}}
                    >
                        {state.client.map((client) => (
                            <MenuItem value={client["id"]}>{client["razon social"]}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Obligatorio</FormHelperText>
                </FormControl>
            </div>
        </div>
    );
};

export default InputCreateTicket;
