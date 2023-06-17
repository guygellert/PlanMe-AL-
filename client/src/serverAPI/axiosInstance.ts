import axios from "axios"
const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(response => {
    return response
}, async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        const refresh = await axiosInstance.post("/refresh_token")
        const newtoken = refresh.data.newToken
        
        localStorage.setItem("token", newtoken)
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newtoken}`
        originalRequest.headers.Authorization = `Bearer ${newtoken}`
        
        return axiosInstance(originalRequest)
    }
    return error
})

export default axiosInstance