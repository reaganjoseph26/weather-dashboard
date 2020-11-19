var myKey = config.MY_KEY;
var cityInputEl = document.querySelector("#city-search") // input bar element
var recentCityEl = document.querySelector("#recent-cities") //ul element 
var searchButtonEl = document.querySelector("#btn")



//create a function that handles the error handling for a city search 
// var citySearchHnadler = function (event) {

//     /* prevents the browser from sending the form's input data to a URL, 
//    as we'll handle what happens with the form input data ourselves in JavaScript.
//    */
//     event.preventDeafault()

//     var city = cityInputEl.textContent

//     if (city) {
//         // cityInputEl.textContent = "" // clear out input 
//     }
//     else {
//         alert("Please enter a city.")
//     }

//     console.log(event)

// }

//display recent city searched to page under recents 

var displayCity = function (event) {
    event.preventDefault()

    // fetch request to open weather
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.value + "&appid=" + myKey

    fetch(apiUrl).then(function (response) {

        response.json().then(function (data) {

            var convertedDate = (new Date(data.dt * 1000));

            document.querySelector("#city-name").textContent = data.name + convertedDate.toDateString();
            console.log(new Date(data.dt * 1000))

            console.log(data.name);
            //create the li
            var cityHolderEl = document.createElement("li") // the li to be appended to ul
            cityHolderEl.classList = "list-group-item"; //class for li
            cityHolderEl.textContent = cityInputEl.value // set the li textcontent = to the content placed in the input bar

            //append li to ul
            recentCityEl.appendChild(cityHolderEl);

            console.log(data)
        })

    });

    var apiForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl.value + "&appid=" + myKey
    fetch(apiForecastUrl).then(function (response) {

        response.json().then(function (data) {


            var dayOneData = data.list[2]
            var dayTwoData = data.list[10]

            document.querySelector("#day1-date").textContent = (new Date(dayOneData.dt * 1000)).toDateString()
            document.querySelector("#day1-temp").textContent = "Temp: " + Math.floor((parseInt(dayOneData.main.temp) - 273.15) * 9/5 + 32) + " F";

            console.log(dayOneData)

            console.log(data)
        })

    });








}


searchButtonEl.addEventListener("click", displayCity)

