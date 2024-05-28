<script setup>
import GoodsItem from '@/components/Home/GoodsItem.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { getSubCategoryAPI } from '@/apis/category'

// 獲取基礎列表數據渲染
const goodList = ref([])
const reqData = ref({
    categoryId: 1005000,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime',
})
const searchQuery = ref(sessionStorage.getItem('searchQuery') || ''); // 用于绑定搜索输入框的值

const getGoodList = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    console.log('基礎列表', res)
    goodList.value = res.result.items
}
onMounted(() => getGoodList())

// 搜索結果
const searchGoods = async () => {
    reqData.value.page = 1; // 重置页数
    reqData.value.keyword = searchQuery.value; // 添加搜索关键词
    const res = await getSubCategoryAPI(reqData.value);
    goodList.value = res.result.items;
    // 重置disabled为false，以便能够再次进行无限滚动加载
    disabled.value = false;
    // 将搜索关键词保存到本地存储
    sessionStorage.setItem('searchQuery', searchQuery.value);
}
onMounted(() => {
    if (searchQuery.value) {
        searchGoods(); // 如果本地存储中存在搜索关键词，则执行搜索函数
    } else {
        getGoodList(); // 否则执行获取基础列表数据的函数
    }
})

const route = useRoute();

// 监听路由参数变化
watch(
    () => route.query.keyword,
    (newKeyword) => {
        if (newKeyword) {
            searchQuery.value = newKeyword;
            searchGoods();
        }
    },
    { immediate: true }
)

// 加載更多
const disabled = ref(false)
const load = async () => {
    console.log('加載更多數據了')
    // 獲取下一頁數據
    reqData.value.page++
    const res = await getSubCategoryAPI(reqData.value)
    goodList.value = [...goodList.value, ...res.result.items]
    // 加載完畢 停止監聽
    if (res.result.items.length === 0) {
        disabled.value = true
    }
}

</script>

<template>
    <div class="bgArea">
        <h3>" <span>{{ searchQuery }}</span> " 相關搜尋結果</h3>
        <div v-if="goodList.length != 0" class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
            <!-- 商品列表-->
            <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
        </div>
        <div class="body" v-else>
            <el-empty description="無相關搜尋結果">
            </el-empty>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.bgArea {
    text-align: center;

    h3 {
        color: #929292;

        span {
            color: #537153;
        }

    }


    .body {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 0 10px;
    }

}
</style>