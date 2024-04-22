// 封裝分類數據相關代碼
import { getTopCategoryAPI } from '@/apis/category'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export function useCategory(){
    const categoryData = ref({})
    const route = useRoute()
    const getCategory = async () => {
        const res = await getTopCategoryAPI(route.params.id)
        categoryData.value = res.result
    }

    onMounted(() => getCategory())

    // 監聽路由參數變化
    watch(route, () => {     getCategory()     })

    return{
        categoryData
    }
}