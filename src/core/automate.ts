import { player } from "@/saves";
import { Dimensions } from "./dimensions";

export enum AutomationTypes {
    DIM1=1,
    DIM2=2,
    DIM3=3,
    DIM4=4,
    DIM5=5,
    DIM6=6,
    DIM7=7,
    DIM8=8,
}
export function getAutomateStatus(x:AutomationTypes){
    return canAutomate(x) && player.auto.includes(x);
}

export function canAutomate(x:AutomationTypes){
    if (x>=1&&x<=8 && player.sqrt.galaxies.gte(2)) return true;

    return false;
}

export function toggleAutomate(x:AutomationTypes){
    let temp1 = player.auto.indexOf(x)
    if (temp1 == -1) {
        player.auto.push(x)
    } else {
        player.auto.splice(temp1, 1)
    }
}

export function automateLoop(){
    for (let i = 1; i<=8; i++){
        if (getAutomateStatus(i)){
            new Dimensions(i).buyMax();
        }
    }
}