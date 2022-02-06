import { Router } from 'vue-router'

declare module '@vue/test-utils' {
    interface VueWrapper {
        router: Router;
    }
}
