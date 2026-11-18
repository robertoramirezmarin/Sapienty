// Código compartido por todas las páginas: menú móvil y widget de WhatsApp.
document.addEventListener('DOMContentLoaded', function () {
    // --- Menú Móvil ---
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');

    if (menuIcon && navLinks) {
        function cerrarMenu() {
            navLinks.classList.remove('activo');
            menuIcon.setAttribute('aria-expanded', 'false');
        }

        menuIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            const abierto = navLinks.classList.toggle('activo');
            menuIcon.setAttribute('aria-expanded', abierto ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', cerrarMenu));

        // Cierra el menú al tocar fuera de él
        document.addEventListener('click', function (e) {
            if (navLinks.classList.contains('activo') && !navLinks.contains(e.target)) cerrarMenu();
        });
    }

    // --- Widget de WhatsApp ---
    const waBtn = document.getElementById('wa-floating-btn');
    const waChatBox = document.getElementById('wa-chat-box');
    const waClose = document.getElementById('wa-close');
    const waForm = document.getElementById('wa-form');
    const waInput = document.getElementById('wa-message-input');

    if (!waBtn || !waChatBox || !waClose || !waForm || !waInput) return;

    const numeroWhatsApp = "5215561301497";

    function abrirChat() {
        waChatBox.classList.remove('oculto');
        waBtn.setAttribute('aria-expanded', 'true');
        // En pantallas táctiles no abrimos el teclado automáticamente
        if (window.matchMedia('(hover: hover)').matches) waInput.focus();
    }

    function cerrarChat() {
        waChatBox.classList.add('oculto');
        waBtn.setAttribute('aria-expanded', 'false');
    }

    waBtn.addEventListener('click', () => {
        waChatBox.classList.contains('oculto') ? abrirChat() : cerrarChat();
    });
    waClose.addEventListener('click', cerrarChat);

    // Usar "submit" hace que funcione tanto el botón de enviar como la tecla
    // "Enter"/"Ir" del teclado del celular.
    waForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const mensaje = waInput.value.trim();
        let url = `https://wa.me/${numeroWhatsApp}`;
        if (mensaje !== "") url += `?text=${encodeURIComponent(mensaje)}`;

        waInput.blur();
        window.open(url, '_blank', 'noopener');
        cerrarChat();
        waInput.value = "";
    });
});
