// API key for OpenWeatherMap
const api = "8bd8d47d534baa0e4a97043d6883b548";

// Base URL for fetching weather data
const api_url =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting the search input field
const searchBox = document.querySelector(".search input");

// Selecting the search button
const searchbtn = document.querySelector(".search button");

// Selecting the weather icon element
const weathericon = document.querySelector(".weather-icon");

// Function to fetch weather data for a given city
async function getWeather(city) {
  // Fetching data from the API with the city name and API key
  const response = await fetch(api_url + city + `&appid=${api}`);

  // Checking if the city is not found (404 error)
  if (response.status === 404) {
    // Show error message
    document.querySelector(".err").style.display = "block";

    // Hide weather details
    document.querySelector(".weather-info").style.display = "none";
  } else {
    // Parsing the response data into JSON format
    const data = await response.json();

    // Displaying the city name
    document.querySelector(".city").innerText = data.name;

    // Displaying the temperature and rounding it to the nearest integer
    document.querySelector(".temp").innerText =
      Math.round(data.main.temp) + "°C";

    // Displaying the humidity percentage
    document.querySelector(".humidity-per").innerText =
      data.main.humidity + "%";

    // Displaying the wind speed in km/h
    document.querySelector(".wind-speed").innerText = data.wind.speed + "km/h";

    // Setting the appropriate weather icon based on weather conditions
    if (data.weather[0].main === "Clouds") {

      // Clouds icon
      weathericon.src = "./Assets/images/clouds.png";
    } else if (data.weather[0].main === "Clear") {

      // Clear sky icon
      weathericon.src = "./Assets/images/clear.png";
    } else if (data.weather[0].main === "Rain") {

      // Rain icon
      weathericon.src = "./Assets/images/rain.png";
    } else if (data.weather[0].main === "Snow") {

      // Snow icon
      weathericon.src = "./Assets/images/snow.png";
    } else if (data.weather[0].main === "Drizzle") {

      // Drizzle icon
      weathericon.src = "./Assets/images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {

      // Mist icon
      weathericon.src = "./Assets/images/mist.png";
    }

    // Displaying the weather info section
    document.querySelector(".weather-info").style.display = "block";

    // Hiding the error message
    document.querySelector(".err").style.display = "none";
  }
}

// Adding an event listener to the search button
searchbtn.addEventListener("click", () => {

  // Checking if the input field is not empty
  if (searchBox.value.trim() !== "") {

    // Calling the function to fetch weather data
    getWeather(searchBox.value);

    // Hide input error message
    document.querySelector(".err1").style.display = "none";
  } else {
    
    // Show error message if the input field is empty
    document.querySelector(".err1").style.display = "block";
    document.querySelector(".err1").innerText = "Please enter a city name!";
  }
});
