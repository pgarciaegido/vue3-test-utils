import { createTestingPinia } from '@pinia/testing'

export const getMountConfig = ({ props = null } = {}) => ({
    props,
    global: {
        plugins: [createTestingPinia({
            stubActions: false,
        })],
    },
});

export const getDataTestAttr = (name) => `[data-test="${name}"]`;
