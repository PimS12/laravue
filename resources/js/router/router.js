import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/modules/auth';
import routes from './routes'
import { i18n } from '../plugins/i18n'

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const userStore = useAuthStore()

    document.title = `${i18n.global.t(`routes.${to.name}`)} | ${import.meta.env.VITE_APP_NAME}`;

    if (to.meta.auth && !userStore.isAuthenticated) {
        return next({ name: 'login' })
    } else if (!to.meta.auth && userStore.isAuthenticated) {
        return next({ name: 'home' })
    } else {
        return next()        
    }
})

export default router


