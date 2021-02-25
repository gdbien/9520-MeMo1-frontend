import React from 'react';

export const TicketContext = React.createContext(null);

export const initialState = {
    priority: ["", "Muy alta", "Alta", "Media", "Baja"],
    status: ["", "Solucionado", "Activo", "Desestimado"],
    project: [""],
    tickets: [],
    filter: {
        priority: "",
        status: "",
        project: "",
    },
    loading: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true,
            };
        case 'FINISH_LOADING':
            return {
                ...state,
                loading: false,
            };
        case 'CHANGE_PRIORITY_FILTER':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    priority: action.value,
                }
            };
        case 'CHANGE_STATUS_FILTER':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    status: action.value,
                }
            };
        case 'CHANGE_PROJECT_FILTER':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    project: action.value,
                }
            };
        case 'LIST_TICKETS':
            return {
                ...state,
                tickets: action.tickets,
            };
        default:
            return state;
    }
};
