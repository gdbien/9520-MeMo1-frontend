import ClientService from "./client";
import ResourceService from "./resource";

const URL = "http://35.225.18.108:8080/";
const TICKET_LIST_ENDPOINT = "ticket-api/tickets/search";
const TICKET_ENDPOINT = "ticket-api/tickets/";

class TicketService {
    static searchTicket(data) {
        return fetch(URL + TICKET_LIST_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .catch((err) => {console.log('ERR', err);});
    }

    static searchFullTicket(data) {
         return this.searchTicket(data)
             .then((response) => {
                 return Promise.all(response.results.map((ticket) => {
                    return ClientService.getClient(ticket.client_id)
                        .then(resp => ticket["client_name"] = resp["razon social"]);
                 })).then(resp => {
                     return response;
                 })
             })
             .then((response) => {
                 return Promise.all(response.results.map((ticket) => {
                     return ResourceService.getResource(ticket.resource_id)
                         .then(resp => ticket["resource_name"] = resp["nombre"]);
                 })).then(resp => {
                     return response;
                 })
             })
             .catch((err) => {console.log('ERR', err);});
    }

    static createTicket(data) {
        return fetch(URL + TICKET_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .catch((err) => {console.log('ERR', err);});
    }

    static modifyTicket(data) {
        return fetch(URL + TICKET_ENDPOINT + "/" + data.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        })
            .then(resp => resp.json())
            .catch((err) => {console.log('ERR', err);});
    }

    static deleteTicket(data) {
        return fetch(URL + TICKET_ENDPOINT + "/" + data.id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(resp => resp.json())
            .catch((err) => {console.log('ERR', err);});
    }
}

export default TicketService;
