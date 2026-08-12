// =========================
// GET HTML ELEMENTS
// =========================

const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const profile = document.getElementById("profile");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");

const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const profileLink = document.getElementById("profileLink");


// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener("click", function () {

    const usernameValue = usernameInput.value.trim();

    if (usernameValue === "") {

        showError("Please enter a GitHub username.");

        return;
    }

    getGitHubProfile(usernameValue);

});


// =========================
// PRESS ENTER TO SEARCH
// =========================

usernameInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


// =========================
// GET GITHUB PROFILE
// =========================

async function getGitHubProfile(usernameValue) {

    loading.style.display = "block";
    errorMessage.style.display = "none";

    try {

        const response = await fetch(
            `https://api.github.com/users/${encodeURIComponent(usernameValue)}`
        );


        if (!response.ok) {

            if (response.status === 404) {
                throw new Error("GitHub user not found.");
            }

            throw new Error("Unable to fetch GitHub profile.");

        }


        const data = await response.json();


        // =========================
        // DISPLAY PROFILE
        // =========================

        avatar.src = data.avatar_url;

        avatar.alt = `${data.login}'s GitHub profile picture`;


        name.textContent =
            data.name || data.login;


        username.textContent =
            `@${data.login}`;


        bio.textContent =
            data.bio || "This user has no bio.";


        repos.textContent =
            data.public_repos;


        followers.textContent =
            data.followers;


        following.textContent =
            data.following;


        profileLink.href =
            data.html_url;


        profile.style.display = "block";


    } catch (error) {

        showError(error.message);

        profile.style.display = "none";

        console.error(error);

    } finally {

        loading.style.display = "none";

    }

}


// =========================
// SHOW ERROR
// =========================

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.style.display = "block";

}