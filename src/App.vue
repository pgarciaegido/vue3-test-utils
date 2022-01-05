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
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import user from './components/User.vue';
import api from './utils/api';

export default {
  name: 'App',
  components: {
    user,
  },
  setup() {
    const users = ref([]);

    onMounted(async() => {
      const res = await api.getUsers();
      users.value = res;
    });

    const likeUser = (userId) => {
      users.value = users.value.map((user) => user.id === userId
        ? { ...user, liked: true } 
        : user);
    }

    return {
      users,
      likeUser,
    }
  }
}
</script>

<style>
h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.users-list__wrapper .user:not(:last-child) {
  margin-bottom: 10px;
}
</style>
