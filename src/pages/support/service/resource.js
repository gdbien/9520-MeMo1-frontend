const URL = "http://psa-bac-carga-de-horas.herokuapp.com/";
const RESURCE_LIST_ENDPOINT = "personas";

class ResourceService {
    static listResource() {
        return fetch(URL + RESURCE_LIST_ENDPOINT, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .catch((err) => {console.log('ERR', err);});
    }


    static getResource(id) {
        return fetch(URL + RESURCE_LIST_ENDPOINT + "/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then((resp) => {
                console.log(resp);
                return resp.json();
            })
            .catch((err) => {console.log('ERR', err);});
    }
}

export default ResourceService;
