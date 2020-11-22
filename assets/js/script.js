var myKey = config.MY_KEY;
var cityInputEl = document.querySelector("#city-search") // input bar element
var recentCityEl = document.querySelector("#recent-cities") //ul element for recent cities
var searchButtonEl = document.querySelector("#btn")
var currentWeatherEl = document.querySelector("#current-weather")// ul element for current weather 

var displayCity = function (event) {

    event.preventDefault()

    // fetch request to open weather for current city conditions
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.value + "&appid=" + myKey

    fetch(apiUrl).then(function (response) {


        response.json().then(function (data) {

            console.log("Original", data)

            // For city history searches. Appended button elements after city is searched 

            //create the buuton
            var cityHolderEl = document.createElement("button") // the button to be appended to ul
            cityHolderEl.classList = "list-group-item"; //class for button
            cityHolderEl.setAttribute("style", "text-align: left;")

            // make appended button return data
            cityHolderEl.addEventListener("click", function (event) {

                cityInputEl.value = event.target.innerHTML
                //then run display city function
                displayCity(event)

            })

            cityHolderEl.textContent = cityInputEl.value // set the li textcontent = to the content placed in the input bar

            //append button to ul
            recentCityEl.appendChild(cityHolderEl);

            cityInputEl.value = ""

            // Current date 
            var convertedDate = (new Date(data.dt * 1000))
            document.querySelector("#city-name").textContent = data.name + " " + "(" + convertedDate.toLocaleDateString() + ")";

            // create img element for current weather icon
            var currentIcon = document.createElement("img")
            currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")

            currentWeatherEl.innerHTML = ""
            currentWeatherEl.appendChild(currentIcon)



            //create li element for current temp

            var currentTemp = document.createElement("li")
            currentTemp.textContent = "Temperture: " + Math.floor((parseInt(data.main.temp) - 273.15) * 9 / 5 + 32) + " F";
            currentTemp.className = "custom-class";

            //create li element for current humidity

            var currentHum = document.createElement("li")
            currentHum.textContent = "Humidity: " + data.main.humidity + "%"
            currentHum.className = "custom-class";

            //create li element for current wind speed

            var currentWindSpeed = document.createElement("li")
            currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH"
            currentWindSpeed.className = "custom-class";

            //append current weather conidtions to ul

            currentWeatherEl.appendChild(currentTemp)
            currentWeatherEl.appendChild(currentHum)
            currentWeatherEl.appendChild(currentWindSpeed)



            var coordLat = data.coord.lat
            var coordLon = data.coord.lon

            //NESTED API CALL FOR LATTITUDE AND LONGITUDE

            return fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + coordLat + "&lon=" + coordLon + "&appid=" + myKey)

        })
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {

                console.log("UVI", response)

                //create li element for current UV index
                var currentUvIndex = document.createElement("li")
                currentUvIndex.textContent = "UV Index: " + response.value
                currentUvIndex.className = "custom-class";
                currentUvIndex.setAttribute("style", "background-color: red")

                currentWeatherEl.appendChild(currentUvIndex);



            })

    });




    //5 day forecast Cards

    var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl.value + "&appid=" + myKey
    fetch(apiForecastUrl).then(function (response) {

        response.json().then(function (data) {

            console.log(data)

            //each day data set in array for morning
            var dayOneData = data.list[2]
            var dayTwoData = data.list[10]
            var dayThreeData = data.list[18]
            var dayFourData = data.list[24]
            var dayFiveData = data.list[32]

            document.querySelector("#day1-date").textContent = (new Date(dayOneData.dt * 1000)).toLocaleDateString()
            document.querySelector("#day1-temp").textContent = "Temp: " + Math.floor((parseInt(dayOneData.main.temp) - 273.15) * 9 / 5 + 32) + " F";
            document.querySelector("#day1-hum").textContent = "Humidity: " + dayOneData.main.humidity + "%";

            document.querySelector("#day2-date").textContent = (new Date(dayTwoData.dt * 1000)).toLocaleDateString()
            document.querySelector("#day2-temp").textContent = "Temp: " + Math.floor((parseInt(dayTwoData.main.temp) - 273.15) * 9 / 5 + 32) + " F";
            document.querySelector("#day2-hum").textContent = "Humidity: " + dayTwoData.main.humidity + "%";

            document.querySelector("#day3-date").textContent = (new Date(dayThreeData.dt * 1000)).toLocaleDateString()
            document.querySelector("#day3-temp").textContent = "Temp: " + Math.floor((parseInt(dayThreeData.main.temp) - 273.15) * 9 / 5 + 32) + " F";
            document.querySelector("#day3-hum").textContent = "Humidity: " + dayThreeData.main.humidity + "%";

            document.querySelector("#day4-date").textContent = (new Date(dayFourData.dt * 1000)).toLocaleDateString()
            document.querySelector("#day4-temp").textContent = "Temp: " + Math.floor((parseInt(dayFourData.main.temp) - 273.15) * 9 / 5 + 32) + " F";
            document.querySelector("#day4-hum").textContent = "Humidity: " + dayFourData.main.humidity + "%";

            document.querySelector("#day5-date").textContent = (new Date(dayFiveData.dt * 1000)).toLocaleDateString()
            document.querySelector("#day5-temp").textContent = "Temp: " + Math.floor((parseInt(dayFiveData.main.temp) - 273.15) * 9 / 5 + 32) + " F";
            document.querySelector("#day5-hum").textContent = "Humidity: " + dayFiveData.main.humidity + "%";

            console.log(data)

        })

    });

}

searchButtonEl.addEventListener("click", displayCity)


// var populateCity = (response) => {
//     var convertedDate = (new Date(data.dt * 1000))
//     document.querySelector("#city-name").textContent = data.name + " " + "(" + convertedDate.toLocaleDateString() + ")";

//     //create li element for current temp

//     var currentTemp = document.createElement("li")
//     currentTemp.textContent = "Temperture: " + Math.floor((parseInt(data.main.temp) - 273.15) * 9 / 5 + 32) + " F";
//     currentTemp.className = "custom-class";

//     //create li element for current humidity

//     var currentHum = document.createElement("li")
//     currentHum.textContent = "Humidity: " + data.main.humidity + "%"
//     currentHum.className = "custom-class";

//     //create li element for current wind speed

//     var currentWindSpeed = document.createElement("li")
//     currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH"
//     currentWindSpeed.className = "custom-class";

//     //append current weather conidtions to ul

//     currentWeatherEl.appendChild(currentTemp)
//     currentWeatherEl.appendChild(currentHum)
//     currentWeatherEl.appendChild(currentWindSpeed);

//     var currentUvIndex = document.createElement("li")
//         currentUvIndex.textContent = "UV Index: " + response.value
//         currentUvIndex.className = "custom-class";
//         currentUvIndex.setAttribute("style", "background-color: red")

//         currentWeatherEl.appendChild(currentUvIndex);
// };


// // create img element for current weather icon
// var currentIcon = document.createElement("img")
// currentIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")

// currentWeatherEl.appendChild(currentIcon)


// var coordLat = data.coord.lat
// var coordLon = data.coord.lon

// //NESTED API CALL FOR LATTITUDE AND LONGITUDE

// return fetch("http://api.openweathermap.org/data/2.5/uvi?lat=" + coordLat + "&lon=" + coordLon + "&appid=" + myKey)

// })
// .then(function (response) {
//     return response.json();
// })
//     .then(function (response) {

//         console.log(response)

//         //create li element for current UV index




//     })

