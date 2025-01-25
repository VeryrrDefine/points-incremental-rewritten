<script setup lang="ts">
import { changelog } from '@/core/changelog';
</script>

<template>
    <div v-for="(log, index) in changelog" :key="index">
        <h3>v{{ log.version }}</h3>
        <li v-for="(change, changeIndex) in log.changes" 
            :key="changeIndex" v-html="change">
        </li>
    </div>
</template>