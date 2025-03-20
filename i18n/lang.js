// 语言配置
const languages = {
    "zh-CN": {
        // 头部区域
        "app_title": "像素图片转换器",
        "app_subtitle": "将普通图片转换为像素风格图片",
        
        // 上传区域
        "upload_title": "上传图片",
        "upload_instruction": "点击或拖放图片到此区域",
        "upload_formats": "支持JPG、PNG、GIF、WebP格式",
        "upload_placeholder": "上传图片后将在此处显示",
        "duplicate_image": "跳过重复图片: {0}",
        
        // 控制面板
        "params_title": "像素化参数",
        "pixel_size": "像素大小：",
        "color_mode": "色彩模式：",
        "color_original": "原始色彩",
        "color_limited": "有限调色板 (16色)",
        "color_grayscale": "灰度",
        "color_sepia": "复古色调",
        "dithering": "抖动效果：",
        "smooth": "平滑处理：",
        "output_size": "输出尺寸：",
        "size_original": "原始尺寸",
        "size_2x": "2倍大小",
        "size_4x": "4倍大小",
        "output_format": "输出格式：",
        "presets": "预设",
        "process_btn": "开始处理",
        "clear_btn": "清除全部",
        
        // 预览区域
        "preview_title": "预览与结果",
        "preview_placeholder": "上传图片后在此处预览结果",
        "download_all": "下载全部(ZIP)",
        "download_selected": "下载选中",
        "download_btn": "下载",
        "process_success": "成功处理了 {0} 张图片",
        
        // 帮助对话框
        "help_title": "使用帮助",
        "how_to_use": "如何使用",
        "usage_step1": "点击上传区域或将图片拖放到上传区域",
        "usage_step2": "调整像素化参数",
        "usage_step3": "点击"开始处理"按钮",
        "usage_step4": "等待处理完成后，可以预览结果并下载",
        "params_desc": "参数说明",
        "param_pixel_size": "像素大小：控制像素的粒度，值越大，像素块越大",
        "param_color_mode": "色彩模式：选择不同的色彩处理方式",
        "param_dithering": "抖动效果：增加一些随机性，使色彩过渡更平滑",
        "param_smooth": "平滑处理：对像素化结果进行平滑处理",
        "param_output_size": "输出尺寸：控制最终图片的尺寸",
        "param_output_format": "输出格式：选择保存的图片格式",
        "presets_desc": "预设说明",
        "preset_gameboy": "Game Boy：使用经典Game Boy的4色调色板",
        "preset_nes": "NES 8位：模拟任天堂NES游戏机的色彩和像素效果",
        "preset_cga": "CGA：模拟早期CGA显示器的色彩方案",
        
        // 页脚
        "footer_text": "像素图片转换器 &copy; 2023 | 在浏览器中本地处理，您的图片不会上传至任何服务器",
        "help_btn": "使用帮助",
        
        // 语言选择
        "language": "语言",
        "lang_zh": "中文",
        "lang_en": "English"
    },
    "en": {
        // Header
        "app_title": "Pixel Image Converter",
        "app_subtitle": "Convert regular images to pixel art style",
        
        // Upload area
        "upload_title": "Upload Images",
        "upload_instruction": "Click or drag images to this area",
        "upload_formats": "Supports JPG, PNG, GIF, WebP formats",
        "upload_placeholder": "Images will be shown here after upload",
        "duplicate_image": "Skipped duplicate image: {0}",
        
        // Controls
        "params_title": "Pixelation Parameters",
        "pixel_size": "Pixel Size:",
        "color_mode": "Color Mode:",
        "color_original": "Original Colors",
        "color_limited": "Limited Palette (16 colors)",
        "color_grayscale": "Grayscale",
        "color_sepia": "Sepia Tone",
        "dithering": "Dithering:",
        "smooth": "Smoothing:",
        "output_size": "Output Size:",
        "size_original": "Original Size",
        "size_2x": "2x Size",
        "size_4x": "4x Size",
        "output_format": "Output Format:",
        "presets": "Presets",
        "process_btn": "Process Images",
        "clear_btn": "Clear All",
        
        // Preview area
        "preview_title": "Preview & Results",
        "preview_placeholder": "Processed images will appear here",
        "download_all": "Download All (ZIP)",
        "download_selected": "Download Selected",
        "download_btn": "Download",
        "process_success": "Successfully processed {0} images",
        
        // Help modal
        "help_title": "Help Guide",
        "how_to_use": "How to Use",
        "usage_step1": "Click the upload area or drag images to upload",
        "usage_step2": "Adjust the pixelation parameters",
        "usage_step3": "Click the \"Process Images\" button",
        "usage_step4": "Wait for processing to complete, then preview and download results",
        "params_desc": "Parameter Description",
        "param_pixel_size": "Pixel Size: Controls the granularity of pixels. Higher values create larger pixel blocks",
        "param_color_mode": "Color Mode: Choose different color processing methods",
        "param_dithering": "Dithering: Adds some randomness to make color transitions smoother",
        "param_smooth": "Smoothing: Applies smoothing to the pixelated result",
        "param_output_size": "Output Size: Controls the final image size",
        "param_output_format": "Output Format: Choose the saved image format",
        "presets_desc": "Preset Description",
        "preset_gameboy": "Game Boy: Uses the classic Game Boy 4-color palette",
        "preset_nes": "NES 8-bit: Simulates Nintendo NES console colors and pixel effects",
        "preset_cga": "CGA: Simulates early CGA monitor color schemes",
        
        // Footer
        "footer_text": "Pixel Image Converter &copy; 2023 | All processing is done locally in your browser, your images are never uploaded to any server",
        "help_btn": "Help Guide",
        
        // Language selection
        "language": "Language",
        "lang_zh": "中文",
        "lang_en": "English"
    }
};

