# VIZO 部署到 Vercel 指南

部署后你将获得一个永久链接（如 `vizo-xxx.vercel.app`），手机、电脑随时打开使用。

---

## 方式一：通过 GitHub 部署（推荐，最简单）

### 第一步：把项目推到 GitHub

1. **注册 GitHub**（若还没有）：https://github.com/signup

2. **在 GitHub 创建新仓库**：
   - 打开 https://github.com/new
   - 仓库名填：`vizo-dashboard`（或任意名称）
   - 选择 **Public**
   - 点击 **Create repository**

3. **在终端执行**（在项目文件夹 `VIZO - 检测面板` 中）：

```bash
cd "/Users/xiannvdediannao/Desktop/cursor/VIZO - 检测面板"

# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - VIZO 预测市场监测"

# 添加远程仓库（把 YOUR_USERNAME 和 YOUR_REPO 改成你的）
# 例如：git remote add origin https://github.com/zhangsan/vizo-dashboard.git
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 推送
git push -u origin main
```

> 如果提示 `main` 分支不存在，试试 `git push -u origin master`

### 第二步：在 Vercel 导入并部署

1. **注册 Vercel**：https://vercel.com/signup  
   - 推荐用 **GitHub 账号** 登录

2. **导入项目**：
   - 登录后点击 **Add New...** → **Project**
   - 选择 **Import Git Repository**
   - 找到你的 `vizo-dashboard` 仓库，点击 **Import**

3. **配置（通常不需要改）**：
   - Framework Preset：**Vite**（自动识别）
   - Build Command：`npm run build`
   - Output Directory：`dist`
   - 直接点击 **Deploy**

4. **等待 1–2 分钟**，部署完成后会显示你的链接，例如：
   ```
   https://vizo-dashboard-xxx.vercel.app
   ```

5. **之后每次更新**：  
   只需在本地改完代码后执行：
   ```bash
   git add .
   git commit -m "更新说明"
   git push
   ```
   Vercel 会自动重新部署。

---

## 方式二：用 Vercel 命令行部署（无需 GitHub）

### 第一步：安装 Vercel CLI

```bash
npm install -g vercel
```

### 第二步：在项目目录执行

```bash
cd "/Users/xiannvdediannao/Desktop/cursor/VIZO - 检测面板"

# 登录（会打开浏览器）
vercel login

# 部署
vercel
```

按提示操作：

- **Set up and deploy?** → 选 `Y`
- **Which scope?** → 选你的账号
- **Link to existing project?** → 选 `N`
- **Project name?** → 直接回车（或用自定义名称如 `vizo-dashboard`）
- **Directory?** → 直接回车

部署完成后会得到一个预览链接，例如 `https://vizo-xxx.vercel.app`。

### 发布为正式版本

```bash
vercel --prod
```

---

## 常见问题

### 1. 部署失败，显示 Build Error

检查是否已执行过 `npm install`，并确认 `package.json` 里的 `build` 脚本为：

```json
"build": "vite build"
```

### 2. 页面打开是空白

通常是路由或资源路径问题。本项目为单页应用，一般不会出现。如有问题，可在 Vercel 项目设置的 **Environment Variables** 里确认没有错误配置。

### 3. 想用自定义域名

在 Vercel 项目里进入 **Settings** → **Domains**，添加你的域名并按提示配置 DNS。

---

## 免费额度说明

- Vercel 个人版 **免费**
- 适合个人项目、 Demo、内部使用
- 每月有免费带宽与构建次数，一般足够使用
