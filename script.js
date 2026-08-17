 /* =========================================
   THEME TOGGLE
========================================= */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeBtn.textContent = "☀️";
        themeBtn.setAttribute("aria-label", "Switch to dark mode");

    } else {

        themeBtn.textContent = "🌙";
        themeBtn.setAttribute("aria-label", "Switch to light mode");

    }

});


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        if (isOpen) {

            menuBtn.textContent = "✕";
            menuBtn.setAttribute("aria-label", "Close navigation");
            menuBtn.setAttribute("aria-expanded", "true");

        } else {

            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-label", "Open navigation");
            menuBtn.setAttribute("aria-expanded", "false");

        }

    });


    /* Close mobile menu when a link is clicked */

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.textContent = "☰";
            menuBtn.setAttribute("aria-label", "Open navigation");
            menuBtn.setAttribute("aria-expanded", "false");

        });

    });

}