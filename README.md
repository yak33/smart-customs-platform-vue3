# 智慧关务平台前端 Smart Customs Platform Vue3

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5.21-brightgreen.svg" alt="Vue"/>
  <img src="https://img.shields.io/badge/Vite-7.1.5-646CFF.svg" alt="Vite"/>
  <img src="https://img.shields.io/badge/TypeScript-5.9.2-blue.svg" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Naive%20UI-2.43.1-2080F0.svg" alt="Naive UI"/>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"/>
  <img src="https://img.shields.io/badge/Version-0.0.1-yellow.svg" alt="Version"/>
</p>

<p align="center">
  <a href="#-项目简介">项目简介</a> •
  <a href="#%EF%B8%8F-技术栈">技术栈</a> •
  <a href="#-项目结构">项目结构</a> •
  <a href="#-快速开始">快速开始</a> •
  <a href="./CHANGELOG.md">更新日志</a>
</p>

## 📖 项目简介

智慧关务平台前端是基于 Vue 3、TypeScript、Vite 7 和 Naive UI 构建的现代化企业级管理系统前端应用，采用 Monorepo 架构，提供完整的权限管理、动态路由、主题切换等功能，专注于提供智能化的海关业务管理解决方案。

### ✨ 核心特性

- 🚀 **最新技术栈**：Vue 3.5.21 + TypeScript 5.9 + Vite 7.1.5
- 🎨 **优雅 UI**：Naive UI 组件库，提供优秀的用户体验
- 📦 **Monorepo 架构**：基于 pnpm workspace 的 monorepo 项目管理
- 🎯 **TypeScript**：完整的类型支持，提升开发体验
- 🔐 **权限管理**：完善的 RBAC 权限控制，按钮级别权限
- 🌐 **国际化**：内置 i18n 国际化方案
- 🎨 **主题切换**：支持明暗主题切换，多种主题色
- 📱 **响应式布局**：支持移动端适配
- 🔄 **动态路由**：基于权限的动态路由生成
- 🛠️ **代码生成**：内置代码生成工具，提高开发效率
- ⚡ **性能优化**：路由懒加载、组件按需引入
- 📊 **数据可视化**：集成 ECharts 图表库
- 📝 **富文本编辑**：集成 TinyMCE 和 UmoEditor
- 📤 **Excel 导入导出**：支持大文件处理
- 🔒 **数据加密**：支持 RSA 加密通信

## 🛠️ 技术栈

### 核心框架

| 技术 | 版本 | 说明 |
|-----|------|------|
| Vue | 3.5.21 | 渐进式 JavaScript 框架 |
| TypeScript | 5.9.2 | JavaScript 的超集 |
| Vite | 7.1.5 | 下一代前端构建工具 |
| Pinia | 3.0.3 | Vue 状态管理库 |
| Vue Router | 4.5.1 | Vue 官方路由 |

### UI 组件库

| 技术 | 版本 | 说明 |
|-----|------|------|
| Naive UI | 2.43.1 | Vue 3 组件库 |
| UnoCSS | 66.5.1 | 原子化 CSS 引擎 |
| Iconify | 5.0.0 | 图标解决方案 |

### 工具库

| 技术 | 版本 | 说明 |
|-----|------|------|
| VueUse | 13.9.0 | Vue Composition API 工具集 |
| Day.js | 1.11.18 | 轻量级日期处理库 |
| ECharts | 6.0.0 | 数据可视化图表库 |
| Axios | - | HTTP 请求库 |
| XLSX | 0.18.5 | Excel 处理库 |
| JSEncrypt | 3.3.2 | RSA 加密库 |
| Monaco Editor | 0.52.2 | 代码编辑器 |
| Highlight.js | 11.11.1 | 代码高亮 |

### 开发工具

- Node.js >= 20.19.0
- pnpm >= 10.5.0
- ESLint 9.35.0
- Vue TSC 3.0.7

## 📁 项目结构

