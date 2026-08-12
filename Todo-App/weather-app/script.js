// =========================
// GET HTML ELEMENTS
// =========================

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const weatherDescription = document.getElementById("weatherDescription");
const temperature = document.getElementById("temperature");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");


// =========================
// SEARCH BUTTON
// =========================

searchBtn.addEventListener("click", function () {

    const city = cityInput.value.trim();

    if (city === "") {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);

});


// =========================
// PRESS ENTER TO SEARCH
// =========================

cityInput.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


// =========================
// GET WEATHER
// =========================

async function getWeather(city) {

    loading.style.display = "block";
    errorMessage.textContent = "";

    try {

        // Find the city's latitude and longitude
        const locationResponse = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );

        if (!locationResponse.ok) {
            throw new Error("Could not find the location.");
        }

        const locationData = await locationResponse.json();

        if (!locationData.results || locationData.results.length === 0) {
            throw new Error("City not found.");
        }

        const location = locationData.results[0];

        const latitude = location.latitude;
        const longitude = location.longitude;

        // Get real weather data
        const weatherResponse = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code&timezone=auto`
        );

        if (!weatherResponse.ok) {
            throw new Error("Could not get weather data.");
        }

        const weatherData = await weatherResponse.json();

        const current = weatherData.current;

        // Display location
        cityName.textContent =
            `${location.name}, ${location.country}`;

        // Display temperature
        temperature.textContent =
            `${Math.round(current.temperature_2m)}°C`;

        // Display feels-like temperature
        feelsLike.textContent =
            `${Math.round(current.apparent_temperature)}°C`;

        // Display humidity
        humidity.textContent =
            `${current.relative_humidity_2m}%`;

        // Display wind speed
        windSpeed.textContent =
            `${Math.round(current.wind_speed_10m)} km/h`;

        // Display weather description
        weatherDescription.textContent =
            getWeatherDescription(current.weather_code);

    } catch (error) {

        errorMessage.textContent =
            error.message || "Something went wrong. Please try again.";

        console.error(error);

    } finally {

        loading.style.display = "none";

    }

}


// =========================
// WEATHER DESCRIPTION
// =========================

function getWeatherDescription(code) {

    if (code === 0) {
        return "Clear sky";
    }

    if (code === 1 || code === 2 || code === 3) {
        return "Partly cloudy";
    }

    if (code === 45 || code === 48) {
        return "Foggy";
    }

    if (code >= 51 && code <= 57) {
        return "Drizzle";
    }

    if (code >= 61 && code <= 67) {
        return "Rain";
    }

    if (code >= 71 && code <= 77) {
        return "Snow";
    }

    if (code >= 80 && code <= 82) {
        return "Rain showers";
    }

    if (code >= 85 && code <= 86) {
        return "Snow showers";
    }

    if (code === 95) {
        return "Thunderstorm";
    }

    if (code === 96 || code === 99) {
        return "Thunderstorm with hail";
    }

    return "Unknown weather";
}