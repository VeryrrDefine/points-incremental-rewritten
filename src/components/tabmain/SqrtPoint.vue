<script setup lang="ts">
import formatPowiainanum from 'format-powiainanum';
import { player } from '@/saves';
import { replicatePerTick, sqrtEffectToDim, sqrtSoftCapped } from '@/core/sqrtPoint';
import { galaxyCost, galaxy_rewards, galaxyize, galaxyb10Effect } from '@/core/galaxy';
import { showNextBonusDescription } from '@/core/display';
function getGalRewardText() {
  return showNextBonusDescription(player.sqrt.galaxies, galaxy_rewards, '在', "星系，")
}

function getGalButtonText() {
  return `获得一个星系<br>但重置之前的一切<br>${getGalRewardText()}<br>要求：${formatPowiainanum(galaxyCost()) }√点数`
}
</script>

<template>
    <div class="sqrt_text" align="center">你有<span>{{ formatPowiainanum(player.sqrt.points) }}</span>√点数<span
            >(+{{ formatPowiainanum(replicatePerTick().log10().mul(30)) }}数量级/s)</span>，因此所有维度乘数×{{ formatPowiainanum(sqrtEffectToDim()) }}
                </div>
    <div class="sqrt_text" v-if="!player.sqrt.unl" align="center">达到1.000e80点数后，你的√点数将开始自我复制!</div><br>
    <button class="btn" v-if="false">自动：</button>
    <div class="sqrt_text" align="center">√星系({{ formatPowiainanum(player.sqrt.galaxies) }})</div>
    <button class="galaxyReset" v-html="getGalButtonText()" @click="galaxyize"></button>
    <div >同时，你的√点数和星系还使购买10个的倍率+{{ formatPowiainanum(galaxyb10Effect()) }}</div>
    <div style="color: red" v-if="sqrtSoftCapped()">在1.000e100√点数后，√点数复制速度将受到{{player.sqrt.galaxies.lt(1) ? "硬": "软"}}上限限制!</div>
    <div style="color: rgb(214, 0, 0)" v-if="player.sqrt.points.gte('1e400')" >在1.000e400√点数后，√点数复制速度将受到二重软上限限制!</div>
</template>

<style scoped>
div{
    margin: auto;
}
</style>