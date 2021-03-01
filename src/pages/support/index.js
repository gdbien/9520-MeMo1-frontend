import React, {useReducer} from "react";

import SupportBreadcrumbs from "./component/Breadcrumb";
import TicketFilter from "./component/TicketFilter";
import TicketView from "./component/TicketTable";
import Loading from './component/Loading';

import "./styles.scss";
import { initialState, TicketContext, reducer } from "./reducer";
import CreateTicketModal from "./component/CreateTicketModal";
import ShowTicketModal from "./component/ShowTicketModal";
import TasksModal from "./component/TaskModal";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PSANavBar from './../../components/Navbar'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SupportContainer = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const onClose = () => {
        dispatch({ type: "HIDE_ALERT" })
    };

    return (
        <div>
            <TicketContext.Provider value={{ state, dispatch }}>
                <PSANavBar/>
                {state.showCreateTask && <TasksModal/>}
                {state.createTicket && <CreateTicketModal/>}
                {state.showTicket && <ShowTicketModal/>}
                <SupportBreadcrumbs/>
                <h1 className="support-list-title">Buscador de tickets</h1>
                <TicketFilter/>
                {state.tickets.length !== 0 && <TicketView/>}
                <Loading/>
                <Snackbar open={state.alert.show} autoHideDuration={4000} onClose={onClose}>
                    <Alert onClose={onClose} severity="success">
                        {state.alert.text}
                    </Alert>
                </Snackbar>
            </TicketContext.Provider>
        </div>
    );
};

export default SupportContainer;
