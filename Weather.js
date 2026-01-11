// Elements
const searchBtn = document.querySelector("#search-btn");
const result = document.querySelector("#result");
const cityInput = document.querySelector("#city-name");

// Body (safe selection)
const body = document.querySelector("#appBody") || document.body;

// API Key
const API_KEY = "2f337511d1774b914693cbafbe0189e2";

/* ---------------- BACKGROUND FUNCTION ---------------- */
function setTemperatureBackground(temp) {
  // Reset base classes
  body.className =
    "min-h-screen flex items-center justify-center transition-all duration-700";

  if (temp <= 10) {
    // Cold
    body.classList.add(
      "bg-gradient-to-br",
      "from-blue-400",
      "via-indigo-500",
      "to-purple-600"
    );
  } else if (temp <= 25) {
    // Normal
    body.classList.add(
      "bg-gradient-to-br",
      "from-sky-300",
      "via-green-400",
      "to-green-600"
    );
  } else {
    // Hot
    body.classList.add(
      "bg-gradient-to-br",
      "from-orange-400",
      "via-red-500",
      "to-red-700"
    );
  }
}

/* ---------------- UI HELPERS ---------------- */
function showLoading() {
  result.innerHTML = `
    <p class="text-center mt-4 animate-pulse">
      ⏳ Fetching weather...
    </p>
  `;
}

function showError(message) {
  result.innerHTML = `
    <p class="text-red-300 text-center mt-4 font-semibold">
      ❌ ${message}
    </p>
  `;
}

function showWeather(data) {
  // Change background
  setTemperatureBackground(data.main.temp);

  result.innerHTML = `
    <h2 class="text-2xl font-bold mt-4">
      ${data.name}, ${data.sys.country}
    </h2>

    <p class="text-5xl font-bold mt-2">
      ${Math.round(data.main.temp)}°C
    </p>

    <p class="capitalize mt-1">
      ${data.weather[0].description}
    </p>

    <div class="grid grid-cols-3 gap-4 mt-6 text-sm text-center">
      <div>
        💧
        <p>Humidity</p>
        <p class="font-semibold">${data.main.humidity}%</p>
      </div>

      <div>
        🌬️
        <p>Wind</p>
        <p class="font-semibold">${data.wind.speed} m/s</p>
      </div>

      <div>
        ☁️
        <p>Clouds</p>
        <p class="font-semibold">${data.clouds.all}%</p>
      </div>
    </div>
  `;
}

/* ---------------- MAIN FUNCTION ---------------- */
async function getWeatherData() {
  const cityName = cityInput.value.trim();

  if (!cityName) {
    showError("Please enter a city name");
    return;
  }

  showLoading();

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    console.log("Weather Data:", data); // Debug
    showWeather(data);

  } catch (error) {
    showError(error.message || "Something went wrong");
  }
}

/* ---------------- EVENTS ---------------- */
searchBtn.addEventListener("click", getWeatherData);

// Enter key support
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeatherData();
  }
});
