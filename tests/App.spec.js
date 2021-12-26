import { mount } from '@vue/test-utils';
import App from '../src/App.vue';

describe('App', () => {
    test('should render the title correctly', () => {
        const wrapper = mount(App);
        const title = wrapper.get('h1');

        expect(title.text()).toBe('Users list');
    });
});
