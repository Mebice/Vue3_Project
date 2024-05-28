import { useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/searchStore';
import { storeToRefs } from 'pinia';

export function useSearch() {
    const router = useRouter();
    const searchStore = useSearchStore();
    const { searchQuery } = storeToRefs(searchStore);

    const handleSearch = () => {
        if (searchQuery.value.trim()) {
            router.push({ path: '/search', query: { keyword: searchQuery.value } });
        }
    };

    // 监听输入框的按键事件
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {  // 如果按下的是 Enter 键，则执行搜索
            handleSearch()
        }
    };

    return {
        searchQuery: searchStore.searchQuery,
        handleKeyPress,
        handleSearch,
    };
}
