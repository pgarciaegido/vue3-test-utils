import { Router } from 'vue-router'
import { User } from '../src/types/User';

declare module '@vue/test-utils' {
    interface VueWrapper {
        router: Router;
    }
}
