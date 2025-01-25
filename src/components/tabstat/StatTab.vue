<script lang="ts" setup>
import { StatTabs, Tabs } from '@/declares';
import { player } from '@/saves';
import formatPowiainanum from 'format-powiainanum';
import type PowiainaNum from 'powiaina_num.js';
import { switchPages } from '../tabs.vue';

function get_pts_volume(x: PowiainaNum) {
  const meter_cubed = 2.3687253991903575e104
  if(x.gte("ee9")) return "大神啊！你的点数已经可以制造1个多元宇宙了！"
  if(x.gte("1e785")) return `如果你每秒写3个数字，那么把你的点数写下来需要${formatPowiainanum(x.log10().floor().add(1).div(3))}秒`
  if(x.gte(Number.MAX_VALUE)) return `如果你的每个点数占据一个普朗克单位，你的点数足以制造${formatPowiainanum(x.div(Number.MAX_VALUE))}个无限`
  const prefixes = [
    { value: 1e113, name: "维度", verb: "制造" },
    { value: 3.4e80, name: "可观测宇宙", verb: "制造" },
    { value: 1e73, name: "玉夫座空洞", verb: "制造" },
    { value: 5e68, name: "本星系团", verb: "制造" },
    { value: 3.3e61, name: "星系", verb: "制造" },
    { value: 3.3e55, name: "本地泡", verb: "制造" },
    { value: 1.7e48, name: "奥尔特云", verb: "制造" },
    { value: 1.7e45, name: "星云", verb: "制造" },
    { value: 8e36, name: "超巨星", verb: "制造" },
    { value: 5e32, name: "红巨星", verb: "制造" },
    { value: 1.41e27, name: "太阳", verb: "制造" },
    { value: 1.53e24, name: "木星", verb: "制造" },
    { value: 1.08e21, name: "地球", verb: "制造" },
    { value: 4.5e17, name: "矮行星", verb: "制造" },
    { value: 5e12, name: "大型小行星", verb: "制造" },
    { value: 3.3e8, name: "万里长城", verb: "填满" },
    { value: 2.6006e6, name: "吉萨大金字塔", verb: "填满" },
    { value: 2.5e3, name: "奥运规模的游泳池", verb: "填满" },
    { value: 1, name: "冰箱", verb: "填满" },
    { value: 7.5e-4, name: "酒瓶", verb: "填满" },
    { value: 3.555e-6, name: "茶匙", verb: "填满" },
    { value: 5e-8, name: "米", verb: "制造" },
    { value: 6.2e-11, name: "沙子", verb: "制造" },
    { value: 9e-17, name: "红细胞", verb: "制造" },
    { value: 5e-21, name: "病毒", verb: "制造" },
    { value: 7.23e-30, name: "氢原子", verb: "制造" },
    { value: 1e-42, name: "原子核", verb: "制造" },
    { value: 2.82e-45, name: "质子", verb: "制造" },
    { value: 1e-54, name: "立方阿米", verb: "占据" },
    { value: 1e-63, name: "立方仄米", verb: "占据" },
    { value: 1e-72, name: "立方幺米", verb: "占据" },
    { value: 1e-81, name: "立方柔米", verb: "占据" },
    { value: 1e-90, name: "立方亏米", verb: "占据" },
  ]
  for (let prefix of prefixes) {
    if (x.gte(prefix.value * meter_cubed)) {
      return `如果你的每个点数占据一个普朗克单位，你的点数足以${prefix.verb}${formatPowiainanum(x.div(prefix.value * meter_cubed))}个${prefix.name}`
    }
  }
  return `如果你的每个点数占据一个普朗克单位，你的点数足以占据${formatPowiainanum(x)}个普朗克单位`
}

</script>

<template>
    <div>
        <button class="btn" @click="switchPages(2, StatTabs.Stat)"
        :disabled="player.tabs.subtabs[Tabs.Stat] == StatTabs.Stat">统计</button>
        <button class="btn" @click="switchPages(2, StatTabs.Achievements)" 
        :disabled="player.tabs.subtabs[Tabs.Stat] == StatTabs.Achievements">成就</button>
        <div class="main-line"></div>
        <div v-if="player.tabs.subtabs[Tabs.Stat] == StatTabs.Stat">
            你总共制造了{{ formatPowiainanum(player.total) }}点数<br>
            {{ get_pts_volume(player.points) }}<br><br>
    </div>
        <!--<Options v-if="player.tabs.subtabs[Tabs.Other] == OtherTabs.Options"></Options>
        <About v-if="player.tabs.subtabs[Tabs.Other] == OtherTabs.About"></About>-->
    </div>
</template>