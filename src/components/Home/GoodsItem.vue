<script setup>
defineProps({
    goods: {
        type: Object,
        default: () => { }
    }
})
</script>
<template>
    <RouterLink :to="`/detail/${goods.id}`" class="goods-item">
        <img v-img-lazy="goods.picture" alt="" />
        <p class="name ellipsis">{{ goods.name }}</p>
        <p class="desc ellipsis">{{ goods.desc }}</p>
        <p class="price">&yen;{{ goods.price }}</p>
    </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
    display: block;
    width: 150px;
    padding: 20px 30px 0px 30px;
    text-align: center;
    transition: all .5s;
    text-decoration: none;

    &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
        width: 160px;
        height: 160px;
        margin-bottom: 10px;
    }

    p {
        text-align: center;
        text-overflow: ellipsis; //超出文字部分以點點點表示
        overflow: hidden; //超出隱藏
        white-space: nowrap; //不換行

    }

    .name {
        font-size: 16px;
        color: #000;
    }

    .desc {
        color: #999;
        height: 29px;
    }

    .price {
        color: #552f2f;
        font-size: 20px;
    }
}
</style>