// 获取当前语言
function getCurrentLanguage() {
    // 从localStorage获取用户设置的语言
    const savedLang = localStorage.getItem('pixelConverter_lang');
    if (savedLang) {
        return savedLang;
    }
    
    // 获取浏览器语言
    const browserLang = navigator.language || navigator.userLanguage;
    
    // 检查是否支持该语言，如果不支持则使用英文
    if (browserLang.startsWith('zh')) {
        return 'zh-CN';
    } else {
        return 'en';
    }
}

// 当前语言
let currentLang = getCurrentLanguage();

// 获取翻译文本
function i18n(key, ...args) {
    const text = languages[currentLang][key] || languages['en'][key] || key;
    
    // 替换参数 {0}, {1}, ... 等占位符
    if (args.length > 0) {
        return text.replace(/{(\d+)}/g, (match, number) => {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    }
    
    return text;
}

// 切换语言
function setLanguage(lang) {
    if (languages[lang]) {
        currentLang = lang;
        localStorage.setItem('pixelConverter_lang', lang);
        updatePageTexts();
        return true;
    }
    return false;
}

// 获取支持的语言列表
function getSupportedLanguages() {
    return Object.keys(languages);
}

// 更新页面上的所有文本
function updatePageTexts() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key) {
            // 检查是否有特殊属性需要翻译
            if (el.hasAttribute('data-i18n-attr')) {
                const attr = el.getAttribute('data-i18n-attr');
                el.setAttribute(attr, i18n(key));
            } else {
                // 默认更新元素内容
                el.textContent = i18n(key);
            }
        }
    });
    
    // 触发自定义事件，通知应用语言已更改
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: currentLang } }));
}

// 导出模块
window.i18n = i18n;
window.setLanguage = setLanguage;
window.getCurrentLanguage = getCurrentLanguage;
window.getSupportedLanguages = getSupportedLanguages;
window.updatePageTexts = updatePageTexts; 