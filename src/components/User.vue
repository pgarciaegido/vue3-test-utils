<template>
    <div class="user">
        <p class="name" data-test="name">{{user.name}}</p>
        <p class="city" data-test="city">{{user.city}}</p>
    </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => {}
        }
    },
}
</script>

<style scoped>
.user {
    background-color: lightgray;
    display: flex;
    justify-content: space-between;
    border-radius: 2px;
    padding: 10px;
}
</style>
