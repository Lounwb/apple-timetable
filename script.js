// 全局变量
let courses = [];
let classTimes = [];

// 默认课程时间配置
const defaultClassTimes = [
    { start: "08:30", end: "09:15" },
    { start: "09:20", end: "10:05" },
    { start: "10:20", end: "11:05" },
    { start: "11:10", end: "11:55" },
    { start: "14:30", end: "15:15" },
    { start: "15:20", end: "16:05" },
    { start: "16:20", end: "17:05" },
    { start: "17:10", end: "17:55" },
    { start: "19:30", end: "20:15" },
    { start: "20:20", end: "21:05" },
    { start: "21:10", end: "21:55" }
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeClassTimes();
    setupEventListeners();
    
    // 设置默认值
    setDefaultValues();
});

// 初始化课程时间
function initializeClassTimes() {
    classTimes = [...defaultClassTimes];
    updateClassTimesDisplay();
}

// 设置事件监听器
function setupEventListeners() {
    // 课程时间相关
    document.getElementById('classesPerDay').addEventListener('change', updateClassTimesCount);
    document.getElementById('classDuration').addEventListener('change', updateClassTimesDuration);
    document.getElementById('breakDuration').addEventListener('change', updateClassTimesBreak);
    document.getElementById('addClassTime').addEventListener('click', addClassTime);
    
    // 课程相关
    document.getElementById('addCourse').addEventListener('click', addCourse);
    
    // 生成ICS
    document.getElementById('generateICS').addEventListener('click', generateICS);
}

// 更新课程时间数量
function updateClassTimesCount() {
    const count = parseInt(document.getElementById('classesPerDay').value) || 11;
    const duration = parseInt(document.getElementById('classDuration').value) || 45;
    const breakDuration = parseInt(document.getElementById('breakDuration').value) || 15;
    
    // 重新生成课程时间
    classTimes = [];
    let currentTime = new Date();
    currentTime.setHours(8, 30, 0, 0); // 8:30开始
    
    for (let i = 0; i < count; i++) {
        const startTime = new Date(currentTime);
        const endTime = new Date(currentTime.getTime() + duration * 60000);
        
        classTimes.push({
            start: formatTime(startTime),
            end: formatTime(endTime)
        });
        
        // 计算下一节课开始时间
        currentTime = new Date(endTime.getTime() + breakDuration * 60000);
        
        // 如果是第4节课后，增加午休时间
        if (i === 3) {
            currentTime.setHours(14, 30, 0, 0);
        }
    }
    
    updateClassTimesDisplay();
}

// 更新课程时长
function updateClassTimesDuration() {
    updateClassTimesCount();
}

// 更新休息时间
function updateClassTimesBreak() {
    updateClassTimesCount();
}

// 格式化时间
function formatTime(date) {
    return date.toTimeString().slice(0, 5);
}

// 解析时间字符串为Date对象
function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
}

// 更新课程时间显示
function updateClassTimesDisplay() {
    const container = document.getElementById('classTimes');
    container.innerHTML = '';
    
    classTimes.forEach((time, index) => {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'flex items-center space-x-2';
        timeDiv.innerHTML = `
            <span class="text-sm text-gray-600 w-8">第${index + 1}节</span>
            <input type="time" value="${time.start}" class="px-2 py-1 border border-gray-300 rounded text-sm" data-index="${index}" data-type="start">
            <span class="text-sm text-gray-500">-</span>
            <input type="time" value="${time.end}" class="px-2 py-1 border border-gray-300 rounded text-sm" data-index="${index}" data-type="end">
            <button type="button" class="text-red-500 hover:text-red-700 text-sm" onclick="removeClassTime(${index})">删除</button>
        `;
        
        // 添加时间变化监听器
        const startInput = timeDiv.querySelector('[data-type="start"]');
        const endInput = timeDiv.querySelector('[data-type="end"]');
        
        startInput.addEventListener('change', function() {
            classTimes[index].start = this.value;
            updateEndTime(index);
        });
        
        endInput.addEventListener('change', function() {
            classTimes[index].end = this.value;
        });
        
        container.appendChild(timeDiv);
    });
}

// 更新结束时间
function updateEndTime(index) {
    const startTime = parseTime(classTimes[index].start);
    const duration = parseInt(document.getElementById('classDuration').value) || 45;
    const endTime = new Date(startTime.getTime() + duration * 60000);
    classTimes[index].end = formatTime(endTime);
    
    // 更新显示
    const endInput = document.querySelector(`[data-index="${index}"][data-type="end"]`);
    if (endInput) {
        endInput.value = classTimes[index].end;
    }
}

