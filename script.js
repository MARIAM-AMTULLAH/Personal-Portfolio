// Wait until the HTML document is ready (the script is loaded with defer).
document.addEventListener("DOMContentLoaded", function () {
    const root = document.documentElement;
    const themeButtons = document.querySelectorAll(".theme-toggle");
    const themeIcons = document.querySelectorAll(".theme-icon");
    const menuButton = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const contactForm = document.querySelector("#contact-form");
    const formStatus = document.querySelector("#form-status");

    // Read the saved theme. If none exists, use dark mode.
    let savedTheme = "dark";
    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    } catch (error) {
        // The page still works if browser storage is unavailable.
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);

        themeIcons.forEach(function (icon) {
            // In dark mode, show the sun to suggest switching to light mode.
            // In light mode, show the moon to suggest switching to dark mode.
            icon.textContent = theme === "dark" ? "☀" : "☾";
        });

        themeButtons.forEach(function (button) {
            const nextTheme = theme === "dark" ? "light" : "dark";
            button.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
            button.setAttribute("title", "Switch to " + nextTheme + " theme");
        });
    }

    applyTheme(savedTheme);

    themeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const currentTheme = root.getAttribute("data-theme");
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);

            try {
                localStorage.setItem("portfolio-theme", nextTheme);
            } catch (error) {
                // Theme switching still works for this page if storage is unavailable.
            }
        });
    });

    // Mobile navigation menu.
    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
            menuButton.textContent = isOpen ? "✕" : "☰";
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "Open navigation");
                menuButton.textContent = "☰";
            });
        });
    }

    // The static contact form prepares an email; it does not send data to a server.
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const subject = document.querySelector("#subject").value.trim();
            const message = document.querySelector("#message").value.trim();

            // Replace this placeholder with your real email address.
            const recipient = "your.email@example.com";
            const body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
            const mailtoLink = "mailto:" + recipient
                + "?subject=" + encodeURIComponent(subject)
                + "&body=" + encodeURIComponent(body);

            if (formStatus) {
                formStatus.textContent = "Opening your email application. Replace the sample recipient email in contact.html and script.js first.";
            }

            window.location.href = mailtoLink;
        });
    }

    // Set the current year in the footer.
    document.querySelectorAll(".year").forEach(function (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    });
});
