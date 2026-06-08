// script.js
(function() {
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
            fa: { contact_title: "📬 ارتباط با Alireza Apex", site_info_title: "اطلاعات Alireza Apex", id_label: "آیدی تمامی پیام‌رسان‌ها", email_label: "ایمیل", copy_btn: "📋 کپی آیدی" },
            en: { contact_title: "📬 Contact Alireza Apex", site_info_title: "Alireza Apex Info", id_label: "All Messenger IDs", email_label: "Email", copy_btn: "📋 Copy ID" }
        };

        let currentLang = localStorage.getItem('lang') || 'fa';
        let currentTheme = localStorage.getItem('theme') || 'dark';

        function safeGet(id) { return document.getElementById(id); }
        function safeAddEvent(id, event, handler) {
            const el = safeGet(id);
            if (el) el.addEventListener(event, handler);
        }

        function applyTranslation(lang) {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) el.textContent = translations[lang][key];
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
            if (mobileThemeBtn) mobileThemeBtn.textContent = isLight ? '☀️ تغییر تم' : '🌙 تغییر تم';
            localStorage.setItem('theme', theme);
            currentTheme = theme;
        }

        safeAddEvent('langToggle', 'click', () => {
            const newLang = currentLang === 'fa' ? 'en' : 'fa';
            applyTranslation(newLang);
            safeGet('langToggle').textContent = newLang === 'fa' ? 'EN' : 'FA';
            const mlb = safeGet('mobileLangBtn');
            if (mlb) mlb.textContent = newLang === 'fa' ? 'FA / EN' : 'EN / FA';
        });

        safeAddEvent('mobileLangBtn', 'click', () => {
            const newLang = currentLang === 'fa' ? 'en' : 'fa';
            applyTranslation(newLang);
            safeGet('langToggle').textContent = newLang === 'fa' ? 'EN' : 'FA';
            const mlb = safeGet('mobileLangBtn');
            if (mlb) mlb.textContent = newLang === 'fa' ? 'FA / EN' : 'EN / FA';
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

        safeAddEvent('mobileShareBtn', 'click', () => { shareSite(); const m = safeGet('mobileMenu'); if (m) m.classList.remove('active'); });
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

        const topBtn = safeGet('topBtn');
        const progressCircle = safeGet('progressCircle');
        const circumference = 2 * Math.PI * 30;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min(scrollY / docHeight, 1);
            if (topBtn) topBtn.style.display = scrollY > 300 ? 'flex' : 'none';
            if (progressCircle) {
                progressCircle.style.strokeDasharray = circumference;
                progressCircle.style.strokeDashoffset = circumference - (scrollPercent * circumference);
            }
            document.querySelectorAll('.reveal.js-hidden').forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                    el.classList.remove('js-hidden');
                    el.classList.add('visible');
                }
            });
        });

        if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        const canvas = safeGet('particles');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let w, h;
            const resize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; };
            resize();
            window.addEventListener('resize', resize);
            const particles = Array.from({ length: 45 }, () => ({
                x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4
            }));
            (function animate() {
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
            })();
        }

        const contactForm = safeGet('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const name = safeGet('nameInput')?.value.trim() || '';
                const email = safeGet('emailInput')?.value.trim() || '';
                const message = safeGet('messageInput')?.value.trim() || '';
                window.location.href = `mailto:developeralireza.sh@gmail.com?subject=${encodeURIComponent('Alireza Apex - New Message')}&body=${encodeURIComponent(`نام: ${name}\nایمیل: ${email}\nپیام: ${message}`)}`;
            });
        }

        function updateClock() {
            const clockEl = safeGet('liveClock');
            if (!clockEl) return;
            const now = new Date();
            clockEl.textContent = [now.getHours(), now.getMinutes(), now.getSeconds()].map(x => String(x).padStart(2, '0')).join(':');
        }
        setInterval(updateClock, 1000);
        updateClock();

        const toast = safeGet('toast');
        if (toast) {
            toast.textContent = 'به سایت Alireza Apex خوش آمدی! 👋';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }

        applyTranslation(currentLang);
        applyTheme(currentTheme);
        document.querySelectorAll('.reveal.js-hidden').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.remove('js-hidden');
                el.classList.add('visible');
            }
        });
    });
})();
