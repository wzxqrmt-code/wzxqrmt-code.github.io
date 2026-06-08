// script.js
(function() {
    'use strict';
    const SHARE_URL = 'https://wzxqrmt-code.github.io/';

    function hideLoadingScreen() {
        const loader = document.getElementById('loadingScreen');
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => { if (loader && loader.parentNode) loader.remove(); }, 600);
        }
    }
    setTimeout(hideLoadingScreen, 4000);
    if (document.readyState !== 'loading') hideLoadingScreen();
    else document.addEventListener('DOMContentLoaded', hideLoadingScreen);

    function onReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    onReady(function() {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('js-hidden'));

        const translations = {
            fa: {
                hero_title: "Alireza Apex",
                hero_desc: "به صفحه رسمی Alireza Apex، توسعه‌دهنده اندروید خوش آمدید. برای مشاهده و دانلود تمامی اپلیکیشن‌های منتشر شده توسط Alireza Apex، از لینک زیر وارد صفحه توسعه‌دهنده در مایکت شوید.",
                myket_btn: "🚀 ورود به مایکت",
                contact_title: "📬 ارتباط با Alireza Apex",
                id_label: "آیدی تمامی پیام‌رسان‌ها",
                copy_btn: "📋 کپی آیدی",
                email_label: "ایمیل",
                name_placeholder: "نام شما",
                email_placeholder: "ایمیل شما",
                message_placeholder: "پیام شما...",
                submit_btn: "ارسال پیام",
                site_info_title: "اطلاعات Alireza Apex",
                latest_changes_label: "آخرین تغییرات",
                latest_changes_value: "📅 ۱۸ خرداد ۱۴۰۵<br>• پیاده‌سازی Schema Markup جهت بهبود شناسایی برند شخصی در گوگل<br>• ارتقای ساختار سئو (SEO) برای ایندکس سریع‌تر در موتورهای جستجو<br>• اصلاح کدهای اسکریپت برای افزایش پایداری و سرعت لود سایت<br>• بهبود تجربه کاربری در تمامی دستگاه‌ها",
                status_label: "وضعیت",
                status_online: "آنلاین",
                current_time_label: "ساعت فعلی",
                footer: "© 2026 Alireza Apex — تمامی حقوق محفوظ است",
                toast_copy: "آیدی کپی شد",
                welcome_msg: "به سایت Alireza Apex خوش آمدی! 👋",
                lang_btn_en: "EN",
                lang_btn_fa: "FA",
                myket_menu: "🚀 ورود به مایکت",
                share_menu: "📤 اشتراک‌گذاری",
                close_menu: "❌ بستن",
                theme_toggle_dark: "🌙 تغییر تم",
                theme_toggle_light: "☀️ تغییر تم"
            },
            en: {
                hero_title: "Alireza Apex",
                hero_desc: "Welcome to the official page of Alireza Apex, an Android Developer. To view and download all published applications by Alireza Apex, visit the developer page on Myket from the link below.",
                myket_btn: "🚀 Visit Myket",
                contact_title: "📬 Contact Alireza Apex",
                id_label: "All Messenger IDs",
                copy_btn: "📋 Copy ID",
                email_label: "Email",
                name_placeholder: "Your Name",
                email_placeholder: "Your Email",
                message_placeholder: "Your Message...",
                submit_btn: "Send Message",
                site_info_title: "Alireza Apex Info",
                latest_changes_label: "Latest Changes",
                latest_changes_value: "📅 June 8, 2026<br>• Implemented Schema Markup for improved personal brand recognition in Google<br>• Enhanced SEO structure for faster indexing in search engines<br>• Refined scripts for increased stability and loading speed<br>• Improved user experience across all devices",
                status_label: "Status",
                status_online: "Online",
                current_time_label: "Current Time",
                footer: "© 2026 Alireza Apex — All Rights Reserved",
                toast_copy: "ID Copied",
                welcome_msg: "Welcome to Alireza Apex! 👋",
                lang_btn_en: "EN",
                lang_btn_fa: "FA",
                myket_menu: "🚀 Visit Myket",
                share_menu: "📤 Share",
                close_menu: "❌ Close",
                theme_toggle_dark: "🌙 Change Theme",
                theme_toggle_light: "☀️ Change Theme"
            }
        };

        let currentLang = localStorage.getItem('lang') || 'fa';
        let currentTheme = localStorage.getItem('theme');

        if (!currentTheme) {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                currentTheme = 'light';
            } else {
                currentTheme = 'dark';
            }
        }

        function safeGet(id) { return document.getElementById(id); }
        function safeAddEvent(id, event, handler) {
            const el = safeGet(id);
            if (el) el.addEventListener(event, handler);
        }

        function translatePage(lang) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (translations[lang] && translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.dataset.i18nHtml;
                if (translations[lang] && translations[lang][key]) {
                    el.innerHTML = translations[lang][key];
                }
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.dataset.i18nPlaceholder;
                if (translations[lang] && translations[lang][key]) {
                    el.placeholder = translations[lang][key];
                }
            });

            const langToggle = safeGet('langToggle');
            if (langToggle) langToggle.textContent = lang === 'fa' ? translations[lang].lang_btn_en : translations[lang].lang_btn_fa;
            const mobileLangBtn = safeGet('mobileLangBtn');
            if (mobileLangBtn) mobileLangBtn.textContent = lang === 'fa' ? 'FA / EN' : 'EN / FA';

            const themeIcon = currentTheme === 'light' ? '☀️' : '🌙';
            const themeKey = currentTheme === 'light' ? 'theme_toggle_light' : 'theme_toggle_dark';
            const mobileThemeBtn = safeGet('mobileThemeBtn');
            if (mobileThemeBtn) mobileThemeBtn.textContent = translations[lang][themeKey];

            localStorage.setItem('lang', lang);
            currentLang = lang;
            document.documentElement.lang = lang;
        }

        function applyTheme(theme) {
            const isLight = theme === 'light';
            document.body.classList.toggle('light-theme', isLight);
            const themeIcon = isLight ? '☀️' : '🌙';
            const themeToggle = safeGet('themeToggle');
            if (themeToggle) themeToggle.textContent = themeIcon;
            const themeKey = isLight ? 'theme_toggle_light' : 'theme_toggle_dark';
            const mobileThemeBtn = safeGet('mobileThemeBtn');
            if (mobileThemeBtn && translations[currentLang]) mobileThemeBtn.textContent = translations[currentLang][themeKey];
            localStorage.setItem('theme', theme);
            currentTheme = theme;
        }

        safeAddEvent('langToggle', 'click', () => translatePage(currentLang === 'fa' ? 'en' : 'fa'));
        safeAddEvent('mobileLangBtn', 'click', () => translatePage(currentLang === 'fa' ? 'en' : 'fa'));
        safeAddEvent('themeToggle', 'click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
        safeAddEvent('mobileThemeBtn', 'click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));

        safeAddEvent('hamburgerBtn', 'click', () => {
            const menu = safeGet('mobileMenu');
            if (menu) menu.classList.add('active');
        });
        safeAddEvent('mobileCloseBtn', 'click', () => {
            const menu = safeGet('mobileMenu');
            if (menu) menu.classList.remove('active');
        });

        function showToast(message) {
            const toast = safeGet('toast');
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        function shareSite() {
            if (navigator.share) {
                navigator.share({ title: 'Alireza Apex | توسعه‌دهنده اندروید', url: SHARE_URL });
            } else {
                navigator.clipboard.writeText(SHARE_URL).then(() => {
                    showToast('لینک کپی شد!');
                });
            }
        }

        safeAddEvent('mobileShareBtn', 'click', () => {
            shareSite();
            const menu = safeGet('mobileMenu');
            if (menu) menu.classList.remove('active');
        });
        safeAddEvent('shareBtn', 'click', shareSite);

        safeAddEvent('copyIdBtn', 'click', () => {
            navigator.clipboard.writeText("@WZXQRMT").then(() => {
                showToast(translations[currentLang]?.toast_copy || 'آیدی کپی شد');
            });
        });

        const topBtn = safeGet('topBtn');
        const progressCircle = safeGet('progressCircle');
        const circumference = 2 * Math.PI * 30;

        if (topBtn || progressCircle) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const docHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPercent = Math.min(scrollY / docHeight, 1);

                if (topBtn) topBtn.style.display = scrollY > 300 ? 'flex' : 'none';
                if (progressCircle) {
                    const offset = circumference - (scrollPercent * circumference);
                    progressCircle.style.strokeDasharray = circumference;
                    progressCircle.style.strokeDashoffset = offset;
                }

                document.querySelectorAll('.reveal.js-hidden').forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                        el.classList.remove('js-hidden');
                        el.classList.add('visible');
                    }
                });
            });

            if (topBtn) {
                topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            }
        }

        const canvas = safeGet('particles');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let w, h;
            function resize() {
                w = canvas.width = innerWidth;
                h = canvas.height = innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const particles = Array.from({ length: 45 }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            }));

            function animate() {
                ctx.clearRect(0, 0, w, h);
                const color = document.body.classList.contains('light-theme') ? "rgba(100,30,200,.45)" : "rgba(157,77,255,.55)";
                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > w) p.vx *= -1;
                    if (p.y < 0 || p.y > h) p.vy *= -1;
                });
                requestAnimationFrame(animate);
            }
            animate();
        }

        const contactForm = safeGet('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = safeGet('nameInput')?.value.trim() || '';
                const email = safeGet('emailInput')?.value.trim() || '';
                const message = safeGet('messageInput')?.value.trim() || '';
                const subject = encodeURIComponent(translations[currentLang]?.hero_title + " - New Message");
                const body = encodeURIComponent(`نام: ${name}\nایمیل: ${email}\nپیام: ${message}`);
                window.location.href = `mailto:developeralireza.sh@gmail.com?subject=${subject}&body=${body}`;
            });
        }

        function updateClock() {
            const clockEl = safeGet('liveClock');
            if (!clockEl) return;
            const now = new Date();
            clockEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
                .map(x => String(x).padStart(2, '0')).join(':');
        }
        setInterval(updateClock, 1000);
        updateClock();

        // راه‌اندازی اولیه
        translatePage(currentLang);
        applyTheme(currentTheme);

        // نمایش پیام خوش‌آمد با تأخیر کم (مطمئن می‌شویم DOM کاملاً آماده است)
        setTimeout(() => {
            showToast(translations[currentLang]?.welcome_msg || 'به سایت Alireza Apex خوش آمدید');
        }, 100);

        // Reveal اولیه
        document.querySelectorAll('.reveal.js-hidden').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.remove('js-hidden');
                el.classList.add('visible');
            }
        });
    });
})();
