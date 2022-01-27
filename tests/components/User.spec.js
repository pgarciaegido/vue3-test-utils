import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { createTestingPinia } from '@pinia/testing'
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
            global: {
                plugins: [createTestingPinia({
                    stubActions: false,
                })],
            },
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
            },
            global: {
                plugins: [createTestingPinia({
                    stubActions: false,
                })],
            },
        });

        expect(wrapper.find('[data-test="like"]').exists()).toBe(false);
        expect(wrapper.find('[data-test="liked"]').exists()).toBe(true);
    });

    test('should like user when like span is clicked', async () => {
        const id = 1;
        const wrapper = shallowMount(User, {
            props: {
                ...defaultProps,
                id
            },
            global: {
                plugins: [createTestingPinia({
                    stubActions: false,
                })],
            },
        });
        await wrapper.vm.store.getUsers();

        const likedSpan = wrapper.get('[data-test="like"]');
        likedSpan.trigger('click');
        const user = wrapper.vm.store.users.find((user) => user.id === id);
        expect(user.liked).toBe(true);
    });

    test('should push to createUser route when clicking on user', () => {
        const wrapper = shallowMount(User, {
            props: defaultProps,
            global: {
                plugins: [createTestingPinia({
                    stubActions: false,
                })],
            },
        });

        expect(wrapper.router.push).not.toHaveBeenCalled();
        wrapper.trigger('click');
        expect(wrapper.router.push).toHaveBeenCalledWith({
            path: '/create',
            query: {
                city: defaultProps.user.city,
                name: defaultProps.user.name,
            }
        });
    });
});