// 添加课程时间
function addClassTime() {
    const lastTime = classTimes[classTimes.length - 1];
    const lastEndTime = parseTime(lastTime.end);
    const breakDuration = parseInt(document.getElementById('breakDuration').value) || 15;
    const duration = parseInt(document.getElementById('classDuration').value) || 45;
    
    const newStartTime = new Date(lastEndTime.getTime() + breakDuration * 60000);
    const newEndTime = new Date(newStartTime.getTime() + duration * 60000);
    
    classTimes.push({
        start: formatTime(newStartTime),
        end: formatTime(newEndTime)
    });
    
    updateClassTimesDisplay();
    document.getElementById('classesPerDay').value = classTimes.length;
}

// 删除课程时间
function removeClassTime(index) {
    classTimes.splice(index, 1);
    updateClassTimesDisplay();
    document.getElementById('classesPerDay').value = classTimes.length;
}

// 添加课程
function addCourse() {
    const courseId = Date.now();
    const course = {
        id: courseId,
        name: '',
        teacher: '',
        timeSlots: [{
            id: Date.now() + 1,
            location: '',
            startWeek: 1,
            endWeek: 16,
            dayOfWeek: 1,
            startClass: 1,
            endClass: 2
        }]
    };
    
    courses.push(course);
    updateCoursesDisplay();
}

