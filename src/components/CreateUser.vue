<template>
    <div class="create-user">
        <input v-model="form.name" type="text" data-test="name">
        <input v-model="form.city" type="text" data-test="city">
        <button :disabled="disableButton" data-test="save" @click="save">Save</button>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import api from '../utils/api';

export default {
    setup() {
        const route = useRoute()
        const form = reactive({
            name: '',
            city: '',
        })

        const save = () => api.saveUser(form);

        const disableButton = computed(() => !form.name || !form.city);

        onMounted(() => {
            if (route.query.name && route.query.city) {
                form.name = route.query.name;
                form.city = route.query.city;
            }
        });

        return {
            form,
            save,
            disableButton,
        };
    }
}
</script>
