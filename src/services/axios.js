import axios from 'axios';
import { apis } from "./";

const http = axios.create({
    baseURL: apis.BASE_SERVER_URL,
    headers: {
        'content-type': 'application/json'
    }
});

export default http;
export { http }