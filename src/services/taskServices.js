import axios from "axios"; //  axios library to make HTTP requests to a backend API.
const apiUrl = "http://localhost:8080/api/tasks"; // Defines the base URL for the API endpoint that handles tasks.

// Fetches all tasks from the API/server at this endpoint : apiUrl 
export function getTasks() {
    return axios.get(apiUrl);
}

 //  Adds a new task to the API/server at this  at this endpoint : apiUrl 
export function addTask(task) {
    return axios.post(apiUrl, task);
}

// Updates an existing task with the specified id at this  at this endpoint : apiUrl . 
export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

//  Deletes a task with the specified id at this  at this endpoint : apiUrl .
export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}

