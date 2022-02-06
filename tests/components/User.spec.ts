import { shallowMount } from '@vue/test-utils';
import User from '../../src/components/User.vue';
import { getMountConfig, getDataTestAttr } from '../utils';

const defaultProps = {
    user: {
        id: 1,
        name: 'Pablo',
        city: 'Madrid',
        liked: false,
    }
};

const getLikeElement = (w) => w.find(getDataTestAttr('like'));
const getLikedElement = (w) => w.find(getDataTestAttr('liked'));

describe('User', () => {
    test('should render given information', () => {
        const wrapper = shallowMount(User, getMountConfig({ props: defaultProps }));
        expect(wrapper.get(getDataTestAttr('name')).text()).toBe(defaultProps.user.name);
        expect(wrapper.get(getDataTestAttr('city')).text()).toBe(defaultProps.user.city);
        expect(getLikeElement(wrapper).exists()).toBe(true);
        expect(getLikedElement(wrapper).exists()).toBe(false);
    });

    test('should render liked span when user is liked and hide like span', () => {
        const props = {
            user: {
                ...defaultProps.user,
                liked: true,
            }
        };
        const wrapper = shallowMount(User, getMountConfig({ props }));

        expect(getLikeElement(wrapper).exists()).toBe(false);
        expect(getLikedElement(wrapper).exists()).toBe(true);
    });

    test('should like user when like span is clicked', async () => {
        const id = 1;
        const props = {
            ...defaultProps,
            id
        };
        const wrapper = shallowMount(User, getMountConfig({ props }));
        await wrapper.vm.store.getUsers();

        const likedSpan = wrapper.get(getDataTestAttr('like'));
        likedSpan.trigger('click');
        const user = wrapper.vm.store.users.find((user) => user.id === id);
        expect(user.liked).toBe(true);
    });

    test('should push to createUser route when clicking on user', () => {
        const wrapper = shallowMount(User, getMountConfig({ props: defaultProps }));
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
