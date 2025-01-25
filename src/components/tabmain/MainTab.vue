<script lang="ts" setup>
import { MainTabs, Tabs } from '@/declares';
import { player } from '@/saves';
import { switchPages } from '../tabs.vue';
import Dimensions from './Dimensions.vue';
import SqrtPoint from './SqrtPoint.vue';
</script>

<template>
    <div>
        <button class="btn" @click="switchPages(0, MainTabs.Dimensions)"
        :disabled="player.tabs.subtabs[Tabs.Main] == MainTabs.Dimensions">维度</button>
        
        <button class="btn" @click="switchPages(0, MainTabs.Sqrt)" 
        :disabled="player.tabs.subtabs[Tabs.Main] == MainTabs.Sqrt">√点数</button>
        <div class="main-line" ></div>

        <Dimensions v-if="player.tabs.subtabs[Tabs.Main] == MainTabs.Dimensions"></Dimensions>
        <SqrtPoint v-if="player.tabs.subtabs[Tabs.Main] == MainTabs.Sqrt"></SqrtPoint>
    </div>
</template>