interface changelogInterface {
    version:string;
    changes: Array<string>;
}

export const changelog:Array<changelogInterface> = [
    {
      version: "0.1.5",
      changes: [
        "使用vue.js重构游戏界面",
      ]
    },
    {
      version: "0.1.4.1",
      changes: [
        "修复部分三叠纪时期的手机无法导出至剪贴板的bug",
        "修改部分样式",
      ]
    },
    {
      version: "0.1.4",
      changes: [
        "添加<spoiler>快捷键</spoiler>",
      ]
    },
    {
      version: "0.1.3.1",
      changes: [
        "修复<spoiler>星系</spoiler>不重置维度的bug",
      ]
    },
    {
      version: "0.1.3",
      changes: [
        "修改<spoiler>星系</spoiler>增益公式",
      ]
    },
    {
      version: "0.1.2.1",
      changes: [
        "完善<spoiler>自动购买维度</spoiler>逻辑",
      ]
    },
    {
      version: "0.1.2",
      changes: [
        "添加<spoiler>星系</spoiler>重置",
      ]
    },
    {
      version: "0.1.1",
      changes: [
        "添加<spoiler>维度</spoiler>的最大购买按钮",
        "添加<spoiler>√点数</spoiler>软上限",
        "修改<spoiler>星系</spoiler>重置按钮",
        "添加游戏加载提示",
        "修复了计时器掌控者等恶意脚本可以干扰游戏运行的bug",
      ]
    },
    {
      version: "0.1",
      changes: [
        "添加<spoiler>√点数</spoiler>",
      ]
    },
    {
      version: "0.0",
      changes: [
        "添加<spoiler>维度1~8</spoiler>",
      ]
    },
]