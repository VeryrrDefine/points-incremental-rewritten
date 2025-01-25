<script setup lang="ts">
import { DC } from "@/core/constants";
import { getUndulatingColor, colorText } from "@/core/display";
import formatPowiainanum from "format-powiainanum";
import Changelog from "./Changelog.vue";
import { changelog as cl } from "@/core/changelog";
import { usePlayerData } from "@/lib/usePlayerData";

var forceUpdater = usePlayerData((player)=>player.lastUpdated)

function formatEndgame() {
  const x = getUndulatingColor()
  const endgameText = "当前Endgame：" + colorText('h3', x, formatPowiainanum(DC.ENDGAME)) + " 点数"
  return endgameText
}
</script>
<template >
    <span :force="forceUpdater.toString()" v-html="formatEndgame()"></span><br>
    当前版本：v{{ cl[0].version }}<br>
    游戏作者：<sup>0100000a7</sup> & EdenGameMaster<br>
    本游戏使用了<a href="https://github.com/VeryrrDefine/PowiainaNum.js" target="_blank">PowiainaNum.js</a>,
    <a href="https://github.com/VeryrrDefine/format-powiainanum" target="_blank">format-powiainanum.js</a>来处理大数字<br>
    使用了<a href="https://github.com/nodeca/pako" target="_blank">pako.js</a>来处理存档<br>
    <div :style="{color: getUndulatingColor()}"><i>点击可查看被遮挡的剧透内容</i></div>
    <h1>更新日志</h1>
    <Changelog></Changelog>
</template>