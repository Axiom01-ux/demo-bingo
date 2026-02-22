# Bingo Prediction App - 开发设计与交互说明文档 (Final Version)

## 1. 项目概述
Bingo 是一款高保真、社交化的预测市场小程序。用户可以针对各类热门事件进行“是/否”投注，通过准确预测赚取收益，并参与全球排名。本项目采用 React 19 + TypeScript + Tailwind CSS 开发，强调“Crafted”设计感与极致的交互体验。

---

## 2. UI 设计规范 (Design System)

### 2.1 色彩体系 (Color Palette)
*   **背景层级**:
    *   `Primary BG`: `Neutral-950` (#0a0a0a) - 页面主背景。
    *   `Surface BG`: `Neutral-900/40` - 卡片及容器背景，带透明度以增强层次。
    *   `Elevated`: `Neutral-900` - 弹窗及抽屉背景。
*   **品牌与状态**:
    *   `Brand`: `Violet-600` (#7c3aed) - 核心交互色。
    *   `Success`: `Emerald-500` - "YES" 选项、盈利、胜率。
    *   `Danger`: `Red-500` - "NO" 选项、亏损。
*   **边框**: `White/10` 或 `Neutral-800` - 极细边框（1px），营造精致感。

### 2.2 字体规范 (Typography)
*   **主字体**: `Inter` (Sans-serif) - 默认 UI 字体。
*   **等宽字体**: `JetBrains Mono` - 用于推荐码、USDC 数值、赔率，确保字符对齐。
*   **排版细节**: 
    *   大标题使用 `font-black` (900) 配合 `tracking-tight`。
    *   辅助标签使用 `text-[10px]` 配合 `font-black uppercase tracking-widest`。

### 2.3 核心组件样式
*   **圆角**: 统一使用 `rounded-3xl` (24px) 或 `rounded-[32px]`。
*   **头像**: 统一缩小至 `w-8 h-8` 或 `w-10 h-10`，并配有极细边框。

---

## 3. 功能模块说明

### 3.1 导航系统 (Navigation)
*   **底部导航栏**: 仅保留 **首页 (Home)**、**创建 (Create)**、**钱包 (Wallet)** 三个核心入口，去除冗余功能。
*   **侧边栏 (Profile Drawer)**: 
    *   作为全局信息中心，展示用户信息、**积分余额 (Points)** 及 **推荐码 (Referral Code)**。
    *   提供 **排行榜 (Leaderboard)**、**设置 (Settings)** 等次级功能入口。

### 3.2 首页与详情 (Home & Detail)
*   **预测卡片**: 紧凑型设计，展示分类、问题、成交量、当前概率及 YES/NO 赔率。
*   **交互**: 点击卡片进入详情，点击 YES/NO 直接唤起投注。

### 3.3 积分与推荐 (Points & Referral)
*   **积分获取**: 投注行为触发，逻辑为 `Amount * 10`。
*   **推荐码**: 用户专属 7 位大写字母/数字组合，支持一键复制。

### 3.4 排行榜 (Leaderboard)
*   **双维度排名**: 
    *   `Accuracy`: 基于胜率排名，体现专业度。
    *   `Volume`: 基于交易额排名，体现活跃度。
*   **视觉**: 采用 `rounded-2xl` 的列表项，前三名配有特殊视觉标识。

### 3.5 分享海报生成器 (Share Poster)
*   **规格**: 缩小版海报（Max-width: 320px），适合移动端社交分享。
*   **技术实现**: 
    *   `qrcode.react`: 生成包含 `ref` 和 `betId` 的动态二维码。
    *   `html-to-image`: 将 DOM 节点实时渲染为 PNG 图像。
    *   **交互**: 点击二维码可复制分享链接，点击“Save Image”执行下载。

---

## 4. 交互规格 (Interaction Specs)

### 4.1 动画反馈
*   **物理反馈**: 所有点击项（按钮、卡片）均配置 `active:scale-[0.98]` 或 `active:scale-95`。
*   **进入动画**: 页面及弹窗使用 `animate-in fade-in zoom-in-95`，持续时间 `300ms`。

### 4.2 路由与滚动
*   **平滑滚动**: 切换视图时自动执行 `window.scrollTo({ top: 0, behavior: 'smooth' })`。
*   **视图管理**: 采用状态驱动的单页视图切换，确保无缝体验。

---

## 5. 开发建议 (Developer Notes)

### 5.1 核心依赖
```json
{
  "framer-motion": "动画核心",
  "lucide-react": "图标库",
  "qrcode.react": "二维码生成",
  "html-to-image": "海报渲染"
}
```

### 5.2 状态管理建议
*   建议使用 `useState` 或 `Context API` 管理 `currentUser` 的全局状态（尤其是积分和推荐码）。
*   预测市场数据建议通过 `constants.ts` 进行 Mock，或接入标准 REST API。

---
**文档维护**: Bingo 产品团队  
**最后更新**: 2026-02-21 05:55

