const apiKey = api; 

async function getWeather() {
  const city = document.getElementById("city").value;
  if (!city) return alert("Please enter a city!");

  // Current weather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== 200) {
    document.getElementById("location").textContent = "City not found!";
    return;
  }

  document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)} °C`;
  document.getElementById("description").textContent = data.weather[0].description;
  document.getElementById("extra").textContent =
    `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  document.getElementById("weather-icon").src =
    `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  // Load forecast
  getForecast(city);
}

async function getForecast(city) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  let forecastHTML = "";
  for (let i = 0; i < data.list.length; i += 8) {
    let day = data.list[i];
    const iconCode = day.weather[0].icon;
    forecastHTML += `
      <div class="forecast-card">
        <h4>${new Date(day.dt_txt).toLocaleDateString()}</h4>
        <img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="icon">
        <p>${day.weather[0].main}</p>
        <p>${Math.round(day.main.temp)} °C</p>
      </div>
    `;
  }
  document.getElementById("forecast-cards").innerHTML = forecastHTML;
}

