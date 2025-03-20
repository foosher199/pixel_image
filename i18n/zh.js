// 中文语言包
const zh = {
    app: {
        title: "像素图片转换器",
        subtitle: "将普通图片转换为像素风格图片"
    },
    upload: {
        title: "上传图片",
        dropzone: "点击或拖放图片到此区域",
        formats: "支持JPG、PNG、GIF、WebP格式",
        empty: "上传图片后将在此处显示"
    },
    controls: {
        title: "像素化参数",
        pixelSize: "像素大小：",
        colorMode: "色彩模式：",
        dithering: "抖动效果：",
        smooth: "平滑处理：",
        outputSize: "输出尺寸：",
        outputFormat: "输出格式：",
        presets: "预设",
        process: "开始处理",
        clear: "清除全部"
    },
    colorModes: {
        original: "原始色彩",
        limited: "有限调色板 (16色)",
        grayscale: "灰度",
        sepia: "复古色调"
    },
    outputSizes: {
        original: "原始尺寸",
        double: "2倍大小",
        quadruple: "4倍大小"
    },
    preview: {
        title: "预览与结果",
        empty: "上传图片后在此处预览结果",
        downloadAll: "下载全部(ZIP)",
        downloadSelected: "下载选中",
        download: "下载"
    },
    notifications: {
        duplicate: "跳过重复图片: {filename}",
        processed: "成功处理了 {count} 张图片",
        downloadError: "下载失败，请稍后重试",
        invalidFiles: "请选择有效的图片文件"
    },
    footer: {
        copyright: "像素图片转换器 &copy; 2023",
        privacy: "在浏览器中本地处理，您的图片不会上传至任何服务器",
        help: "使用帮助"
    },
    help: {
        title: "使用帮助",
        howto: "如何使用",
        steps: {
            upload: "点击上传区域或将图片拖放到上传区域",
            adjust: "调整像素化参数",
            process: "点击\"开始处理\"按钮",
            download: "等待处理完成后，可以预览结果并下载"
        },
        parameters: "参数说明",
        descriptions: {
            pixelSize: "控制像素的粒度，值越大，像素块越大",
            colorMode: "选择不同的色彩处理方式",
            dithering: "增加一些随机性，使色彩过渡更平滑",
            smooth: "对像素化结果进行平滑处理",
            outputSize: "控制最终图片的尺寸",
            outputFormat: "选择保存的图片格式"
        },
        presets: "预设说明",
        presetDescriptions: {
            gameboy: "使用经典Game Boy的4色调色板",
            nes: "模拟任天堂NES游戏机的色彩和像素效果",
            cga: "模拟早期CGA显示器的色彩方案"
        }
    },
    language: {
        name: "中文",
        select: "语言"
    }
};

export default zh; 