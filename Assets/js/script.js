var apiKey = 'e938f1f3684e6e6a9c9fd066694773d2'
var cityInput = document.getElementById('cityInput')
var cityButton = document.getElementById('cityButton')
var currentStatus = document.getElementById('current')
var selectedCity = ''
var coordinatesURL = ''
var cityLat = ''
var cityLon = ''
var oneCallUrl = ''
var currentWeather
var currentDate = moment().format('l')


function ingestCityInput(event) {
    event.preventDefault();
    console.log(event);
    console.log(cityInput.value)
    selectedCity = cityInput.value
    coordinatesURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + selectedCity + '&appid=' + apiKey

    fetch(coordinatesURL)
    .then(function(response){
    console.log(response);
    return response.json();
    })
    .then(function(data){
        console.log('success');
        console.log(data[0]);
        cityLat = data[0].lat;
        cityLon = data[0].lon;
        oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLon + '&appid=' + apiKey

        fetch(oneCallUrl)
        .then(function(response){
            console.log('success2');
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data.current.weather[0])
            currentWeather = data.current.weather[0]
            console.log(currentWeather.icon)

            var currentStatusHeader = document.createElement('div');
            currentStatus.appendChild(currentStatusHeader);
    
            currentStatusHeader.textContent = currentWeather.icon
        })

    })

}

cityButton.addEventListener('click', ingestCityInput)
