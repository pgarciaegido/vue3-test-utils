import { shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import App from '../src/App.vue';

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
        expect(users.length).toBe(4);
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
