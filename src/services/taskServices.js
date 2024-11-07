import axios from "axios"; // Axios library to make HTTP requests to a backend API.
import { baseUrl } from "../Urls"; // Import the baseUrl from Urls.js

const apiUrl = `${baseUrl}api/tasks`; // Defines the base URL for the API endpoint that handles tasks.

// Fetches all tasks from the API/server at this endpoint : apiUrl 
export function getTasks() {
    return axios.get(apiUrl);
}

// Adds a new task to the API/server at this endpoint : apiUrl 
export function addTask(task) {
    return axios.post(apiUrl, task);
}

// Updates an existing task with the specified id at this endpoint : apiUrl . 
export function updateTask(id, task) {
    return axios.put(`${apiUrl}/${id}`, task);
}

// Deletes a task with the specified id at this endpoint : apiUrl .
export function deleteTask(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

