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
<script src="https://cdn.example.com/material-theme.umd.js"></script>
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
  const { ColorThemeExtractor } = await import("./src/index");
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

## 🖥️ 开发指南

### 项目结构

## 安装

```bash
# 克隆仓库
git clone []

# 安装依赖
npm install
```

## 使用方法

### 作为开发工具使用

1. 启动开发服务器：

```bash
npm run dev
```

2. 在浏览器中打开显示的地址（通常是 `http://localhost:5173`）
3. 上传图片即可查看生成的颜色方案

### 在项目中使用

```typescript
import { ColorThemeExtractor } from "color-theme-extractor";

const extractor = new ColorThemeExtractor();

// 从图片元素提取颜色
const imageElement = document.querySelector("img");
const mainColor = await extractor.extractMainColor(imageElement);

// 调整颜色使其更适合作为主题色
const adjustedColor = extractor.adjustColor(mainColor);

// 生成完整的颜色方案
const colorScheme = extractor.generateFullColorScheme(adjustedColor);
```

## API 文档

### ColorThemeExtractor

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

应用主题色，更改了`material-color-utilities`原先的方法，会自动应用过渡动画。

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

## 许可证

MIT
