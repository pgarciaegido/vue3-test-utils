<template>
  <div id="nav">
    <router-link to="/" data-test="users-list-route">Users List</router-link>
    <router-link to="/create" data-test="create-user-route">Create user</router-link>
  </div>
  <router-view></router-view>
</template>

<script>
</script>

<style>
h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
