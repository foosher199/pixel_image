// 导入国际化模块
import i18n from './i18n/index.js';

// 全局变量
const app = {
    // DOM元素
    elements: {},
    // 上传的图片数组
    images: [],
    // 处理后的结果
    results: [],
    // 当前选中的图片
    selectedImages: [],
    // 处理状态
    processing: false,
    // 当前深色模式状态
    darkMode: false,
    files: [],
    thumbnails: [],
    settings: {
        pixelSize: 8,
        colorMode: 'original',
        dithering: false,
        smooth: false,
        outputSize: 'original',
        outputFormat: 'png'
    }
};

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    // 初始化DOM元素引用
    initElements();
    // 绑定事件
    bindEvents();
    // 设置滚动监听
    setupScrollListeners();
    // 检查系统主题偏好
    checkPreferredTheme();
    // 设置语言
    i18n.init();
    // 设置空状态文本
    updateEmptyStateText();
    // 检查溢出
    checkScrollOverflow();
    // 设置窗口大小变化监听
    window.addEventListener('resize', checkScrollOverflow);
});

// 初始化DOM元素引用
function initElements() {
    app.elements = {
        // 上传区域
        uploadContainer: document.getElementById('upload-container'),
        fileInput: document.getElementById('file-input'),
        thumbnailsContainer: document.getElementById('thumbnails-container'),
        
        // 控制区域
        pixelSize: document.getElementById('pixel-size'),
        pixelSizeValue: document.getElementById('pixel-size-value'),
        colorMode: document.getElementById('color-mode'),
        dithering: document.getElementById('dithering'),
        smooth: document.getElementById('smooth'),
        outputSize: document.getElementById('output-size'),
        outputFormat: document.getElementById('output-format'),
        presetButtons: document.querySelectorAll('.preset-button'),
        processBtn: document.getElementById('process-btn'),
        clearBtn: document.getElementById('clear-btn'),
        
        // 预览和结果区域
        previewContainer: document.getElementById('preview-container'),
        progressContainer: document.getElementById('progress-container'),
        progressBar: document.getElementById('progress-bar'),
        progressText: document.getElementById('progress-text'),
        resultActions: document.getElementById('result-actions'),
        downloadAllBtn: document.getElementById('download-all-btn'),
        downloadSelectedBtn: document.getElementById('download-selected-btn'),
        
        // 主题切换
        themeSwitch: document.getElementById('theme-switch'),
        
        // 帮助对话框
        helpBtn: document.getElementById('help-btn'),
        helpModal: document.getElementById('help-modal'),
        closeModal: document.querySelector('.close-modal')
    };
}

// 绑定事件处理函数
function bindEvents() {
    // 文件上传相关事件
    app.elements.uploadContainer.addEventListener('click', () => app.elements.fileInput.click());
    app.elements.fileInput.addEventListener('change', handleFileSelect);
    app.elements.uploadContainer.addEventListener('dragover', handleDragOver);
    app.elements.uploadContainer.addEventListener('dragleave', handleDragLeave);
    app.elements.uploadContainer.addEventListener('drop', handleDrop);
    
    // 控制参数相关事件
    app.elements.pixelSize.addEventListener('input', updatePixelSizeValue);
    app.elements.presetButtons.forEach(btn => {
        btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
    });
    app.elements.processBtn.addEventListener('click', processImages);
    app.elements.clearBtn.addEventListener('click', clearAll);
    
    // 结果操作相关事件
    app.elements.downloadAllBtn.addEventListener('click', downloadAllResults);
    app.elements.downloadSelectedBtn.addEventListener('click', downloadSelectedResults);
    
    // 主题切换
    app.elements.themeSwitch.addEventListener('click', toggleTheme);
    
    // 帮助对话框
    app.elements.helpBtn.addEventListener('click', openHelpModal);
    app.elements.closeModal.addEventListener('click', closeHelpModal);
    window.addEventListener('click', (e) => {
        if (e.target === app.elements.helpModal) {
            closeHelpModal();
        }
    });
}

// 检查系统主题偏好
function checkPreferredTheme() {
    // 先检查本地存储的主题设置
    const savedTheme = localStorage.getItem('pixelizer-theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        app.darkMode = true;
        return;
    }
    
    // 如果没有保存的设置，检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-theme');
        app.darkMode = true;
    }
}

// 切换深色/浅色主题
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    app.darkMode = document.body.classList.contains('dark-theme');
    
    // 保存到本地存储
    localStorage.setItem('pixelizer-theme', app.darkMode ? 'dark' : 'light');
}

