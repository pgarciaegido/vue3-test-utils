<template>
  <h1>Users list</h1>
  <div class="users-list__wrapper">
    <user 
      v-for="(user, i) in users"
      :key="i"
      :user="user"
      class="user-item"
      data-test="user-item"
      @like="likeUser" />
    <p
      v-if="showApiError"
      class="users-list__error-paragraph"
      data-test="api-error-message"
    >Ha habido un error</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import user from './User.vue';
import api from '../utils/api';

export default {
  name: 'App',
  components: {
    user,
  },
  setup() {
    const users = ref([]);
    const showApiError = ref(false);

    onMounted(async() => {
      try {
        const res = await api.getUsers();
        users.value = res;
      } catch(e) {
        showApiError.value = true;
      }
    });

    const likeUser = (userId) => {
      users.value = users.value.map((user) => user.id === userId
        ? { ...user, liked: true } 
        : user);
    }

    return {
      users,
      likeUser,
      showApiError,
    }
  }
}
</script>

<style>
.users-list__wrapper .user:not(:last-child) {
  margin-bottom: 10px;
}
</style>
