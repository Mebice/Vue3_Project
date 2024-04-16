<script setup>
import LayoutNav from '@/components/Layout/LayoutNav.vue'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
import LayoutFooter from '@/components/Layout/LayoutFooter.vue'
import LayoutFixed from '@/components/Layout/LayoutFixed.vue'

</script>

<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />

    <!-- 二級路由 -->
    <!-- <Header /> -->
    <RouterView />

    <LayoutFooter /> 

</template>

<style lang="scss" scoped></style>
