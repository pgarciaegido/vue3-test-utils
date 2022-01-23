import { shallowMount } from '@vue/test-utils';
import App from '../src/App.vue';

describe('App', () => {
    describe('routes', () => {
        test('should have a navbar with create user and list users links', () => {
            const wrapper = shallowMount(App);
            expect(wrapper.find('[data-test="users-list-route"]').exists()).toBe(true);
            expect(wrapper.find('[data-test="create-user-route"]').exists()).toBe(true);
        });
    });
});
