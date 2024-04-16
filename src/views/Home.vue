<script setup>
import HomeCategory from '@/components/Home/HomeCategory.vue'
import HomeBanner from '@/components/Home/HomeBanner.vue'
import HomeNew from '@/components/Home/HomeNew.vue'
import HomeHot from '@/components/Home/HomeHot.vue'
import HomeProduct from '@/components/Home/HomeProduct.vue'
// 觸發獲取header數據列表的 action
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())

</script>
<template>
    <HomeCategory />
    <HomeBanner />
    <HomeNew />
    <HomeHot />
    <HomeProduct />
</template>