import React from 'react';

const URL = "http://psa-projects.herokuapp.com/";
const TASK_GET_ENDPOINT = "tasks";

class TaskService {

    static getTask(id) {
        return fetch(URL + TASK_GET_ENDPOINT + "/ticket?id=" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(resp => {
                console.log(resp);
                return resp.json();
            })
            .catch((err) => {console.log('ERR', err);});
    }
}

export default TaskService;
