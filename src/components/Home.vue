<template>
<main>
    <Nav />
</main>
<section>
    <h1>Välkommen!</h1>
    <div class="home">
        <p>Här kan du köpa och sälja aktier.<br>
        För att göra detta måste du vara <a href="/login">inloggad</a>.</p>
        <br><p>Har du inget konto?
        Skaffa ett <a href="/register">här</a>.</p>
    </div>
</section>
</template>

<script>
import Nav from './Nav.vue'

export default {
    name: 'Home',
    props: { },
    components: {
        Nav,
    }
};
</script>

<style>
    .home {
        text-align: center;
    }

    .home a {
        text-decoration: underline;
    }
</style>
