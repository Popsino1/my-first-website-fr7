let button = document.getElementById("contactBtn");
let title = document.getElementById("mainTitle");
let heroText = document.getElementById("heroText");

button.addEventListener("click", function () {
    title.textContent = "Welcome to My Portfolio!";
    title.style.color = "crimson";

    heroText.textContent = "Thank you for visiting. Explore my projects and follow my journey as I become a software engineer.";
    heroText.style.color = "darkblue";
});

let themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});

let clock = document.getElementById("clock");

function updateClock() {
    let now = new Date();

    clock.textContent = now.toLocaleTimeString();
}

updateClock();

setInterval(updateClock, 1000);

let text = "An aspiring Software Engineer passionate about building beautiful and useful websites.";

let index = 0;

function typeWriter() {
    if (index < text.length) {
        heroText.textContent += text.charAt(index);
        index++;
    }
}

setInterval(typeWriter, 50);

let profilePic = document.getElementById("profilePic");

profilePic.addEventListener("click", function () {
    profilePic.classList.toggle("clicked");
});