<template>
  <h1>Users list</h1>
  <div class="users-list__wrapper">
    <user v-for="(user, i) in users" :key="i" :user="user" class="user-item" />
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import user from './components/User.vue';
import { getUsers } from './utils/api';

export default {
  name: 'App',
  components: {
    user,   
  },
  setup() {
    const users = ref([]);

    onMounted(async() => {
      const res = await getUsers();
      users.value = res;
    });

    return {
      users,
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
