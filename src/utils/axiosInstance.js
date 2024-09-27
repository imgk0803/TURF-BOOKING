import axios from "axios";

const axiosInstance = axios.create({
    baseURL : 'https://turfbooking-backend.onrender.com'
});

export default axiosInstance;