// 打开帮助对话框
function openHelpModal(e) {
    e.preventDefault();
    app.elements.helpModal.classList.add('show');
}

// 关闭帮助对话框
function closeHelpModal() {
    app.elements.helpModal.classList.remove('show');
}

// 更新像素大小显示值
function updatePixelSizeValue() {
    app.elements.pixelSizeValue.textContent = app.elements.pixelSize.value;
}

// 应用预设
function applyPreset(preset) {
    switch(preset) {
        case 'gameboy':
            app.elements.pixelSize.value = 8;
            app.elements.colorMode.value = 'limited';
            app.elements.dithering.checked = true;
            break;
        case 'nes':
            app.elements.pixelSize.value = 6;
            app.elements.colorMode.value = 'limited';
            app.elements.dithering.checked = true;
            break;
        case 'cga':
            app.elements.pixelSize.value = 4;
            app.elements.colorMode.value = 'limited';
            app.elements.dithering.checked = false;
            break;
    }
    updatePixelSizeValue();
}

// 处理拖拽相关事件
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    app.elements.uploadContainer.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    app.elements.uploadContainer.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    app.elements.uploadContainer.classList.remove('drag-over');
    
    if (e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
    }
}

// 处理文件选择
function handleFileSelect(e) {
    if (e.target.files.length > 0) {
        handleFiles(e.target.files);
    }
}

// 处理上传的文件
function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) {
        showNotification(i18n.t('notifications.invalidFiles'));
        return;
    }
    
    // 将新图片添加到图片数组
    validFiles.forEach(file => {
        // 检查是否已经存在同名图片
        const isDuplicate = app.images.some(img => img.name === file.name);
        if (isDuplicate) {
            // 显示提示信息
            showNotification(i18n.t('notifications.duplicate', { filename: file.name }));
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                app.images.push({
                    name: file.name,
                    element: image,
                    src: e.target.result
                });
                
                // 更新缩略图显示
                updateThumbnails();
                
                // 启用按钮
                app.elements.processBtn.disabled = false;
                app.elements.clearBtn.disabled = false;
            };
        };
        reader.readAsDataURL(file);
    });
}

// 显示通知提示
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 自动消失
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 更新缩略图显示
function updateThumbnails() {
    app.elements.thumbnailsContainer.innerHTML = '';
    
    if (app.images.length === 0) {
        // 当没有图片时，保持容器为空，CSS将显示提示信息
        app.elements.thumbnailsContainer.classList.remove('has-overflow');
        return;
    }
    
    app.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'thumbnail';
        
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.name;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.textContent = '×';
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            removeImage(index);
        });
        
        thumbnail.appendChild(img);
        thumbnail.appendChild(removeBtn);
        app.elements.thumbnailsContainer.appendChild(thumbnail);
    });
    
    // 检查是否需要显示滚动指示器
    setTimeout(() => {
        checkScrollOverflow();
    }, 100);
}

// 检查滚动区域是否溢出
function checkScrollOverflow() {
    // 检查缩略图容器
    const thumbnailsContainer = app.elements.thumbnailsContainer;
    const hasThumbnailsOverflow = thumbnailsContainer.scrollWidth > thumbnailsContainer.clientWidth;
    
    if (hasThumbnailsOverflow) {
        thumbnailsContainer.classList.add('has-overflow');
    } else {
        thumbnailsContainer.classList.remove('has-overflow');
    }
    
    // 检查预览容器
    const previewContainer = app.elements.previewContainer;
    const hasPreviewOverflow = previewContainer.scrollHeight > previewContainer.clientHeight;
    
    if (hasPreviewOverflow) {
        previewContainer.classList.add('has-overflow');
    } else {
        previewContainer.classList.remove('has-overflow');
    }
}

// 为预览容器添加滚动事件监听
function setupScrollListeners() {
    app.elements.previewContainer.addEventListener('scroll', handlePreviewScroll);
}

// 处理预览容器滚动事件
function handlePreviewScroll() {
    const container = app.elements.previewContainer;
    const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    
    // 当滚动到底部附近时，隐藏底部阴影
    if (scrollBottom < 30) {
        container.classList.remove('has-overflow');
    } else {
        container.classList.add('has-overflow');
    }
}

// 监听窗口大小变化，以更新滚动指示器状态
window.addEventListener('resize', checkScrollOverflow);

// 移除图片
function removeImage(index) {
    app.images.splice(index, 1);
    updateThumbnails();
    
    if (app.images.length === 0) {
        app.elements.processBtn.disabled = true;
        app.elements.clearBtn.disabled = true;
    }
}

