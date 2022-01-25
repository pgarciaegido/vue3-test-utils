<template>
    <div class="create-user">
        <input v-model="store.form.name" type="text" data-test="name" />
        <input v-model="store.form.city" type="text" data-test="city" />
        <button :disabled="disableButton" data-test="save" @click="store.save">Save</button>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '../store';

export default {
    setup() {
        const route = useRoute()
        const store = useStore()
        const disableButton = computed(() => !store.form.name || !store.form.city);

        onMounted(() => {
            if (route.query.name && route.query.city) {
                store.form.name = route.query.name;
                store.form.city = route.query.city;
            }
        });

        return {
            save,
            disableButton,
            store,
        };
    }
}
</script>
