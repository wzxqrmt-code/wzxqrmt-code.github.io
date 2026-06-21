(function() {
    'use strict';

    // ====================== CONFIG & DATA ======================
    const APP_COUNT = 23;
    
    const CONFIG = {
        SHARE_URL: 'https://wzxqrmt-code.github.io/',
        EMAIL_ADDR: 'developeralireza.sh@gmail.com',
        MYKET_URL: 'https://myket.ir/developer/dev-99625/apps?lang=fa',
        BLE_URL: 'https://ble.ir/alireza_apex',
        TELEGRAM_URL: 'https://t.me/AlirezaApex',
        MESSENGER_ID: '@WZXQRMT',
        SCROLL_THRESHOLD: 300,
        TOAST_DURATION: 3000
    };

    const APPS = [
        {
            name: "گام‌به‌گام ریاضی پایه نهم",
            nameEn: "Math Step-by-Step 9th Grade",
            desc: "مطالعه آسان ریاضی نهم با مثال و نکته",
            descEn: "Easy study of 9th grade math with examples",
            icon: "https://myket.ir/app/ir.tinasoft.riazi_payeh9/icon",
            url: "https://myket.ir/app/ir.tinasoft.riazi_payeh9"
        },
        {
            name: "شبیه‌ساز آسانسور",
            nameEn: "Elevator Simulator",
            desc: "آسانسوری که نمی‌شناسی! 👤",
            descEn: "An elevator you don't know!",
            icon: "https://myket.ir/app/com.sh.theuxs.elevatorsimulator/icon",
            url: "https://myket.ir/app/com.sh.theuxs.elevatorsimulator"
        },
        {
            name: "ترنسلیت پرو",
            nameEn: "Translate Pro",
            desc: "دنیایی از ترجمه در همه‌جا",
            descEn: "World of translation everywhere",
            icon: "https://myket.ir/app/com.sh.translatepro/icon",
            url: "https://myket.ir/app/com.sh.translatepro"
        },
        {
            name: "تولید کننده رمز عبور امن",
            nameEn: "Secure Password Generator",
            desc: "ساخت رمزعبور امن و قوی",
            descEn: "Create strong and secure passwords",
            icon: "https://myket.ir/app/com.sh.password.generator/icon",
            url: "https://myket.ir/app/com.sh.password.generator"
        },
        {
            name: "رفیق",
            nameEn: "Rafigh",
            desc: "رفیق لحظه‌های معنوی تو",
            descEn: "Companion of your spiritual moments",
            icon: "https://myket.ir/app/com.sh.rafigh/icon",
            url: "https://myket.ir/app/com.sh.rafigh"
        }
    ];

    // ====================== STATE ======================
    const state = {
        lang: localStorage.getItem('lang') || 'fa',
        theme: localStorage.getItem('theme') || 'dark',
        menuOpen: false
    };

    // ====================== TRANSLATIONS ======================
    function buildTranslations() {
        return {
            fa: {
                brand_name: "Alireza Apex",
                hero_title: "Alireza Apex",
                hero_desc: "۲۳ اپلیکیشن واقعی، در دست کاربران",
                myket_btn: "🚀 مشاهده در مایکت",
                about_title: "👤 درباره من",
                about_text: "توسعه‌دهنده اندروید با ۲۳ اپلیکیشن منتشر شده در مایکت.",
                apps_title: "📱 اپلیکیشن‌های من",
                apps_desc: "۵ تا از بهترین و محبوب‌ترین اپلیکیشن‌ها",
                contact_title: "📬 ارتباط با من",
                id_label: "آیدی پیام‌رسان‌ها",
                copy_btn: "کپی آیدی",
                email_label: "ایمیل",
                copy_email_btn: "کپی ایمیل",
                ble_channel: "کانال بله",
                ble_btn: "ورود به کانال",
                telegram_channel: "کانال تلگرام",
                telegram_btn: "ورود به کانال",
                submit_btn: "ارسال پیام",
                site_info_title: "اطلاعات سایت",
                latest_changes_label: "آخرین تغییرات",
                status_label: "وضعیت",
                status_online: "آنلاین",
                current_time_label: "ساعت فعلی",
                footer: "© ۲۰۲۶ Alireza Apex — تمامی حقوق محفوظ است",
                toast_copy: "کپی شد",
                toast_email_copied: "ایمیل کپی شد",
                toast_success: "پیام آماده ارسال شد",
                toast_welcome: "خوش آمدید! 👋",
                name_placeholder: "نام شما",
                email_placeholder: "ایمیل شما",
                message_placeholder: "پیام شما...",
                lang_btn_en: "EN",
                share_menu: "اشتراک‌گذاری"
            },
            en: {
                brand_name: "Alireza Apex",
                hero_title: "Alireza Apex",
                hero_desc: "23 real apps, live and in users' hands",
                myket_btn: "🚀 View on Myket",
                about_title: "👤 About Me",
                about_text: "Android developer with 23 published apps on Myket.",
                apps_title: "📱 My Applications",
                apps_desc: "5 of the best and most popular apps",
                contact_title: "📬 Contact Me",
                id_label: "Messenger IDs",
                copy_btn: "Copy ID",
                email_label: "Email",
                copy_email_btn: "Copy Email",
                ble_channel: "Bale Channel",
                ble_btn: "Open Channel",
                telegram_channel: "Telegram Channel",
                telegram_btn: "Open Channel",
                submit_btn: "Send Message",
                site_info_title: "Site Information",
                latest_changes_label: "Latest Changes",
                status_label: "Status",
                status_online: "Online",
                current_time_label: "Current Time",
                footer: "© 2026 Alireza Apex — All Rights Reserved",
                toast_copy: "Copied",
                toast_email_copied: "Email Copied",
                toast_success: "Message ready to send",
                toast_welcome: "Welcome! 👋",
                name_placeholder: "Your Name",
                email_placeholder: "Your Email",
                message_placeholder: "Your Message...",
                lang_btn_en: "FA",
                share_menu: "Share"
            }
        };
    }

    const TRANSLATIONS = buildTranslations();

    function t(key) {
        return TRANSLATIONS[state.lang]?.[key] || key;
    }

    // ====================== DOM ELEMENTS ======================
    const D = {};

    function cacheDom() {
        const ids = [
            'loadingScreen', 'particles', 'hamburgerBtn', 'themeToggle', 'langToggle',
            'logoBox', 'appsGrid', 'contactForm', 'nameInput', 'emailInput', 'messageInput',
            'copyIdBtn', 'copyEmailBtn', 'bleBtn', 'telegramBtn', 'toast', 'topBtn'
        ];
        ids.forEach(id => D[id] = document.getElementById(id));
    }

    // ====================== RENDER ======================
    function render() {
        document.documentElement.lang = state.lang;
        document.documentElement.dir = state.lang === 'fa' ? 'rtl' : 'ltr';

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t(key)) el.textContent = t(key);
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t(key)) el.placeholder = t(key);
        });

        if (D.langToggle) D.langToggle.textContent = state.lang === 'fa' ? 'EN' : 'FA';
    }

    function renderApps() {
        if (!D.appsGrid) return;
        D.appsGrid.innerHTML = APPS.map(app => `
            <div class="app-card">
                <img src="\( {app.icon}" alt=" \){app.name}" class="app-icon" loading="lazy">
                <div class="app-name">${state.lang === 'fa' ? app.name : app.nameEn}</div>
                <p class="app-desc">${state.lang === 'fa' ? app.desc : app.descEn}</p>
                <a href="${app.url}" target="_blank" rel="noopener" class="myket-btn">مشاهده در مایکت</a>
            </div>
        `).join('');
    }

    // ====================== THEME ======================
    function applyTheme() {
        document.body.classList.toggle('light-theme', state.theme === 'light');
        localStorage.setItem('theme', state.theme);
    }

    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme();
    }

    function toggleLang() {
        state.lang = state.lang === 'fa' ? 'en' : 'fa';
        localStorage.setItem('lang', state.lang);
        render();
        renderApps();
    }

    // ====================== TOAST ======================
    function showToast(msg) {
        const toast = D.toast;
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), CONFIG.TOAST_DURATION);
    }

    // ====================== COPY ======================
    function copyToClipboard(text, successMsg) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMsg || t('toast_copy'));
        }).catch(() => {
            showToast('کپی دستی: ' + text);
        });
    }

    // ====================== FORM ======================
    function handleFormSubmit(e) {
        e.preventDefault();
        const name = D.nameInput.value.trim();
        const email = D.emailInput.value.trim();
        const message = D.messageInput.value.trim();

        if (!name || !email || !message) {
            showToast('لطفا همه فیلدها را پر کنید');
            return;
        }

        const subject = encodeURIComponent("پیام جدید از سایت");
        const body = encodeURIComponent(`نام: ${name}\nایمیل: \( {email}\n\nپیام:\n \){message}`);
        window.location.href = `mailto:\( {CONFIG.EMAIL_ADDR}?subject= \){subject}&body=${body}`;
        showToast(t('toast_success'));
        e.target.reset();
    }

    // ====================== EVENTS ======================
    function bindEvents() {
        if (D.themeToggle) D.themeToggle.addEventListener('click', toggleTheme);
        if (D.langToggle) D.langToggle.addEventListener('click', toggleLang);

        if (D.copyIdBtn) D.copyIdBtn.addEventListener('click', () => copyToClipboard(CONFIG.MESSENGER_ID));
        if (D.copyEmailBtn) D.copyEmailBtn.addEventListener('click', () => copyToClipboard(CONFIG.EMAIL_ADDR, t('toast_email_copied')));

        if (D.contactForm) D.contactForm.addEventListener('submit', handleFormSubmit);

        // Hamburger, Mobile menu, Scroll, Particles etc. can be added later if needed
    }

    // ====================== INIT ======================
    function init() {
        cacheDom();
        applyTheme();
        render();
        renderApps();
        bindEvents();

        // Hide loading
        setTimeout(() => {
            if (D.loadingScreen) {
                D.loadingScreen.style.opacity = '0';
                setTimeout(() => D.loadingScreen.remove(), 600);
            }
        }, 600);

        showToast(t('toast_welcome'));
    }

    // Start
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();