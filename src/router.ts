import { createRouter, createWebHistory } from 'vue-router';

import UsersList from './components/UsersList.vue';

const routes = [
    {
        path: '/',
        name: 'UsersList',
        component: UsersList
    },
    {
        path: '/create',
        name: 'CreateUser',
        component: () => import('./components/CreateUser.vue'),
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
