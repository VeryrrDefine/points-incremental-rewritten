import { player } from "@/saves"
import PowiainaNum from "powiaina_num.js"
import { DC } from "./constants"
export interface rewardInterface {
  req: PowiainaNum,
  desc: string,
  effect?: ()=>PowiainaNum,
  effectDesc?: (x:PowiainaNum|Array<PowiainaNum>)=>string,
}
export const galaxy_rewards = [
  {
    req: DC.D1,
    desc: "移除√点数硬上限，购买维度不再花费点数，你可以购买小数个维度"
  },
  {
    req: DC.D2,
    desc: "自动购买维度",
  },
  {
    req: DC.D3,
    desc: "解锁点数<sup>2</sup>",
  },
  {
    req: DC.D6,
    desc: "基于星系数量增益√点数复制速度",
  },
]
function fullCostRoot() {
    let root = DC.D1
    return root
}
export function galaxyCost() {
    
    let cost = DC.D100.pow(player.sqrt.galaxies.mul(50).add(50))
    if (player.sqrt.galaxies.gte(20)) cost = DC.D10.pow(new PowiainaNum(player.sqrt.galaxies).pow(2.554))
    if (player.sqrt.galaxies.gte(80)) cost = DC.D10.pow(DC.D1P1502.pow(new PowiainaNum(player.sqrt.galaxies)))
    cost = cost.root(fullCostRoot())
    return cost
}
export function galaxyReset(){
    player.dimensions =  Array(8).fill(0).map(function (){
        return { amount: DC.D0.clone(), bought: DC.D0.clone() }
    })
    player.sqrt.points = DC.D1
    player.points = DC.D10
}
export function galaxyb10Effect() {
  
  let div = new PowiainaNum(200)
  let eff = player.sqrt.points.log10().div(div).min(player.sqrt.galaxies.mul(1 / 2))
  return eff
}
export function galaxyize(){
    if (player.sqrt.points.lt(galaxyCost())) return
    if (player.sqrt.galaxies.lt(1)) {
      if (!confirm('你真的要重置吗?')) return
    }
    galaxyReset()
    player.sqrt.galaxies = player.sqrt.galaxies.add(1)

}