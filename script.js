const previousSearches = []

function CitySearch() {
    console.log("Start City Search")
    var searchValue = $("#SearchBox").val()
    console.log(searchValue)

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&units=imperial&appid=b0b733324ac9a7ea30d814fbb41a75d7";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //check if we have searched this city before, if not prepend to UL
        if (previousSearches.includes(searchValue) === false) {
            $(".CityList").prepend('<li onclick="CitySearch()"><a href="#">' + searchValue + '</a></li>'); ''
            var span = $("<span>")
            span.text(moment(response.dt, "X").format(" (MM/DD/YYYY) "))
            var iconurl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var img = $("<img>").attr("src", iconurl)
            $(".display-4").empty()
            $(".display-4").append(response.name, span, img)
            $(".temperature").text("Current Temperature " + response.main.temp)
            $(".humidity").text("Humidity " + response.main.humidity + "%")
            $(".windSpeed").text("Wind Speed " + response.wind.speed + "mph")

            previousSearches.push(searchValue)
        }
        console.log("Array: ", previousSearches)
        console.log("Boolean:" + previousSearches.includes(searchValue))
        console.log(response.coord)
        GetUV(response.coord.lat, response.coord.lon)
      

    });

    getForecast(searchValue)
}


function GetUV(x, y) {
    console.log("start GetUV")
    console.log(x)
    console.log(y)
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + x + "&lon=" + y + "&appid=b0b733324ac9a7ea30d814fbb41a75d7";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".uvIndex").text("UV Index " + response[0].value)
    });
}


function getForecast(x) {
    console.log("start getForecast()")

    console.log(x)

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + x + "&units=imperial&appid=b0b733324ac9a7ea30d814fbb41a75d7";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response.list.length);
        for (var i = 0; i < 40; i++) {
            console.log(response.list[i])
          //  if (response.list[i].dt_txt.indexOf("00:00:00")>-1) {
                console.log(response.list[i])
                var card = $("<div class = 'card'>")
                var cardBody = $("<div class= 'card-body'")
                var h3 = $("<h3>").text(moment(response.list[i].dt, "X").format("MM/DD/YYYY"))
                console.log(h3)
                cardBody.append(h3)
                card.append(cardBody)
                $(".cardDiv").append(card)
          //  }

        }

    });

}
