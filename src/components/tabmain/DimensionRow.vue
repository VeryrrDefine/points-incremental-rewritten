<script lang="ts" setup>
import { player } from "@/saves/index"
import { Dimensions } from "@/core/dimensions"
import formatPowiainanum from "format-powiainanum";
import { usePlayerData } from "@/lib/usePlayerData";
import { toggleAutomate, getAutomateStatus, canAutomate } from "@/core/automate";
const labels = "一二三四五六七八".split("")

const props = defineProps({
    tier: Number,
})

const tier = Number(props.tier)
const amount = usePlayerData((player)=>player.dimensions[tier].amount) // 占位符用的

function getDimCostDisplay(dim:number) {
  return new Dimensions(dim).cost.lt(1.7e308) ? '价格：' + formatPowiainanum(new Dimensions(dim).cost) : '已达硬上限'
}
function getBuyMaxText(dim:number) /*1-8*/{
    if (player.sqrt.galaxies.lt(1)) return "最大"
    let a
  /*if(player.autodims[dim - 1]) a = `购买次数：${format(player.dims[dim][4])}`
  else*/ if(player.sqrt.galaxies.gte(1)) a = `购买次数：${formatPowiainanum(new Dimensions(dim).bought)} ➜ ${formatPowiainanum(new Dimensions(dim).continuumValue)}`
  else a = "最大"
  //let b = Math.min(player.sqrt.galaxies.toNumber(), 6)
 // if ((player.chal == 1 && dim == 8) || (player.chal == 5 && b < dim)) a += `/${tmp.square.chal1cap.format()}`
  return a
}
</script>

<template>
    <div :amount="amount.toString()">
        第{{ labels[tier] }}维度
        {{ formatPowiainanum(new Dimensions(tier + 1).amount) }}({{ formatPowiainanum(new Dimensions(tier + 1).bought) }})
        ×{{ formatPowiainanum(new Dimensions(tier + 1).getMultiplier()) }}
        <button class="btn" :disabled="!new Dimensions(tier + 1).isAvailableForPurchase"
            @click="new Dimensions(tier + 1).buySingle" v-if="player.sqrt.galaxies.lt(1)">{{ getDimCostDisplay(tier+1) }}</button>
        <button class="btn" :disabled="!new Dimensions(tier + 1).isAvailableForPurchase"
            @click="new Dimensions(tier + 1).buyMax" v-html="getBuyMaxText(tier+1)"></button>
        <button class="btn" v-if="canAutomate(tier+1)" @click="toggleAutomate(tier+1)">自动: {{ getAutomateStatus(tier+1)
        ? "开":"关" }}</button>
        <br>
    </div>
</template>
