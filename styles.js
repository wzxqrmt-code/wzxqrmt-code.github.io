:root {
    --bg: #07070c;
    --card: rgba(17, 17, 30, .75);
    --border: rgba(255, 255, 255, .08);
    --text: #ffffff;
    --muted: #d1d1e0;
    --accent-text: #e0d0ff;
    --primary: #9d4dff;
    --primary2: #7a2cff;
    --surface: rgba(255, 255, 255, .03);
    --hover-glow: rgba(157, 77, 255, .4);
    --input-bg: #10101b;
    --logo-shadow: #9d4dff;
    --scrollbar-thumb: #9d4dff;
    --scrollbar-track: #1a1a2e;
    --menu-bg: rgba(10, 10, 25, .95);
    --toast-bg: #9d4dff;
    --gradient-start: #fff;
    --gradient-end: #c9a6ff;
    --particle-color: rgba(157, 77, 255, 0.45);
    --focus-ring: 0 0 0 3px rgba(157, 77, 255, 0.5);
}

body.light-theme {
    --bg: #f5f0ff;
    --card: rgba(255, 255, 255, .8);
    --border: rgba(157, 77, 255, .2);
    --text: #1a1a2e;
    --muted: #4a4a6a;
    --accent-text: #3d0099;
    --primary: #7a2cff;
    --primary2: #6a1bff;
    --surface: rgba(157, 77, 255, .06);
    --hover-glow: rgba(157, 77, 255, .35);
    --input-bg: #ffffff;
    --logo-shadow: #6c2bd9;
    --scrollbar-thumb: #7a2cff;
    --scrollbar-track: #e0d4ff;
    --menu-bg: rgba(255, 245, 255, .96);
    --toast-bg: #6c2bd9;
    --gradient-start: #2d004d;
    --gradient-end: #7a2cff;
    --particle-color: rgba(100, 30, 200, 0.35);
    --focus-ring: 0 0 0 3px rgba(122, 44, 255, 0.5);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Vazirmatn', sans-serif;
}

html { scroll-behavior: smooth; }

body {
    background: var(--bg);
    color: var(--text);
    overflow-x: hidden;
    min-height: 100vh;
}

/* ===== LOADING ===== */
.loading-screen {
    position: fixed;
    inset: 0;
    background: #07070c;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loader {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 4px solid rgba(157, 77, 255, .3);
    border-top-color: #9d4dff;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ===== TOP BAR ===== */
.top-bar {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    padding: 10px 0;
}

.hamburger-btn,
.theme-btn,
.lang-btn {
    background: rgba(157, 77, 255, .15);
    border: 1px solid rgba(157, 77, 255, .4);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
}

/* ===== HERO ===== */
.hero {
    text-align: center;
    padding: 60px 0;
}

.hero-card {
    background: var(--card);
    border-radius: 30px;
    padding: 40px;
}

/* ===== BUTTON ===== */
.myket-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 12px 28px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--primary), var(--primary2));
    color: white;
    text-decoration: none;
}

/* ===== CARDS ===== */
.card {
    background: var(--card);
    border-radius: 25px;
    padding: 25px;
    margin-top: 20px;
}

/* ===== CONTACT ===== */
.info-box {
    background: var(--surface);
    padding: 15px;
    border-radius: 15px;
    margin-top: 10px;
}

/* ===== INPUT ===== */
input, textarea {
    width: 100%;
    padding: 12px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--input-bg);
    color: var(--text);
}

/* ===== TOAST ===== */
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--toast-bg);
    color: white;
    padding: 10px 20px;
    border-radius: 999px;
    opacity: 0;
    transition: .3s;
}

.toast.show {
    opacity: 1;
}

/* ===== MOBILE ===== */
@media (max-width: 768px) {
    .hero-card {
        padding: 25px;
    }
}