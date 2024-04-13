<template>
    <div class="firstArea">
        <div class="outSide">
            <p>客戶服務</p>
            <div class="inside">
                <div class="square">
                    <i class="fa-solid fa-comment-dots"></i>
                    <p class="squText">在線客服</p>
                </div>
                <div class="square">
                    <i class="fa-solid fa-circle-question"></i>
                    <p class="squText">問題反饋</p>
                </div>
            </div>
        </div>
        <div class="outSide">
            <p>關注我們</p>
            <div class="inside">
                <div class="square">
                    <i class="fa-brands fa-line"></i>
                    <p class="squText">Line</p>
                </div>
                <div class="square">
                    <i class="fa-brands fa-facebook"></i>
                    <p class="squText">Facebook</p>
                </div>
            </div>

        </div>
        <div class="outSide">
            <p>下載APP</p>
            <div class="inside">
                <div class="square">
                    <i class="fa-solid fa-qrcode"></i>
                </div>
                <div class="square2">
                    <p class="squText">掃描 QR Code 立即下載 APP</p>
                    <!-- <p></p> -->
                    <button>下載</button>
                </div>
            </div>

        </div>
        <div class="outSide">
            <p>服務電話</p>
            <div class="inside2">
                <p class="squText">00-0000000</p>
                <p class="squText">周一至周五10:00~19:00 </p>
            </div>
        </div>
    </div>
    <div class="secondArea">
        <div class="markArea">
            <span><i class="fa-solid fa-circle-check"></i> 超低價</span>
            <span><i class="fa-solid fa-truck-fast"></i> 物流快</span>
            <span><i class="fa-solid fa-thumbs-up"></i> 品質佳</span>
        </div>
        <div class="lineArea"></div>
        <div class="detailsArea">
            <span>關於我們 | 幫助中心 | 售後服務 | 配送與驗收 | 商務合作 | 搜尋推薦 </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.firstArea {
    height: 190px;
    border-top: 1px solid #9eac9c;
    color: #304539;
    display: flex;
    align-items: center;
    justify-content: space-around;

    .outSide {
        width: 200px;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: 700;

        .inside {
            display: flex;

            .square {
                width: 70px;
                height: 70px;
                border: 2px solid #414141;
                border-radius: 10px;
                margin: 5px;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding-top: 10px;

                .fa-comment-dots,
                .fa-circle-question,
                .fa-line,
                .fa-facebook {
                    font-size: 22pt;
                }

                .fa-qrcode {
                    font-size: 35pt;
                }

                .squText {
                    margin-top: 5px;
                    font-size: 10pt;
                }
            }

            .square2 {
                width: 100px;
                height: 70px;
                margin: 5px;
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 12pt;
                position: relative;

                .squText {
                    font-size: 10pt;
                }

                button {
                    font-size: 10pt;
                    position: absolute;
                    bottom: 0;   
                    left: 20px;
                    background-color: #304539;
                    color: #ffffff;
                    border-radius: 5px;
                    &:hover{
                        cursor: pointer;
                        background-color: #9bb0a4;
                    }
                }
            }

        }

        .inside2{
            display: flex;
            flex-direction: column;
            align-items: center;

            .squText{
                font-size: 11pt;
            }
        }
    }
}

.secondArea {
    height: 200px;
    background-color: #304539;

    .markArea{
        height: 130px;
        font-size: 20pt;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: #ffffff;
    }

    .lineArea{
        height: 2px;
        background-color: #686868;
    }
    .detailsArea{
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ffffff;
    }
}
</style>