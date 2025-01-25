import { player } from "@/saves"
import PowiainaNum from "powiaina_num.js"
import { DC } from "./constants"
export function sqrtEffectToDim() {
    let eff = player.sqrt.points.add(1).log10().add(1).pow(2)
    return eff
}
export function SoftRoot() {
    let eff = DC.D1
    return eff
  }
export function maxRepSpeed() {
    let cap = DC.D1E40
    return cap
  }
export function replicatePerTick() {
    let mult = DC.D1.add(DC.D0P25.mul(player.points.add(1).log10().div(80).max(1))).pow(1 / 30)
    let debuff = player.sqrt.points.div(1e100).log10().mul(0.05).add(1).max(1)
    debuff = debuff.add(DC.D10.pow(player.sqrt.points.div("1e400").log10().mul(0.0075).max(0).root(SoftRoot())))
    let buff = DC.D1
    if(player.sqrt.galaxies.gte(6)) buff = buff.mul(player.sqrt.galaxies)
    
    return mult.root(debuff).pow(buff).min(maxRepSpeed())

}
export function sqrtSoftCapped(){
  return player.sqrt.points.gte(1e100)
}
export function replicateSqrtPoints() {
    if (player.points.gte(DC.D1E80)) player.sqrt.unl=true
    if (player.sqrt.unl) player.sqrt.points = player.sqrt.points.mul(replicatePerTick())
    if (player.sqrt.points.gte(1e100) && player.sqrt.galaxies.eq(0)) player.sqrt.points = DC.D1E100
}