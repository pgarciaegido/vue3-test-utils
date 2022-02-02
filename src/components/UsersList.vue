<template>
  <h1>Users list</h1>
  <div data-test="users-list" class="users-list__wrapper">
    <user
      v-for="(user, i) in store.users"
      :key="i"
      :user="user"
      class="user-item"
      data-test="user-item"
      @like="store.likeUser"
    />
    <p
      v-if="store.showApiError"
      class="users-list__error-paragraph"
      data-test="api-error-message"
    >Ha habido un error</p>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import user from './User.vue';
import { useStore } from '../store';

export default {
  name: 'App',
  components: {
    user,
  },
  setup() {
    const store = useStore();

    onMounted(async () => store.getUsers());

    return {
      store,
    }
  }
}
</script>

<style>
.users-list__wrapper .user:not(:last-child) {
  margin-bottom: 10px;
}
</style>
