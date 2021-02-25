import React, {useContext, useReducer} from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from "@material-ui/core/styles";
import { TicketContext } from "../../reducer";
import TicketService from "../../service/index";

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
    const { state, dispatch } = useContext(TicketContext);;
    const classes = useStyle();

    const handleChange = (event, section) => {
        if (section === 'PRIORITY') {
            dispatch({type: 'CHANGE_PRIORITY_FILTER', value: event.target.value});
        } else if (section === 'STATUS') {
            dispatch({type: 'CHANGE_STATUS_FILTER', value: event.target.value});
        } else if (section === 'PROJECT') {
            dispatch({type: 'CHANGE_PRJECT_FILTER', value: event.target.value});
        }
    };

    const handleSearch = () => {
        dispatch({ type: 'LOADING' });
        const data = {

        };
        TicketService.searchTicket(data)
            .then(result => {
                console.log(result);
                dispatch({ type: 'LIST_TICKETS', tickets: result.results });
                dispatch({ type: 'FINISH_LOADING' });
            });
    };

    return (
      <Card className="support-card-filter">
          <FormControl className={classes.filterInput}>
              <InputLabel id="priority-simple-select-label">Prioridad</InputLabel>
              <Select
                  id="priority-simple-select"
                  value={state.filter.priority}
                  onChange={(e) => {handleChange(e, "PRIORITY")}}
              >
                  {state.priority.map((priorities) => (
                      <MenuItem value={priorities}>{priorities}</MenuItem>
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
                  {state.status.map((statuses) => (
                      <MenuItem value={statuses}>{statuses}</MenuItem>
                  ))}
              </Select>
          </FormControl>
          <FormControl className={classes.filterInput}>
              <InputLabel id="project-simple-select-label">Proyecto</InputLabel>
              <Select
                  id="project-simple-select"
                  value={state.filter.project}
                  onChange={(e) => {handleChange(e, "PROJECT")}}
              >
                  {state.project.map((priorities) => (
                      <MenuItem value={priorities}>{priorities}</MenuItem>
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
