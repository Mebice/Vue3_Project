<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class="header">
        <RouterLink class="routerItem" to="/">Home</RouterLink>
        <RouterLink class="routerItem" to="/aaa">aaa</RouterLink>
    </div>
</template>

<style lang="scss" scoped>
.header {
    height: 50px;
    // background-color: #ecb5b5;
    display: flex;
    justify-content: space-around; //均勻分布
    align-items: center;

    .routerItem{
        text-decoration: none;
        color: #000000;

        &:hover{
            color: #606060;
        }
    }
}
</style>