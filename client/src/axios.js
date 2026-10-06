 import axios from "axios";

const instance = axios.create({
    baseURL: "https://project-on-articles.onrender.com/" && "http://localhost:4444",
})

 instance.interceptors.request.use((config) => {
     config.headers.Authorization = window.localStorage.getItem("token")
     return config
 })

 export default instance