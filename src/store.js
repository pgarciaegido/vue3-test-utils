import { defineStore } from 'pinia'
import api from './utils/api';

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
        save() {
            return api.saveUser(this.form);
        },
    }
})
