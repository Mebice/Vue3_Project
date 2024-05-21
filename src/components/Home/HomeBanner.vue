<script setup>
import {getBannerAPI} from '@/apis/home'
import {ref,onMounted} from 'vue'

const bannerList = ref([])

const getBanner = async () => {
    const res = await getBannerAPI()
    console.log("Banner輪播圖",res)
    bannerList.value = res.result
}

onMounted( () => getBanner() )

</script>



<template>
    <div class="home-banner">
        <el-carousel height="500px">
            <el-carousel-item v-for="item in bannerList" :key="item.id">
                <img :src="item.imgUrl"
                    alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>



<style scoped lang='scss'>
.home-banner {
    width: 78%;
    height: 495px;
    position: absolute;
    left: 280px;
    top: 120px;
    z-index: 98;

    img {
        width: 100%;
        height: 495px;
    }
}
</style>