```
smart-customs-platform-vue3
├── build/                          # 构建配置
│   ├── config/                    # 构建工具配置
│   └── plugins/                   # Vite 插件配置
├── packages/                       # Monorepo 子包
│   ├── axios/                     # Axios 封装
│   ├── color/                     # 颜色工具
│   ├── hooks/                     # 通用 Hooks
│   ├── materials/                 # 组件物料
│   ├── scripts/                   # 脚本工具
│   ├── tinymce/                   # 富文本编辑器
│   ├── uno-preset/                # UnoCSS 预设
│   └── utils/                     # 工具函数
├── public/                         # 静态资源
│   ├── favicon.ico
│   └── logo.png
├── src/                           # 源代码
│   ├── assets/                    # 资源文件
│   ├── components/                # 全局组件
│   ├── constants/                 # 常量定义
│   ├── enum/                      # 枚举定义
│   ├── hooks/                     # 业务 Hooks
│   ├── layouts/                   # 布局组件
│   ├── locales/                   # 国际化配置
│   ├── plugins/                   # 插件配置
│   ├── router/                    # 路由配置
│   ├── service/                   # API 服务
│   ├── store/                     # 状态管理
│   ├── styles/                    # 全局样式
│   ├── theme/                     # 主题配置
│   ├── typings/                   # 类型定义
│   ├── utils/                     # 工具函数
│   ├── views/                     # 页面视图
│   ├── App.vue                    # 根组件
│   └── main.ts                    # 入口文件
├── .editorconfig                  # 编辑器配置
├── .env                           # 环境变量（公共）
├── .env.dev                       # 开发环境变量
├── .env.test                      # 测试环境变量
├── .env.prod                      # 生产环境变量
├── .gitignore                     # Git 忽略配置
├── .npmrc                         # npm 配置
├── CHANGELOG.md                   # 更新日志
├── LICENSE                        # MIT 开源协议
├── README.md                      # 项目说明文档
├── eslint.config.js               # ESLint 配置
├── index.html                     # HTML 模板
├── package.json                   # 项目依赖
├── pnpm-lock.yaml                 # 依赖锁定文件
├── pnpm-workspace.yaml            # pnpm workspace 配置
├── tsconfig.json                  # TypeScript 配置
├── uno.config.ts                  # UnoCSS 配置
└── vite.config.ts                 # Vite 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0
- pnpm >= 10.5.0

### 安装依赖

```bash
# 使用 pnpm 安装依赖
pnpm install

# 如果遇到依赖问题，可以尝试强制安装
pnpm install --force

# 清理缓存后重新安装
pnpm clean:cache && pnpm install
```

### 开发环境

```bash
# 启动开发服务器（默认使用 dev 环境）
pnpm dev

# 启动开发服务器（使用 test 环境）
pnpm dev:test

# 启动开发服务器（使用 prod 环境）
pnpm dev:prod
```

访问 http://localhost:9527

### 构建项目

```bash
# 构建开发环境
pnpm build:dev

# 构建测试环境
pnpm build:test

# 构建生产环境
pnpm build

# 预览构建结果
pnpm preview
```

### 代码检查和格式化

```bash
# 运行 ESLint 检查并自动修复
pnpm lint

# TypeScript 类型检查
pnpm typecheck
```

### 其他命令

```bash
# 清理构建产物
pnpm clean

# 清理 node_modules
pnpm clean:modules

# 完全重装依赖
pnpm reinstall

# 生成路由
pnpm gen-route

# Git 提交（使用 commitizen）
pnpm commit
pnpm commit:zh  # 中文模式

# 更新依赖包
pnpm update-pkg

# 发布版本
pnpm release
```

## 📚 开发指南

### 环境变量配置

项目使用 `.env` 文件管理环境变量：

- `.env` - 所有环境通用配置
- `.env.dev` - 开发环境配置
- `.env.test` - 测试环境配置
- `.env.prod` - 生产环境配置

主要配置项：

```bash
# 应用标题
VITE_APP_TITLE=智慧关务平台

# 应用基础路径
VITE_BASE_URL=/

# 后端 API 地址
VITE_SERVICE_BASE_URL=http://localhost:8080

# 路由模式 hash | history
VITE_ROUTER_HISTORY_MODE=history

# 是否开启打包文件大小分析
VITE_VISUALIZER=N

# 是否开启打包压缩
VITE_COMPRESS=Y

