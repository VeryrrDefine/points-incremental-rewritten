import PowiainaNum from "powiaina_num.js";
import formatPowiainanum from "format-powiainanum";

export function formatGain(a:PowiainaNum,e:PowiainaNum,res="") {
    const g = PowiainaNum.add(a,e.div(30))
    const DT = new PowiainaNum("10^^6")

    if (g.neq(a)) {
        if (a.gte(DT)) {
            var oom = new PowiainaNum(g).slog(10).sub(new PowiainaNum(a).slog(10)).mul(30)
            if (oom.gte(1e-3)) return formatPowiainanum(oom) + " 数量级^^2"
        }

        if (a.gte('ee100')) {
            var tower = new PowiainaNum(a).slog(10).sub(1.3010299956639813).floor();
    
            var oom = new PowiainaNum(g).iteratedlog(10,tower).sub(new PowiainaNum(a).iteratedlog(10,tower)).mul(30), rated = false;
    
            if (oom.gte(1)) rated = true
            else if (tower.gt(2)) {
                tower = tower.sub(1)
                oom = new PowiainaNum(g).iteratedlog(10,tower).sub(new PowiainaNum(a).iteratedlog(10,tower)).mul(30)
                if (oom.gte(1)) rated = true
            }
    
            if (rated) return formatPowiainanum(oom) + " 数量级^"+tower
        }
    
        if (a.gte(1e100)) {
            const oom = g.div(a).log10().mul(30)
            if (oom.gte(1)) return formatPowiainanum(oom) + " 数量级"
        }
    }

    return formatPowiainanum(e) + res
}