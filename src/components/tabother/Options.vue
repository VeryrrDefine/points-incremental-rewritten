<script lang="ts" setup>
import { formattedHardReset, exportCopy, exportFile } from "@/saves/componentFunctions"
</script>
        
<template>
    <div>
        <button class="btn" @click="formattedHardReset">硬重置</button> 
        <button class="btn" @click="exportCopy">导出</button> 
        <button class="btn" @click="exportFile">导出为文件</button> 
        <button class="btn">导入</button> 
        <button class="btn">以文件导入</button> 
        <br><br> 
        <button class="btn">关闭新闻</button> <button class="btn">关闭快捷键</button>
    </div>
</template>