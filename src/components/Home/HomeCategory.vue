<script setup>
import { useCategoryStore } from '@/stores/category'
// import { ref } from 'vue'
// const arr = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
// const arr2 = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])

const categoryStore = useCategoryStore()

</script>

<template>
    <div class="bgArea">
        <div class="outSide">
            <div class="" v-for="item in categoryStore.categoryList" :key="item.id">
                <div class="menu">
                    <span class="text1">{{ item.name }}</span>
                    <span v-for="i in item.children.slice(0, 2)" :key="i" class="text2">{{ i.name }}</span>

                    <div class="productArea"></div>
                </div>
            </div>
            <!-- <div class="main">
                <div class="mainText">
                    <span class="text1">分類推薦</span>
                    <span class="text2">根據您的購買或瀏覽紀錄推薦</span>
                </div>
                <div class="outsideArea"> -->
            <!-- <div class="square" v-for="i in item.goods" :key="i.id">
                    <img src="i.picture" alt="">
                    <div class="info">
                        <p class="name">
                            {{i.name}}
                        </p>
                        <p class="desc">{{i.desc}}</p>
                        <p class="price"><i>¥</i>{{i.price}}</p>
                    </div>
                </div> -->
            <!-- </div>
            </div> -->

        </div>

    </div>
</template>

<style lang="scss" scoped>
.bgArea {
    height: 400px;
    background-color: #eff5f1;
    display: flex;
    justify-content: center;

    .outSide {
        width: 1000px;
        height: 400px;
        background-color: #304539;
        // display: flex;
        // flex-direction: column;
        color: #ffffff;

        .menu {
            height: 44.5px;
            padding-top: 7px;
            position: relative;

            &:hover {
                cursor: pointer;
                width: 230px;
                height: 44.5px;
                background-color: #688d78;
            }

            .text1 {
                font-size: 12pt;
                margin-left: 25px;
            }

            .text2 {
                margin-left: 10px;
                font-size: 10pt;
            }

            // .productArea {
            //     width: 100px;
            //     height: 70px;
            //     background-color: #f5d3d3;
            // }
        }

        // .main {
        //     width: 500px;
        //     height: 300px;
        //     background-color: #d76161;
        // }

    }

    // .main {
    //     width: 770px;
    //     height: 400px;
    //     // background-color: #afbae1;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     justify-content: center;
    //     margin-left: 10px;

    //     .mainText {
    //         display: flex;
    //         align-items: center;

    //         .text1 {
    //             font-weight: 700;
    //             font-size: 12pt;
    //             color: #304539;
    //             margin-right: 5px;
    //         }

    //         .text2 {
    //             font-weight: 700;
    //             font-size: 10pt;
    //             color: #6a6d6c;
    //         }

    //     }

    //     .outsideArea {
    //         width: 770px;
    //         height: 350px;
    //         // background-color: #df7ba1;
    //         display: flex;
    //         justify-content: center;
    //         flex-wrap: wrap;
    //         margin-top: 5px;

    //         .square {
    //             width: 240px;
    //             height: 100px;
    //             background-color: #fff;
    //             border-radius: 10px;
    //             border: 2px solid #97a99f;
    //             margin: 5px;
    //             display: flex;
    //             justify-content: center;
    //             align-items: center;

    //             img {
    //                 width: 80px;
    //                 height: 80px;
    //             }

    //         }
    //     }
    // }
}
</style>