<template>
    <div class="navArea">
        <div class="nav">
            <!-- <span>請先登入 | 幫助中心 | 關於我們</span> -->
            <span>請先登入</span>
            <span>l</span>
            <span>幫助中心</span>
            <span>l</span>
            <span>關於我們</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navArea {
    height: 50px;
    background-color: #304539;
    display: flex;
    align-items: center;
    justify-content: end;

    .nav{
        width: 300px;
        height: 30px;
        // background-color: #922c2c;
        justify-content: space-around;
        padding-right: 50px;
        padding-top: 3px;
    }

    span {
        color: #ffffff;
    }

}
</style>