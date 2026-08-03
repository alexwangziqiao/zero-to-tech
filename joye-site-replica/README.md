# Joye Blog 框架复刻

对 https://www.joyehuang.me/ 的页面**框架**复刻（原创代码实现，仅模仿布局与交互结构，内容均为占位符）。

## 原站分析

| 维度 | 原站 |
|---|---|
| 框架 | Astro v5.8.1（SSG） |
| 主题 | astro-theme-pure（深度定制） |
| 样式 | Tailwind CSS + CSS 变量（HSL 双主题） |
| 字体 | Satoshi Variable + JetBrains Mono |
| 交互 | Astro Islands（终端、吉祥物等组件孤岛水合） |
| 三方 | Waline 评论/浏览量、Vercel Analytics |
| 部署 | Vercel |

### 页面结构
1. Sticky 胶囊导航（7 菜单 + 搜索/语言/主题/汉堡按钮）
2. Hero（头像光环、标语、定位/GitHub chip、带呼吸绿点的 Connect 按钮）
3. 交互式终端 wterm（macOS 红绿灯、折叠/展开、`help`/`ls`/`cat` 命令、按 `` ` `` 唤起）
4. About / Blog / Projects / Talks / Skills 分区（左标题右内容双栏，md 断点折叠为单栏）
5. 推广卡片 + 左下角延迟弹窗（打字机文案）
6. 技能标签云 + 统计数字
7. Quote 轮播 + 页脚 + ASCII 吉祥物彩蛋

## 本地运行

无需构建工具，直接打开：

```bash
open index.html
# 或起个本地服务器
python3 -m http.server 8000
```

## 文件结构

```
joye-site-replica/
├── index.html      # 页面结构
├── css/style.css   # 双主题 CSS 变量 + 全部样式
└── js/main.js      # 主题切换 / 终端 / 打字机 / 弹窗 / Quote 轮播
```

## 已实现的原站特性

- [x] 明/暗双主题（CSS 变量 + localStorage + 系统偏好）
- [x] Sticky 胶囊导航 + 滚动阴影 + 移动端折叠菜单
- [x] Hero 区（呼吸绿点、头像渐变环）
- [x] 可交互终端（`help` `about` `ls` `cat` `theme` `clear` `exit`，按 `` ` `` 打开）
- [x] 左标题右内容分区布局（响应式）
- [x] 卡片列表 hover 箭头滑动动画
- [x] 推广卡片 + 左下角打字机弹窗
- [x] 技能标签云 + 统计数字
- [x] Quote 轮播、ASCII 吉祥物、页脚

## 如何换成自己的内容

1. `index.html` 中替换名字、slogan、博客卡片、技能标签
2. `css/style.css` 中 `--highlight` / `--primary` 换成你的主题色
3. `js/main.js` 中 `FS` 和 `COMMANDS` 自定义终端命令，`QUOTES` 换语录
