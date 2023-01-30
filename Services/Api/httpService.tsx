import axios from "axios";
//import { serverUrl } from '../config.json';

const UNAUTHORIZED = 401;
const axiosInstance = axios;

axiosInstance.defaults.headers.common = {
    "Access-Control-Allow-Origin": "*"
};

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error && error.response) {
            const { status } = error.response;
            console.log(JSON.stringify(status));
        }
        return Promise.reject(error);
    }
);

export default {
    get: axiosInstance.get,
    post: axiosInstance.post,
    put: axiosInstance.put,
    delete: axiosInstance.delete
};
