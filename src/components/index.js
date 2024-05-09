// 把components中的所有組件都進行全局化註冊
// 通過插件的方式
import { install } from "element-plus";
import ImageView from "./ImageView.vue";
import XtxSku from "./XtxSku/XtxSku.vue";

export const componentPlugin = {
    install (app) {
        // app.component('組件名字', 組件配置對象)
        app.component('XtxImageView', ImageView)
        app.component('XtxSku', XtxSku)
    }
}