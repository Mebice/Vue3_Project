<script setup>
// 以24小時熱榜獲取數據渲染模板
import { fetchHotGoodsAPI } from '@/apis/detail'
import { ref, onMounted , computed } from 'vue';
import { useRoute } from 'vue-router';
// 設計props參數 適配不同的title和數據
const props = defineProps({
    hotProsType : {
        type : Number
    }
})
// 適配 title  1 : 24小時熱榜 , 2 : 周熱榜
const TYPEMAP = {
    1:'24小時熱榜',
    2:'周熱榜'
}
const title = computed(()=> TYPEMAP[props.hotProsType] )

// 1.封裝接口
// 2.調用接口並渲染
const hotProsList = ref([])
const route = useRoute()
const getHotProsList = async () => {
    const res = await fetchHotGoodsAPI({
        id: route.params.id,
        type: props.hotProsType
    })
    hotProsList.value = res.result
}
onMounted(() => getHotProsList())

</script>


<template>
    <div class="goods-hot">
        <h3>{{ title }}</h3>
        <!-- 商品区块 -->
        <RouterLink to="/" class="goods-item" v-for="item in hotProsList" :key="item.id">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="desc ellipsis">{{ item.desc }}</p>
            <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
    </div>
</template>


<style scoped lang="scss">
.goods-hot {
    h3 {
        height: 70px;
        background: #813e3e;
        color: #fff;
        font-size: 18px;
        line-height: 70px;
        padding-left: 25px;
        margin-bottom: 10px;
        font-weight: normal;
    }

    .goods-item {
        display: block;
        padding: 20px 30px;
        text-align: center;
        background: #fff;
        text-decoration: none;
        text-overflow: ellipsis; //超出文字部分以點點點表示
        overflow: hidden; //超出隱藏
        white-space: nowrap; //不換行


        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: #813e3e;
            font-size: 20px;
        }
    }
}
</style>