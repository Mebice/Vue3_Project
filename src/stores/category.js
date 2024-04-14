import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layout'

export const useCategoryStore = defineStore('category', () => {
    // 管理 header列表的數據
    //  state : header 列表數據
    const categoryList = ref([])
    // action : 獲取header列表數據的方法
    const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log("分類",res)
    categoryList.value = res.result
    }

    return{
        categoryList,
        getCategory
    }

})
