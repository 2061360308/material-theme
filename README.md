# Color Theme Extractor 颜色主题提取器

这是一个基于浏览器的颜色主题提取工具，可以从图片中提取主色调并生成完整的颜色变体系统。它特别适合用于生成网站主题色、设计系统的色彩方案等场景。

## 特性

- 🎨 从图片中智能提取主色调
- 🔄 自动调整颜色以确保视觉舒适度
- 🌈 生成完整的颜色变体系统：
  - 8个亮色模式变体（red-0 到 red-6，包含 red-5-5）
  - 2个阴影颜色变体
  - 5个暗色模式变体
- 💅 输出多种格式：
  - RGB/RGBA 值
  - CSS 变量
  - 十六进制颜色代码

## 安装

```bash
# 克隆仓库
git clone [your-repo-url]

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
import { ColorThemeExtractor } from 'color-theme-extractor';

const extractor = new ColorThemeExtractor();

// 从图片元素提取颜色
const imageElement = document.querySelector('img');
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

#### adjustColor(color: RGB): RGB
调整颜色以确保其适合作为主题色，会自动调整饱和度和亮度到合适范围。

#### generateFullColorScheme(baseColor: RGB)
生成完整的颜色变体系统，包括：

- lightVariants：亮色模式变体
  - red-0: 最深色版本
  - red-1 到 red-2: 渐变过渡色
  - red-3: 主色调
  - red-4 到 red-6: 渐变浅色
  - red-5-5: 特殊过渡色

- shadowColors：阴影颜色
  - red-3-shadow: 主色调的深色阴影
  - red-6-shadow: 浅色版本的阴影

- darkModeVariants：暗色模式变体
  - dark-0: 暗色主色调
  - dark-4 到 dark-6: 带透明度的亮色变体

### 类型定义

```typescript
interface RGB {
  r: number;  // 0-255
  g: number;  // 0-255
  b: number;  // 0-255
}

interface HSL {
  h: number;  // 0-360
  s: number;  // 0-100
  l: number;  // 0-100
}
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