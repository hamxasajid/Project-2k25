const api = "8bd8d47d534baa0e4a97043d6883b548";
const api_url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");

const searchbtn = document.querySelector(".search button");

const weathericon = document.querySelector(".weather-icon");

async function getWeather(city) {
  const response = await fetch(api_url + city + `&appid=${api}`);

  if (response.status === 404) {
    // Check if the response status is 404
    document.querySelector(".err").style.display = "block";

    document.querySelector(".weather-info").style.display = "none";

  } else {
    const data = await response.json();

    document.querySelector(".city").innerText = data.name;

    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";

    document.querySelector(".humidity-per").innerText =
      data.main.humidity + "%";

    document.querySelector(".wind-speed").innerText = data.wind.speed + "km/h";

    // Weather icon logic
    if (data.weather[0].main === "Clouds") {
      weathericon.src = "../Assets/images/clouds.png";

    } else if (data.weather[0].main === "Clear") {
      weathericon.src = "../Assets/images/clear.png";

    } else if (data.weather[0].main === "Rain") {
      weathericon.src = "../Assets/images/rain.png";

    } else if (data.weather[0].main === "Snow") {
      weathericon.src = "../Assets/images/snow.png";

    } else if (data.weather[0].main === "Drizzle") {
      weathericon.src = "../Assets/images/drizzle.png";

    } else if (data.weather[0].main === "Mist") {
      weathericon.src = "../Assets/images/mist.png";
    }

    document.querySelector(".weather-info").style.display = "block";
    
    document.querySelector(".err").style.display = "none";
  }
}

searchbtn.addEventListener("click", () => {
  if (searchBox.value.trim() !== "") {
    getWeather(searchBox.value);

    document.querySelector(".err1").style.display = "none";

  } else {
    document.querySelector(".err1").style.display = "block";

    document.querySelector(".err1").innerText = ("Please enter a city name!");
  }
});