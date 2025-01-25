import formatPowiainanum from "format-powiainanum"
import PowiainaNum, { type PowiainaNumSource } from "powiaina_num.js"
import type { rewardInterface } from "./galaxy"

function convertToB16(n: number) {
  let codes = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F']
  let x = n % 16
  return codes[(n - x) / 16] + codes[x]
}

export function showNextBonusDescription(y: PowiainaNumSource = 0, rewards: Array<rewardInterface>,
  paragraph1 = "在", paragraph2 = "式风单元，", paragraph3 = "当前：",) {
  let a = ""
  var x;
  if (y === undefined) x = new PowiainaNum(0)
  else x = new PowiainaNum(y)
  if (x.lt(rewards[rewards.length - 1].req)) {
    for (let i = 0; i < rewards.length; i++) {
      var reward = rewards[i]
      if (x.lt(reward.req)) {
        a = a.concat(paragraph1)
        a = a.concat(formatPowiainanum(reward.req))
        a = a.concat(paragraph2)
        a = a.concat(reward.desc)

        if (reward.effectDesc != undefined && reward.effect != undefined) {
          a = a.concat(paragraph3);
          a = a.concat(reward.effectDesc(reward.effect()));
        }
        break;
      }
    }
  }
  return a
}
export function colorText(elem: string, color: string, text: string) {
  return "<" + elem + " style='color:" + color + ";text-shadow:0px 0px 10px;'>" + text + "</" + elem + ">"
}
export function getUndulatingColor(period = Math.sqrt(760)) {
  let t = new Date().getTime()
  let a = convertToB16(Math.floor(Math.sin(t / 1e3 / period * 2 * Math.PI + 0) * 128) + 128)
  let b = convertToB16(Math.floor(Math.sin(t / 1e3 / period * 2 * Math.PI + 2) * 128) + 128)
  let c = convertToB16(Math.floor(Math.sin(t / 1e3 / period * 2 * Math.PI + 4) * 128) + 128)
  return "#" + String(a) + String(b) + String(c)
}