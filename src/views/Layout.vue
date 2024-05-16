<script setup>
import LayoutNav from '@/components/Layout/LayoutNav.vue'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
import LayoutFooter from '@/components/Layout/LayoutFooter.vue'
import LayoutFixed from '@/components/Layout/LayoutFixed.vue'
// 觸發獲取header數據列表的 action   // 要寫在首頁才可以都觸發到
import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted  } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())
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
