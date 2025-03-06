// script.js

const apiKey = 'eeae0b6b3c274405f3100b284b246d77'; // Replace with your OpenWeather API key
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const condition = document.getElementById('condition');
const forecastContainer = document.getElementById('forecast-container');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Toggle Light/Dark Mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// Fetch Weather Data
async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},NG&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
        fetchHourlyForecast(city);
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Display Weather Data
function displayWeather(data) {
    cityName.textContent = `City: ${data.name}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    condition.textContent = `Condition: ${data.weather[0].description}`;
}

// Fetch Hourly Forecast
async function fetchHourlyForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},NG&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching forecast');
        }
        const data = await response.json();
        displayHourlyForecast(data.list);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Display Hourly Forecast
function displayHourlyForecast(forecast) {
    forecastContainer.innerHTML = '';
    for (let i = 0; i < 8; i++) { // Show next 8 hours
        const hourData = forecast[i];
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p>${new Date(hourData.dt * 1000).getHours()}:00</p>
            <p>Temp: ${hourData.main.temp}°C</p>
            <p>${hourData.weather[0].description}</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}

// Event Listener for Search Button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});