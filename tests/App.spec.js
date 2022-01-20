import { mount } from '@vue/test-utils';
import router from '../src/router';
import App from '../src/App.vue';
import flushPromises from 'flush-promises';

describe('App', () => {
    describe('routes', () => {
        test('should navigate correctly', async () => {
            router.push('/');
            await router.isReady();

            const wrapper = mount(App, {
                global: {
                    plugins: [router]
                }
            });

            expect(wrapper.find('.create-user').exists()).toBe(false);
            expect(wrapper.find('.users-list__wrapper').exists()).toBe(true);

            wrapper.find('[data-test="create-user-route"]').trigger('click');
            await flushPromises();

            expect(wrapper.find('.users-list__wrapper').exists()).toBe(false);
            expect(wrapper.find('.create-user').exists()).toBe(true);
        });
    });
});
