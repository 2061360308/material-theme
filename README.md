# Material You 动态配色方案生成器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Chrome Version](https://img.shields.io/badge/Chrome-111+-brightgreen)

基于 Google Material You 设计规范的动态配色生成工具，能够从任意图片中提取主色并生成完整的亮/暗色系配色方案。

## ✨ 特性

- 🎨 图片主色自动提取
- 🌓 自动生成亮/暗双模式配色
- 🌀 平滑的 View Transition 动画
- 📱 响应式布局
- 🎯 精准的色彩对比度计算
- 💫 动态 CSS 变量注入

## 效果展示

![效果图](./image/example.gif)

## 🚀 快速开始

### 使用

#### UMD

```html
<script src="https://cdn.jsdelivr.net/gh/2061360308/material-theme@main/dist/material-theme.umd.js"></script>
```

```javascript
const extractor = new materialTheme.ColorThemeExtractor();

// 从图片生成配色方案
async function generateScheme(imageFile) {
  /** 方法也接受接受图片URL */
  const scheme = await extractor.generateThemeSchemeFromImage(imageFile);
  extractor.applyTheme(scheme, {
    target: document.body,
    dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
  });
}
```

#### ESM

```html
<script type="module">
  import { ColorThemeExtractor } from 'https://cdn.jsdelivr.net/gh/2061360308/material-theme@main/dist/material-theme.mjs'

  const extractor = new ColorThemeExtractor();

  // 从图片生成配色方案
  async function generateScheme(imageFile) {
    /** 方法也接受接受图片URL */
    const scheme = await extractor.generateThemeSchemeFromImage(imageFile);
    extractor.applyTheme(scheme, {
      target: document.body,
      dark: window.matchMedia("(prefers-color-scheme: dark)").matches,
    });
  }
</script>
```

#### 补充

applyTheme 函数定义如下

```ts
/**
 * Apply a theme to an element
 *
 * @param theme Theme object
 * @param options Options
 */
export declare function applyTheme(theme: Theme, options?: {
    dark?: boolean;
    target?: HTMLElement;
    brightnessSuffix?: boolean;
    paletteTones?: number[];
}): void;
```

更详细示例请看下方API介绍

## 🖥️ 开发指南

### 安装

```bash
# 克隆仓库
git clone https://github.com/2061360308/material-theme

# 安装依赖
npm install
```

### 运行示例

1. 启动开发服务器：

```bash
npm run dev
```

2. 在浏览器中打开显示的地址（通常是 `http://localhost:5173`）
3. 上传图片即可查看生成的颜色方案

## API 文档

### ColorThemeExtractor

needTransition: boolean, 默认值true。是否启用主题切换过渡动画
    

#### extractMainColor(imageSource: string | HTMLImageElement): Promise<RGB>

从图片中提取主色调。

#### hexFromArgb(color: Argb): Hex

将Argb颜色转换为16进制表示的样式


#### applyTheme()

> **原型**
```ts
applyTheme(
    theme: any,
    options?: {
      dark?: boolean;
      target?: HTMLElement;
      brightnessSuffix?: boolean;
      paletteTones?: number[];
    }
  )
```

应用主题色，更改了`material-color-utilities`原先的方法，会自动应用过渡动画（示例化时使用false可修改默认行为）。

**brightnessSuffix**：为true时会同时将light和dark模式的颜色都挂载为元素的css变量，并以-dark和-light加以区分

**paletteTones**：接收一个数组来指定需要生成哪些色调（0-100，数值越高颜色越亮）。这些色调会被转换为对应的 CSS 变量，便于在页面中直接使用或进一步处理，如动态生成渐变等高级应用。例如给定[10, 60]则会在原有基础上多添加以下css变量

```css
:root {
    --md-ref-palette-primary-primary10: #0c2000;
    --md-ref-palette-primary-primary60: #6f9e48;
    --md-ref-palette-secondary-secondary10: #141e0c;
    --md-ref-palette-secondary-secondary60: #88957a;
    --md-ref-palette-tertiary-tertiary10: #00201f;
    --md-ref-palette-tertiary-tertiary60: #6b9997;
    --md-ref-palette-neutral-neutral10: #1a1c18;
    --md-ref-palette-neutral-neutral60: #90918b;
    --md-ref-palette-neutral-variant-neutral-variant10: #191d14;
    --md-ref-palette-neutral-variant-neutral-variant60: #8e9286;
    --md-ref-palette-error-error10: #410002;
    --md-ref-palette-error-error60: #ff5449;
}
```

#### generateThemeScheme(baseColor: RGB)

给定RGB颜色生成主题色

#### async generateThemeSchemeFromImage(imageSource: string | HTMLImageElement)

给定img元素或者图片URL生成主题色

### 关于主题色

生成完整的颜色变体系统，css变量示例如下：

> 更多关于动态主题色相关信息，参考仓库[material-color-utilities](https://github.com/material-foundation/material-color-utilities) 以及文档 [science-of-color-design](https://m3.material.io/blog/science-of-color-design)

```
--md-sys-color-primary: #006c4a;
--md-sys-color-on-primary: #ffffff;
--md-sys-color-primary-container: #8bf8c4;
--md-sys-color-on-primary-container: #002114;
--md-sys-color-secondary: #4d6357;
--md-sys-color-on-secondary: #ffffff;
--md-sys-color-secondary-container: #cfe9d8;
--md-sys-color-on-secondary-container: #0a1f16;
--md-sys-color-tertiary: #3d6473;
--md-sys-color-on-tertiary: #ffffff;
--md-sys-color-tertiary-container: #c0e9fb;
--md-sys-color-on-tertiary-container: #001f29;
--md-sys-color-error: #ba1a1a;
--md-sys-color-on-error: #ffffff;
--md-sys-color-error-container: #ffdad6;
--md-sys-color-on-error-container: #410002;
--md-sys-color-background: #fbfdf9;
--md-sys-color-on-background: #191c1a;
--md-sys-color-surface: #fbfdf9;
--md-sys-color-on-surface: #191c1a;
--md-sys-color-surface-variant: #dce5dd;
--md-sys-color-on-surface-variant: #404943;
--md-sys-color-outline: #707973;
--md-sys-color-outline-variant: #c0c9c1;
--md-sys-color-shadow: #000000;
--md-sys-color-scrim: #000000;
--md-sys-color-inverse-surface: #2e312f;
--md-sys-color-inverse-on-surface: #eff1ed;
--md-sys-color-inverse-primary: #6edbaa;
```

## 构建

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录：

- UMD 格式：`dist/color-theme-extractor.umd.js`
- ES 模块格式：`dist/color-theme-extractor.mjs`
- 类型定义：`dist/index.d.ts`

## 技术栈

- TypeScript
- Vite
- Color Thief
- 原生 DOM API

## 鸣谢
主题色切换动画效果来自
[@Author 远方os](https://juejin.cn/post/7361721559239524390)

[material-color-utilities](https://github.com/material-foundation/material-color-utilities)
Color libraries for Material You

[colorthief](https://github.com/lokesh/color-thief)
Grab the color palette from an image using just Javascript. Works in the browser and in Node.
## 许可证

MIT