// 更新课程显示
function updateCoursesDisplay() {
    const container = document.getElementById('coursesList');
    container.innerHTML = '';
    
    courses.forEach((course, index) => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'border border-gray-200 rounded-lg p-4 bg-gray-50';
        courseDiv.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">课程 ${index + 1}</h3>
                <button type="button" class="text-red-500 hover:text-red-700" onclick="removeCourse(${course.id})">删除课程</button>
            </div>
            
            <!-- 课程基本信息 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">课程名称</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
                           value="${course.name}" onchange="updateCourse(${course.id}, 'name', this.value)" placeholder="例如：概率论与数理统计">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">教师姓名</label>
                    <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" 
                           value="${course.teacher}" onchange="updateCourse(${course.id}, 'teacher', this.value)" placeholder="例如：张老师">
                </div>
            </div>
            
            <!-- 上课时间段 -->
            <div class="mb-4">
                <div class="flex justify-between items-center mb-2">
                    <h4 class="text-md font-medium text-gray-800">上课时间段</h4>
                    <button type="button" class="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600" onclick="addTimeSlot(${course.id})">添加时间段</button>
                </div>
                <div id="timeSlots-${course.id}" class="space-y-3">
                    ${generateTimeSlotsHTML(course)}
                </div>
            </div>
        `;
        container.appendChild(courseDiv);
    });
}

// 生成时间段HTML
function generateTimeSlotsHTML(course) {
    return course.timeSlots.map((timeSlot, index) => `
        <div class="border border-gray-300 rounded-lg p-3 bg-white">
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm font-medium text-gray-700">时间段 ${index + 1}</span>
                ${course.timeSlots.length > 1 ? `<button type="button" class="text-red-500 hover:text-red-700 text-sm" onclick="removeTimeSlot(${course.id}, ${timeSlot.id})">删除</button>` : ''}
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">上课地点</label>
                    <input type="text" class="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                           value="${timeSlot.location}" onchange="updateTimeSlot(${course.id}, ${timeSlot.id}, 'location', this.value)" placeholder="例如：立人楼B417">
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">上课周数</label>
                    <div class="flex space-x-1">
                        <input type="number" class="w-16 px-1 py-1 border border-gray-300 rounded text-sm" 
                               value="${timeSlot.startWeek}" min="1" onchange="updateTimeSlot(${course.id}, ${timeSlot.id}, 'startWeek', parseInt(this.value))">
                        <span class="text-xs text-gray-500 self-center">-</span>
                        <input type="number" class="w-16 px-1 py-1 border border-gray-300 rounded text-sm" 
                               value="${timeSlot.endWeek}" min="1" onchange="updateTimeSlot(${course.id}, ${timeSlot.id}, 'endWeek', parseInt(this.value))">
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">星期几</label>
                    <select class="w-full px-2 py-1 border border-gray-300 rounded text-sm" 
                            onchange="updateTimeSlot(${course.id}, ${timeSlot.id}, 'dayOfWeek', parseInt(this.value))">
                        <option value="1" ${timeSlot.dayOfWeek === 1 ? 'selected' : ''}>星期一</option>
                        <option value="2" ${timeSlot.dayOfWeek === 2 ? 'selected' : ''}>星期二</option>
                        <option value="3" ${timeSlot.dayOfWeek === 3 ? 'selected' : ''}>星期三</option>
                        <option value="4" ${timeSlot.dayOfWeek === 4 ? 'selected' : ''}>星期四</option>
                        <option value="5" ${timeSlot.dayOfWeek === 5 ? 'selected' : ''}>星期五</option>
                        <option value="6" ${timeSlot.dayOfWeek === 6 ? 'selected' : ''}>星期六</option>
                        <option value="7" ${timeSlot.dayOfWeek === 7 ? 'selected' : ''}>星期日</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">上课节次</label>
                    <div class="flex space-x-1">
                        <select class="w-16 px-1 py-1 border border-gray-300 rounded text-sm" 
                                onchange="updateTimeSlot(${course.id}, ${timeSlot.id}, 'startClass', parseInt(this.value))">
                            ${classTimes.map((_, i) => `<option value="${i + 1}" ${timeSlot.startClass === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                        </select>
                        <span class="text-xs text-gray-500 self-center">-</span>
                        <select class="w-16 px-1 py-1 border border-gray-300 rounded text-sm" 
                                onchange="updateTimeSlot(${course.id}, ${timeSlot.id}, 'endClass', parseInt(this.value))">
                            ${classTimes.map((_, i) => `<option value="${i + 1}" ${timeSlot.endClass === i + 1 ? 'selected' : ''}>${i + 1}</option>`).join('')}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// 更新课程信息
function updateCourse(courseId, field, value) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        course[field] = value;
    }
}

// 添加时间段
function addTimeSlot(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        const newTimeSlot = {
            id: Date.now(),
            location: '',
            startWeek: 1,
            endWeek: 16,
            dayOfWeek: 1,
            startClass: 1,
            endClass: 2
        };
        course.timeSlots.push(newTimeSlot);
        updateCoursesDisplay();
    }
}

// 删除时间段
function removeTimeSlot(courseId, timeSlotId) {
    const course = courses.find(c => c.id === courseId);
    if (course && course.timeSlots.length > 1) {
        course.timeSlots = course.timeSlots.filter(ts => ts.id !== timeSlotId);
        updateCoursesDisplay();
    }
}

// 更新时间段信息
function updateTimeSlot(courseId, timeSlotId, field, value) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        const timeSlot = course.timeSlots.find(ts => ts.id === timeSlotId);
        if (timeSlot) {
            timeSlot[field] = value;
        }
    }
}

// 删除课程
function removeCourse(courseId) {
    courses = courses.filter(c => c.id !== courseId);
    updateCoursesDisplay();
}

// 生成ICS文件
function generateICS() {
    // 验证输入
    if (!validateInputs()) {
        return;
    }
    
    const schoolAddress = document.getElementById('schoolAddress').value;
    const semesterStartDate = document.getElementById('semesterStartDate').value;
    const totalWeeks = parseInt(document.getElementById('totalWeeks').value);
    
    if (!schoolAddress || !semesterStartDate || !totalWeeks) {
        showErrorMessage('请填写完整的学期基本信息！');
        return;
    }
    
    if (courses.length === 0) {
        showErrorMessage('请至少添加一门课程！');
        return;
    }
    
    // 生成ICS内容
    let icsContent = generateICSHeader();
    
    courses.forEach(course => {
        course.timeSlots.forEach(timeSlot => {
            icsContent += generateCourseEvent(course, timeSlot, schoolAddress, semesterStartDate, totalWeeks);
        });
    });
    
    icsContent += 'END:VCALENDAR';
    
    // 下载文件
    downloadICS(icsContent);
}

// 验证输入
function validateInputs() {
    const schoolAddress = document.getElementById('schoolAddress').value;
    const semesterStartDate = document.getElementById('semesterStartDate').value;
    const totalWeeks = parseInt(document.getElementById('totalWeeks').value);
    
    if (!schoolAddress.trim()) {
        showErrorMessage('请输入学校地址！');
        return false;
    }
    
    if (!semesterStartDate) {
        showErrorMessage('请选择学期开始日期！');
        return false;
    }
    
    if (!totalWeeks || totalWeeks < 1) {
        showErrorMessage('请输入有效的学期周数！');
        return false;
    }
    
    // 验证课程信息
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i];
        if (!course.name.trim()) {
            showErrorMessage(`请填写第${i + 1}门课程的名称！`);
            return false;
        }
        
        // 验证时间段
        for (let j = 0; j < course.timeSlots.length; j++) {
            const timeSlot = course.timeSlots[j];
            if (!timeSlot.location.trim()) {
                showErrorMessage(`请填写第${i + 1}门课程第${j + 1}个时间段的上课地点！`);
                return false;
            }
            if (timeSlot.startWeek > timeSlot.endWeek) {
                showErrorMessage(`第${i + 1}门课程第${j + 1}个时间段的开始周数不能大于结束周数！`);
                return false;
            }
            if (timeSlot.startClass > timeSlot.endClass) {
                showErrorMessage(`第${i + 1}门课程第${j + 1}个时间段的开始节次不能大于结束节次！`);
                return false;
            }
            if (timeSlot.endWeek > totalWeeks) {
                showErrorMessage(`第${i + 1}门课程第${j + 1}个时间段的结束周数不能超过学期总周数！`);
                return false;
            }
        }
    }
    
    return true;
}

// 生成ICS文件头
function generateICSHeader() {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Course Schedule//Course to ICS//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:课程表
X-WR-TIMEZONE:Asia/Shanghai
`;
}

// 生成课程事件
function generateCourseEvent(course, timeSlot, schoolAddress, semesterStartDate, totalWeeks) {
    const startDate = new Date(semesterStartDate);
    const dayOfWeek = timeSlot.dayOfWeek; // 1=Monday, 7=Sunday
    const startWeek = timeSlot.startWeek;
    const endWeek = timeSlot.endWeek;
    
    // 计算第一次上课的日期
    const firstClassDate = new Date(startDate);
    const daysToAdd = (startWeek - 1) * 7 + (dayOfWeek - 1);
    firstClassDate.setDate(startDate.getDate() + daysToAdd);
    
    // 计算课程时间
    const startClassTime = classTimes[timeSlot.startClass - 1];
    const endClassTime = classTimes[timeSlot.endClass - 1];
    
    const startTime = `${formatDateForICS(firstClassDate)}T${startClassTime.start.replace(':', '')}00`;
    const endTime = `${formatDateForICS(firstClassDate)}T${endClassTime.end.replace(':', '')}00`;
    
    // 计算重复次数
    const repeatCount = endWeek - startWeek;
    
    // 生成事件
    const eventId = generateEventId();
    const summary = `${course.name}@${timeSlot.location}`;
    const location = `${schoolAddress}${timeSlot.location}`;
    const description = `教师：${course.teacher || '未指定'}`;
    
    let event = `BEGIN:VEVENT
UID:${eventId}
DTSTART:${startTime}
DTEND:${endTime}
SUMMARY:${summary}
LOCATION:${location}
DESCRIPTION:${description}
RRULE:FREQ=WEEKLY;COUNT=${repeatCount + 1}
`;
    
    // 添加提醒
    const reminders = [
        { id: 'reminder1', trigger: '-PT1H', desc: '课前1小时提醒' },
        { id: 'reminder2', trigger: '-PT30M', desc: '课前30分钟提醒' },
        { id: 'reminder3', trigger: '-PT15M', desc: '课前15分钟提醒' },
        { id: 'reminder4', trigger: '-PT5M', desc: '课前5分钟提醒' },
        { id: 'reminder5', trigger: '-PT1M', desc: '课前1分钟提醒' }
    ];
    
    reminders.forEach(reminder => {
        if (document.getElementById(reminder.id).checked) {
            event += `BEGIN:VALARM
TRIGGER:${reminder.trigger}
ACTION:DISPLAY
DESCRIPTION:${reminder.desc}
END:VALARM
`;
        }
    });
    
    event += `END:VEVENT
`;
    
    return event;
}

// 格式化日期为ICS格式
function formatDateForICS(date) {
    return date.toISOString().slice(0, 10).replace(/-/g, '');
}

// 生成事件ID
function generateEventId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}@coursetools.com`;
}

// 设置默认值
function setDefaultValues() {
    // 设置默认学期开始日期为当前日期
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    document.getElementById('semesterStartDate').value = `${year}-${month}-${day}`;
    
    // 设置默认总周数
    document.getElementById('totalWeeks').value = '16';
}

// 下载ICS文件
function downloadICS(content) {
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '课程表.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // 显示成功消息
    showSuccessMessage('ICS文件已生成并开始下载！');
}

// 显示成功消息
function showSuccessMessage(message) {
    showToast(message, 'bg-green-500');
}

// 显示错误消息
function showErrorMessage(message) {
    showToast(message, 'bg-red-500');
}

// 显示提示消息
function showToast(message, bgColor) {
    // 创建提示框
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // 3秒后自动消失
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}
