import { markRaw } from 'vue';
import { defineStore, createPinia } from 'pinia'
import api from './utils/api';
import router from './router';

const pinia = createPinia();

pinia.use(({ store }) => {
    store.router = markRaw(router)
});

export const useStore = defineStore('main', {
    state: () => ({
        form: {
            name: '',
            city: '',
        },
        users: [],
        showApiError: false,
    }),
    actions: {
        async getUsers() {
            try {
                const res = await api.getUsers();
                this.users = res;
            } catch (e) {
                this.showApiError = true;
            }
        },
        likeUser(userId) {
            this.users = this.users.map((user) => user.id === userId
                ? { ...user, liked: true }
                : user);
        },
        async save() {
            await api.saveUser(this.form);
            router.push('/');
        },
    }
})
