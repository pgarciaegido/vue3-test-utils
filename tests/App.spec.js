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
});
