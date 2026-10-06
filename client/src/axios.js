 import axios from "axios";

const instance = axios.create({
    baseURL: window.location.hostname === "localhost"
    ? "http://localhost:4444"
    : "https://project-on-articles.onrender.com",
})

 instance.interceptors.request.use((config) => {
     config.headers.Authorization = window.localStorage.getItem("token")
     return config
 })

 export default instance