import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { getRouter } from 'vue-router-mock';
import CreateUser from '../../src/components/CreateUser.vue';
import { getMountConfig, getDataTestAttr } from '../utils';
import api from '../../src/utils/api';

jest.mock('../../src/utils/api', () => {
    return {
        saveUser: jest.fn(() => Promise.resolve('OK')),
    }
});

afterEach(() => {
    jest.clearAllMocks();
});

const getFormElements = (w) => {
    const nameInput = w.get(getDataTestAttr('name'))
    const cityInput = w.get(getDataTestAttr('city'));
    const saveButton = w.get(getDataTestAttr('save'));

    return {
        nameInput,
        cityInput,
        saveButton,
    }
};

describe('User', () => {
    test('should disable save button when either name or city are empty', async () => {
        const wrapper = shallowMount(CreateUser, getMountConfig());
        const { nameInput, cityInput, saveButton } = getFormElements(wrapper);

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
        const wrapper = shallowMount(CreateUser, getMountConfig());
        const { nameInput, cityInput, saveButton } = getFormElements(wrapper);

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
        const wrapper = shallowMount(CreateUser, getMountConfig());
        const { nameInput, cityInput } = getFormElements(wrapper);

        await nextTick();

        expect(nameInput.element.value).toBe(name);
        expect(cityInput.element.value).toBe(city);
    });
});
