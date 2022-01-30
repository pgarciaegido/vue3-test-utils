import { shallowMount } from '@vue/test-utils';
import App from '../src/App.vue';
import { getDataTestAttr } from './utils';

describe('App', () => {
    describe('routes', () => {
        test('should have a navbar with create user and list users links', () => {
            const wrapper = shallowMount(App);
            expect(wrapper.find(getDataTestAttr('users-list-route')).exists()).toBe(true);
            expect(wrapper.find(getDataTestAttr('create-user-route')).exists()).toBe(true);
        });
    });
});
