import { hardReset, player, save } from "."
import { saveSerializer } from "./serializer";
function copyToClipboard(textToCopy:string) {
    if(document.execCommand('copy')) {
      // 创建textarea
      var textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      // 使textarea不在viewport，同时设置不可见
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise((res, rej) => {
        // 执行复制命令并移除文本框
        document.execCommand('copy') ? res("Success") : rej();
        textArea.remove();
      });
    } else if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      // navigator clipboard 向剪贴板写文本
      return navigator.clipboard.writeText(textToCopy);
    }
  }

export function formattedHardReset() {
    var confirms = 3
    for(let i = 1; i < 3; i++) {
        let promption = prompt(`请输入${i}以进行第${i}/${confirms}次确认，此操作无法还原!`)
        if(promption != String(i)) return
    }
    let promption = prompt(`请输入${confirms}以进行最后一次确认，此操作无法还原!`)
    if(promption != String(confirms)) return
    
    hardReset();
    save();
    location.reload();
}

export function exportCopy() {
     return copyToClipboard(saveSerializer.serialize(player))
}
function getCurrentBeijingTime() {
    const t = new Date,
      e = t.getUTCFullYear(),
      r = String(t.getUTCMonth() + 1),
      a = String(t.getUTCDate()),
      n = t.getUTCHours(),
      g = t.getUTCMinutes(),
      i = t.getUTCSeconds(),
      S = t.getUTCMilliseconds();
    let o = (n + 8) % 24;
    return o < 0 && (t.setUTCDate(t.getUTCDate() + 1), o += 24), `${e}-${r}-${a} ${o.toString()}:${g.toString()}:${i.toString()}.${S.toString()}`
  }

export function exportFile() {
    let str = saveSerializer.serialize(player)
    let file = new Blob([str], {
      type: "text/plain"
    })
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement("a")
    a.href = window.URL.createObjectURL(file)
    a.download = "Points Incremental Save - " + getCurrentBeijingTime() + ".txt"
    a.click()
  }