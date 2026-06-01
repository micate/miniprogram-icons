<p align="center">
  <a href="https://www.npmjs.com/package/miniprogram-icons"><img src="https://img.shields.io/npm/v/miniprogram-icons" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/miniprogram-icons"><img src="https://img.shields.io/npm/dm/miniprogram-icons" alt="npm downloads"></a>
</p>

## 特性

- **动态颜色支持**：运行时动态修改图标颜色
- **Tree Shaking**：每个图标独立模块，只打包你使用的图标
- **TypeScript 支持**：完整的类型定义
- 支持 `size`、`color`、`strokeWidth`、`absoluteStrokeWidth` 等属性
- **实心图标支持**：通过 `filled` 渲染实心图标（如 Heart）
- **CLI 工具**：支持生成小程序 TabBar 所需的 PNG 图标

## 安装

```bash
npm install miniprogram-icons
# or
yarn add miniprogram-icons
# or
pnpm add miniprogram-icons
```

## 引入方式

```tsx
// ✅ 推荐：主入口导入（已优化打包速度, 支持 tree-shaking）
import { House, Settings, User } from 'miniprogram-icons';

// 可选：子路径导入（适合只用少量图标的场景）
import { House } from 'miniprogram-icons/icons/house';
```

## 使用

```tsx
import { House, Settings, User, Camera, Zap } from 'miniprogram-icons';

// 基本用法
<House />

// 自定义尺寸
<Settings size={32} />

// 自定义颜色
<Camera color="red" />
<Camera color="#1890ff" />
<Camera color="rgb(255, 0, 0)" />

// 实心图标（如 Heart）
<Heart filled color="#ff3e98" />

// 自定义描边宽度
<Zap strokeWidth={1} />
<Zap strokeWidth={3} />

// 绝对描边宽度（描边不随尺寸缩放）
<Zap size={48} strokeWidth={2} absoluteStrokeWidth />

// 组合使用
<User size={48} color="#ff3e98" strokeWidth={1.5} />

// 自定义 className
<User className="my-icon" />

// 自定义样式
<User size={24} style={{ marginRight: 8 }} />

// className 和 style 组合使用
<User className="my-icon" style={{ marginRight: 8 }} />
```

### MiniProgramIconsProvider（全局默认配置）

通过 `MiniProgramIconsProvider` 为所有子组件设置默认颜色和尺寸，避免在每个图标上重复传递 props：

```tsx
import { MiniProgramIconsProvider, House, Settings, Camera } from 'miniprogram-icons';

// 所有子组件默认使用 #666 颜色和 20px 尺寸
<MiniProgramIconsProvider defaultColor="#666" defaultSize={20}>
  <House />              {/* 使用 #666, 20px */}
  <Settings color="red" /> {/* color prop 优先，使用 red */}
  <Camera size={32} />    {/* size prop 优先，使用 32px */}
</MiniProgramIconsProvider>
```

> **注意**：由于小程序端 SVG 是通过 Data URL 渲染的，图标无法从 CSS 继承父元素的文字颜色（`currentColor` 会回退为黑色）。建议通过 `MiniProgramIconsProvider` 或 `color` prop 显式指定颜色。

## API

| 属性                | 类型             | 默认值 | 说明                                          |
| ------------------- | ---------------- | ------ | --------------------------------------------- |
| size                | number \| string | 24     | 图标尺寸，传 `"inherit"` 使用 Provider 默认值 |
| color               | string           | -      | 图标颜色，传 `"inherit"` 使用 Provider 默认值 |
| filled              | boolean          | false  | 是否渲染为实心（fill=currentColor）           |
| strokeWidth         | number \| string | 2      | 描边宽度                                      |
| absoluteStrokeWidth | boolean          | false  | 绝对描边宽度，启用后描边不随 size 缩放        |
| className           | string           | -      | CSS 类名                                      |
| style               | CSSProperties    | -      | 自定义样式                                    |

同时支持 Taro `Image` 组件的其他属性。

### 强制要求 color 和 size（全局配置）

如果你希望在项目中强制要求每个图标都必须传递 `color` 和 `size` 属性（避免遗漏导致样式不一致），你可以通过 TypeScript 的 Module Augmentation（模块增强）来实现：

```tsx
// 在你的项目类型声明文件（如 global.d.ts 或 taro-env.d.ts）中添加：
export {};
declare module 'miniprogram-icons' {
  interface MiniProgramIconsConfig {
    strictProps: true;
  }
}
```

