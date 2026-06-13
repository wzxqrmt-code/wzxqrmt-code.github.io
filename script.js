const CONFIG = {
    EMAIL: "developeralireza.sh@gmail.com",
    TELEGRAM: "https://t.me/AlirezaApex",
    BLE: "https://ble.ir/alireza_apex",
    SHARE: "https://wzxqrmt-code.github.io/"
};

// ===== THEME =====
function toggleTheme() {
    document.body.classList.toggle("light-theme");
}

// ===== LANGUAGE (ساده‌شده) =====
let lang = "fa";
function toggleLang() {
    lang = lang === "fa" ? "en" : "fa";
    alert("Language switched: " + lang);
}

// ===== COPY =====
function copyText(text) {
    navigator.clipboard.writeText(text);
    showToast("Copied!");
}

// ===== TOAST =====
function showToast(msg) {
    const toast = document.getElementById("toast");
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
}

// ===== OPEN LINKS =====
function openLink(url) {
    window.open(url, "_blank");
}

// ===== FORM =====
function sendMessage(e) {
    e.preventDefault();

    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("messageInput").value;

    if (!name || !email || !message) {
        showToast("Fill all fields");
        return;
    }

    const mailto = `mailto:${CONFIG.EMAIL}?subject=New Message&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    )}`;

    window.location.href = mailto;
}

// ===== INIT =====
window.onload = () => {
    document.getElementById("loadingScreen").style.display = "none";

    document.getElementById("contactForm").addEventListener("submit", sendMessage);
};