/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const baseUrl = "/api/users";

let token = null;

const setToken = (newToken) => {
    token = `bearer ${newToken}`;
    console.log(token);
}

const getAll = async () => {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
}

const create = async newObject => {
    const response = await axios.post(baseUrl, newObject);
    return response.data;   
}

const remove = (id, name) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
}

export { getAll, create, remove, update, setToken };