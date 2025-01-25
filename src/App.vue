<script setup lang="ts">
import formatPowiainanum from 'format-powiainanum';
import NewsTicker from './components/NewsTicker.vue';
import tabs from './components/tabs.vue';
import { player } from './saves';
import { DC } from './core/constants';
import { formatGain } from './core/format-gain';
import { temp as tmp } from './core/temp';
import { usePlayerData } from './lib/usePlayerData';
import { getUndulatingColor } from './core/display';
import Modal from './components/modal/Modal.vue';

var forceUpdater = usePlayerData((player)=>player.lastUpdated)
function getPointDisplay() :string {
    if(player.points.lt('ee6')) return '你有<div class="pts-dis">' + formatPowiainanum(player.points) + '</div>点数'
    else return '<div class="pts-dis">' + formatPowiainanum(player.points) + '</div>'
}
function isEndgame(): boolean {
    return player.points.gte(DC.ENDGAME);
}



function getPointGain() {
  return '你正在每秒获取 ' + formatGain(player.points,tmp.ptgain()," 点数")
}
</script>

<template>
  <div :force="forceUpdater">
    <Modal></Modal>
    <NewsTicker></NewsTicker>
    <div v-html="getPointDisplay()"></div>
    <div v-if="isEndgame()" :style="{color: getUndulatingColor()}">已到达当前版本终点！</div>
    <div>{{ getPointGain() }}</div>
    <tabs></tabs>
  </div>
</template>

<style scoped>
    * {
        text-align: center;
    }
</style>
