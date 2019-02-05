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
        .addEventListener('click', _toggleHourlyWeather)
    // ================================================

    // export functions outside the module
    return {
        showApp, 
        loadApp
    }

})();

// Get Location
// ============================================
const GETLOCATION = (function () {
    let location;
    const locationInput = document.querySelector('#location-input'),
            addCityBtn = document.querySelector('#add-city-btn');

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

        console.log(inputText);
    })
})();

// Init
// ============================================
window.onload = function () {
    UI.showApp();
}


