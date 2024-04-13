<script setup>
import LayoutNav from '@/components/Layout/LayoutNav.vue'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
import LayoutFooter from '@/components/Layout/LayoutFooter.vue'

import { useScroll } from '@vueuse/core'
</script>

<template>
    <LayoutNav />
    <LayoutHeader />
    <h1>home</h1>
    <div style="height: 500px;"></div>
    <LayoutFooter />
</template>

<style lang="scss" scoped>
</style>
