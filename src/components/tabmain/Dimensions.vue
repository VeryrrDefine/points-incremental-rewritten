<script lang="ts" setup>
import { buyMaxAllDimensions } from "@/core/dimensions"
import DimensionRow from "./DimensionRow.vue";
const ids = Array.from({ length: 8 }, (_, i) => i)
</script>
        
<template>
    <div>
        <button class="btn" @click="buyMaxAllDimensions">全部最大</button>
        <DimensionRow v-for="tier in ids" :key="tier" :tier="tier" />
    </div>
</template>