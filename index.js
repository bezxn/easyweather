'use strict';

//Weather Data
const weather = {};

//Element Declarations
let searchBox = document.querySelectorAll('.search-box input[type="text"] + span');
let searchResults = document.querySelector('.search-results');
const temperatureValue = document.querySelector('.temperature-value h1');
const weatherDescription = document.querySelector('.weather-description h3');
const resultsBox = document.querySelector('.results-box');
const weatherIcon = document.querySelector('.weather-icon');

//Checks If Search Is Active
var searchActive = false;

//Hides Results Box Initially
window.addEventListener('load', (event) => {
    resultsBox.style.display = "none";
});
//Triggers Searchbox Animation
searchBox.forEach(elm => {
  elm.addEventListener('click', () => {
    elm.previousElementSibling.value = '';
  });
});

//When Enter Is Pressed & Search Begins
window.addEventListener('keypress', (e) => {
    //Value In Searchbox
    var searchTerm = document.getElementById('search-term').value;

    //API Call Setup
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const api = proxy + 'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&appid=c5f8d69e0219cdba3d5d634efa573008';

    //Checks If Searchbox Value Is Valid
    if ((e.keyCode == 13) && (searchTerm !== "") && (searchActive == false)) {
        searchActive = true;
        searchResults.innerText = "Searching now..."

        //Fetches & Processes Weather Data
        fetch(api)
            .then(response => {
                let data = response.json();
                return data;
            })
            .then(data => {
                if (data.cod === '404') {
                    searchResults.innerText = 'Incorrect city, please try again.';
                    resultsBox.style.display = "none";
                } else {
                    weather.temperature = Math.floor(data.main.temp - 273);
                    weather.description = data.weather[0].description;
                    weather.iconID = data.weather[0].icon;
                    weather.city = data.name;
                    weather.country = data.sys.country;

                    var icon = data.weather.icon;
                    console.log(weather.iconID);

                    printWeather();
                    resultsBox.style.display = "block";
                }

                searchActive = false;
            });
    }

    function printWeather() {
        searchResults.innerText = weather.city + ', ' + weather.country;
        weatherIcon.src = `icons/${weather.iconID}.png`;
        temperatureValue.innerHTML = weather.temperature + '°c';
        weatherDescription.innerHTML = weather.description;
    }

})

