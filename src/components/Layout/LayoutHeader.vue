<script setup>
import HeaderCart from './HeaderCart.vue';
import { useCategoryStore } from '@/stores/categoryStore'

// 使用 pinna 管理
const categoryStore = useCategoryStore()

</script>

<template>
    <div class="bgArea">
        <img src="/logo.png" alt="">
        <RouterLink class="link" exact-active-class="active" to="/">首頁</RouterLink>
        <div class="rounterItem" v-for="item in categoryStore.categoryList" :key="item.id">
            <RouterLink class="link"  active-class="active" :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        </div>
        <div class="searchArea">
            <input type="text" name="" id="" placeholder="搜尋"> <i class="fa-solid fa-magnifying-glass"></i>

        </div>
        <!-- <i class="fa-solid fa-cart-shopping"></i> -->
        <HeaderCart />
    </div>
</template>

<style lang="scss" scoped>
.bgArea {
    height: 80px;
    color: #304539;
    border-bottom: 1px solid #7a8d78;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    font-weight: 700;

    img {
        width: 140px;
        height: 60px;
    }

    .link {
        color: #304539;
        text-decoration: none;

        &:hover {
            color: #8daa9a;
            border-bottom: 1px solid #304539;

        }
    }

    .active {
        color: #8daa9a;
        border-bottom: 1px solid #304539;
    }


    input {
        width: 150px;
        height: 25px;
        border: white;
        border-bottom: 2px solid #82998b;
        padding-left: 5px;
    }

    .fa-magnifying-glass {
        font-size: 16pt;

        &:hover {
            cursor: pointer;
            color: #9eb3a7;
        }
    }

    .fa-cart-shopping {
        font-size: 20pt;
    }
}
</style>