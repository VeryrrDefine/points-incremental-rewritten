import { player } from "@/saves"
import type { Player } from "@/saves"
import PowiainaNum from "powiaina_num.js"
import { DC } from "./constants"
import { temp } from "./temp"
import { sqrtEffectToDim } from "./sqrtPoint"
import { galaxyb10Effect } from "./galaxy"

export class Dimensions {
    private tier: number
    constructor(tier: number) {
        this.tier = tier
    }
    getBuy10Multiplier() :PowiainaNum{
        let base = DC.D2;
        if (player.sqrt.galaxies.gte(1)) base = base.add(galaxyb10Effect())
        return base;
    }
    getMultiplier(): PowiainaNum {
        let a = DC.D2.pow(player.dimensions[this.tier - 1].bought)
        a = a.mul(sqrtEffectToDim())
        return a
    }
    get amount(): PowiainaNum {
        return player.dimensions[this.tier - 1].amount.add(player.dimensions[this.tier - 1].bought.mul(10))
    }

    get bought(): PowiainaNum {
        return player.dimensions[this.tier - 1].bought
    }

    get basecost(): PowiainaNum {
        return DC.D10.pow(this.tier)
    }

    costFunction(bought: PowiainaNum): PowiainaNum {
        return this.basecost.pow(bought.add(1))
    }
    get cost() {
        if (player.sqrt.galaxies.gte(1)) return PowiainaNum.POSITIVE_INFINITY;
        return this.costFunction(this.bought)
    }
    static softStart1() {
        
        return DC.D2.pow(1024)
    }
    static softPower1() {
        let a = DC.D0P5

        return a.min(1)
    }
    get continuumValue(): PowiainaNum {
        if (player.sqrt.galaxies.lt(1)) return player.points.logBase(this.basecost)
        
        let costPow = DC.D1
        //if(player.square.chals.includes(1)) costPow = costPow.mul(0.8)
        var x = player.points.root(costPow).overflow(Dimensions.softStart1(), Dimensions.softPower1(),1)
        let final = x.log10().div(this.tier)
        let a = Math.min(player.sqrt.galaxies.toNumber(), 6)
        
        return final
    }

    get isAvailableForPurchase(): boolean {
        return player.sqrt.galaxies.gte(1) ? true : (
            this.cost.lt(1.7e308)?
            player.points.gte(this.cost):false
            )
    }

    buySingle(): void {
        if (!this.isAvailableForPurchase || player.sqrt.galaxies.gte(1)) return
        if (player.sqrt.galaxies.lt(1)) player.points = player.points.sub(this.costFunction(this.bought))
        player.dimensions[this.tier - 1].bought = player.dimensions[this.tier - 1].bought.clone().add(1)
    }

    buyMax(): void {
        if (!this.isAvailableForPurchase) return
        let target = this.continuumValue
        if (player.sqrt.galaxies.lt(1)) target = target.floor()
        if (player.sqrt.galaxies.lt(1)) player.points = player.points.sub(this.costFunction(target.sub(1)))
        player.dimensions[this.tier - 1].bought = target
    }
}


export function updateDimensions(diff: number): void {
    for (let i = 0; i < 7; i++) {
      player.dimensions[i].amount =
        player.dimensions[i].amount.add(
          new Dimensions(i + 2).amount.
            mul(new Dimensions(i + 2).getMultiplier()).
            mul(diff)
        )
    }
    player.points = 
      player.points.add(temp.ptgain().mul(diff))
    player.total = 
    player.total.add(temp.ptgain().mul(diff))
  }

export function buyMaxAllDimensions(): void {
    for (let i = 1; i <= 8; i++) new Dimensions(i).buyMax()
}