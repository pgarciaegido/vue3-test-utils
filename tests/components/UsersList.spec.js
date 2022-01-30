import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import { getMountConfig, getDataTestAttr } from '../utils';
import UsersList from '../../src/components/UsersList.vue';
import api from '../../src/utils/api';

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

jest.mock('../../src/utils/api', () => {
    return {
        getUsers: jest.fn(() => Promise.resolve(mockGetUsers)),
    }
});

afterEach(() => {
    jest.clearAllMocks();
});

const waitMount = async () => {
    const w = shallowMount(UsersList, getMountConfig());
    await flushPromises();
    return w;
}

describe('UsersList', () => {
    test('should render the title correctly', () => {
        const wrapper = shallowMount(UsersList, getMountConfig());
        const title = wrapper.get('h1');

        expect(title.text()).toBe('Users list');
    });

    test('should call getUser method right after the component loads', () => {
        expect(api.getUsers).not.toHaveBeenCalled();
        shallowMount(UsersList, getMountConfig());
        expect(api.getUsers).toHaveBeenCalled();
    });

    test('should not render api error paragraph if api resolves correctly', async () => {
        const wrapper = await waitMount();
        expect(wrapper.find(getDataTestAttr('api-error-message')).exists()).toBe(false);
    });

    test('should render api error paragraph if api fails', async () => {
        api.getUsers.mockRejectedValueOnce({});
        const wrapper = await waitMount();
        expect(wrapper.find(getDataTestAttr('api-error-message')).exists()).toBe(true);
    });

    test('should render users fetched from service', async () => {
        const wrapper = await waitMount();
        const users = wrapper.findAllComponents(getDataTestAttr('user-item'));
        expect(users.length).toBe(mockGetUsers.length);
    });

    test('should modify users when user emits `like` event', async () => {
        const firstUserId = 1;
        const wrapper = await waitMount();
        const firstUser = wrapper.findComponent('user-stub');
        expect(wrapper.vm.store.users[0].liked).toBe(false);
        firstUser.vm.$emit('like', firstUserId);
        expect(wrapper.vm.store.users[0].liked).toBe(true);
    });
});
