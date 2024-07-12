import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import axiosInstance from '../../plugins/axios'
import { ref, computed, watch, onMounted } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    // state
    const user = ref(null)
    const accessToken = ref(Cookies.get('accessToken'))

    // getters
    const isAuthenticated = computed(() => {
        return !!accessToken.value
    })

    watch(accessToken, () => {
        if (accessToken.value) {
            getUserByToken()
        } else {
            user.value = null
        }
    })

    onMounted(() => {
        if (accessToken.value) {
            getUserByToken()
        }
    })


    //actions
    const login = async ({ token, remember = false }) => {
        accessToken.value = token
        setToken(token, remember)
    }

    const setToken = (token, remember = false) => {
        try {
            accessToken.value = token
            Cookies.set('accessToken', token, { expires: remember ? 365 : null })
        } catch (error) {
            accessToken.value = null
            Cookies.remove('accessToken')
        }
    }

    const destroyToken = () => {
        accessToken.value = null
        Cookies.remove('accessToken')
    }

    const getUserByToken = async () => {
        axiosInstance.post('/me', {}, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        }).then(response => {
            user.value = response.data
        }).catch(error => {

        })
    }

    const logout = async () => {
        destroyToken()
        user.value = null
    }


    return { 
        user, 
        accessToken, 
        isAuthenticated, 
        setToken,
        getUserByToken,
        login,
        logout
    }
})