> **注意**：文件中必须包含 `export {}` 使其成为模块文件，否则 TypeScript 会将 `declare module` 视为完整的模块声明而非模块增强，导致原有导出（如 `House`、`Settings` 等）丢失。

配置后，如果使用图标时不传入 `color` 或 `size`，TypeScript 将会报错。

#### 配合 MiniProgramIconsProvider 使用 `"inherit"`

在 `strictProps` 模式下，如果已通过 `MiniProgramIconsProvider` 设置了默认值，可以传入 `"inherit"` 来使用 Provider 的默认颜色和尺寸，而不必在每个图标上重复传值：

```tsx
import { MiniProgramIconsProvider, House, Settings } from 'miniprogram-icons';

<MiniProgramIconsProvider defaultColor="#666" defaultSize={20}>
  {/* inherit 表示使用 Provider 的默认值 */}
  <House color="inherit" size="inherit" />

  {/* 也可以只 inherit 其中一个，另一个显式指定 */}
  <Settings color="inherit" size={32} />
</MiniProgramIconsProvider>
```

## CLI 工具

微信小程序的 TabBar 不支持 base64 或 SVG 图片，只能使用本地 PNG 文件。本库提供了 CLI 工具来生成 TabBar 所需的 PNG 图标。

### 生成 TabBar 图标

```bash
# 生成单个图标
pnpm dlx miniprogram-tabbar House -c "#999999"

# 生成带选中状态的图标（推荐）
pnpm dlx miniprogram-tabbar House -c "#999999" -a "#1890ff"

# 批量生成多个图标
pnpm dlx miniprogram-tabbar House Settings User -c "#999999" -a "#1890ff"

# 指定输出目录
pnpm dlx miniprogram-tabbar House -c "#999999" -o ./src/assets/tabbar

# 指定尺寸（小程序推荐 81x81）
pnpm dlx miniprogram-tabbar House -c "#999999" -s 81
```

### CLI 参数

| 参数             | 简写 | 默认值           | 说明                                     |
| ---------------- | ---- | ---------------- | ---------------------------------------- |
| `--color`        | `-c` | `#000000`        | 图标颜色                                 |
| `--active-color` | `-a` | -                | 选中状态颜色（不传则不生成 active 版本） |
| `--size`         | `-s` | `81`             | 图标尺寸（小程序推荐 81x81）             |
| `--output`       | `-o` | `./tabbar-icons` | 输出目录                                 |
| `--stroke-width` | -    | `2`              | 描边宽度                                 |

### 输出文件

```
./tabbar-icons/
├── house.png           # 普通状态
├── house-active.png    # 选中状态
├── settings.png
├── settings-active.png
└── ...
```

### 在 app.config.ts 中使用

```ts
export default defineAppConfig({
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/tabbar/house.png',
        selectedIconPath: 'assets/tabbar/house-active.png',
      },
      {
        pagePath: 'pages/settings/index',
        text: '设置',
        iconPath: 'assets/tabbar/settings.png',
        selectedIconPath: 'assets/tabbar/settings-active.png',
      },
    ],
  },
});
```

### 图标查找工具

本库提供了图标查找工具，支持精确查找、模糊查找和列出所有图标。

```bash
# 模糊查找（默认）
pnpm dlx miniprogram-icons-find arrow

# 精确查找
pnpm dlx miniprogram-icons-find arrow-up --exact

# 批量验证（输出 JSON，适合 AI 调用）
pnpm dlx miniprogram-icons-find arrow-up user settings arw --json

# 列出所有图标
pnpm dlx miniprogram-icons-find --list
```

### 图标预览工具

本库提供了终端图标预览工具，支持在命令行直接查看图标样式。

```bash
# 预览图标
pnpm dlx miniprogram-icons-show ArrowUp

# 自定义大小和颜色
pnpm dlx miniprogram-icons-show Heart -c "#ff3e98" -s 30
```

## 开发

```bash
# 安装依赖
npm install

# 完整构建
npm run build

# 运行测试
npm test
```

### 项目结构

```
├── packages/
│   ├── miniprogram-icons/         # 主库源码与测试
│   ├── generate/                  # 共享构建工具包
│   ├── miniprogram-tabbar/        # TabBar CLI 包
│   ├── miniprogram-icons-find/          # 图标查找 CLI 包
│   └── miniprogram-icons-show/          # 终端预览 CLI 包
├── docs/                          # 文档站
└── .cache/                 # 上游图标缓存
```

## License

ISC + MIT
