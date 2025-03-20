// English language pack
const en = {
    app: {
        title: "Pixel Image Converter",
        subtitle: "Convert regular images to pixel style images"
    },
    upload: {
        title: "Upload Images",
        dropzone: "Click or drop images here",
        formats: "Supports JPG, PNG, GIF, WebP formats",
        empty: "Images will be displayed here after upload"
    },
    controls: {
        title: "Pixel Settings",
        pixelSize: "Pixel Size:",
        colorMode: "Color Mode:",
        dithering: "Dithering Effect:",
        smooth: "Smooth Processing:",
        outputSize: "Output Size:",
        outputFormat: "Output Format:",
        presets: "Presets",
        process: "Start Processing",
        clear: "Clear All"
    },
    colorModes: {
        original: "Original Colors",
        limited: "Limited Palette (16 colors)",
        grayscale: "Grayscale",
        sepia: "Vintage Tone"
    },
    outputSizes: {
        original: "Original Size",
        double: "2x Size",
        quadruple: "4x Size"
    },
    preview: {
        title: "Preview & Results",
        empty: "Results will be displayed here after processing",
        downloadAll: "Download All (ZIP)",
        downloadSelected: "Download Selected",
        download: "Download"
    },
    notifications: {
        duplicate: "Skipped duplicate image: {filename}",
        processed: "Successfully processed {count} images",
        downloadError: "Download failed, please try again",
        invalidFiles: "Please select valid image files"
    },
    footer: {
        copyright: "Pixel Image Converter &copy; 2023",
        privacy: "All images are processed locally in your browser",
        help: "Help"
    },
    help: {
        title: "Help",
        howto: "How to Use",
        steps: {
            upload: "Click the upload area or drag and drop images",
            adjust: "Adjust pixel settings",
            process: "Click the \"Start Processing\" button",
            download: "After processing completes, preview and download results"
        },
        parameters: "Parameter Explanation",
        descriptions: {
            pixelSize: "Controls the pixel granularity. Higher values create larger pixels",
            colorMode: "Choose different color processing methods",
            dithering: "Adds randomness to make color transitions smoother",
            smooth: "Applies smoothing to the pixelated result",
            outputSize: "Controls the final image size",
            outputFormat: "Choose the saved image format"
        },
        presets: "Preset Explanation",
        presetDescriptions: {
            gameboy: "Uses the classic Game Boy 4-color palette",
            nes: "Simulates Nintendo NES console colors and pixel effects",
            cga: "Simulates early CGA monitor color scheme"
        }
    },
    language: {
        name: "English",
        select: "Language"
    }
};

export default en; 