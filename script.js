// script.js
const SHARE_URL = 'https://ttr.ir/alirezaapex';
const translations = {
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

// Translate page
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

    document.getElementById('langToggle').textContent = lang === 'fa' ? translations[lang].lang_btn_en : translations[lang].lang_btn_fa;
    document.getElementById('mobileLangBtn').textContent = lang === 'fa' ? 'FA / EN' : 'EN / FA';
    const themeIcon = currentTheme === 'light' ? '☀️' : '🌙';
    const themeKey = currentTheme === 'light' ? 'theme_toggle_light' : 'theme_toggle_dark';
    document.getElementById('mobileThemeBtn').textContent = translations[lang][themeKey];

    localStorage.setItem('lang', lang);
    currentLang = lang;
    document.documentElement.lang = lang;
}

// Apply theme
function applyTheme(theme) {
    const isLight = theme === 'light';
    document.body.classList.toggle('light-theme', isLight);
    const themeIcon = isLight ? '☀️' : '🌙';
    document.getElementById('themeToggle').textContent = themeIcon;
    const themeKey = isLight ? 'theme_toggle_light' : 'theme_toggle_dark';
    document.getElementById('mobileThemeBtn').textContent = translations[currentLang][themeKey];
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

// Event Listeners
document.getElementById('langToggle').addEventListener('click', () => {
    translatePage(currentLang === 'fa' ? 'en' : 'fa');
});
document.getElementById('mobileLangBtn').addEventListener('click', () => {
    translatePage(currentLang === 'fa' ? 'en' : 'fa');
});
document.getElementById('themeToggle').addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});
document.getElementById('mobileThemeBtn').addEventListener('click', () => {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Hamburger menu
document.getElementById('hamburgerBtn').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.add('active');
});
document.getElementById('mobileCloseBtn').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('active');
});

// Share functionality
function shareSite() {
    if (navigator.share) {
        navigator.share({ title: 'Alireza Apex', url: SHARE_URL });
    } else {
        navigator.clipboard.writeText(SHARE_URL).then(() => {
            const toast = document.getElementById('toast');
            toast.textContent = 'لینک کپی شد!';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        });
    }
}
document.getElementById('mobileShareBtn').addEventListener('click', () => {
    shareSite();
    document.getElementById('mobileMenu').classList.remove('active');
});
document.getElementById('shareBtn').addEventListener('click', shareSite);

// Copy ID
document.getElementById('copyIdBtn').addEventListener('click', () => {
    navigator.clipboard.writeText("@WZXQRMT").then(() => {
        const toast = document.getElementById('toast');
        toast.textContent = translations[currentLang].toast_msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2200);
    });
});

// Back to top button with progress ring
const topBtn = document.getElementById('topBtn');
const progressCircle = document.getElementById('progressCircle');
const circumference = 2 * Math.PI * 30;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = Math.min(scrollY / docHeight, 1);

    topBtn.style.display = scrollY > 300 ? 'flex' : 'none';

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

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Particles
const canvas = document.getElementById('particles');
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

// Contact form mailto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const message = document.getElementById('messageInput').value.trim();
    const subject = encodeURIComponent(translations[currentLang].hero_title + " - New Message");
    const body = encodeURIComponent(`نام: ${name}\nایمیل: ${email}\nپیام: ${message}`);
    window.location.href = `mailto:developeralireza.sh@gmail.com?subject=${subject}&body=${body}`;
});

// Live clock
function updateClock() {
    const now = new Date();
    const timeString = [now.getHours(), now.getMinutes(), now.getSeconds()]
        .map(x => String(x).padStart(2, '0')).join(':');
    document.getElementById('liveClock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Initialization
window.addEventListener('load', () => {
    // Loading screen
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        setTimeout(() => loadingScreen.remove(), 600);
    }, 1000);

    translatePage(currentLang);
    applyTheme(currentTheme);

    // Welcome toast
    const toast = document.getElementById('toast');
    toast.textContent = translations[currentLang].welcome_msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);

    // Initial reveal check
    document.querySelectorAll('.reveal').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) el.classList.add('visible');
    });
});
