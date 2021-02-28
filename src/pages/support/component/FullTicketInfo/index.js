import React, {useContext} from "react";

import 'date-fns';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import {TicketContext} from "../../reducer";

const useStyles = makeStyles((theme) => ({
    input: {
        width: "80%",
        marginTop: "2rem",
    },
}));

const FullTicketInfo = () => {
    const classes = useStyles();
    const { state, dispatch } = useContext(TicketContext);

    const handleOnChange = (event, key) => {
        dispatch({ type: "CHANGE_TICKET", key: key, value: event.target.value});
    };

    return (
        <div className="input-row">
            <div className="input-column">
                <TextField
                    required
                    id="obligatory-full-ticket-title"
                    label="Título"
                    defaultValue={state.actualTicket.title}
                    className={classes.input}
                    onChange={(e) => {handleOnChange(e, "title")}}
                />
                <TextField
                    id="full-ticket-description"
                    className={classes.input}
                    label="Descripción"
                    defaultValue={state.actualTicket.description}
                    multiline
                    rows={5}
                    variant="outlined"
                    onChange={(e) => {handleOnChange(e, "description")}}
                />
                <div>
                    <h3>Tareas asociadas ({state.tasks.length})</h3>
                    {state.tasks.map((task) => (
                        <div className="row-task">#{task.taskId} {task.name}</div>
                    ))}
                </div>
            </div>
            <div className="input-column">
                <FormControl required className={classes.input}>
                    <InputLabel id="label-full-ticket-state">Estado</InputLabel>
                    <Select
                        labelId="label-full-ticket-state-label"
                        id="select-full-ticket-state"
                        value={state.actualTicket.status}
                        onChange={(e) => {handleOnChange(e, "status")}}
                    >
                        {Object.keys(state.status).map((key) => (
                            <MenuItem value={key}>{state.status[key]}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Obligatorio</FormHelperText>
                </FormControl>
                <FormControl required className={classes.input}>
                    <InputLabel id="label-full-ticket-serverity">Severidad</InputLabel>
                    <Select
                        labelId="label-full-ticket-serverity-label"
                        id="select-full-ticket-serverity"
                        value={state.actualTicket.severity}
                        onChange={(e) => {handleOnChange(e, "severity")}}
                    >
                        {state.severity.map((severity) => (
                            <MenuItem value={severity}>{severity}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Obligatorio</FormHelperText>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        className={classes.input}
                        id="date-picker-creation"
                        label="Fecha de creación"
                        format="MM/dd/yyyy"
                        value={state.actualTicket.created_at}
                        onChange={false}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        className={classes.input}
                        id="date-picker-expiration"
                        label="Fecha de vencimiento"
                        format="MM/dd/yyyy"
                        value={state.actualTicket.expiration_date}
                        onChange={false}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <FormControl required className={classes.input}>
                    <InputLabel id="label-full-ticket-resource">Recurso</InputLabel>
                    <Select
                        labelId="label-full-ticket-resource-label"
                        id="select-full-ticket-resource"
                        value={state.actualTicket.resource_id}
                        onChange={(e) => {handleOnChange(e, "resource_id")}}
                    >
                        {state.resource.map((resource) => (
                            <MenuItem value={resource.numLegajo}>{resource.nombre}</MenuItem>
                        ))}
                    </Select>
                    <FormHelperText>Obligatorio</FormHelperText>
                </FormControl>
                <FormControl className={classes.input} disabled>
                    <InputLabel id="label-full-ticket-client">Cliente</InputLabel>
                    <Select
                        labelId="label-full-ticket-client-label"
                        id="select-full-ticket-label"
                        value={1}
                    >
                        <MenuItem value={1}>{state.actualTicket.client_name}</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
};

export default FullTicketInfo;
