import { ref } from 'vue';
import { defineStore } from 'pinia';

// 确保两个组件之间共享相同的搜索值，使用一个全局的状态管理工具Pinia来存储搜索查询。这样不论在哪个组件中修改搜索值，所有使用该值的组件都会自动更新。
export const useSearchStore = defineStore('search', () => {
    const searchQuery = ref(''); // 用于绑定搜索输入框的值
    return {
        searchQuery,
    };
});
