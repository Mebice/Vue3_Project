<script setup>
import { ref } from 'vue'
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <div class="ddd">
  </div>
  <el-button class="btn" type="success">Success</el-button>
  <div class="demo-pagination-block">
    <el-pagination v-model:current-page="currentPage3" v-model:page-size="pageSize3" background
      layout="prev, pager, next, jumper" :total="1000" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<style lang="scss" scoped>
.ddd {
  width: 200px;
  height: 200px;
  background-color: #e14545;
}

.el-pagination {
  justify-content: center; //居中
  //f1oat:1eft;居左
  //f1oat:right;居右
}
// 分頁:上一頁按鈕、下一頁按鈕、其他所有按鈕
:deep(.el-pagination.is-background .btn-next),:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled)) {
  background-color: #fff;
  border: 2px solid #ff0000;
  border-radius: 5px;
  color: #ff0000;
  &:hover{
    background-color: #fed6d6;
  }
}
// 分頁: 活動按鈕
:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background-color: #ff0000;
  color:#fff;
}
// 分頁:輸入格
:deep(.el-input) {
  background-color: #fff;
  color: #ff0000;
  border: 2px solid #ff0000;
  border-radius: 5px;
}
// 分頁:文字、輸入格內文字
:deep(.el-pagination__goto),:deep(.el-input__inner) {
  color: #ff0000;
}
</style>