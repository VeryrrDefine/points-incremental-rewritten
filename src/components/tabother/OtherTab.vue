<script lang="ts" setup>
import { OtherTabs, Tabs } from '@/declares';
import { player } from '@/saves';
import { switchPages } from '../tabs.vue';
import Options from './Options.vue';
import About from './About.vue';
</script>

<template>
    <div>
        <button class="btn" @click="switchPages(1, OtherTabs.Options)"
        :disabled="player.tabs.subtabs[Tabs.Other] == OtherTabs.Options">选项</button>
        <button class="btn" @click="switchPages(1, OtherTabs.About)" 
        :disabled="player.tabs.subtabs[Tabs.Other] == OtherTabs.About">关于</button>
        <div class="main-line"></div>
        <Options v-if="player.tabs.subtabs[Tabs.Other] == OtherTabs.Options"></Options>
        <About v-if="player.tabs.subtabs[Tabs.Other] == OtherTabs.About"></About>
    </div>
</template>