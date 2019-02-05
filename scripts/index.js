// UI Elements Module
// this module will be responsible for controlling UI elements like 'menu'
const UI = (function (){
    let menu = document.querySelector('#menu-container');

    // hides the loader and shows the main element
    const showApp = () => {
        document.querySelector('#app-loader')
            .classList.add('display-none');

        document.querySelector('main')
            .removeAttribute('hidden');
    };

    // hides main element and shows the loader
    const loadApp = () => {
        document.querySelector('#app-loader')
        .classList.remove('display-none');

    document.querySelector('main')
        .setAttribute('hidden', 'true');
    };

    // toggle the vertical menu
    // ===============================================
    const _showMenu = () => menu.style.right = 0;
    
    const _hideMenu = () => menu.style.right = '-65%';

    document.querySelector('#open-menu-btn')
        .addEventListener('click', _showMenu);

    document.querySelector('#close-menu-btn')
        .addEventListener('click', _hideMenu)
    // ===============================================

    // toggle hourly forecast panel
    // ===============================================
    const _toggleHourlyWeather = () => {
        let hourlyWeather = document.querySelector('#hourly-weather-wrapper'),
            visible = hourlyWeather.getAttribute('visible'),    
            arrow = document.querySelector('#toggle-hourly-weather').children[0],
            dailyweather = document.querySelector('#daily-weather-wrapper');

        if( visible == 'false'){
            hourlyWeather.setAttribute('visible', 'true');
            hourlyWeather.style.bottom = 0;
            arrow.style.transform = "rotate(180deg)";
            dailyweather.style.opacity = 0;
        } else if (visible == 'true'){
            hourlyWeather.setAttribute('visible', 'false');
            hourlyWeather.style.bottom = '-100%';
            arrow.style.transform = "rotate(0deg)";
            dailyweather.style.opacity = 1;
        } else {
            console.error("Unknown state of the hourly weather panel and visible attribute.");
        }
    }

    document.querySelector('#toggle-hourly-weather')    
        .addEventListener('click', _toggleHourlyWeather);


    const drawWeatherData = (data, location) => {
        console.log(data)
        console.log(location)

        let currentlyData = data.currently;

        // set city names in UI
        document.querySelectorAll('.location-label').forEach((element) => {
            element.innerHTML = location;
        })

        // // set bg image
        document.querySelector('main').style.backgroundImage = `url(./assets/images/bg-images/${currentlyData.icon}.jpg)`;

        //set icon
        document.querySelector('#currentlyIcon').setAttribute('src', `./assets/images/summary-icons/${currentlyData.icon}-white.png`);

        // // set temperature
        document.querySelector('#degrees-label').innerHTML = Math.round(currentlyData.temperature) + '&#176';

        // humidity
        document.querySelector('#humidity-label').innerHTML = Math.round(currentlyData.humidity * 100) + '%';

        // wind speed
        document.querySelector('#wind-speed-label').innerHTML = (currentlyData.windSpeed * 1.6093).toFixed(0) + ' kph';

        UI.showApp();
    };

    

    // ================================================

    // export functions outside the module
    return {
        showApp, 
        loadApp,
        drawWeatherData
    }

})();

// Get Location
// ============================================
const GETLOCATION = (function () {
    let location;
    const locationInput = document.querySelector('#location-input'),
            addCityBtn = document.querySelector('#add-city-btn');

    const _addCity = () => {
        location = locationInput.value;
        locationInput.value = "";
        addCityBtn.setAttribute('disabled', 'true');
        addCityBtn.classList.add('disabled');

        WEATHER.getWeather(location);
    }

    locationInput.addEventListener('input', function(){
        // "this" is the element that fired this event
        let inputText = this.value.trim();

        if(inputText != ''){
            addCityBtn.removeAttribute('disabled');
            addCityBtn.classList.remove('disabled')
        } else {
            addCityBtn.setAttribute('disabled', 'true');
            addCityBtn.classList.add('disabled');
        }
    })

    addCityBtn.addEventListener('click', _addCity);

})();

// Get Weather data
//this module will aquire weather data and then it will pass to another
//module which will put the data on UI
// ===================================================
const WEATHER = (function(){

    const darkSkyKey = '9f6ff95bc5e8490a724e4e8a95156cad',
          geoCoderKey = '74163634c7fd410fa608168e98436983';

    const _getGeocodeURL = (location) => `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${geoCoderKey}`;
    const _getDarkSkyURL = (lat, lng) => `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${darkSkyKey}/${lat},${lng}`;

    const _getDarkSkyData = (url, location) => {
        axios.get(url)
            .then((res) => {
                //console.log(res);

                UI.drawWeatherData(res.data, location);
            })
            .catch((err) => {
                console.log('err');
            });
    }


    const getWeather = (location) => {
        UI.loadApp();

        //get lat/lng from geoCodeAPI
        let geoCodeURL = _getGeocodeURL(location);

        //console.log('geoCodeURL: ' + geoCodeURL)
        axios.get(geoCodeURL)   
            .then((res) => {
                let lat = res.data.results[0].geometry.lat,
                    lng = res.data.results[0].geometry.lng;

                let darkSkyURL = _getDarkSkyURL(lat, lng);

                _getDarkSkyData(darkSkyURL, location);
            })
            .catch((err) => {
                console.err(err)
            })

    };

    return {
        getWeather
    }
    

})();

// Init
// ===================================================
window.onload = function () {
    UI.showApp();
}


