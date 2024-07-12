// import HomePage from '../pages/HomePage.vue';

function page (path) {
    return () => import(/* @vite-ignore */ path).then(m => m.default || m)
}
  

const routes = [
    {
        component: page('../pages/HomePage.vue'),
        path: '/',
        name: 'home',
        meta: {
            auth: true,
            layout: 'MainLayout'
        }
    },
    {
        component: page('../pages/AboutPage.vue'),
        path: '/about',
        name: 'about',
        meta: {
            auth: true,
            layout: 'MainLayout'
        }
    },
    {
        component: page('../pages/LoginPage.vue'),
        path: '/login',
        name: 'login',
        meta: {
            auth: false,
            layout: 'AuthLayout'
        }
    },


    { path: '/*', component: page('../pages/AboutPage.vue') }
]

export default routes