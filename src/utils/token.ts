import axios from "axios";

export const axiosRequest = axios.create({
    baseURL: import.meta.env.VITE_API,
})

export function saveToken(token: string) {
    localStorage.setItem('token', token)
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

axiosRequest.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

axiosRequest.interceptors.response.use(
    (response) => response,

    (error) => {
        const original = error.config

        if (original?.url?.startsWith('/Account')) {
            return Promise.reject(error)
        }

        if (error.response?.status === 401) {
            removeToken()
            window.location.href = '/login'
        }

        return Promise.reject(error)

    }
)

export function handleLogout() {
    removeToken()
    window.location.href = '/login'
}