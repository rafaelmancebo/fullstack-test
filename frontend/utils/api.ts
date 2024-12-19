import axios from 'axios';
const mainURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const api = axios.create({
    baseURL: mainURL, // Replace with your API base URL
});

export default api;
