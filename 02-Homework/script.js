const searchBar = $("#search-btn")
var value = $('input')
var cityName = ''
value.keyup(function(){
    cityName = $(this).val();
})
.keyup();
var cityBtn = $('tr')

// Search button Click
searchBar.click(function(){

    $('#searched-table').find('tbody')
        .prepend($('<tr>')
            .append($('<td>')
                .attr('scope', 'col')
                .text(cityName.charAt(0).toUpperCase() + cityName.slice(1))
            )
        );
    searchCity();
})

// City Name Click
cityBtn.click(function(){
    cityName = this.innerText;
    searchCity();
})

// Render Cities
// function renderLast(){
//     var table = localStorage.getItem('table')
//     if (!table){
//         return;
//     }

// }


function searchCity(){

    const googleApiKey = 'AIzaSyDD5EjTHnfBKpq1A_fuKH-PG5QswdpLyms';
    
    var locationApi = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${googleApiKey}`


    fetch(locationApi).then(function (response){
        response.json().then(function(data){
            var lat = data.results[0].geometry.location.lat
            var long = data.results[0].geometry.location.lng

            const apiKey = '4b60807a2d5de5468cd9ed75afb235bb';

            var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`

            fetch(url).then(function(urlResponse){
                urlResponse.json().then(function(urlData){

                    // Weather icons

                    // Current
                    var todayWeatherId = urlData.current.weather[0].icon
                    var todayIcon = 'http://openweathermap.org/img/wn/' + todayWeatherId + '@2x.png'
                    
                    // Day 1
                    var day1WeatherId = urlData.daily[1].weather[0].icon
                    var day1Icon = 'http://openweathermap.org/img/wn/' + day1WeatherId + '@2x.png'
                    // Day 2
                    var day2WeatherId = urlData.daily[2].weather[0].icon
                    var day2Icon = 'http://openweathermap.org/img/wn/' + day2WeatherId + '@2x.png'
                    // Day 3
                    var day3WeatherId = urlData.daily[3].weather[0].icon
                    var day3Icon = 'http://openweathermap.org/img/wn/' + day3WeatherId + '@2x.png'
                    // Day 4
                    var day4WeatherId = urlData.daily[4].weather[0].icon
                    var day4Icon = 'http://openweathermap.org/img/wn/' + day4WeatherId + '@2x.png'
                    // Day 5
                    var day5WeatherId = urlData.daily[5].weather[0].icon
                    var day5Icon = 'http://openweathermap.org/img/wn/' + day5WeatherId + '@2x.png'

                    // Getting unix code of the daily forecast
                    var todayUnix = urlData.daily[0].dt
                    var day1Unix = urlData.daily[1].dt
                    var day2Unix = urlData.daily[2].dt
                    var day3Unix = urlData.daily[3].dt
                    var day4Unix = urlData.daily[4].dt
                    var day5Unix = urlData.daily[5].dt

                    // Converting unix to dates
                    var todayDate = moment.unix(todayUnix).format('MM/DD/YYYY')
                    var day1Date = moment.unix(day1Unix).format('MM/DD/YYYY')
                    var day2Date = moment.unix(day2Unix).format('MM/DD/YYYY')
                    var day3Date = moment.unix(day3Unix).format('MM/DD/YYYY')
                    var day4Date = moment.unix(day4Unix).format('MM/DD/YYYY')
                    var day5Date = moment.unix(day5Unix).format('MM/DD/YYYY')

                    // Getting Temp

                    // Current
                    var currentTemp = urlData.current.temp
                    // Day 1
                    var day1Temp = urlData.daily[1].temp.day
                    // Day 2
                    var day2Temp = urlData.daily[2].temp.day
                    // Day 3
                    var day3Temp = urlData.daily[3].temp.day
                    // Day 4
                    var day4Temp = urlData.daily[4].temp.day
                    // Day 5
                    var day5Temp = urlData.daily[5].temp.day

                    // Humidity

                    // Current
                    var currentHumidity = urlData.current.humidity
                    // Day 1
                    var day1Humidity = urlData.daily[1].humidity
                    // Day 2
                    var day2Humidity = urlData.daily[2].humidity
                    // Day 3
                    var day3Humidity = urlData.daily[3].humidity
                    // Day 4
                    var day4Humidity = urlData.daily[4].humidity
                    // Day 5
                    var day5Humidity = urlData.daily[5].humidity

                    // Rest of Current Day
                    // Wind
                    var currentWind = urlData.current.wind_speed
                    // UV Index
                    var currentUV = urlData.current.uvi

                    // Put the data on the page

                    // Current Day
                    $('#searched-city').text(cityName.charAt(0).toUpperCase() + cityName.slice(1) + ' (' + todayDate + ')  ')
                    $('#wicon').attr('src', todayIcon)
                    $('#current-temp').text('Temperature: ' + currentTemp + ' °F')
                    $('#current-humidity').text('Humidity: ' + currentHumidity + '%')
                    $('#current-wind').text('Wind Speed: ' + currentWind + ' MPH')
                    $('#current-uv').text('UV Index: ' + currentUV)
                    if (currentUV < 3){
                        $('#current-uv').attr('class', "bg-success text-light rounded")
                    }else if(currentUV < 6){
                        $('#current-uv').attr('class', "bg-warning text-dark rounded")
                    }else if(currentUV < 10){
                        $('#current-uv').attr('class', "bg-danger text-light rounded")
                    }else{
                        $('#current-uv').attr('class', "bg-dark text-light rounded")
                    }

                    // Day 1
                    $('#day1-date').text(day1Date)
                    $('#day1-icon').attr('src', day1Icon)
                    $('#day1-temp').text('Temp: ' + day1Temp + ' °F')
                    $('#day1-humidity').text('Humidity: ' + day1Humidity + '%')
                    // Day 2
                    $('#day2-date').text(day2Date)
                    $('#day2-icon').attr('src', day2Icon)
                    $('#day2-temp').text('Temp: ' + day2Temp + ' °F')
                    $('#day2-humidity').text('Humidity: ' + day2Humidity + '%')
                    // Day 3
                    $('#day3-date').text(day3Date)
                    $('#day3-icon').attr('src', day3Icon)
                    $('#day3-temp').text('Temp: ' + day3Temp + ' °F')
                    $('#day3-humidity').text('Humidity: ' + day3Humidity + '%')
                    // Day 4
                    $('#day4-date').text(day4Date)
                    $('#day4-icon').attr('src', day4Icon)
                    $('#day4-temp').text('Temp: ' + day4Temp + ' °F')
                    $('#day4-humidity').text('Humidity: ' + day4Humidity + '%')
                    // Day 5
                    $('#day5-date').text(day5Date)
                    $('#day5-icon').attr('src', day5Icon)
                    $('#day5-temp').text('Temp: ' + day5Temp + ' °F')
                    $('#day5-humidity').text('Humidity: ' + day5Humidity + '%')

                })
            })
        
            
        });
    });
    
};