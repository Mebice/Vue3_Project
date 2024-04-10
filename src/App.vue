<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';

</script>

<template>
    <div class="header">
        <Header />
    </div>

    <RouterView />

</template>

<style lang="scss" scoped>
.header{
height: 70px;
background-color: #ecb5b5;
}
</style>
