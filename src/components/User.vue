<template>
    <div class="user" @click="edit">
        <p class="name" data-test="name">{{ user.name }}</p>
        <p class="city" data-test="city">{{ user.city }}</p>

        <span
            v-if="!user.liked"
            class="like"
            @click.stop="store.likeUser(user.id)"
            data-test="like"
        >Like!</span>
        <span v-else class="liked" data-test="liked">Liked!</span>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from '../store';

export default {
    props: {
        user: {
            type: Object,
            default: () => { }
        }
    },
    emits: {
        like: {
            submit: (userId) => !!userId
        },
    },
    setup(props) {
        const router = useRouter();

        const store = useStore();

        const edit = () => router.push({ path: '/create', query: { name: props.user.name, city: props.user.city } });

        return {
            store,
            edit,
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
