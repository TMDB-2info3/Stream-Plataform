<script>

</script>
<template>
    <header>
        <nav>
            <router-link to="/">
                <span class="mdi mdi-home"></span>
            </router-link>
            <router-link to="/filmes">
                <span class="mdi mdi-movie"></span>
            </router-link>
            <router-link to="/tv">
                <span class="mdi mdi-tv"></span>
            </router-link>

            <span class="mdi mdi-menu">
                <ul v-if="" v-for="stream in streams">
                    <li>
                        <router-link to="">

                        </router-link>
                    </li>
                </ul>
            </span>
        </nav>
    </header>
</template>
<style>
 span{
    color: #ffffff;
 }
</style>