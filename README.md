# 智慧关务平台 (Smart Customs Platform)

基于Vue3、TypeScript和Naive UI构建的现代化智慧关务平台前端项目。

## 项目简介

智慧关务平台是一个面向海关业务的综合管理系统，致力于提升海关业务的数字化、智能化水平，实现业务流程的高效管理与协同。本项目是该平台的前端部分，采用了现代化的技术栈和优雅的设计风格。

## 技术栈

- **核心框架**：Vue 3.5.x
- **构建工具**：Vite 6.x
- **编程语言**：TypeScript
- **UI组件库**：Naive UI 2.41.x
- **CSS工具**：UnoCSS
- **状态管理**：Pinia 2.3.x
- **路由管理**：Vue Router 4.5.x
- **HTTP客户端**：基于Axios封装
- **图表库**：ECharts 5.6.x
- **国际化**：Vue I18n 11.x

## 项目特性

- **响应式设计**：适配多种终端设备，提供一致的用户体验
- **动态路由**：支持静态和动态两种路由模式，灵活配置
- **权限管理**：精细化的用户角色与权限控制系统
- **主题定制**：内置多种主题，支持用户自定义主题配置
- **多语言支持**：内建国际化解决方案，轻松切换多语言
- **数据可视化**：集成ECharts图表库，提供丰富的数据展示方式
- **组件封装**：丰富的业务组件库，提高开发效率
- **API代理**：内置HTTP代理配置，解决开发环境跨域问题

## 目录结构

```
├── build             # 构建相关的配置和脚本
├── doc               # 项目文档和资源
├── nginx             # Nginx配置文件
├── packages          # 内部工具包和组件库
├── public            # 静态资源文件
├── src               # 源代码
│   ├── assets        # 静态资源
│   ├── components    # 公共组件
│   ├── constants     # 常量定义
│   ├── enum          # 枚举类型
│   ├── hooks         # Vue组合式API钩子
│   ├── layouts       # 布局组件
│   ├── locales       # 国际化资源
│   ├── plugins       # 插件
│   ├── router        # 路由配置
│   ├── service       # API服务和请求
│   ├── store         # Pinia状态管理
│   ├── styles        # 全局样式
│   ├── theme         # 主题配置
│   ├── typings       # TypeScript类型定义
│   ├── utils         # 工具函数
│   ├── views         # 页面视图组件
│   ├── App.vue       # 根组件
│   └── main.ts       # 入口文件
├── .env              # 环境变量配置
├── .env.prod         # 生产环境变量
├── .env.test         # 测试环境变量
├── package.json      # 项目依赖和脚本
├── tsconfig.json     # TypeScript配置
├── uno.config.ts     # UnoCSS配置
└── vite.config.ts    # Vite配置
```

## 快速开始

### 环境要求

- Node.js 18.12.0+
- PNPM 8.7.0+

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
# 使用测试环境配置启动开发服务器
pnpm dev

# 使用生产环境配置启动开发服务器
pnpm dev:prod
```

### 构建项目

```bash
# 构建测试环境
pnpm build:test

# 构建生产环境
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

## 功能模块

- **首页仪表盘**：概览系统关键指标和数据统计
- **商品管理**：进出口商品信息管理与查询
- **用户中心**：用户信息、权限和设置管理
- **监控系统**：系统运行状态和性能监控
- **工具集**：辅助工具和实用功能
- **管理模块**：系统管理和配置

## 开发规范

- 遵循ESLint和Prettier配置的代码格式规范
- 采用TypeScript进行类型检查，提高代码质量
- 遵循组件化开发原则，保持组件的独立性和可复用性
- 使用Git提交规范，确保版本历史清晰

## 部署说明

项目支持Docker容器化部署，可参考根目录下的Dockerfile配置。

## 许可证

本项目采用 [Apache-2.0](LICENSE) 许可证。
