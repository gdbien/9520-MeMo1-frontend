import React from 'react';

const URL = "http://psa-projects.herokuapp.com/";
const TASK_GET_ENDPOINT = "tasks";

class TaskService {

    static getTask(id) {
        const data = [
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
        ];
        return fetch(URL + TASK_GET_ENDPOINT + "/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
            .then(resp => data)
            .catch((err) => {console.log('ERR', err);});
    }
}

export default TaskService;
