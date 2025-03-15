import {
  hexFromArgb,
  themeFromSourceColor,
  applyTheme,
} from "@material/material-color-utilities";
import ColorThief from "colorthief";

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

// 确保在DOM加载完成后插入样式
function injectViewTransitionStyles() {
  if (document.head.querySelector('#view-transition-styles')) return;

  const style = document.createElement("style");
  style.id = "view-transition-styles";
  style.textContent = `
      ::view-transition-new(root),
      ::view-transition-old(root) {
          animation: none !important;
      }
      body.apply-bg::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--temp-bg-color);
          z-index: -1;
      }
      .reverse-bg::view-transition-old(root) {
          z-index: 100 !important;
      }
  `;
  
  // 使用更可靠的插入方式
  if (document.head.firstChild) {
      document.head.insertBefore(style, document.head.firstChild);
  } else {
      document.head.appendChild(style);
  }
}
export class ColorThemeExtractor {
  private colorThief: ColorThief;

  constructor() {
    this.colorThief = new ColorThief();

    // 在title的最后添加一个style标签，用于支持后续自定义动画
    injectViewTransitionStyles();
  }

  hexFromArgb(argb: number) {
    return hexFromArgb(argb);
  }

  private transitionAnimate = (reverse = false) => {
    let startX;
    let startY;
    if (reverse) {
      startX = window.innerWidth;
      startY = 0;
    } else {
      startX = 0;
      startY = 0;
    }

    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(startX, innerWidth - startX),
      Math.max(startY, innerHeight - startY)
    );
    const clipPath = [
      `circle(0% at ${startX}px ${startY}px)`,
      `circle(${radius}px at ${startX}px ${startY}px)`,
    ];
    // 自定义动画
    document.documentElement.animate(
      {
        // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
        clipPath: reverse ? clipPath.reverse() : clipPath,
      },
      {
        duration: 350,
        // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
        pseudoElement: reverse
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  };

  applyTheme(
    theme: any,
    options?: {
      dark?: boolean;
      target?: HTMLElement;
      brightnessSuffix?: boolean;
      paletteTones?: number[];
    }
  ): void {

    const transition = document.startViewTransition(() => {
      // 在 startViewTransition 中修改 DOM 状态产生动画
      applyTheme(theme, options);

      document.body.classList.add("apply-bg");
      // 设置伪元素背景色
      const bgColor = this.hexFromArgb(
        theme.schemes.light.props.primaryContainer
      );
      document.body.style.setProperty("--temp-bg-color", bgColor);
    });

    transition.ready.then(() => {
      this.transitionAnimate();
    });

    transition.finished.then(() => {

      setTimeout(() => {
        document.documentElement.classList.add("reverse-bg");

        const transition2 = document.startViewTransition(() => {
          const bgColor = this.hexFromArgb(
            theme.schemes.light.props.background
          );
          document.body.style.setProperty("--temp-bg-color", bgColor);
        });
        transition2.ready.then(() => {
          this.transitionAnimate(true);
        });
        transition2.finished.then(() => {
          document.documentElement.classList.remove("reverse-bg");
        });
      }, 350);
    });
  }

  /**
   * 从图片中提取主色调
   */
  async extractMainColor(imageSource: string | HTMLImageElement): Promise<RGB> {
    let img: HTMLImageElement;

    if (typeof imageSource === "string") {
      img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageSource;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
    } else {
      img = imageSource;
    }

    const color = await this.colorThief.getColor(img);
    if (!color) {
      throw new Error("Failed to extract main color");
    }
    return { r: color[0], g: color[1], b: color[2] };
  }

  /**
   * 使用material you的颜色
   */

  generateThemeScheme(baseColor: RGB) {
    const source = (baseColor.r << 16) | (baseColor.g << 8) | baseColor.b;

    return themeFromSourceColor(source);
  }

  async generateThemeSchemeFromImage(imageSource: string | HTMLImageElement) {
    const baseColor = await this.extractMainColor(imageSource);
    return this.generateThemeScheme(baseColor);
  }
}

export default ColorThemeExtractor;