# 压缩类型 gzip | brotli | none
VITE_COMPRESS_TYPE=gzip
```

### 目录说明

#### `/src/service` - API 服务层

所有的后端接口调用都在这里定义：

```typescript
// 示例：用户相关接口
export function fetchUserList(params: UserListParams) {
  return request.get<UserListResponse>('/system/user/list', { params });
}
```

#### `/src/store` - 状态管理

使用 Pinia 进行状态管理：

```typescript
export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    token: '',
    userInfo: null
  }),
  actions: {
    async login(params: LoginParams) {
      // 登录逻辑
    }
  }
});
```

#### `/src/router` - 路由配置

采用动态路由方案，根据用户权限自动生成路由。

#### `/src/views` - 页面视图

按业务模块组织页面文件：

```
views/
├── _builtin/           # 内置页面（登录、404等）
├── home/              # 首页
├── system/            # 系统管理
│   ├── user/         # 用户管理
│   ├── role/         # 角色管理
│   ├── menu/         # 菜单管理
│   └── ...
└── business/          # 业务模块
```

### 开发规范

#### 代码风格

- 使用 ESLint 进行代码检查
- 使用 TypeScript 编写代码
- 遵循 Vue 3 组合式 API 规范
- 使用 `<script setup>` 语法

#### 命名规范

- 组件文件：PascalCase（如 `UserList.vue`）
- 工具函数文件：kebab-case（如 `format-date.ts`）
- 常量：UPPER_SNAKE_CASE（如 `MAX_COUNT`）
- 变量/函数：camelCase（如 `userName`）

#### Git 提交规范

使用 Commitizen 规范提交信息：

```bash
# 运行提交命令
pnpm commit

# 选择提交类型
# ✨ feat: 新功能
# 🐛 fix: 修复bug
# 📝 docs: 文档更新
# 💄 style: 代码格式调整
# ♻️ refactor: 重构
# ⚡ perf: 性能优化
# ✅ test: 测试相关
# 🔧 chore: 构建/工具链相关
```

### 主题定制

系统支持主题切换和自定义主题色：

1. 在设置面板中可切换明暗主题
2. 支持多种预设主题色
3. 可自定义主题色

### 国际化

项目内置中英文支持：

```typescript
// 使用 i18n
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const title = t('common.confirm');
```

## 🔐 权限管理

### 路由权限

路由权限通过后端返回的菜单数据动态生成，自动匹配前端路由配置。

### 按钮权限

使用指令控制按钮级别权限：

```vue
<template>
  <n-button v-permission="'system:user:add'">
    添加用户
  </n-button>
</template>
```

## 📊 数据可视化

集成 ECharts 图表库，提供丰富的图表组件：

- 折线图
- 柱状图
- 饼图
- 仪表盘
- 地图等

## 📝 富文本编辑器

支持两种富文本编辑器：

1. **TinyMCE**：功能强大的传统编辑器
2. **UmoEditor**：现代化的 Markdown 编辑器

## 🔒 数据加密

- 支持 RSA 加密，保护敏感数据传输
- 登录密码 RSA 加密
- 敏感接口数据加密

## 📱 响应式设计

- 支持桌面端、平板、手机端适配
- 移动端优化的导航菜单
- 响应式表格和表单

## 🛠️ 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | 最新版 |
| Edge | 最新版 |
| Firefox | 最新版 |
| Safari | 最新版 |

**注意**：不支持 IE 浏览器

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交流程

1. Fork 本仓库
2. 创建特性分支（`git checkout -b feature/AmazingFeature`）
3. 提交更改（`pnpm commit`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 提交 Pull Request

### 提交规范

详见 [Git 提交规范](#git-提交规范)

## 📋 更新日志

查看 [CHANGELOG.md](./CHANGELOG.md) 了解项目的所有版本变更记录。

**最新版本**：v0.0.1 (2025-10-06)

主要特性：
- ✨ 完整的 Vue 3 + TypeScript 企业级管理系统
- 🎨 Naive UI 组件库，优雅的用户界面
- 🔐 完善的 RBAC 权限控制系统
- 🌐 内置国际化支持
- 🎨 主题切换和自定义
- 📊 数据可视化图表
- 📝 富文本编辑器
- 📤 Excel 导入导出

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 👨‍💻 作者

**ZHANGCHAO**

- Email: vuanne1@gmail.com
- GitHub: https://github.com/yak33/smart-customs-platform-vue3

## 🙏 鸣谢

感谢以下开源项目：

- [Vue](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Naive UI](https://www.naiveui.com/)
- [UnoCSS](https://unocss.dev/)
- [VueUse](https://vueuse.org/)
- [Pinia](https://pinia.vuejs.org/)

## 📞 联系我们

如有问题或建议，欢迎通过以下方式联系：

- 提交 [Issue](https://github.com/yak33/smart-customs-platform-vue3/issues)
- 发送邮件至：vuanne1@gmail.com

---

⭐ 如果这个项目对你有帮助，请给一个 Star 支持一下！

---

**Made with ❤️ by ZHANGCHAO**
