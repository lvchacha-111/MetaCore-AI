# MetaCore AI — AI 智能硬件架构工程师平台

> 一站式 AI 驱动的嵌入式硬件方案自动生成平台，支持 ESP32 / STM32 系列芯片。
> 从需求描述到硬件方案、工程代码、执行流程图，全链路自动化。

---

## 目录

- [项目简介](#项目简介)
- [功能概览](#功能概览)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [页面与功能说明](#页面与功能说明)
- [AI 服务配置](#ai-服务配置)
- [使用流程](#使用流程)
- [导出功能](#导出功能)
- [主题切换](#主题切换)
- [常见问题](#常见问题)

---

## 项目简介

MetaCore AI 是一个纯 Web 端的 AI 硬件架构工程师平台。你只需要用自然语言描述硬件需求（比如"做一个 AI 桌宠，需要 OLED 显示表情、播放声音、检测温湿度"），平台就会通过 AI 自动完成：

1. **硬件方案设计** — 引脚分配、BOM 清单、接线对照表
2. **可视化引脚图** — SVG 芯片引脚图，悬停查看连接详情
3. **模块化工程代码** — 完整可编译的 C/C++ 工程（ESP-IDF / Arduino / PlatformIO）
4. **代码执行流程图** — 自动分析代码生成可交互的流程图
5. **AI 问答助手** — 基于项目上下文的硬件工程顾问
6. **一键导出** — ZIP 工程包 + 专业 PDF 文档

无需安装任何桌面软件，浏览器打开即用。

---

## 功能概览

| 功能模块 | 说明 |
|---------|------|
| 需求生成 | 输入自然语言需求，AI 生成完整硬件方案（引脚 + BOM + 接线） |
| 引脚可视化 | SVG 芯片图，支持 ESP32 / ESP32-S3 / STM32F103 / STM32F4 |
| 代码生成 | 根据硬件方案生成模块化 C/C++ 工程代码 |
| 流程图 | 自动分析代码执行流程，生成可交互节点图 |
| AI 问答 | 流程图页内置 AI 聊天面板，硬件工程顾问角色 |
| 项目管理 | 多项目创建、加载、删除，数据本地持久化 |
| 导出 | ZIP 工程包下载 + PDF 专业文档导出 |
| 主题 | 暗色 / 亮色主题一键切换 |

---

## 技术栈

| 技术 | 用途 |
|------|------|
| React 18 + TypeScript | UI 框架 |
| Vite 5 | 构建工具，开发热更新 |
| Tailwind CSS 3 | 原子化 CSS 样式 |
| Zustand | 轻量状态管理（含 persist 持久化） |
| React Router 6 | 前端路由（HashRouter） |
| ReactFlow | 流程图可视化 |
| Monaco Editor | 代码预览编辑器（VS Code 同款） |
| @react-pdf/renderer | 浏览器端 PDF 生成 |
| JSZip | 浏览器端 ZIP 打包下载 |
| Lucide React | 图标库 |

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9（或 pnpm / yarn）

### 安装与启动

```bash
# 1. 进入项目目录
cd "MetaCore AI"

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

启动后浏览器访问 `http://localhost:5173` 即可使用。

> Windows 用户也可以双击项目根目录的 `start.bat` 一键启动。

### 构建生产版本

```bash
# 构建
npm run build

# 预览构建结果
npm run preview
```

构建产物输出到 `dist/` 目录，可直接部署到任意静态服务器（Nginx、Vercel、Netlify 等）。

---

## 项目结构

```
MetaCore AI/
├── index.html                    # 入口 HTML
├── package.json                  # 依赖配置
├── vite.config.ts                # Vite 配置
├── tailwind.config.cjs           # Tailwind 配置
├── postcss.config.cjs            # PostCSS 配置
├── tsconfig.json                 # TypeScript 配置
├── start.bat                     # Windows 一键启动脚本
│
└── src/
    ├── main.tsx                  # 应用入口（挂载 React + 主题初始化）
    ├── App.tsx                   # 路由配置
    ├── index.css                 # 全局样式（CSS 变量 + 动画 + 主题）
    │
    ├── components/
    │   ├── layout/
    │   │   ├── MainLayout.tsx    # 主布局（侧边栏 + 内容区）
    │   │   └── Sidebar.tsx       # 侧边栏导航 + 主题切换按钮
    │   │
    │   ├── pages/
    │   │   ├── RequirementPage.tsx   # 需求 → 硬件方案页
    │   │   ├── CodegenPage.tsx       # 代码生成页
    │   │   ├── FlowPage.tsx          # 流程图 + AI 问答页
    │   │   ├── SettingsPage.tsx      # AI 服务设置页
    │   │   └── HelpPage.tsx          # 使用教程 + 更新日志
    │   │
    │   ├── requirement/
    │   │   ├── PinDiagram.tsx    # SVG 芯片引脚可视化
    │   │   ├── PinTable.tsx      # 引脚分配表格
    │   │   ├── BOMTable.tsx      # BOM 物料清单表格
    │   │   └── WiringTable.tsx   # 接线对照表格
    │   │
    │   ├── codegen/
    │   │   ├── FileTree.tsx      # 文件树导航
    │   │   ├── CodePreview.tsx   # Monaco 代码预览
    │   │   └── ExportButtons.tsx # ZIP / PDF 导出按钮
    │   │
    │   ├── flow/
    │   │   ├── FlowCanvas.tsx    # ReactFlow 流程图画布
    │   │   └── AIChatPanel.tsx   # AI 聊天面板
    │   │
    │   ├── project/
    │   │   └── ProjectManager.tsx # 项目管理器（列表/新建/删除）
    │   │
    │   └── settings/
    │       ├── AIServiceForm.tsx  # AI 服务编辑表单
    │       └── ServiceCard.tsx    # AI 服务卡片
    │
    ├── store/                     # Zustand 状态管理
    │   ├── projectStore.ts        # 当前活跃项目状态
    │   ├── projectsStore.ts       # 多项目列表（持久化）
    │   ├── aiConfigStore.ts       # AI 服务配置（持久化）
    │   └── themeStore.ts          # 主题状态（持久化）
    │
    ├── services/
    │   ├── ai/
    │   │   ├── client.ts          # AI API 客户端（OpenAI 兼容协议）
    │   │   └── prompts.ts         # 4 套 AI 提示词模板
    │   └── export/
    │       ├── pdfExport.tsx       # PDF 文档生成
    │       └── zipExport.ts        # ZIP 工程包生成
    │
    ├── types/                     # TypeScript 类型定义
    │   ├── ai.ts                  # AI 服务类型 + 默认服务列表
    │   ├── hardware.ts            # 芯片/引脚/BOM/接线类型
    │   └── project.ts             # 项目/方案/代码文件/流程图类型
    │
    └── lib/
        └── utils.ts               # 工具函数（cn 样式合并、parseJSON）
```

---

## 页面与功能说明

### 1. 项目管理（/projects）

管理所有项目，支持：
- **新建项目**：输入项目名称，选择目标芯片和工程格式
- **加载项目**：点击项目卡片切换到该项目
- **删除项目**：带确认弹窗，防止误删
- 项目数据通过 Zustand persist 自动保存到浏览器 localStorage

### 2. 需求生成（/requirement）

核心页面，工作流程：
1. 在文本框中用自然语言描述你的硬件需求
2. 选择目标芯片（ESP32 / ESP32-S3 / STM32F103 / STM32F4）
3. 选择工程格式（ESP-IDF / Arduino / PlatformIO）
4. 点击「生成方案」，AI 自动返回：
   - **方案概述** — 整体架构描述
   - **引脚分配** — 可切换「引脚图」和「表格」两种视图
   - **BOM 清单** — 器件名称、型号、数量、参考价格
   - **接线对照表** — 起点→终点、推荐线色、注意事项

页面提供 3 个示例按钮，点击可快速填入示例需求。

### 3. 代码生成（/codegen）

基于硬件方案生成完整工程代码：
- 点击「生成代码」，AI 根据方案生成模块化 C/C++ 工程
- 左侧文件树浏览所有生成的文件
- 右侧 Monaco Editor 预览代码（语法高亮）
- 顶部导出按钮：下载 ZIP 工程包 或 导出 PDF 文档

### 4. 流程图（/flow）

自动分析代码执行流程：
- 点击「生成流程图」，AI 分析代码结构生成节点和连线
- 节点按类型着色：初始化（靛蓝）、传感器（绿）、通信（青）、显示（琥珀）、错误（红）
- 点击节点可展开查看关联代码片段
- 支持缩放、拖拽、小地图导航
- 右侧可展开 AI 聊天面板，基于项目上下文进行问答

### 5. 设置（/settings）

配置 AI 服务：
- 预置 5 个服务商（DeepSeek、硅基流动、通义千问、OpenAI、Ollama）
- 支持添加自定义 OpenAI 兼容服务
- 每个服务可独立配置：API Key、Base URL、模型名称
- 选中一个服务作为「活跃服务」供全局调用

### 6. 帮助（/help）

使用教程和更新日志：
- 分步骤图文教程，引导新用户上手
- 版本更新日志，记录每次功能迭代

---

## AI 服务配置

MetaCore AI 使用 **OpenAI 兼容协议**（`/chat/completions` 接口），因此支持所有兼容该协议的 AI 服务。

### 预置服务商

| 服务商 | Base URL | 默认模型 | 说明 |
|--------|----------|---------|------|
| DeepSeek | `https://api.deepseek.com/v1` | deepseek-chat | 国产大模型，性价比高 |
| 硅基流动 | `https://api.siliconflow.cn/v1` | deepseek-ai/DeepSeek-V3 | 模型聚合平台 |
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | qwen-plus | 阿里云大模型 |
| OpenAI | `https://api.openai.com/v1` | gpt-4o | 需要海外网络 |
| Ollama | `http://localhost:11434/v1` | llama3 | 本地部署，无需 API Key |

### 配置步骤

1. 进入「设置」页面
2. 找到你要使用的服务商卡片（或点击「添加服务」新建）
3. 填入 API Key（Ollama 本地部署可留空）
4. 可选修改 Base URL 和模型名称
5. 点击卡片上的「启用」开关
6. 点击「设为活跃」按钮，该服务将用于所有 AI 调用

> 推荐使用 DeepSeek 或硅基流动，国内访问稳定，价格实惠。

---

## 使用流程

完整的使用流程如下：

```
配置 AI 服务 → 描述需求 → 生成硬件方案 → 生成工程代码 → 生成流程图 → 导出
```

### 详细步骤

**第一步：配置 AI 服务**
- 进入「设置」页，填入 API Key，启用并设为活跃

**第二步：描述硬件需求**
- 进入「需求生成」页
- 在文本框中描述你想做的硬件项目，越详细越好
- 选择目标芯片和工程格式
- 点击「生成方案」

**第三步：查看硬件方案**
- AI 返回后，查看方案概述
- 切换「引脚图 / 表格」查看引脚分配
- 查看 BOM 清单和接线对照表
- 如果不满意，修改需求重新生成

**第四步：生成工程代码**
- 点击「生成工程代码」跳转到代码页
- 点击「生成代码」，AI 生成模块化工程
- 在文件树中浏览各文件，Monaco Editor 预览代码

**第五步：生成流程图**
- 进入「流程图」页，点击「生成流程图」
- 查看代码执行流程的可视化节点图
- 点击节点展开查看关联代码
- 有疑问可打开右侧 AI 聊天面板提问

**第六步：导出**
- 在代码页点击「下载 ZIP」获取完整工程包
- 点击「导出 PDF」获取专业的硬件方案文档

---

## 导出功能

### ZIP 工程包
- 包含所有生成的代码文件，保持目录结构
- 下载后解压即可用对应 IDE 打开编译
- 浏览器原生下载，无需服务器

### PDF 文档
- 封面：项目名称、芯片型号、生成时间
- 方案概述
- 引脚分配表
- BOM 清单（含价格汇总）
- 接线对照表
- 代码文件列表
- 使用 @react-pdf/renderer 在浏览器端生成

---

## 主题切换

侧边栏底部有 🌙/☀️ 图标按钮，点击可在暗色和亮色主题之间切换。

- **暗色主题**：深色背景 + 柔和发光效果，适合长时间使用
- **亮色主题**：浅色背景 + 清爽配色，适合明亮环境

主题偏好自动保存到浏览器，下次打开自动恢复。

---

## 常见问题

### Q: AI 生成失败怎么办？
- 检查「设置」页的 AI 服务是否已配置 API Key 并设为活跃
- 检查网络连接是否正常
- 如果使用 Ollama，确保本地服务已启动（`ollama serve`）
- 尝试切换其他 AI 服务商

### Q: 生成的方案不满意？
- 尝试更详细地描述需求，包括具体的传感器型号、通信方式、显示需求等
- 可以多次生成，AI 每次会给出不同的方案

### Q: 生成的代码能直接编译吗？
- AI 生成的代码以完整可编译为目标，但可能需要根据实际硬件微调
- 建议下载 ZIP 后在对应 IDE（VS Code + ESP-IDF / Arduino IDE / PlatformIO）中打开检查

### Q: 数据保存在哪里？
- 所有数据（项目、AI 配置、主题偏好）保存在浏览器的 localStorage 中
- 清除浏览器数据会丢失所有项目，建议重要项目及时导出

### Q: 支持哪些芯片？
- ESP32（38 引脚）
- ESP32-S3（44 引脚）
- STM32F103（48 引脚）
- STM32F4（64 引脚）

### Q: 可以部署到服务器吗？
- 可以。运行 `npm run build` 后将 `dist/` 目录部署到任意静态服务器即可
- 所有 AI 调用直接从浏览器发起，无需后端服务

---

## 许可

本项目仅供学习和个人使用。
