
// MY API WEATHER KEY 00f5a66c771c6fc77435970961446486

// API call site https://api.openweathermap.org/data/2.5/weather?q=



// CURRENT WEATHER LINK for API https://openweathermap.org/current


getItems();

function getData() {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=00f5a66c771c6fc77435970961446486"
    mainCard.empty();
    $("#weeklyForecast").empty();

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (response) {
        var date = moment().format(" L,  LT");
        var iconCode = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
        var name = $("<h2>").html(city + date);
        mainCard.prepend(name);
        mainCard.append($("<img>").attr("src", iconURL));
        var temp = Math.round((response.main.temp - 273.15) * 1.80 + 32);
        mainCard.append($("<p>").html("Temperature: " + temp + " &#8457"));
        var humidity = response.main.humidity;
        mainCard.append($("<p>").html("Humidity:" + humidity));
        var windSpeed = response.wind.speed;
        mainCard.append($("<p>").html("Wind Speed:" + windSpeed));

        // 5 DAY FORECAST LINK for API https://openweathermap.org/forecast5


        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=00f5a66c771c6fc77435970961446486",
            method: "GET"

        }).then(function (response) {
            for (i = 0; i < 5; i++) {

                var newRow = $("<div>").attr("class", "col bg-primary text-white");
                $("#weeklyForecast").append(newRow);
                var myDate = new Date(response.list[i * 8].dt * 1000);
                newRow.append($("<h4>").html(myDate.toLocaleDateString()));
                var iconCode = response.list[i * 8].weather[0].icon;
                var iconURL = "http://openweathermap.org/img/w/" + iconCode + ".png";
                newRow.append($("<img>").attr("src", iconURL));
                var temp = Math.round((response.list[i * 8].main.temp - 273.15) * 1.80 + 32);
                newRow.append($("<p>").html("Temp: " + temp + " &#8457"));
                var humidity = response.list[i * 8].main.humidity;
                newRow.append($("<p>").html("Humidity:" + humidity));
                var windSpeed = response.list[i * 8].main.windSpeed;
                newRow.append($("<p>").html("Wind Speed:" + windSpeed));

            }
        })
    })
};

var searchHistory = [];
var city;
var mainCard = $(".card-body");


function getItems() {
    var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedCities !== null) {
        searchHistory = storedCities;
    };

    for (i = 0; i < searchHistory.length; i++) {
        if (i == 8) {
            break;
        }

        cityListButton = $("<a>").attr({
            class: "list-group-item list-group-item-action",

            href: "#"
        });

        cityListButton.text(searchHistory[i]);
        $(".list-group").append(cityListButton);
    }
};

$("#searchCity").click(function () {
    city = $("#city").val();
    getData();
    var checkArray = searchHistory.includes(city);
    if (checkArray == true) {
        return
    }
    else {
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        var priorSearchButton = $("<a>").attr({

            class: "list-group-item list-group-item-action",
            href: "#"
        });
        priorSearchButton.text(city);
        $(".list-group").append(priorSearchButton);
    };
});

$(".list-group-item").click(function () {
    city = $(this).text();
    getData();
});


// Resources
// https://getbootstrap.com/docs/5.0/layout/containers/
// jquery and AJax
// https://api.jquery.com/jquery.get/
// https://www.w3schools.com/xml/ajax_intro.asp
// https://stackoverflow.com/questions/23201518/ajax-call-to-hit-a-url
// https://www.codeproject.com/Questions/1227078/How-do-I-save-ajax-response-to-global-variable-for
// for icon adding
// https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
// videos watched
// https://www.youtube.com/watch?v=KqZGuzrY9D4
// https://www.youtube.com/watch?v=Oive66jrwBs
// https://www.youtube.com/watch?v=82hnvUYY6QA
