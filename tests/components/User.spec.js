import { shallowMount } from '@vue/test-utils';
import User from '../../src/components/User.vue';

const defaultProps = {
    user: {
        id: 1,
        name: 'Pablo',
        city: 'Madrid',
        liked: false,
    }
};

describe('User', () => {
    test('should render given information', () => {
        const wrapper = shallowMount(User, {
            props: defaultProps,
        });
        expect(wrapper.get('[data-test="name"]').text()).toBe(defaultProps.user.name);
        expect(wrapper.get('[data-test="city"]').text()).toBe(defaultProps.user.city);
        expect(wrapper.find('[data-test="like"]').exists()).toBe(true);
        expect(wrapper.find('[data-test="liked"]').exists()).toBe(false);

    });

    test('should render liked span when user is liked and hide like span', () => {
        const wrapper = shallowMount(User, {
            props: {
                user: {
                    ...defaultProps.user,
                    liked: true,
                }
            }
        });

        expect(wrapper.find('[data-test="like"]').exists()).toBe(false);
        expect(wrapper.find('[data-test="liked"]').exists()).toBe(true);
    });

    test('should emit `like` event with user id when like span is clicked', () => {
        const wrapper = shallowMount(User, {
            props: defaultProps,
        });

        const likedSpan = wrapper.get('[data-test="like"]');
        likedSpan.trigger('click');
        expect(wrapper.emitted('like')[0][0]).toBe(defaultProps.user.id);
    });

    test('should push to createUser route when clicking on user', () => {

    });
});