// 清除所有图片
function clearAll() {
    app.images = [];
    app.results = [];
    app.selectedImages = [];
    
    updateThumbnails();
    app.elements.previewContainer.innerHTML = `<div class="empty-preview"><p>${i18n.t('preview.empty')}</p></div>`;
    app.elements.resultActions.classList.add('hidden');
    
    app.elements.processBtn.disabled = true;
    app.elements.clearBtn.disabled = true;
}

// 处理图片
async function processImages() {
    if (app.processing || app.images.length === 0) return;
    
    app.processing = true;
    app.results = [];
    
    // 显示进度条
    app.elements.progressContainer.classList.remove('hidden');
    app.elements.progressBar.style.width = '0%';
    app.elements.progressText.textContent = '0%';
    
    // 清空预览区域
    app.elements.previewContainer.innerHTML = '';
    
    // 获取处理参数
    const params = {
        pixelSize: parseInt(app.elements.pixelSize.value),
        colorMode: app.elements.colorMode.value,
        dithering: app.elements.dithering.checked,
        smooth: app.elements.smooth.checked,
        outputSize: app.elements.outputSize.value,
        outputFormat: app.elements.outputFormat.value
    };
    
    // 逐个处理图片
    for (let i = 0; i < app.images.length; i++) {
        // 更新进度
        const progress = Math.round((i / app.images.length) * 100);
        app.elements.progressBar.style.width = `${progress}%`;
        app.elements.progressText.textContent = `${progress}%`;
        
        // 处理单张图片
        const result = await pixelateImage(app.images[i], params);
        app.results.push(result);
        
        // 添加到预览区域
        addResultToPreview(result, i);
        
        // 防止UI卡死，让浏览器有机会更新UI
        await new Promise(resolve => setTimeout(resolve, 10));
    }
    
    // 完成处理
    app.elements.progressBar.style.width = '100%';
    app.elements.progressText.textContent = '100%';
    
    // 完成处理后的逻辑
    setTimeout(finishProcessing, 500);
}

// 像素化处理单张图片
async function pixelateImage(image, params) {
    return new Promise(resolve => {
        // 创建Canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // 获取原始图片尺寸
        let { width, height } = image.element;
        
        // 设置输出尺寸
        let outputWidth = width;
        let outputHeight = height;
        
        // 根据输出尺寸调整
        if (params.outputSize === '2x') {
            outputWidth *= 2;
            outputHeight *= 2;
        } else if (params.outputSize === '4x') {
            outputWidth *= 4;
            outputHeight *= 4;
        }
        
        // 计算像素化分辨率（缩小尺寸）
        const pixelWidth = Math.max(1, Math.floor(width / params.pixelSize));
        const pixelHeight = Math.max(1, Math.floor(height / params.pixelSize));
        
        // 创建临时canvas进行像素化处理
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = pixelWidth;
        tempCanvas.height = pixelHeight;
        
        // 绘制缩小的图像
        tempCtx.drawImage(image.element, 0, 0, pixelWidth, pixelHeight);
        
        // 处理颜色模式
        processColorMode(tempCtx, pixelWidth, pixelHeight, params);
        
        // 设置最终canvas尺寸
        canvas.width = outputWidth;
        canvas.height = outputHeight;
        
        // 将像素化后的图像放大到输出尺寸
        if (params.smooth) {
            // 平滑处理
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        } else {
            // 保持像素边缘锐利
            ctx.imageSmoothingEnabled = false;
        }
        
        // 绘制最终图像
        ctx.drawImage(tempCanvas, 0, 0, pixelWidth, pixelHeight, 0, 0, outputWidth, outputHeight);
        
        // 导出为图片格式
        const format = params.outputFormat === 'jpg' ? 'image/jpeg' : 'image/png';
        const quality = params.outputFormat === 'jpg' ? 0.9 : 1.0;
        
        // 创建结果对象
        const result = {
            name: image.name,
            src: canvas.toDataURL(format, quality),
            width: outputWidth,
            height: outputHeight
        };
        
        resolve(result);
    });
}

