<script setup>
import { getCategoryAPI } from '@/apis/layout'
import { onMounted, ref } from 'vue'

const categoryList = ref([])
const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log(res)
    categoryList.value = res.result
}

onMounted(() => {
    getCategory()
})
</script>

<template>
    <div class="bgArea">
        <img src="/logo.png" alt="">
        <div class="link" v-for="item in categoryList" :key="item.id">
            <router-link class="link" to="/">{{ item.name }}</router-link>
        </div>
        <!-- <span>首頁</span>
        <span>居家</span>
        <span>食品</span>
        <span>服飾</span>
        <span>3C</span>
        <span>其他</span> -->
        <div class="searchArea">
            <input type="text" name="" id="" placeholder="搜尋"> <i class="fa-solid fa-magnifying-glass"></i>

        </div>
        <i class="fa-solid fa-cart-shopping"></i>
    </div>
</template>

<style lang="scss" scoped>
.bgArea {
    height: 100px;
    color: #304539;
    border: 1px solid #000000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 20px;
    font-weight: 700;

    img {
        width: 150px;
        height: 70px;
    }

    .link {
        color: #304539;
        text-decoration: none;
        &:hover{
            color: #8daa9a;
        }
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