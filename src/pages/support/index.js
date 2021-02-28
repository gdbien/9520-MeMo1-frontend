import React, {useReducer} from "react";

import SupportBreadcrumbs from "./component/Breadcrumb";
import TicketFilter from "./component/TicketFilter";
import TicketView from "./component/TicketTable";
import Loading from './component/Loading';
import Button from '@material-ui/core/Button';

import "./styles.scss";
import { initialState, TicketContext, reducer } from "./reducer";
import CreateTicketModal from "./component/CreateTicketModal";
import ShowTicketModal from "./component/ShowTicketModal";

const SupportContainer = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <TicketContext.Provider value={{ state, dispatch }}>
                {state.createTicket && <CreateTicketModal/>}
                {state.showTicket && <ShowTicketModal/>}
                <SupportBreadcrumbs/>
                <h1 className="support-list-title">Buscador de tickets</h1>
                <TicketFilter/>
                {state.tickets.length !== 0 && <TicketView/>}
                <Loading/>
            </TicketContext.Provider>
        </div>
    );
};

export default SupportContainer;
