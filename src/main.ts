import PowiainaNum from 'powiaina_num.js'
import { createApp } from 'vue'
import App from './App.vue'
import { automateLoop } from './core/automate'
import { Dimensions, updateDimensions } from './core/dimensions'
import { replicateSqrtPoints } from './core/sqrtPoint'
import { temp } from './core/temp'
import { player, type Player } from './saves/index'
import './style.css'


let diff: number
export function gameLoop(): void {
    let now = Date.now()
    diff = (now - player.lastUpdated) / 1000
    updateDimensions(diff);
    replicateSqrtPoints();
    automateLoop();
    player.lastUpdated = Date.now()
}
export { diff }

//方便开发调试

declare global {
    interface Window {
        player: Player,
        PowiainaNum: typeof PowiainaNum,
        Dimensions: typeof Dimensions,
        temp: any,
    }
}

if (import.meta.env.DEV && !window.player) {
    window.player = player
    window.PowiainaNum = PowiainaNum
    window.Dimensions = Dimensions
    window.temp = temp;
}

const app = createApp(App)

//app.use(router)

app.mount('#app')

class Chunk {
    private new_chunks: (number | [number, number])[];

    constructor(r: number[]) {
        let min: number[] = [];
        let max: number[] = [];
        for (let i of r) {
            const [minVal, maxVal] = this.getChunk(i);
            min.push(minVal);
            max.push(maxVal);
        }
        const sort = (a: number, b: number) => (a > b ? 1 : -1);
        min.sort(sort);
        max.sort(sort);

        this.new_chunks = [];
        let min_sel = min[0];
        for (let i = 0; i < max.length; i++) {
            if (max[i] + 1 >= min[i + 1]) continue;
            this.new_chunks.push(min_sel === max[i] ? max[i] : [min_sel, max[i]]);
            min_sel = min[i + 1];
        }
    }

    unchunkify(): number[] {
        let list: number[] = [];
        for (let i of this.new_chunks) {
            const [minVal, maxVal] = this.getChunk(i);
            for (let x = minVal; x <= maxVal; x++) {
                list.push(x);
            }
        }
        return list;
    }

    getChunk(x: number | [number, number]): [number, number] {
        if (typeof x === "number") {
            return [x, x];
        } else {
            return x || [0, 0];
        }
    }

    valueOf(): number[] {
        return this.unchunkify();
    }

    push(...x: number[]) {
        let a = this.unchunkify();
        for (let i = 0; i < x.length; i++) {
            a.push(x[i]);
        }
        this.new_chunks = new Chunk(a).new_chunks;
    }

    toJSON(): number[] {
        return this.unchunkify();
    }

    include(i: number): boolean {
        if ((this.new_chunks as number[]).includes(i)) return true;
        for (let c of this.new_chunks as [number, number][]) {
            if (c[0] <= i && c[1] >= i) return true;
        }
        return false;
    }
}