### 克隆到本地

执行此操作使用干净的 git 历史记录

```bash
npx degit wlndRises/naive-admin-lite my-admin-app
cd my-admin-app
```

## 开始

```bash
pnpm install # 如果你没装过 pnpm, 可以先运行: npm install -g pnpm
```

### 启动开发服务器 并自定义端口

```bash
pnpm run dev --port = 4396
```

### 构建预发布环境

```bash
pnpm run build:stage
```

### 构建生产环境

```bash
pnpm run build
```

### 预览发布环境效果

```bash
pnpm run preview
```

### 预览发布环境效果 + 静态资源分析

```bash
pnpm run report
```

### 压缩 svg 图标

```bash
pnpm run svgo
```
