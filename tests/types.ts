import { VueWrapper } from '@vue/test-utils/dist/vueWrapper';
import { ComponentPublicInstance } from 'vue';
import { IState as Store } from '../src/store';

export interface VmStore extends ComponentPublicInstance {
    store: Store;
};

export interface RelaxedWrapper extends VueWrapper<VmStore> {
    vm: VmStore;
};
