<script setup>
import HomePanel from '@/components/Home/HomePanel.vue'
import { findNewAPI } from '@/apis/home'
import { ref, onMounted } from 'vue'

const newList = ref([])
const getNewList = async () => {
    const res = await findNewAPI()
    console.log("新鮮好物", res)
    newList.value = res.result
}

onMounted(() => getNewList())
</script>

<template>
    <HomePanel title="新鮮好物" subTitle="新鮮出爐 品質有保證">
        <ul class="goods-list">
            <li v-for="item in newList" :key="item.id">
                <RouterLink class="routerItem" to="/">
                    <img v-img-lazy="item.picture" alt="" />
                    <p class="name">{{ item.name }}</p>
                    <p class="price">&yen;{{ item.price }}</p>
                </RouterLink>
            </li>
        </ul>

    </HomePanel>
    <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>


<style scoped lang='scss'>
.goods-list {
    display: flex;
    justify-content: space-around;
    height: 306px;

    li {
        width: 206px;
        height: 306px;
        transition: all .5s;
        list-style:none;
        border-radius: 10px;
        background-color: #f9fdf9;
        box-shadow: 0 4px 4px rgb(0 0 0 / 10%);

        &:hover {
            transform: translate3d(0, -5px, 0);
            box-shadow: 0 4px 8px rgb(0 0 0 / 20%);
        }

        img {
            width: 206px;
            height: 206px;
            border-radius: 10px 10px 0 0;
        }

        p {
            font-size: 20px;
            text-align: center;
            text-overflow: ellipsis; //超出文字部分以點點點表示
            overflow: hidden; //超出隱藏
            white-space: nowrap; //不換行
            margin-top: 15px;
            padding: 0 5px 0 10px;
            color: #304539;
        }

        .price {
            color: #304539;
        }

        .routerItem{
            text-decoration: none;
        }
    }
}
</style>