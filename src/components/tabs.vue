<script lang="ts" setup>
import { player } from '@/saves';
import { Tabs } from '@/declares';
import MainTab from './tabmain/MainTab.vue';
import OtherTab from './tabother/OtherTab.vue';
import StatTab from './tabstat/StatTab.vue';
</script>

<template>
  <div>
    <div class="main-line"></div>
    <button :disabled="player.tabs.maintab == Tabs.Main" @click="switchPages(Tabs.Main)" class="btn">主要</button>
    <button v-if="player.sqrt.galaxies.gte(3)" :disabled="player.tabs.maintab == Tabs.Reset" @click="switchPages(Tabs.Reset)" class="btn">重置</button>
    <button :disabled="player.tabs.maintab == Tabs.Stat" @click="switchPages(Tabs.Stat)" class="btn">统计</button>
    <button :disabled="player.tabs.maintab == Tabs.Other" @click="switchPages(Tabs.Other)" class="btn">杂项</button>
    <div class="main-line"></div>
    <MainTab v-if="player.tabs.maintab == Tabs.Main"></MainTab>
    <OtherTab v-if="player.tabs.maintab == Tabs.Other"></OtherTab>
    <StatTab v-if="player.tabs.maintab == Tabs.Stat"></StatTab>
    <div v-if="player.tabs.maintab == Tabs.Reset">
      <button class="square">重置之前的所有内容，但获取0.0000点数<sup>2</sup><br>要求：1.000e785点数</button>
    </div>
  </div>
</template>


<script lang="ts">
export function switchPages(main: number, sub?: number): void {
  player.tabs.maintab = main
  if (sub != undefined) player.tabs.subtabs[main] = sub
}
</script>