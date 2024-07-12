import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuthStore } from '../store/modules/auth'
import { useLangStore } from '../store/modules/lang'

axios.interceptors.request.use(config => {

    config.headers['Accept-Language'] = useLangStore().locale

    return config
})

const axiosInstance = axios.create({
    baseURL: 'http://laravue/api',
    withCredentials: true,

    headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`
    }

})

axiosInstance.interceptors.request.use(config => {

    config.headers['Accept-Language'] = useLangStore().locale

    return config
})

axiosInstance.interceptors.response.use(response => {
    return response
}, error => {
    const authStore = useAuthStore()
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
        if (authStore.user) {
            originalRequest._retry = true
        }

        return axios.post('/api/refresh', {}, {
            headers: {
                Authorization: `Bearer ${authStore.accessToken}`
            }
        }).then(response => {
            authStore.setToken(response.data.access_token)
            originalRequest.headers.authorization = `Bearer ${response.data.access_token}`
            // authStore.getUserByToken()
            axiosInstance.request(originalRequest)
   
            // return axiosInstance.request(originalRequest)
        })
    }
})

export default axiosInstance