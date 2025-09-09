// Vercel Serverless Function - API代理
// 文件路径：/api/analyze-schedule.js

export default async function handler(req, res) {
    // 设置CORS头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // 处理OPTIONS预检请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    // 只允许POST请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { image, model = 'qwen-vl-max' } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: '缺少图片数据' });
        }
        
        // 从环境变量获取API Key
        const apiKey = process.env.DASHSCOPE_API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: 'API Key未配置' });
        }
        
        // 构建请求数据
        const prompt = `请分析这张课表图片，提取出所有课程信息，并按照以下JSON格式返回：

{
  "courses": [
    {
      "name": "课程名称",
      "teacher": "教师姓名",
      "timeSlots": [
        {
          "location": "上课地点",
          "startWeek": 1,
          "endWeek": 16,
          "dayOfWeek": 1,
          "startClass": 1,
          "endClass": 2
        }
      ]
    }
  ]
}

注意：
1. dayOfWeek: 1=星期一, 2=星期二, ..., 7=星期日
2. startClass和endClass: 第几节课（从1开始）
3. 如果同一门课程在不同周次有不同安排，请为每个时间段创建单独的timeSlot
4. 请仔细识别所有课程信息，包括课程名称、教师、地点、时间等
5. 只返回JSON格式，不要包含其他文字`;

        const requestBody = {
            model: model,
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image_url',
                            image_url: {
                                url: image
                            }
                        },
                        {
                            type: 'text',
                            text: prompt
                        }
                    ]
                }
            ],
            max_tokens: 4000,
            temperature: 0.1
        };
        
        // 调用Qwen API
        const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return res.status(response.status).json({
                error: errorData.error?.message || errorData.message || `API请求失败: ${response.status}`
            });
        }
        
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        
        if (!content) {
            return res.status(500).json({ error: 'API返回数据格式错误' });
        }
        
        try {
            // 尝试提取JSON
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                return res.status(500).json({ error: '无法从响应中提取JSON数据' });
            }
            
            const jsonData = JSON.parse(jsonMatch[0]);
            
            // 返回成功结果
            return res.status(200).json({
                success: true,
                data: jsonData
            });
            
        } catch (parseError) {
            console.error('JSON解析错误:', parseError);
            return res.status(500).json({ error: 'AI返回的数据格式不正确' });
        }
        
    } catch (error) {
        console.error('API代理错误:', error);
        return res.status(500).json({ error: '服务器内部错误' });
    }
}
