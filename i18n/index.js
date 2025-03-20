// i18n core module
import en from './en.js';
import zh from './zh.js';

// Available languages
const languages = {
    en,
    zh
};

// Default language code
let currentLang = 'en';

// Initialize i18n
function initI18n() {
    // Try to get language from browser
    const browserLang = navigator.language.split('-')[0];
    
    // Set default language based on browser preference
    if (languages[browserLang]) {
        currentLang = browserLang;
    }
    
    // Try to get language from localStorage
    const storedLang = localStorage.getItem('pixelizer-lang');
    if (storedLang && languages[storedLang]) {
        currentLang = storedLang;
    }
    
    // Update UI
    updateUILanguage();
    
    // Add language selector event listener
    document.getElementById('language-selector').addEventListener('change', function() {
        setLanguage(this.value);
    });
}

// Get translation string
function t(key, params = {}) {
    // Split key by dots (e.g., "app.title" -> ["app", "title"])
    const keys = key.split('.');
    
    // Navigate through the language object
    let value = languages[currentLang];
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            // Fallback to English if key not found
            let fallback = languages.en;
            for (const k of keys) {
                if (fallback && fallback[k] !== undefined) {
                    fallback = fallback[k];
                } else {
                    return key; // Return the key itself if not found in fallback
                }
            }
            value = fallback;
            break;
        }
    }
    
    // Replace parameters {paramName} with actual values
    if (typeof value === 'string') {
        return value.replace(/\{(\w+)\}/g, (match, paramName) => {
            return params[paramName] !== undefined ? params[paramName] : match;
        });
    }
    
    return value || key;
}

// Change language
function setLanguage(langCode) {
    if (languages[langCode]) {
        currentLang = langCode;
        localStorage.setItem('pixelizer-lang', langCode);
        updateUILanguage();
    }
}

// Get current language code
function getCurrentLang() {
    return currentLang;
}

// Update UI with new language
function updateUILanguage() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    // Update all elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Update all elements with data-i18n-title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
    
    // Update language selector
    const selector = document.getElementById('language-selector');
    if (selector) {
        selector.value = currentLang;
    }
    
    // Update document title
    document.title = t('app.title');
    
    // Dispatch a custom event for other components to update
    document.dispatchEvent(new CustomEvent('languageChanged', { 
        detail: { language: currentLang } 
    }));
}

// Export the i18n API
export default {
    init: initI18n,
    t,
    setLanguage,
    getCurrentLang,
    availableLanguages: Object.keys(languages).map(code => ({
        code,
        name: languages[code].language.name
    }))
}; 