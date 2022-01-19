import { shallowMount } from '@vue/test-utils';
import CreateUser from '../../src/components/CreateUser.vue';
import api from '../../src/utils/api';

jest.mock('../../src/utils/api', () => {
    return {
        saveUser: jest.fn(() => Promise.resolve('OK')),
    }
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('User', () => {
    test('should disable save button when either name or city are empty', async () => {
        const wrapper = shallowMount(CreateUser);
        const nameInput = wrapper.get('[data-test="name"]');
        const cityInput = wrapper.get('[data-test="city"]');
        const saveButton = wrapper.get('[data-test="save"]');

        saveButton.trigger('click');
        expect(api.saveUser).not.toHaveBeenCalled();

        await nameInput.setValue('pablo');
        saveButton.trigger('click');
        expect(api.saveUser).not.toHaveBeenCalled();

        await cityInput.setValue('Madrid');
        saveButton.trigger('click');
        expect(api.saveUser).toHaveBeenCalled();
    });

    test('should call saveUser endpoint with correct values', async () => {
        const wrapper = shallowMount(CreateUser);
        const nameInput = wrapper.get('[data-test="name"]');
        const cityInput = wrapper.get('[data-test="city"]');
        const saveButton = wrapper.get('[data-test="save"]');

        await nameInput.setValue('pablo');
        await cityInput.setValue('Madrid');
        saveButton.trigger('click');

        expect(api.saveUser).toHaveBeenCalledWith({
            name: 'pablo',
            city: 'Madrid',
        });
    });
});
