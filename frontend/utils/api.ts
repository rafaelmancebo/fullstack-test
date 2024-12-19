import axios from 'axios';
const mainURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const api = axios.create({
    baseURL: mainURL, // Replace with your API base URL
    timeout: 1000, // Optional timeout setting
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow CORS
    },
});

export default api;
