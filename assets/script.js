var citySearched;


//Gets the user's input from the form and saves it to local storage
function getUserInput() {
    event.preventDefault();
    var cityInput = document.getElementById("city").value;
    addSearch(cityInput);
    getWeather(cityInput);

}

//Weather API call
function getWeather(city) {
    //Lets us use the city instead of coordinates and sets the units to imperial
    var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=61653e3c08785e76f3c18d12e341aa0c&units=imperial'
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
}

//Appends what was searched to below the searchbox
function addSearch(cityName) {
    var cityEl = document.createElement("li");
    cityEl.textContent = cityName;
    document.getElementById("cityList").appendChild(cityEl);

    addToLocalStorage(cityName);
}

//Adds city to an array in local storage
function addToLocalStorage(cityName) {
    var storedCitiesString = localStorage.getItem("citySearched");
    var storedCitiesArray = JSON.parse(storedCitiesString) || [];
    storedCitiesArray.push(cityName);
    localStorage.setItem("citySearched", JSON.stringify(storedCitiesArray));
}

//Checks if anything is in local storage and reloads them onto the page
function reloadLocalStorage() {
    if (citySearched === null) {
        return;
    }
    var storedCitiesString = localStorage.getItem("citySearched");
    var storedCitiesArray = JSON.parse(storedCitiesString) || [];
    
    for (var i = 0; i < storedCitiesArray.length; i++) {
        var cityEl = document.createElement("li");
        cityEl.textContent = storedCitiesArray[i];
        document.getElementById("cityList").appendChild(cityEl);
    }
}

function displayWeather(data) {
    var cityEl = document.getElementById("weatherWindow");
    var cityName = data.city.name;
    cityEl.append(cityName);

    var tempEl = document.getElementById("temp");
    var temp = data.list[0].main.temp;
    tempEl.append("Temp: " + temp + " °F");

    var humidityEl = document.getElementById("humidity");
    var humidity = data.list[0].main.humidity;
    humidityEl.append("Humidity: " + humidity + " %");
}

reloadLocalStorage();