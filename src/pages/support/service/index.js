const URL = "http://35.225.18.108:8080/";
const TICKER_LIST_ENDPOINT = "ticket-api/tickets/search";

class TicketService {
    static searchTicket(data) {
        return fetch(URL + TICKER_LIST_ENDPOINT, {
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
}

export default TicketService;
