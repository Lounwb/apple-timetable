# 安全部署指南

## 🔒 API Key 安全问题解决方案

为了解决API Key在前端暴露的安全问题，我们现在使用服务端代理的方式来保护API Key。

## 🚀 部署选项

### 选项1：Vercel 部署（推荐）

1. **Fork 仓库到你的GitHub账户**

2. **连接到Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用GitHub账户登录
   - 导入你的仓库

3. **配置环境变量**
   - 在Vercel项目设置中添加环境变量：
   - `DASHSCOPE_API_KEY` = 你的阿里云DashScope API Key

4. **部署**
   - Vercel会自动部署
   - 访问分配的域名即可使用

### 选项2：Netlify 部署

1. **创建Netlify Functions**
   
   将 `api/analyze-schedule.js` 移动到 `netlify/functions/analyze-schedule.js`

2. **修改前端API调用**
   
   在 `script.js` 中修改API端点：
   ```javascript
   const apiUrl = '/.netlify/functions/analyze-schedule';
   ```

3. **配置环境变量**
   - 在Netlify项目设置中添加：
   - `DASHSCOPE_API_KEY` = 你的API Key

### 选项3：GitHub Pages + 外部API服务

如果你想继续使用GitHub Pages，可以：

1. **部署API服务到其他平台**（如Vercel、Railway、Render等）
2. **修改前端API调用地址**指向外部服务
3. **配置CORS**允许GitHub Pages域名访问

## 🔧 本地开发

1. **安装依赖**（如果使用Node.js）
   ```bash
   npm install
   ```

2. **配置环境变量**
   ```bash
   # 创建 .env.local 文件
   echo "DASHSCOPE_API_KEY=sk-your-api-key" > .env.local
   ```

3. **启动本地服务**
   ```bash
   # Vercel
   vercel dev
   
   # 或者使用简单的HTTP服务器
   python -m http.server 3000
   ```

## 🛡️ 安全优势

- ✅ **API Key完全隐藏**：用户无法在前端看到API Key
- ✅ **服务端验证**：可以在服务端添加额外的验证逻辑
- ✅ **请求限制**：可以在服务端实现速率限制
- ✅ **日志记录**：可以记录API使用情况
- ✅ **错误处理**：统一的错误处理机制

## 📝 文件结构

```
apple-timetable/
├── api/
│   └── analyze-schedule.js     # Vercel Serverless Function
├── netlify/
│   └── functions/
│       └── analyze-schedule.js # Netlify Functions (可选)
├── index.html                  # 前端页面
├── script.js                   # 前端逻辑（已移除API Key）
├── universities-data.js        # 大学数据
├── vercel.json                 # Vercel配置
└── DEPLOYMENT.md              # 部署说明
```

## ⚠️ 重要提示

1. **不要在前端代码中硬编码API Key**
2. **确保在服务端正确配置环境变量**
3. **定期轮换API Key以提高安全性**
4. **监控API使用量，防止滥用**

## 🆘 故障排除

### 问题：API调用失败
- 检查环境变量是否正确配置
- 检查API Key是否有效
- 查看服务端日志

### 问题：CORS错误
- 确保服务端正确设置CORS头
- 检查域名是否在允许列表中

### 问题：本地开发无法访问API
- 确保本地API服务正在运行
- 检查API端点URL是否正确
