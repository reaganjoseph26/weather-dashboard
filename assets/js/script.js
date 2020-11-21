var myKey = config.MY_KEY;
var cityInputEl = document.querySelector("#city-search") // input bar element
var recentCityEl = document.querySelector("#recent-cities") //ul element for recent cities
var searchButtonEl = document.querySelector("#btn")
var currentWeatherEl = document.querySelector("#current-weather")// ul element for current weather 


var displayCity = function (event) {
    event.preventDefault()

    // fetch request to open weather
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.value + "&appid=" + myKey

    fetch(apiUrl).then(function (response) {

        response.json().then(function (data) {

            console.log(data)

            //create li element for current temp

            var currentTemp = document.createElement("li")
            currentTemp.textContent = "Temperture: " +  Math.floor((parseInt(data.main.temp) - 273.15) * 9 / 5 + 32) + " F";
            // currentTemp.classList = ".li"

            //create li element for current humidity

            var currentHum = document.createElement("li")
            currentHum.textContent = "Humidity: " + data.main.humidity + "%"

            //create li element for current wind speed

            var currentWindSpeed = document.createElement("li")
            currentWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH"

            //create li element for current UV index
            var currentUvIndex = document.createElement("li")
            currentUvIndex.textContent = "UV Index: "

            //append current weather conidtions to ul

            currentWeatherEl.appendChild(currentTemp)
            currentWeatherEl.appendChild(currentHum)
            currentWeatherEl.appendChild(currentWindSpeed)
            currentWeatherEl.appendChild(currentUvIndex);

            

            var convertedDate = (new Date(data.dt * 1000));


            document.querySelector("#city-name").textContent = data.name + " " + convertedDate.toLocaleDateString();
            console.log(new Date(data.dt * 1000))

            console.log(data.name);
            //create the li
            var cityHolderEl = document.createElement("li") // the li to be appended to ul
            cityHolderEl.classList = "list-group-item"; //class for li
            cityHolderEl.textContent = cityInputEl.value // set the li textcontent = to the content placed in the input bar
            var cityInfo = document.createElement("a") //make history li elements link to data of that city
            cityInfo.setAttribute = ("href", cityInputEl.value.data);

            //append a element to li
            cityHolderEl.appendChild(cityInfo);

            //append li to ul
            recentCityEl.appendChild(cityHolderEl);

            console.log(data)
        })

    });



    //5 day forecast Cards

    var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl.value + "&appid=" + myKey
    fetch(apiForecastUrl).then(function (response) {

        response.json().then(function (data) {


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

