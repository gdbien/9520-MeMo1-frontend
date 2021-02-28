import React from 'react';

export const TicketContext = React.createContext(null);

export const initialState = {
    severity: ["", "S1", "S2", "S3", "S4"],
    status: {
        "OPEN": "ABIERTO",
        "IN_SUPPORT": "EN SOPORTE",
        "SCALED_TO_ENGINEERING": "ESCALADO EN INGENIERÍA",
        "WAITING_CLIENT_RESPONSE": "ESPERANDO RESPUESTA DEL CLIENTE",
        "SOLUTION_OFFERED": "SOLUCIÓN OFRECIDA",
        "RESOLVED": "RESUELTO"
    },
    client: [],
    resource: null,
    tickets: [],
    filter: {
        severity: "",
        status: "",
        client: "",
    },
    loading: false,
    createTicket: false,
    ticketToCreate: {"description": "", "status": "OPEN"},
    buttonCreateTicket: false,
    showTicket: false,
    actualTicket: null,
    originalTicket: null,
    showCreateTask: false,
    tasks: [
        {
            "taskId": 54,
            "name": "Tarea de ejemplo del proyecto 50",
            "description": "Probando integración",
            "priority": "Ninguna",
            "state": "NUEVA",
            "estimation": 0,
            "totalHours": 20,
            "creationDate": "2021-02-20T00:55:11.000+00:00",
            "projectId": 50,
            "resourceLoads": [],
            "tickets": []
        },
        {
            "taskId": 67,
            "name": "Prueba pathc",
            "description": "esta es otra descrpicon",
            "priority": "Media",
            "state": "Bloqueada",
            "estimation": 45,
            "totalHours": 0,
            "creationDate": "2021-02-27T00:49:56.000+00:00",
            "projectId": 56,
            "resourceLoads": [],
            "tickets": []
        },
        {
            "taskId": 70,
            "name": "sfgsdfd",
            "description": "sgsfgsfg",
            "priority": "media",
            "state": "EN PROGRESO",
            "estimation": 72,
            "totalHours": 0,
            "creationDate": "2021-02-27T00:36:29.000+00:00",
            "projectId": 56,
            "resourceLoads": [],
            "tickets": []
        }
    ],
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
                    severity: action.value,
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
                    client: action.value,
                }
            };
        case 'LIST_TICKETS':
            return {
                ...state,
                tickets: action.tickets,
            };
        case 'SHOW_TICKET':
            return {
                ...state,
                showTicket: true,
                actualTicket: action.actualTicket,
                originalTicket: action.originalTicket,
            };
        case 'CLOSE_SHOW_TICKET':
            return {
                ...state,
                showTicket: false,
                actualTicket: null,
            };
        case 'CREATE_TICKET':
            return {
                ...state,
                createTicket: true,
            };
        case 'CLOSE_CREATE_TICKET':
            return {
                ...state,
                createTicket: false,
            };
        case 'CHANGE_TICKET':
            return {
                ...state,
                actualTicket: {
                    ...state.actualTicket,
                    [action.key]: action.value,
                },
            };
        case 'ADD_TICKET_TO_CREATE':
            return {
                ...state,
                ticketToCreate: {
                    ...state.ticketToCreate,
                    [action.key]: action.value,
                },
            };
        case 'SET_RESOURCE': {
            return {
                ...state,
                resource: action.resource,
            }
        }
        case 'SET_CLIENT': {
            return {
                ...state,
                client: action.client,
            }
        }
        case 'TICKET_SAVED': {
            return {
                ...state,
                showTicket: false,
                actualTicket: null,
                originalTicket: null
            }
        }
        case 'SHOW_BUTTON_TO_CREATE': {
            return {
                ...state,
                buttonCreateTicket: true,
            }
        }
        case 'FINISH_CREATE_TICKET': {
            return {
                ...state,
                buttonCreateTicket: false,
                createTicket: false,
                ticketToCreate: {"description": "", "status": "OPEN"},
            }
        }
        case 'SHOW_CREATE_TASK': {
            return {
                ...state,
                showCreateTask: true,
            }
        }
        default:
            return state;
    }
};
