var citySearched = [];

//Gets the user's input from the form and saves it to local storage
function getUserInput() {
    event.preventDefault();
    var cityInput = document.getElementById("city").value;
    addSearch(cityInput);
}

//Weather API call, testing this out
function getWeather() {
    fetch("api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=61653e3c08785e76f3c18d12e341aa0c")
        .then(function (response) {
            return response.json();
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
    storedCitiesArray = JSON.parse(storedCitiesString) || [];
    storedCitiesArray.push(cityName);
    localStorage.setItem("citySearched", JSON.stringify(storedCitiesArray));
}