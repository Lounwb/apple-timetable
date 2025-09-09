<div align="center">

# 📅 课表转ICS工具

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
</p>

<p>
  <img src="https://img.shields.io/github/stars/your-username/apple-timetable?style=social" alt="GitHub Stars">
  <img src="https://img.shields.io/github/forks/your-username/apple-timetable?style=social" alt="GitHub Forks">
  <img src="https://img.shields.io/github/license/your-username/apple-timetable" alt="License">
</p>

**一个现代化的网页工具，轻松将课表转换为ICS格式并导入到Apple日历中**

[🚀 在线体验](https://your-username.github.io/apple-timetable) | [📖 使用指南](#使用方法) | [🛠️ 部署指南](DEPLOYMENT.md) | [🐛 问题反馈](https://github.com/your-username/apple-timetable/issues)

</div>

---

## ✨ 项目亮点

🎯 **专为中国大学生设计** - 内置20+知名大学的课程时间配置，一键选择自动填充  
🤖 **AI智能识别** - 上传课表图片，AI自动提取课程信息，告别手动输入  
📱 **Apple生态优化** - 完美适配iPhone/iPad/Mac，支持一键导入日历  
🔒 **安全可靠** - 使用服务端代理保护API密钥，用户数据安全  
🎨 **现代化UI** - 蓝白配色设计，响应式布局，支持移动端和平板  
⚡ **零配置使用** - 无需注册登录，打开即用

## 🎥 功能演示

> 📸 *演示截图和GIF动图待添加*

## 🚀 核心功能

### 📚 智能大学识别
- **20+知名大学数据库** - 涵盖985/211重点大学
- **模糊搜索** - 输入学校简称即可快速匹配
- **自动填充** - 选择学校后自动填充地址和课程时间配置
- **全国覆盖** - 支持北京、上海、广东、江苏等主要省市大学

### 🤖 AI图片识别
- **一键上传** - 支持拖拽上传课表图片
- **智能解析** - 使用阿里云Qwen-VL模型识别课程信息  
- **格式支持** - 支持JPG、PNG、GIF等常见图片格式
- **准确率高** - 专门针对中文课表优化的提示词

### 📱 Apple设备优化
- **一键导入** - iPhone/iPad用户可直接导入到日历应用
- **刘海屏适配** - 完美支持iPhone X以上机型
- **iPad布局** - 针对平板设备优化的两栏布局
- **响应式设计** - 自适应不同屏幕尺寸

### ⏰ 灵活时间配置
- **多时间段支持** - 同一门课可设置不同周次的多个时间段
- **自定义提醒** - 支持1小时、30分钟、15分钟、5分钟、1分钟提醒
- **标准ICS格式** - 符合RFC 5545标准，兼容各大日历应用
- **重复规则** - 自动生成RRULE实现周期性课程安排

## 🏗️ 快速开始

### 方式一：在线使用（推荐）
直接访问 [在线版本](https://your-username.github.io/apple-timetable)，无需任何配置即可使用基础功能。

### 方式二：本地部署
```bash
# 克隆仓库
git clone https://github.com/your-username/apple-timetable.git
cd apple-timetable

# 启动本地服务器
python -m http.server 8000
# 或使用 Node.js
npx http-server

# 访问 http://localhost:8000
```

### 方式三：Vercel部署（支持AI功能）
1. Fork本仓库到你的GitHub账户
2. 在 [Vercel](https://vercel.com) 中导入项目
3. 添加环境变量：`DASHSCOPE_API_KEY`（你的阿里云API密钥）
4. 部署完成后即可使用完整功能

> 💡 **提示**：只有部署到Vercel等支持Serverless Functions的平台才能使用AI识别功能

## 📖 使用指南

### 🎯 三种使用方式

#### 方式一：AI智能识别（推荐）
1. **选择学校** - 在搜索框输入学校名称，系统自动填充地址和课程时间
2. **上传图片** - 拖拽或点击上传课表截图
3. **AI识别** - 点击"开始识别"，AI自动提取课程信息
4. **检查调整** - 确认识别结果，手动调整错误信息
5. **生成导入** - 点击"生成ICS文件"完成

#### 方式二：手动录入
1. **基本信息** - 选择学校或手动输入地址、学期开始日期、总周数
2. **课程时间** - 设置每天课程数量和时间安排
3. **添加课程** - 逐个添加课程名称、教师、上课地点和时间
4. **设置提醒** - 选择课前提醒时间（1小时/30分钟/15分钟/5分钟/1分钟）
5. **生成文件** - 导出ICS格式日历文件

#### 方式三：混合模式
先使用AI识别快速导入大部分信息，再手动调整和补充细节信息。

### 📱 导入Apple日历

**iPhone/iPad用户：**
- 生成ICS后点击"📱 导入到Apple日历"按钮即可一键导入

**手动导入：**
1. 下载生成的ICS文件
2. 发送到iOS设备或Mac
3. 双击文件选择"添加到日历"
4. 选择目标日历并确认导入

## 🛠️ 技术架构

### 前端技术栈
- **HTML5** - 语义化标签，现代Web标准
- **Tailwind CSS** - 原子化CSS框架，响应式设计
- **原生JavaScript** - 无框架依赖，轻量高效
- **PWA支持** - 支持添加到主屏幕，离线使用

### 后端服务
- **Vercel Functions** - Serverless架构，自动扩容
- **API代理** - 安全保护API密钥，防止泄露
- **阿里云通义千问** - Qwen-VL-Max多模态大模型

### 核心算法
- **ICS标准** - 符合RFC 5545日历交换格式
- **RRULE规则** - 智能生成重复课程规则
- **时区处理** - 自动处理中国时区(Asia/Shanghai)
- **UID生成** - 确保每个事件的唯一标识

### 项目结构
```
apple-timetable/
├── 📄 index.html                 # 主页面
├── ⚙️ script.js                  # 前端核心逻辑
├── 🎨 universities-data.js       # 大学数据库
├── 🔧 api/
│   └── analyze-schedule.js       # AI识别API代理
├── 📋 vercel.json               # Vercel部署配置
├── 🏗️ .github/workflows/        # GitHub Actions
├── 📖 DEPLOYMENT.md             # 部署指南
└── 🎯 favicon.svg               # 网站图标
```

## 📊 支持的大学

<details>
<summary>点击查看已收录的大学列表（20+所）</summary>

### 985工程大学
- 北京大学、清华大学、复旦大学、上海交通大学
- 浙江大学、南京大学、中山大学、华中科技大学
- 四川大学、西安交通大学、哈尔滨工业大学、中国科学技术大学
- 电子科技大学

### 211工程大学
- 北京理工大学、北京航空航天大学、大连理工大学
- 东南大学、华南理工大学、同济大学

> 💡 如果你的学校不在列表中，欢迎提交 [Issue](https://github.com/your-username/apple-timetable/issues) 或 [PR](https://github.com/your-username/apple-timetable/pulls) 添加

</details>

## 🎯 使用示例

### 复杂课程安排示例
对于同一门课程的多个时间段：
```
数据结构与算法：
├── 1-5周，星期一第3-4节 (立人楼B417)
├── 7-10周，星期一第3-4节 (立人楼B417)  
├── 1-4周，星期四第3-4节 (立人楼B417)
└── 6-10周，星期四第3-4节 (立人楼B417)
```

**传统方式**：需要添加4门相同课程  
**本工具**：添加1门课程，设置4个时间段即可！ ✨

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 如何贡献
1. **报告问题** - 发现Bug或有改进建议
2. **添加大学** - 补充更多大学的课程时间数据
3. **功能建议** - 提出新功能需求
4. **代码贡献** - 直接提交代码改进

### 开发环境
```bash
git clone https://github.com/your-username/apple-timetable.git
cd apple-timetable
# 启动本地服务器进行开发
python -m http.server 8000
```

## 🌟 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 优秀的CSS框架
- [阿里云通义千问](https://tongyi.aliyun.com/) - 强大的AI模型
- [Vercel](https://vercel.com/) - 优秀的部署平台
- 所有贡献者和用户的支持 ❤️

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**

Made with ❤️ for Chinese university students

</div>
