import { User } from '../types/User';

export default {
    getUsers(): Promise<User[]> {
        return new Promise(res => setTimeout(res, 0, [
            {
                id: 1,
                name: 'Pablo',
                city: 'Madrid',
                liked: false,
            },
            {
                id: 2,
                name: 'Javier',
                city: 'Barcelona',
                liked: false,
            },
            {
                id: 3,
                name: 'Laura',
                city: 'Bogotá',
                liked: false,
            },
            {
                id: 4,
                name: 'María',
                city: 'Ciudad de México',
                liked: false,
            },
        ]));
    },
    saveUser(form: User): Promise<String> {
        console.log(form);
        return Promise.resolve('Ok');
    }
};
