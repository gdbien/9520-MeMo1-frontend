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
    client: [
        {
            "id": 1,
            "razon social": "FIUBA",
            "CUIT": "20-12345678-2"
        },
        {
            "id": 2,
            "razon social": "FSOC",
            "CUIT": "20-12345678-5"
        },
        {
            "id": 3,
            "razon social": "Macro",
            "CUIT": "20-12345678-3"
        }
    ],
    resource: [],
    tickets: [],
    filter: {
        severity: "TODOS",
        status: "TODOS",
        client: "TODOS",
    },
    loading: false,
    createTicket: false,
    ticketToCreate: {"description": "", "status": "OPEN"},
    buttonCreateTicket: false,
    showTicket: false,
    actualTicket: null,
    originalTicket: null,
    showCreateTask: false,
    tasks: [],
    task: {
        "projectId": 0,
        "name": "",
        "description": "",
        "estimation": 0,
        "totalHours": 0,
        "priority": 0,
        "state": "",
        "resourceName":"",
        "resourceId":""
    },
    project: [
        {
            "codeId": 1,
            "name": "PSA-BAC",
            "state": "EN PROGRESO",
            "creationDate": "2021-03-01",
            "owner": ""
        },
        {
            "codeId": 4,
            "name": "ERP Cloud",
            "state": "NUEVO",
            "creationDate": "2021-03-01",
            "owner": "Tomás Brunellechi"
        },
        {
            "codeId": 5,
            "name": "Project X",
            "state": "NUEVO",
            "creationDate": "2021-03-01",
            "owner": "Gabriel Batistuta"
        }
    ],
    alert: {
        text: "",
        show: false,
    },
    confirmationModal: false,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'SHOW_CONFIRMATION_MODAL':
            return {
                ...state,
                confirmationModal: true,
            };
        case 'CLOSE_CONFIRMATION_MODAL':
            return {
                ...state,
                confirmationModal: false,
            };
        case 'SHOW_ALERT':
            return {
                ...state,
                alert: {
                    ...state.alert,
                    text: action.text,
                    show: true,
                }
            };
        case 'HIDE_ALERT':
            return {
                ...state,
                alert: {
                    ...state.alert,
                    text: "",
                    show: false,
                }
            };
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
        case 'CHANGE_CLIENT_FILTER':
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
                originalTicket: null,
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
        case 'DISABLE_BUTTON_TO_CREATE':
            return {
                ...state,
                buttonCreateTicket: false,
            };
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
        case 'CLOSE_CREATE_TASK': {
            return {
                ...state,
                showCreateTask: false,
            }
        }
        case 'SET_TASK':
            return {
                ...state,
                tasks: action.task,
            };
        case 'SET_PROJECT':
            return {
                ...state,
                project: action.project,
            };
        default:
            return state;
    }
};
