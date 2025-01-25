import { saveSerializer } from "./serializer"
import { reactive } from "vue"
import PowiainaNum from "powiaina_num.js"
import { DC } from "@/core/constants";
import { gameLoop } from "@/main";
import { MainTabs, OtherTabs, StatTabs, Tabs } from "@/declares";
import type { AutomationTypes } from "@/core/automate";

const SAVE_ID = "pts-incr-rewt";
function deepCopyProps(source:any,target:any) {
  for (let key in source) {  
        if (source.hasOwnProperty(key)) {  
            // 如果源对象的属性是对象或数组，则递归复制  
            if ((typeof source[key] === 'object' && !(source[key] instanceof PowiainaNum)) && source[key] !== null) {  
                // 如果目标对象没有这个属性，或者属性是null，则创建一个新的  
                if (!target.hasOwnProperty(key) || target[key] == null || Array.isArray(source[key]) !== Array.isArray(target[key])) {  
                    target[key] = Array.isArray(source[key]) ? [] : {};  
                }  
                // 递归复制属性  
                deepCopyProps(source[key], target[key]);  
            } else {  
                // 如果属性不是对象或数组，则直接复制  
                target[key] = source[key];  
            }  
        }  
    }  
}


export interface Player {
  points: PowiainaNum,
  total: PowiainaNum,
  lastUpdated: number,
  saveCreateTime: number,
  dimensions: {
    amount: PowiainaNum,
    bought: PowiainaNum,
  }[],
  tabs: {
    maintab: Tabs,
    subtabs: [MainTabs,OtherTabs,StatTabs]
  },
  auto: Array<AutomationTypes>,
  sqrt: {
    unl: boolean,
    points: PowiainaNum,
    galaxies: PowiainaNum,
  }
}

function getInitialPlayerData() : Player {
  return {
    points: DC.D10.clone(),
    total: DC.D10.clone(),
    lastUpdated: Date.now(),
    saveCreateTime: Date.now(),
    dimensions: Array(8).fill(0).map(function (){
      return { amount: DC.D0.clone(), bought: DC.D0.clone() }
    }),
    sqrt: {
      unl:false,
      points: DC.D1,
      galaxies: DC.D0
    },
    
    auto: [],
    tabs: {
      maintab: Tabs.Main,
      subtabs: [
        MainTabs.Dimensions,
        OtherTabs.Options,
        StatTabs.Stat,
      ]
    }
  }
}

let player: Player = getInitialPlayerData();

function convertToPowiainaNum(object: any): any {
  for(let key in object) {
    let T;
    if(typeof object[key] === "string" && !isNaN(typeof (T=new PowiainaNum(object[key]).array[0])=="number" ? T : T[0])) {
      object[key] = new PowiainaNum(object[key]);
    }
    if(typeof object[key] === "object") {
      convertToPowiainaNum(object[key]);
    }
  }
}
export function hardReset() {
  player = getInitialPlayerData();
}
function load(): void {
  player = getInitialPlayerData()
  console.log(
	  "%cLarge胆! \n%c竟敢在朕6365的眼皮底下公然作弊😡",
	  "color: red; font-size: 50px;",
	  ""
  )
  let temp_player_string = localStorage.getItem(SAVE_ID);
  if (temp_player_string !== null) {
    let temp_player: any = saveSerializer.deserialize(temp_player_string);
    console.log(temp_player.saveCreateTime)
    convertToPowiainaNum(temp_player);
    deepCopyProps(temp_player, player)
    player = reactive(player) as Player;
  }
  setInterval(gameLoop,1000/60)
  setInterval(save, 5e3)
  
}
load()

export function save(): void {
  localStorage.setItem(SAVE_ID, saveSerializer.serialize(player))
}
export { player }