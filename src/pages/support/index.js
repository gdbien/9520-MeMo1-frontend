import React, {useReducer} from "react";

import SupportBreadcrumbs from "./component/Breadcrumb";
import TicketFilter from "./component/TicketFilter";
import TicketView from "./component/TicketView";
import Loading from './component/Loading';

import "./styles.scss";
import { initialState, TicketContext, reducer } from "./reducer";

const SupportContainer = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <TicketContext.Provider value={{ state, dispatch }}>
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
