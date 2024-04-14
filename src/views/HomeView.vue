<script setup>
import LayoutNav from '@/components/Layout/LayoutNav.vue'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
import LayoutFooter from '@/components/Layout/LayoutFooter.vue'
import LayoutFixed from '@/components/Layout/LayoutFixed.vue'

import HomeCategory from '@/components/Home/HomeCategory.vue'
import HomeBanner from '@/components/Home/HomeBanner.vue'
import HomeNew from '@/components/Home/HomeNew.vue'
import HomeHot from '@/components/Home/HomeHot.vue'
import homeProduct from '@/components/Home/HomeProduct.vue'

// 觸發獲取header數據列表的 action
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())

</script>

<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />

    <HomeCategory />
    <HomeBanner />
    <HomeNew />
    <HomeHot />
    <HomeProduct />

    <LayoutFooter />
</template>

<style lang="scss" scoped></style>
