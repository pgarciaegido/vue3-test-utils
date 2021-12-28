<template>
    <div class="user">
        <p class="name" data-test="name">{{user.name}}</p>
        <p class="city" data-test="city">{{user.city}}</p>

        <span v-if="!user.liked" class="like" @click="likeUser" data-test="like">Like!</span>
        <span v-else class="liked" data-test="liked">Liked!</span>
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
    emits: {
        like: {
            submit: (userId) => !!userId
        },
    },
    setup(props, { emit }) {
        const likeUser = () => emit('like', props.user.id);

        return {
            likeUser
        }
    }
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
.user .like {
    cursor: pointer;
}
</style>
