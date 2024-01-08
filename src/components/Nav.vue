<template>
<nav class="navbar">
    <div class="nav">
        <router-link to="/">Hem</router-link>
        <router-link to="/logout" v-if="token" @click=submitLogout>Logga ut</router-link>
        <router-link to="/login" v-if="!token">Logga in</router-link>
        <router-link to="/trade">Innehav</router-link>
        <router-link to="/trade/show-all">Börsen</router-link>
    </div>
</nav>
</template>

<script>
import axios from "axios"

export default {
    name: 'Nav',
    props: { },
    data() {
        return {
            token: this.token,
            info: ""
        }
    },
    methods: {
        submitLogout: function () {
            this.setGlobalToken(null);
            this.setGlobalUserId(null);
            this.$router.push('/')
        },
    }
}
</script>
