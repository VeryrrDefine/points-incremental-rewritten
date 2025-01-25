
  export default {
    predictableRandom(x:number):number {
        let start = Math.pow(x % 97, 4.3) * 232344573;
        const a = 15485863;
        const b = 521791;
        start = (start * a) % b;
        for (let i = 0; i < (x * x) % 90 + 90; i++) {
          start = (start * a) % b;
        }
        return start / b;
    },
    randomSymbol():string {
        return String.fromCharCode(Math.floor(Math.random() * 50) + 192);
    },
    wordCycle(list:Array<string>, noBuffer = false):string{
      const len = list.length;
      const tick = Math.floor(Date.now() / 250) % (len * 5);
      const mod5 = ((Date.now() / 250) % (len * 5)) % 5;
      const largeTick = Math.floor(tick / 5);
      let v = list[largeTick];
      if (mod5 < 0.6) {
        v = this.blendWords(list[(largeTick + list.length - 1) % list.length], list[largeTick], (mod5 + 0.6) / 1.2);
      } else if (mod5 > 4.4) {
        v = this.blendWords(list[largeTick], list[(largeTick + 1) % list.length], (mod5 - 4.4) / 1.2);
      }
  
      v = this.randomCrossWords(v, 0.1 * Math.pow(mod5 - 2.5, 4) - 0.6);
      if (noBuffer) return v;
      const maxWordLen = Math.max(...list.map(x => x.length));
      const bufferSpace = (maxWordLen - v.length) / 2;
      return v
    },
    randomCrossWords(str:string, frac = 0.7):string {
      if (frac <= 0) return str;
      const x = str.split("");
      for (let i = 0; i < x.length * frac; i++) {
        const randomIndex = Math.floor(this.predictableRandom(Math.floor(Date.now() / 500) % 964372 + 1.618 * i) * x.length);
        x[randomIndex] = this.randomSymbol();
      }
      return x.join("");
    },
    blendWords(first:string, second:string, param:number) {
      if (param <= 0) return first;
      if (param >= 1) return second;
      return first.substring(0, first.length * (1 - param)) +
        second.substring(second.length * (1 - param), second.length);
    }
  };