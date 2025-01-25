import PowiainaNum from "powiaina_num.js";
import { Dimensions } from "./dimensions";

export interface Temp {
    ptgain: ()=>PowiainaNum;
    modal: number;
}

var temp: Temp = {
    ptgain(): PowiainaNum{
        let ptgain = new PowiainaNum(0);
        ptgain = ptgain.add(new Dimensions(1).amount.mul(new Dimensions(1).getMultiplier()))
        return ptgain;
    },
    modal: 0,
}
export {temp};