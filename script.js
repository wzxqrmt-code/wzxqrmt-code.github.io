// script.js
(function() {
    const SHARE_URL = 'https://wzxqrmt-code.github.io/';

    // -------------------- تضمین حذف لودینگ --------------------
    function hideLoadingScreen() {
        const loader = document.getElementById('loadingScreen');
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            setTimeout(() => {
                if (loader && loader.parentNode) loader.remove();
            }, 600);
        }
    }
    setTimeout(hideLoadingScreen, 4000);
    if (document.readyState !== 'loading') {
        hideLoadingScreen();
    } else {
        document.addEventListener('DOMContentLoaded', hideLoadingScreen);
    }

    // -------------------- مقداردهی اولیه پس از آماده شدن DOM --------------------
    function onReady(fn) {
        if (document.readyState !== 'loading') fn();
        else document.addEventListener('DOMContentLoaded', fn);
    }

    onReady(function() {
        // مخفی‌سازی revealها (فقط وقتی JS فعال باشد)
        document.querySelectorAll('.reveal').forEach(el => {
            el.classList.add('js-hidden');
        });

        // ==================== ترجمه‌ها (در این نسخه محتوای مستقیم داریم، اما برای پشتیبانی از انگلیسی نگه داشته شد) ====================
        const translations = {
            fa: {
                contact_title: "📬 ارتباط با Alireza Apex",
                site_info_title: "اطلاعات Alireza Apex",
                id_label: "آیدی تمامی پیام‌رسان‌ها",
                email_label: "ایمیل",
                copy_btn: "📋 کپی آیدی"
            },
            en: {
                contact_title: "📬 Contact Alireza Apex",
                site_info_title: "Alireza Apex Info",
                id_label: "All Messenger IDs",
                email_label: "Email",
                copy_btn: "📋 Copy ID"
            }
        };

        let currentLang = localStorage.getItem('lang') || 'fa';
        let currentTheme = localStorage.getItem('theme') || 'dark';

        function safeGet(id) { return document.getElementById(id); }
        function safeAddEvent(id, event, handler) {
            const el = safeGet(id);
            if (el) el.addEventListener(event, handler);
        }

        // ترجمه (فقط متون داینامیک)
        function applyTranslation(lang) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    el.textContent = translations[lang][key];
                }
            });
            localStorage.setItem('lang', lang);
            currentLang = lang;
        }

        function applyTheme(theme) {
            const isLight = theme === 'light';
            document.body.classList.toggle('light-theme', isLight);
            const themeIcon = isLight ? '☀️' : '🌙';
            const themeToggle = safeGet('themeToggle');
            if (themeToggle) themeToggle.textContent = themeIcon;
            const mobileThemeBtn = safeGet('mobileThemeBtn');
            if (mobileThemeBtn) {
                mobileThemeBtn.textContent = isLight ? '☀️ تغییر تم' : '🌙 تغییر تم';
            }
            localStorage.setItem('theme', theme);
            currentTheme = theme;
        }

        safeAddEvent('langToggle', 'click', () => {
            const newLang = currentLang === 'fa' ? 'en' : 'fa';
            applyTranslation(newLang);
            document.getElementById('langToggle').textContent = newLang === 'fa' ? 'EN' : 'FA';
            const mobileLangBtn = safeGet('mobileLangBtn');
            if (mobileLangBtn) mobileLangBtn.textContent = newLang === 'fa' ? 'FA / EN' : 'EN / FA';
        });

        safeAddEvent('mobileLangBtn', 'click', () => {
            const newLang = currentLang === 'fa' ? 'en' : 'fa';
            applyTranslation(newLang);
            document.getElementById('langToggle').textContent = newLang === 'fa' ? 'EN' : 'FA';
            const mobileLangBtn = safeGet('mobileLangBtn');
            if (mobileLangBtn) mobileLangBtn.textContent = newLang === 'fa' ? 'FA / EN' : 'EN / FA';
        });

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

        function shareSite() {
            if (navigator.share) {
                navigator.share({ title: 'Alireza Apex | توسعه‌دهنده اندروید', url: SHARE_URL });
            } else {
                navigator.clipboard.writeText(SHARE_URL).then(() => {
                    const toast = safeGet('toast');
                    if (toast) {
                        toast.textContent = 'لینک کپی شد!';
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
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
                const toast = safeGet('toast');
                if (toast) {
                    toast.textContent = 'آیدی کپی شد';
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 2200);
                }
            });
        });

        // دکمه بازگشت به بالا با درصد اسکرول
        const topBtn = safeGet('topBtn');
        const progressCircle = safeGet('progressCircle');
        const circumference = 2 * Math.PI * 30;

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

            // Reveal on scroll
            document.querySelectorAll('.reveal.js-hidden').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.classList.remove('js-hidden');
                    el.classList.add('visible');
                }
            });
        });

        if (topBtn) {
            topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        }

        // ذرات پس‌زمینه
        const canvas = safeGet('particles');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let w, h;
            const resize = () => {
                w = canvas.width = innerWidth;
                h = canvas.height = innerHeight;
            };
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

        // فرم تماس
        const contactForm = safeGet('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = safeGet('nameInput')?.value.trim() || '';
                const email = safeGet('emailInput')?.value.trim() || '';
                const message = safeGet('messageInput')?.value.trim() || '';
                const subject = 'Alireza Apex - New Message';
                const body = `نام: ${name}\nایمیل: ${email}\nپیام: ${message}`;
                window.location.href = `mailto:developeralireza.sh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            });
        }

        // ساعت زنده
        function updateClock() {
            const clockEl = safeGet('liveClock');
            if (!clockEl) return;
            const now = new Date();
            clockEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()]
                .map(x => String(x).padStart(2, '0')).join(':');
        }
        setInterval(updateClock, 1000);
        updateClock();

        // پیام خوش‌آمد
        const toast = safeGet('toast');
        if (toast) {
            toast.textContent = 'به سایت Alireza Apex خوش آمدی! 👋';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // اجرای اولیه
        applyTranslation(currentLang);
        applyTheme(currentTheme);

        // بررسی اولیه reveal برای المان‌های قابل مشاهده
        document.querySelectorAll('.reveal.js-hidden').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.remove('js-hidden');
                el.classList.add('visible');
            }
        });
    });
})();        const translations = {
            fa: {
                site_title:"Alireza Apex", hero_title:"Alireza Apex", hero_desc:"به صفحه رسمی Alireza Apex خوش آمدید. برای مشاهده و دانلود تمامی اپلیکیشن‌های منتشر شده، می‌توانید وارد صفحه توسعه‌دهنده در مایکت شوید.",
                myket_btn:"🚀 ورود به مایکت", contact_title:"📬 ارتباط با من", id_label:"آیدی تمامی پیام‌رسان‌ها", copy_btn:"📋 کپی آیدی", email_label:"ایمیل",
                name_placeholder:"نام شما", email_placeholder:"ایمیل شما", message_placeholder:"پیام شما...", submit_btn:"ارسال پیام",
                footer:"© 2026 Alireza Apex — All Rights Reserved", toast_msg:"آیدی کپی شد", welcome_msg:"به سایت Alireza Apex خوش آمدی! 👋",
                site_info_title:"اطلاعات سایت", latest_changes_label:"آخرین تغییرات", latest_changes_value:"📅 ۱۲ خرداد ۱۴۰۵<br>• اضافه شدن منوی همبرگری موبایل<br>• امکان تغییر تم تاریک و روشن<br>• دکمه اشتراک‌گذاری سایت<br>• لودینگ اسکرین نئونی<br>• ساعت زنده و اسکرول نئونی",
                status_label:"وضعیت", status_online:"آنلاین", current_time_label:"ساعت فعلی",
                lang_btn_en:"EN", lang_btn_fa:"FA",
                myket_menu:"🚀 ورود به مایکت", share_menu:"📤 اشتراک‌گذاری", close_menu:"❌ بستن",
                theme_toggle_dark:"🌙 تغییر تم", theme_toggle_light:"☀️ تغییر تم"
            },
            en: {
                site_title:"Alireza Apex", hero_title:"Alireza Apex", hero_desc:"Welcome to the official page of Alireza Apex. To view and download all published applications, you can visit the developer page on Myket.",
                myket_btn:"🚀 Visit Myket", contact_title:"📬 Contact Me", id_label:"All Messenger IDs", copy_btn:"📋 Copy ID", email_label:"Email",
                name_placeholder:"Your Name", email_placeholder:"Your Email", message_placeholder:"Your Message...", submit_btn:"Send Message",
                footer:"© 2026 Alireza Apex — All Rights Reserved", toast_msg:"ID Copied", welcome_msg:"Welcome to Alireza Apex! 👋",
                site_info_title:"Site Information", latest_changes_label:"Latest Changes", latest_changes_value:"📅 June 2, 2026<br>• Mobile hamburger menu added<br>• Dark/Light theme toggle<br>• Share button added<br>• Neon loading screen<br>• Live clock & neon scrollbar",
                status_label:"Status", status_online:"Online", current_time_label:"Current Time",
                lang_btn_en:"EN", lang_btn_fa:"FA",
                myket_menu:"🚀 Visit Myket", share_menu:"📤 Share", close_menu:"❌ Close",
                theme_toggle_dark:"🌙 Change Theme", theme_toggle_light:"☀️ Change Theme"
            }
        };

        let currentLang = localStorage.getItem('lang') || 'fa';
        let currentTheme = localStorage.getItem('theme') || 'dark';

        // ==================== توابع کمکی امن ====================
        function safeGet(id) {
            return document.getElementById(id);
        }

        function safeAddEvent(id, event, handler) {
            const el = safeGet(id);
            if (el) el.addEventListener(event, handler);
        }

        // ==================== ترجمه ====================
        function translatePage(lang) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.dataset.i18n;
                if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
            });
            document.querySelectorAll('[data-i18n-html]').forEach(el => {
                const key = el.dataset.i18nHtml;
                if (translations[lang] && translations[lang][key]) el.innerHTML = translations[lang][key];
            });
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.dataset.i18nPlaceholder;
                if (translations[lang] && translations[lang][key]) el.placeholder = translations[lang][key];
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

        // ==================== تغییر تم ====================
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

        // ==================== رویدادهای اصلی ====================
        safeAddEvent('langToggle', 'click', () => translatePage(currentLang === 'fa' ? 'en' : 'fa'));
        safeAddEvent('mobileLangBtn', 'click', () => translatePage(currentLang === 'fa' ? 'en' : 'fa'));
        safeAddEvent('themeToggle', 'click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));
        safeAddEvent('mobileThemeBtn', 'click', () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'));

        // منوی همبرگری
        safeAddEvent('hamburgerBtn', 'click', () => {
            const menu = safeGet('mobileMenu');
            if (menu) menu.classList.add('active');
        });
        safeAddEvent('mobileCloseBtn', 'click', () => {
            const menu = safeGet('mobileMenu');
            if (menu) menu.classList.remove('active');
        });

        // ==================== اشتراک‌گذاری ====================
        function shareSite() {
            if (navigator.share) {
                navigator.share({ title: 'Alireza Apex', url: SHARE_URL });
            } else {
                navigator.clipboard.writeText(SHARE_URL).then(() => {
                    const toast = safeGet('toast');
                    if (toast) {
                        toast.textContent = 'لینک کپی شد!';
                        toast.classList.add('show');
                        setTimeout(() => toast.classList.remove('show'), 2000);
                    }
                });
            }
        }

        safeAddEvent('mobileShareBtn', 'click', () => {
            shareSite();
            const menu = safeGet('mobileMenu');
            if (menu) menu.classList.remove('active');
        });
        safeAddEvent('shareBtn', 'click', shareSite);

        // ==================== کپی آیدی ====================
        safeAddEvent('copyIdBtn', 'click', () => {
            navigator.clipboard.writeText("@WZXQRMT").then(() => {
                const toast = safeGet('toast');
                if (toast && translations[currentLang]) {
                    toast.textContent = translations[currentLang].toast_msg;
                    toast.classList.add('show');
                    setTimeout(() => toast.classList.remove('show'), 2200);
                }
            });
        });

        // ==================== دکمه بازگشت به بالا با درصد ====================
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

                // Reveal animations
                document.querySelectorAll('.reveal').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight - 100) el.classList.add('visible');
                });
            });

            if (topBtn) {
                topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
            }
        }

        // ==================== ذرات پس‌زمینه ====================
        const canvas = safeGet('particles');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            function resize() {
                canvas.width = innerWidth;
                canvas.height = innerHeight;
            }
            resize();
            window.addEventListener('resize', resize);

            const particles = Array.from({ length: 45 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4
            }));

            function animate() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const color = document.body.classList.contains('light-theme') ? "rgba(100,30,200,.45)" : "rgba(157,77,255,.55)";
                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                });
                requestAnimationFrame(animate);
            }
            animate();
        }

        // ==================== فرم تماس ====================
        const contactForm = safeGet('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const nameInput = safeGet('nameInput');
                const emailInput = safeGet('emailInput');
                const messageInput = safeGet('messageInput');
                if (!nameInput || !emailInput || !messageInput) return;

                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const message = messageInput.value.trim();
                const subject = encodeURIComponent(translations[currentLang]?.hero_title + " - New Message");
                const body = encodeURIComponent(`نام: ${name}\nایمیل: ${email}\nپیام: ${message}`);
                window.location.href = `mailto:developeralireza.sh@gmail.com?subject=${subject}&body=${body}`;
            });
        }

        // ==================== ساعت زنده ====================
        function updateClock() {
            const clockEl = safeGet('liveClock');
            if (!clockEl) return;
            const now = new Date();
            const timeString = [now.getHours(), now.getMinutes(), now.getSeconds()]
                .map(x => String(x).padStart(2, '0')).join(':');
            clockEl.textContent = timeString;
        }
        setInterval(updateClock, 1000);
        updateClock();

        // ==================== پیام خوش‌آمدگویی ====================
        const toast = safeGet('toast');
        if (toast && translations[currentLang]) {
            toast.textContent = translations[currentLang].welcome_msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        // اجرای اولیه
        translatePage(currentLang);
        applyTheme(currentTheme);

        // بررسی اولیه reveal
        document.querySelectorAll('.reveal').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) el.classList.add('visible');
        });
    });
})();
