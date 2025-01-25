<script setup lang="ts">
import ImportModal from './ImportModal.vue'
import { useTempData } from '@/lib/useTempData';

let modalstat = useTempData((temp)=>temp.modal)
</script>
<template>
    <ImportModal v-if="modalstat==1"></ImportModal>
</template>