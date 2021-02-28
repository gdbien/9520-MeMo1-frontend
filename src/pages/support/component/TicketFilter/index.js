import React, { useContext } from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import { TicketContext } from "../../reducer";
import TicketService from "../../service/ticket";

const useStyle = makeStyles({
    filterInput: {
        margin: '20px',
        width: '15%'
    },
    searchFilterButton: {
        margin: '10px 20px 10px',
        float: 'right'
    }
});


const TicketFilter = () => {
    const { state, dispatch } = useContext(TicketContext);
    const classes = useStyle();

    const handleChange = (event, section) => {
        if (section === 'PRIORITY') {
            dispatch({type: 'CHANGE_PRIORITY_FILTER', value: event.target.value});
        } else if (section === 'STATUS') {
            dispatch({type: 'CHANGE_STATUS_FILTER', value: event.target.value});
        } else if (section === 'CLIENT') {
            dispatch({type: 'CHANGE_CLIENT_FILTER', value: event.target.value});
        }
    };

    const handleSearch = () => {
        dispatch({ type: 'LOADING' });
        const data = {"filters": {}};
        Object.keys(state.filter).forEach((key) => {
            if (key === "severity" && state.filter[key] !== "") {
                data.filters["severity_in"] = [state.filter[key]]
            } else if (key === "status" && state.filter[key] !== "") {
                data.filters["status_in"] = [state.filter[key]]
            }
        });
        TicketService.searchFullTicket(data)
            .then(result => {
                dispatch({ type: 'LIST_TICKETS', tickets: result.results });
                dispatch({ type: 'FINISH_LOADING' });
            });
    };

    return (
      <Card className="support-card-filter">
          <FormControl className={classes.filterInput}>
              <InputLabel id="priority-simple-select-label">Severidad</InputLabel>
              <Select
                  id="priority-simple-select"
                  value={state.filter.severity}
                  onChange={(e) => {handleChange(e, "PRIORITY")}}
              >
                  {state.severity.map((severity) => (
                      <MenuItem value={severity}>{severity}</MenuItem>
                  ))}
              </Select>
          </FormControl>
          <FormControl className={classes.filterInput}>
              <InputLabel id="status-simple-select-label">Estado</InputLabel>
              <Select
                  id="status-simple-select"
                  value={state.filter.status}
                  onChange={(e) => {handleChange(e, "STATUS")}}
              >
                  <MenuItem value={""}>{""}</MenuItem>
                  {Object.keys(state.status).map((key) => (
                      <MenuItem value={key}>{state.status[key]}</MenuItem>
                  ))}
              </Select>
          </FormControl>
          <FormControl className={classes.filterInput}>
              <InputLabel id="project-simple-select-label">Cliente</InputLabel>
              <Select
                  id="project-simple-select"
                  value={state.filter.client}
                  onChange={(e) => {handleChange(e, "CLIENT")}}
              >
                  {state.client.map((client) => (
                      <MenuItem value={client}>{client}</MenuItem>
                  ))}
              </Select>
          </FormControl>
          <div>
              <Button
                  variant="contained"
                  color="primary"
                  className={classes.searchFilterButton}
                  onClick={handleSearch}
              >
                  Buscar
              </Button>
          </div>
      </Card>
    );
};

export default TicketFilter;
