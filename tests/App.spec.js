import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import App from '../src/App.vue';

const mockGetUsers = [
    {
        id: 1,
        name: 'Miguel',
        city: 'Madrid',
        liked: false,
    },
    {
        id: 2,
        name: 'Paula',
        city: 'Barcelona',
        liked: false,
    },
]

jest.mock('../src/utils/api', () => {
    return {
        getUsers: jest.fn(() => Promise.resolve(mockGetUsers)),
    }
});

describe('App', () => {
    test('should render the title correctly', () => {
        const wrapper = shallowMount(App);
        const title = wrapper.get('h1');

        expect(title.text()).toBe('Users list');
    });

    test('should render users fetched from service', async () => {
        const wrapper = shallowMount(App);
        await flushPromises();
        const users = wrapper.findAllComponents('[data-test="user-item"]');
        expect(users.length).toBe(mockGetUsers.length);
    });

    test('should modify users when user emits `like` event', async () => {
        const firstUserId = 1;
        const wrapper = shallowMount(App);
        await flushPromises();
        const firstUser = wrapper.findComponent('user-stub');
        expect(wrapper.vm.users[0].liked).toBe(false);
        firstUser.vm.$emit('like', firstUserId);
        expect(wrapper.vm.users[0].liked).toBe(true);
    });
});
