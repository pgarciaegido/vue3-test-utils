import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { getRouter } from 'vue-router-mock';
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

    test('should fill inputs with user info from query params', async () => {
        const router = getRouter()
        const name = 'Manuel';
        const city = 'Caracas';

        await router.push(`/create?name=${name}&city=${city}`);
        const wrapper = shallowMount(CreateUser);
        const inputName = wrapper.get('[data-test="name"]');
        const inputCity = wrapper.get('[data-test="city"]');

        await nextTick();

        expect(inputName.element.value).toBe(name);
        expect(inputCity.element.value).toBe(city);
    });
});
