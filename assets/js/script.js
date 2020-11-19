var myKey = config.MY_KEY;
var cityInputEl = document.querySelector("#city-search") // input bar element
var recentCityEl = document.querySelector("#recent-cities") //ul element 
var searchButtonEl = document.querySelector("#btn")

// fetch request to open weather
var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + myKey

fetch(apiUrl).then(function (response) {
    console.log(response)

    response.json().then(function (data) {
        console.log(data)
    })

});

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

var displayCity = function () {

    //create the li
    var cityHolderEl = document.createElement("li") // the li to be appended to ul
    cityHolderEl.classList = "list-group-item"; //class for li
    cityHolderEl.textContent = cityInputEl.value

    //append li to ul
    recentCityEl.appendChild(cityHolderEl);

}

searchButtonEl.addEventListener("click", displayCity);

