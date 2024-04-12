<template>
    <div class="bgArea">
        <img src="/logo.png" alt="">
        <span>首頁</span>
        <span>居家</span>
        <span>食品</span>
        <span>服飾</span>
        <span>3C</span>
        <span>其他</span>
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

    input {
        width: 150px;
        height: 25px;
        border-radius: 5px;
        border: 2px solid #304539;
    }

    .fa-magnifying-glass {
        font-size: 16pt;

        &:hover {
            cursor:pointer;
            color: #9eb3a7;
        }
    }

    .fa-cart-shopping {
        font-size: 20pt;
    }
}
</style>