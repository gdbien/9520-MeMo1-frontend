const URL = "http://35.225.18.108:8080/";
const TICKER_LIST_ENDPOINT = "ticket-api/clients";

class ClientService {
    static listClient() {
        return fetch(URL + TICKER_LIST_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(resp => resp.json())
            .catch((err) => {console.log('ERR', err);});
    }


    static getClient(id) {
        return fetch(URL + TICKER_LIST_ENDPOINT + "/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(resp => resp.json())
            .catch((err) => {console.log('ERR', err);});
    }
}

export default ClientService;