// 处理颜色模式
function processColorMode(ctx, width, height, params) {
    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // 根据选择的颜色模式进行处理
    switch (params.colorMode) {
        case 'grayscale':
            // 灰度处理
            for (let i = 0; i < data.length; i += 4) {
                const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                data[i] = data[i + 1] = data[i + 2] = gray;
            }
            break;
            
        case 'limited':
            // 有限调色板
            const palette = [
                [0, 0, 0],        // 黑
                [255, 255, 255],  // 白
                [255, 0, 0],      // 红
                [0, 255, 0],      // 绿
                [0, 0, 255],      // 蓝
                [255, 255, 0],    // 黄
                [255, 0, 255],    // 紫
                [0, 255, 255],    // 青
                [128, 0, 0],      // 暗红
                [0, 128, 0],      // 暗绿
                [0, 0, 128],      // 暗蓝
                [128, 128, 0],    // 橄榄
                [128, 0, 128],    // 暗紫
                [0, 128, 128],    // 暗青
                [128, 128, 128],  // 灰
                [192, 192, 192]   // 亮灰
            ];
            
            for (let i = 0; i < data.length; i += 4) {
                if (data[i + 3] < 128) continue; // 跳过透明像素
                
                let minDistance = Infinity;
                let closestColor = [0, 0, 0];
                
                // 找到最接近的调色板颜色
                palette.forEach(color => {
                    const distance = Math.sqrt(
                        Math.pow(data[i] - color[0], 2) +
                        Math.pow(data[i + 1] - color[1], 2) +
                        Math.pow(data[i + 2] - color[2], 2)
                    );
                    
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestColor = color;
                    }
                });
                
                // 如果启用了抖动效果
                if (params.dithering) {
                    // Floyd-Steinberg抖动算法
                    const errorR = data[i] - closestColor[0];
                    const errorG = data[i + 1] - closestColor[1];
                    const errorB = data[i + 2] - closestColor[2];
                    
                    // 当前像素使用最接近的颜色
                    data[i] = closestColor[0];
                    data[i + 1] = closestColor[1];
                    data[i + 2] = closestColor[2];
                    
                    // 将误差分布到周围像素
                    if (i + 4 < data.length) {
                        data[i + 4] += errorR * 7 / 16;
                        data[i + 5] += errorG * 7 / 16;
                        data[i + 6] += errorB * 7 / 16;
                    }
                    
                    if (i + width * 4 - 4 < data.length) {
                        data[i + width * 4 - 4] += errorR * 3 / 16;
                        data[i + width * 4 - 3] += errorG * 3 / 16;
                        data[i + width * 4 - 2] += errorB * 3 / 16;
                    }
                    
                    if (i + width * 4 < data.length) {
                        data[i + width * 4] += errorR * 5 / 16;
                        data[i + width * 4 + 1] += errorG * 5 / 16;
                        data[i + width * 4 + 2] += errorB * 5 / 16;
                    }
                    
                    if (i + width * 4 + 4 < data.length) {
                        data[i + width * 4 + 4] += errorR * 1 / 16;
                        data[i + width * 4 + 5] += errorG * 1 / 16;
                        data[i + width * 4 + 6] += errorB * 1 / 16;
                    }
                } else {
                    // 不使用抖动，直接用最接近的颜色
                    data[i] = closestColor[0];
                    data[i + 1] = closestColor[1];
                    data[i + 2] = closestColor[2];
                }
            }
            break;
            
        case 'sepia':
            // 复古色调
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                
                data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
            }
            break;
            
        case 'original':
        default:
            // 不做额外处理，保持原始颜色
            break;
    }
    
    // 更新像素数据
    ctx.putImageData(imageData, 0, 0);
}

// 添加结果到预览区域
function addResultToPreview(result, index) {
    const resultItem = document.createElement('div');
    resultItem.className = 'result-item';
    resultItem.dataset.index = index;
    
    const img = document.createElement('img');
    img.src = result.src;
    img.alt = result.name;
    img.loading = 'lazy'; // 懒加载图片，提高性能
    
    const overlay = document.createElement('div');
    overlay.className = 'result-overlay';
    
    const filename = document.createElement('span');
    filename.textContent = result.name;
    
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'download-btn';
    downloadBtn.textContent = i18n.t('preview.download'); // 使用i18n显示下载文本
    downloadBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        downloadSingleResult(index);
    });
    
    overlay.appendChild(filename);
    overlay.appendChild(downloadBtn);
    
    resultItem.appendChild(img);
    resultItem.appendChild(overlay);
    
    // 点击选择/取消选择
    resultItem.addEventListener('click', () => {
        resultItem.classList.toggle('selected');
        
        if (resultItem.classList.contains('selected')) {
            app.selectedImages.push(index);
            
            // 如果是第一个被选中的图片，启用"下载选中"按钮
            if (app.selectedImages.length === 1) {
                app.elements.downloadSelectedBtn.disabled = false;
            }
        } else {
            app.selectedImages = app.selectedImages.filter(i => i !== index);
            
            // 如果没有选中的图片，禁用"下载选中"按钮
            if (app.selectedImages.length === 0) {
                app.elements.downloadSelectedBtn.disabled = true;
            }
        }
    });
    
    app.elements.previewContainer.appendChild(resultItem);
}

