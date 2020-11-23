function formatDate(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10) { hours = `0${hours}`
        };
    let minutes = date.getMinutes();
    if (minutes<10) { minutes = `0${minutes}`
        }; 
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday","Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;
}

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours<10) { hours = `0${hours}`
        };
    let minutes = date.getMinutes();
    if (minutes<10) { minutes = `0${minutes}`
        }; 
    return `${hours}:${minutes}`;
}

function displayTemperature (response){
let temperatureElement = document.querySelector("#temperature");
let cityElement = document.querySelector("#city");
let descriptionElement = document.querySelector("#description");
let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date"); 
let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;
temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name; 
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windElement.innerHTML = Math.round(response.data.wind.speed);
dateElement.innerHTML = formatDate(response.data.dt*1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
iconElement.setAttribute("alt", response.data.weather[0].description); 
}; 

function displayForecast(response){
    let forecastElement = document.querySelector("#forecast"); 
    forecastElement.innerHTML = null; 
    let forecast = null; 
   
    for (let index = 0; index < 6; index++) {
         let forecast = response.data.list[index]; 
        forecastElement.innerHTML +=`
     <div class="col-2">
            <h5> 
            ${formatHours(forecast.dt*1000)} 
            </h5>
            <img 
            src= http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png 
            alt= ${forecast.weather[0].description}
            />
            
            <div class="weather-forecast-temperature">
              <strong> ${Math.round(forecast.main.temp_max)}º </strong> 
              ${Math.round(forecast.main.temp_min)
            }º
            </div>
          </div>
    `;   
    }
}

function search (city){
let apiKey = "830aed891211b6be1ef87627b8211da0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
axios.get(apiUrl).then(displayTemperature); 

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`; 
axios.get(apiUrl).then(displayForecast); 
}

function handleSubmit(event){
    event.preventDefault(); 
    let cityInputElement = document.querySelector("#city-input"); 
    search(cityInputElement.value); 
   
}

function displayFahrenheitTemperature(event){
    event.preventDefault(); 
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature*9/5) + 32;    
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature); 
}

let celsiusTemperature = null; 

let form = document.querySelector("#search-form"); 
form.addEventListener("submit", handleSubmit); 

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature); 

let celsiusLink = document.querySelector("#Celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature); 

search("Porto")