// 下载单个结果
function downloadSingleResult(index) {
    const result = app.results[index];
    const link = document.createElement('a');
    
    // 获取文件扩展名和MIME类型
    const format = app.elements.outputFormat.value;
    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    
    // 创建文件名
    const originalExt = result.name.substring(result.name.lastIndexOf('.'));
    const newFilename = result.name.replace(originalExt, '_pixel.' + format);
    
    link.href = result.src;
    link.download = newFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 下载所有结果
async function downloadAllResults() {
    if (app.results.length === 0) return;
    
    if (app.results.length === 1) {
        // 如果只有一个结果，直接下载
        downloadSingleResult(0);
        return;
    }
    
    try {
        // 使用JSZip创建ZIP文件
        const zip = new JSZip();
        const format = app.elements.outputFormat.value;
        
        // 添加所有图片到ZIP
        app.results.forEach((result, index) => {
            // 从DataURL中提取base64数据
            const base64Data = result.src.split(',')[1];
            
            // 创建文件名
            const originalExt = result.name.substring(result.name.lastIndexOf('.'));
            const newFilename = result.name.replace(originalExt, '_pixel.' + format);
            
            // 添加到zip
            zip.file(newFilename, base64Data, {base64: true});
        });
        
        // 生成ZIP文件
        const content = await zip.generateAsync({type: 'blob'});
        
        // 下载ZIP文件
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'pixel_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 释放URL对象
        URL.revokeObjectURL(link.href);
    } catch (err) {
        console.error('创建ZIP文件时出错:', err);
        showNotification(i18n.t('notifications.downloadError'), 'error');
    }
}

// 下载选中结果
async function downloadSelectedResults() {
    if (app.selectedImages.length === 0) return;
    
    if (app.selectedImages.length === 1) {
        // 如果只选择了一个，直接下载
        downloadSingleResult(app.selectedImages[0]);
        return;
    }
    
    try {
        // 使用JSZip创建ZIP文件
        const zip = new JSZip();
        const format = app.elements.outputFormat.value;
        
        // 添加选中的图片到ZIP
        app.selectedImages.forEach(index => {
            const result = app.results[index];
            
            // 从DataURL中提取base64数据
            const base64Data = result.src.split(',')[1];
            
            // 创建文件名
            const originalExt = result.name.substring(result.name.lastIndexOf('.'));
            const newFilename = result.name.replace(originalExt, '_pixel.' + format);
            
            // 添加到zip
            zip.file(newFilename, base64Data, {base64: true});
        });
        
        // 生成ZIP文件
        const content = await zip.generateAsync({type: 'blob'});
        
        // 下载ZIP文件
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = 'selected_pixel_images.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 释放URL对象
        URL.revokeObjectURL(link.href);
    } catch (err) {
        console.error('创建ZIP文件时出错:', err);
        showNotification(i18n.t('notifications.downloadError'), 'error');
    }
}

// 语言变更事件监听
document.addEventListener('languageChanged', () => {
    // 更新预览区的空状态消息
    if (app.results.length === 0 && app.elements.previewContainer.querySelector('.empty-preview')) {
        app.elements.previewContainer.querySelector('.empty-preview p').textContent = i18n.t('preview.empty');
    }
    
    // 更新缩略图区域的空状态消息
    updateEmptyStateText();
    
    // 更新所有下拉菜单选项
    document.querySelectorAll('select option[data-i18n]').forEach(option => {
        const key = option.getAttribute('data-i18n');
        option.textContent = i18n.t(key);
    });
    
    // 重新加载预览区域中的下载按钮文本
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.textContent = i18n.t('preview.download');
    });
});

// 完成处理
function finishProcessing() {
    app.processing = false;
    
    // 隐藏进度条，显示下载按钮
    app.elements.progressContainer.classList.add('hidden');
    app.elements.resultActions.classList.remove('hidden');
    
    // 禁用下载选中按钮
    app.elements.downloadSelectedBtn.disabled = app.selectedImages.length === 0;
    
    // 滚动到预览区域的顶部
    app.elements.previewContainer.scrollTop = 0;
    
    // 显示成功通知
    showNotification(i18n.t('notifications.processed', { count: app.results.length }), 'success');
    
    // 检查预览容器是否溢出
    checkScrollOverflow();
}

// 导出应用状态对象（用于调试）
window.app = app;

// 更新空状态文本
function updateEmptyStateText() {
    app.elements.thumbnailsContainer.setAttribute('data-empty-text', i18n.t('upload.empty'));
} 