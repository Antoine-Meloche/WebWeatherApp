const mapBtn = document.querySelector('.map');
const mapBox = document.querySelector('.mapBox');
const closeMap = document.querySelector('.closeMap');
const menuBtn = document.querySelector('.menu-btn');
const topMenu = document.querySelector('#top-menu');
const middleMenu = document.querySelector('#middle-menu');
const bottomMenu = document.querySelector('#bottom-menu');
const nav = document.querySelector('nav');
const main = document.querySelector('main');
const settingsBtn = document.querySelector('.settings-btn');
const autoLocationBtn = document.querySelector('.auto-location');
const locationInput = document.querySelector('.locationInput');
const weatherForecast = document.querySelector('.weather-forecast');
const options = document.querySelector('.options');
const windBtn0 = document.querySelector('.wind-unit-btn-0');
const windBtn1 = document.querySelector('.wind-unit-btn-1');
const windBtn2 = document.querySelector('.wind-unit-btn-2');
const windUnit0 = document.querySelector('.wind-unit-0');
const windUnit1 = document.querySelector('.wind-unit-1');
const windUnit2 = document.querySelector('.wind-unit-2');
const temperatureBtn0 = document.querySelector('.temperature-unit-btn-0');
const temperatureBtn1 = document.querySelector('.temperature-unit-btn-1');
const temperatureUnit0 = document.querySelector('.temperature-unit-0');
const temperatureUnit1 = document.querySelector('.temperature-unit-1');
const precipBtn0 = document.querySelector('.precip-unit-btn-0');
const precipBtn1 = document.querySelector('.precip-unit-btn-1');
const precipUnit0 = document.querySelector('.precip-unit-0');
const precipUnit1 = document.querySelector('.precip-unit-1');
const distanceBtn0 = document.querySelector('.distance-unit-btn-0');
const distanceBtn1 = document.querySelector('.distance-unit-btn-1');
const distanceUnit0 = document.querySelector('.distance-unit-0');
const distanceUnit1 = document.querySelector('.distance-unit-1');
const iconsOrTextBtn0 = document.querySelector('.icons-or-text-btn-0');
const iconsOrTextBtn1 = document.querySelector('.icons-or-text-btn-1');
const iconsOrTextUnit0 = document.querySelector('.icons-or-text-0');
const iconsOrTextUnit1 = document.querySelector('.icons-or-text-1');
const reloadBtn = document.querySelector('.reload');
const navDirection = document.querySelector('.nav-direction');
const themeChangerBtn = document.querySelector('.theme-changer');
const themeChangerIcon = document.querySelector('.theme-changer > img');
const themeChangerIcon2 = document.querySelector('.theme-changer > img.full');
const style = document.querySelector('style');
const mapIcon = document.querySelector('.map > img');
const autoLocationIcon = document.querySelector('.auto-location > img');

function handleResize() {
  if (window.innerWidth < 620) {
    locationInput.placeholder = 'Search';
  } else {
    locationInput.placeholder = 'Search location';
  }
}

window.addEventListener('resize', handleResize);

menuBtn.onclick = () => {
  if (nav.classList.contains('minimized')) {
    topMenu.style =
      '-webkit-transform: translateY(0.5rem) rotateZ(45deg);-moz-transform: translateY(0.5rem) rotateZ(45deg);-ms-transform: translateY(0.5rem) rotateZ(45deg);-o-transform: translateY(0.5rem) rotateZ(45deg);transform: translateY(0.5rem) rotateZ(45deg);';
    middleMenu.style = 'width: 0';
    bottomMenu.style =
      '-webkit-transform: translateY(-0.5rem) rotateZ(-45deg);-moz-transform: translateY(-0.5rem) rotateZ(-45deg);-ms-transform: translateY(-0.5rem) rotateZ(-45deg);-o-transform: translateY(-0.5rem) rotateZ(-45deg);transform: translateY(-0.5rem) rotateZ(-45deg);';
    navDirection.style.transform = 'rotate(360deg) scale(0)';
  } else {
    topMenu.style = '';
    middleMenu.style = '';
    bottomMenu.style = '';
    navDirection.style = '';
  }
  nav.classList.toggle('minimized');
  nav.classList.remove('expand-options');
  options.classList.add('hiddenBoxH');
};

main.onclick = () => {
  nav.classList.add('minimized');
  nav.classList.remove('expand-options');
  options.classList.add('hiddenBoxH');
  topMenu.style = '';
  middleMenu.style = '';
  bottomMenu.style = '';
  navDirection.style = '';
};

reloadBtn.onclick = () => {
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
    reloadBtn.classList.add('rotate');
    setTimeout(() => {
      reloadBtn.classList.remove('rotate');
    }, 1000);
  }
};

mapBtn.onclick = () => {
  mapBox.classList.remove('hiddenBox');
};

closeMap.onclick = () => {
  mapBox.classList.add('hiddenBox');
};

themeChangerBtn.onclick = () => {
  if (theme === 'dark') {
    setLightTheme();
  } else {
    setDarkTheme();
  }
};

windUnit0.onclick = () => checkWindBtns(0);
windUnit1.onclick = () => checkWindBtns(1);
windUnit2.onclick = () => checkWindBtns(2);

temperatureUnit0.onclick = () => checkTemperatureBtns(0);
temperatureUnit1.onclick = () => checkTemperatureBtns(1);

precipUnit0.onclick = () => checkPrecipBtns(0);
precipUnit1.onclick = () => checkPrecipBtns(1);

distanceUnit0.onclick = () => checkDistanceBtns(0);
distanceUnit1.onclick = () => checkDistanceBtns(1);

iconsOrTextUnit0.onclick = () => checkIconsOrTextBtns(0);
iconsOrTextUnit1.onclick = () => checkIconsOrTextBtns(1);

settingsBtn.onclick = () => {
  options.classList.toggle('hiddenBoxH');
  nav.classList.toggle('expand-options');
};

autoLocationBtn.onclick = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setLocationFromCoords);
  }
};

var windUnit;
var temperatureUnit;
var precipUnit;
var distanceUnit;
var iconsOrText;
var theme;

if (
  localStorage.getItem('theme') === 'dark' ||
  localStorage.getItem('theme') === 'light'
) {
  theme = localStorage.getItem('theme');
} else {
  theme = 'light';
}

if (
  localStorage.getItem('windUnit') === 'kph' ||
  localStorage.getItem('windUnit') === 'mph' ||
  localStorage.getItem('windUnit') === 'kt'
) {
  windUnit = localStorage.getItem('windUnit');
} else {
  windUnit = 'kph';
}

if (
  localStorage.getItem('temperatureUnit') === 'c' ||
  localStorage.getItem('temperatureUnit') === 'f'
) {
  temperatureUnit = localStorage.getItem('temperatureUnit');
} else {
  temperatureUnit = 'c';
}

if (
  localStorage.getItem('precipUnit') === 'mm' ||
  localStorage.getItem('precipUnit') === 'in'
) {
  precipUnit = localStorage.getItem('precipUnit');
} else {
  precipUnit = 'mm';
}

if (
  localStorage.getItem('distanceUnit') === 'km' ||
  localStorage.getItem('distanceUnit') === 'mi'
) {
  distanceUnit = localStorage.getItem('distanceUnit');
} else {
  distanceUnit = 'km';
}

if (
  localStorage.getItem('iconsOrText') === 'icons' ||
  localStorage.getItem('iconsOrText') === 'text'
) {
  iconsOrText = localStorage.getItem('iconsOrText');
} else {
  iconsOrText = 'icons';
}

if (localStorage.getItem('location')) {
  locationName = localStorage.getItem('location');
}

function setLocationFromCoords(position) {
  let request = new XMLHttpRequest();
  request.open(
    'GET',
    `http://127.0.0.1:3001/api?apiType=search&q=${position.coords.latitude}, ${position.coords.longitude}`,
  );
  request.send();
  request.onload = () => {
    if (request.status === 200) {
      locationInput.value = JSON.parse(request.response)[0]['name'];
      getWeather(JSON.parse(request.response)[0]['name']);
    }
  };
}

if (windUnit === 'mph') {
  setMphWind();
  checkWindBtns(1);
}

if (windUnit === 'kt') {
  setKtWind();
  checkWindBtns(2);
}

if (temperatureUnit === 'f') {
  setFTemp();
  checkTemperatureBtns(1);
}

if (precipUnit === 'in') {
  setInPrecip();
  checkPrecipBtns(1);
}

if (distanceUnit === 'miles') {
  setMiDistance();
  checkDistanceBtns(1);
}

if (iconsOrText === 'text') {
  setText();
  checkIconsOrTextBtns(1);
}

if (theme === 'dark') {
  setDarkTheme();
}

function setDarkTheme() {
  setThemePreference('dark');
  themeChangerIcon.src = './imgs/sun.svg';
  themeChangerIcon2.src = './imgs/sun-full.svg';
  mapIcon.src = './imgs/map-white.svg';
  autoLocationIcon.src = './imgs/map-pin-white.svg';
  theme = 'dark';
  style.innerHTML =
    ':root {--main-bg-color: #202020;--nav-bg-color: #404040;--unit-indicator-bg-color: #666666;--unit-indicator-hover-color: #748fbb;--active-bg-color: #1e5dc2;--weather-div-bg-color: #404040;--weather-alert-bg-color: #eb4511;--map-bg-color: #adad47;--main-color: white;--secondary-color: black;}';
  themeChangerBtn.title = 'Light Theme';
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
  }
}

function setLightTheme() {
  setThemePreference('light');
  themeChangerIcon.src = './imgs/moon.svg';
  themeChangerIcon2.src = './imgs/moon-full.svg';
  mapIcon.src = './imgs/map.svg';
  autoLocationIcon.src = './imgs/map-pin.svg';
  theme = 'light';
  style.innerHTML = '';
  themeChangerBtn.title = 'Dark Theme';
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
  }
}

function setThemePreference(theme) {
  if (theme === 'dark') {
    localStorage.setItem('theme', 'dark');
  } else if (theme === 'light') {
    localStorage.setItem('theme', 'light');
  }
}

function setKphWind() {
  localStorage.setItem('windUnit', 'kph');
  windUnit = 'kph';
}

function setMphWind() {
  localStorage.setItem('windUnit', 'mph');
  windUnit = 'mph';
}

function setKtWind() {
  localStorage.setItem('windUnit', 'kt');
  windUnit = 'kt';
}

function setCTemp() {
  localStorage.setItem('temperatureUnit', 'c');
  temperatureUnit = 'c';
}

function setFTemp() {
  localStorage.setItem('temperatureUnit', 'f');
  temperatureUnit = 'f';
}

function setMmPrecip() {
  localStorage.setItem('precipUnit', 'mm');
  precipUnit = 'mm';
}

function setInPrecip() {
  localStorage.setItem('precipUnit', 'in');
  precipUnit = 'in';
}

function setKmDistance() {
  localStorage.setItem('distanceUnit', 'km');
  distanceUnit = 'km';
}

function setMiDistance() {
  localStorage.setItem('distanceUnit', 'miles');
  distanceUnit = 'miles';
}

function setIcons() {
  localStorage.setItem('iconsOrText', 'icons');
  iconsOrText = 'icons';
}

function setText() {
  localStorage.setItem('iconsOrText', 'text');
  iconsOrText = 'text';
}

locationInput.onkeyup = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    if (locationInput.value !== '') {
      getWeather(locationInput.value);
      locationName = locationInput.value;
      localStorage.setItem('location', locationInput.value);
    }
  }
};

locationInput.onblur = () => {
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
    locationName = locationInput.value;
    localStorage.setItem('location', locationInput.value);
  }
};

function getWeather(location) {
  let request = new XMLHttpRequest();
  request.open(
    'GET',
    `http://127.0.0.1:3001/api?apiType=weather&q=${location}`,
  );
  request.send();
  request.onload = () => {
    if (request.status === 200) {
      weatherForecast.innerHTML = `${getAlerts(
        JSON.parse(request.response)['alerts']['alert'],
      )}
      <p onclick="document.querySelectorAll('.today').forEach((el) => {el.classList.toggle('hiddenBox')});document.querySelector('.weather-caret-0').classList.toggle('open')">Today<img src="./imgs/triangle${
        theme === 'dark' ? '-white' : ''
      }.svg" alt="triangle" class="weather-caret-0 open"></p>
      <div class="current-weather today">
          <div class="vertical-align">
              <div class="time">${
                JSON.parse(request.response)['current']['last_updated'].match(/\d+:\d+/g)[0]
              }</div>
              <img class="condition${textOrIcons('icons')}" src="./imgs/${
        getCondition(JSON.parse(request.response)['current']['condition']['text'])[0]
      }.svg" alt="${JSON.parse(request.response)['current']['condition']['text']}">
              <p class="${textOrIcons('text')}">${
        getCondition(JSON.parse(request.response)['current']['condition']['text'])[1]
      }</p>
          </div>
              <div class="vertical-align temperatures">
                  <div class="temperature">
                      ${
                        JSON.parse(request.response)['current'][`temp_${temperatureUnit}`]
                      }&deg;${temperatureUnit.toUpperCase()}
                  </div>
                  <div class="feels-like">
                      feels like ${
                        JSON.parse(request.response)['current'][
                          `feelslike_${temperatureUnit}`
                        ]
                      }&deg;${temperatureUnit.toUpperCase()}
                  </div>
              </div>
              <div class="extra-info">
                  <div class="wind">
                      <img src="./imgs/wind.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="wind">${
        iconsOrText === 'text' ? 'wind' : ''
      } ${windSpeed(JSON.parse(request.response), true)} ${windUnit}<br>${
        iconsOrText === 'text' ? 'gust' : ''
      } ${maxWindSpeed(JSON.parse(request.response), true)} ${windUnit}<br>${
        iconsOrText === 'text' ? 'direction' : ''
      } ${JSON.parse(request.response)['current']['wind_degree']}&deg;
                  </div>
                  <div class="humidity">
                      <img src="./imgs/droplet.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="humidity">${
        iconsOrText === 'text' ? 'humidity' : ''
      } ${JSON.parse(request.response)['current']['humidity']}%
                  </div>
                  <div class="precipitation">
                      <img src="./imgs/umbrella.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="precipitation">${
        iconsOrText === 'text' ? 'precip.' : ''
      } ${percentprecip(JSON.parse(request.response), true)}%<br>${
        iconsOrText === 'text' ? 'fall' : ''
      } ${JSON.parse(request.response)['current'][`precip_${precipUnit}`]} ${precipUnit}
                  </div>
                  <div class="visibility">
                      <img src="./imgs/eye.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="visibility">${
        iconsOrText === 'text' ? 'visibility' : ''
      } ${JSON.parse(request.response)['current'][`vis_${distanceUnit}`]} ${distanceUnit}
                  </div>
              </div>
          </div>`;

      currentHour =
        parseInt(
          String(
            JSON.parse(request.response)['current']['last_updated'].match(/\d+:/g),
          ).replace(':', ''),
        ) + 1;

      for (var i = 0; i < 24 - currentHour; i++) {
        hour =
          JSON.parse(request.response)['forecast']['forecastday'][0]['hour'][
            i + currentHour
          ];
        weatherForecast.innerHTML += `
              <div class="today">
                  <div class="vertical-align">
                      <div class="time">${
                        hour['time'].match(/\d+:\d+/g)[0]
                      }</div>
                      <img class="condition${textOrIcons(
                        'icons',
                      )}" src="./imgs/${
          getCondition(hour['condition']['text'])[0]
        }.svg" alt="${hour['condition']['text']}">
                      <p class="${textOrIcons('text')}">${
          getCondition(hour['condition']['text'])[1]
        }</p>
                  </div>
                  <div class="vertical-align temperatures">
                      <div class="temperature">
                          ${
                            hour[`temp_${temperatureUnit}`]
                          }&deg;${temperatureUnit.toUpperCase()}
                      </div>
                      <div class="feels-like">
                          feels like ${
                            hour[`feelslike_${temperatureUnit}`]
                          }&deg;${temperatureUnit.toUpperCase()}
                      </div>
                  </div>
                  <div class="extra-info">
                      <div class="wind">
                          <img src="./imgs/wind.svg" class="${textOrIcons(
                            'icons',
                          )}" alt="wind">${
          iconsOrText === 'text' ? 'wind' : ''
        } ${windSpeed(hour, false)} ${windUnit}<br>${
          iconsOrText === 'text' ? 'gust' : ''
        } ${maxWindSpeed(hour, false)} ${windUnit}<br>${
          iconsOrText === 'text' ? 'direction' : ''
        } ${hour['wind_degree']}&deg;
                      </div>
                      <div class="humidity">
                          <img src="./imgs/droplet.svg" class="${textOrIcons(
                            'icons',
                          )}" alt="humidity">${
          iconsOrText === 'text' ? 'humidity' : ''
        } ${hour['humidity']}%
                      </div>
                      <div class="precipitation">
                          <img src="./imgs/umbrella.svg" class="${textOrIcons(
                            'icons',
                          )}" alt="precipitation">${
          iconsOrText === 'text' ? 'precip.' : ''
        } ${percentprecip(hour, false)}%<br>${
          iconsOrText === 'text' ? 'fall' : ''
        } ${hour[`precip_${precipUnit}`]} ${precipUnit}
                      </div>
                      <div class="visibility">
                          <img src="./imgs/eye.svg" class="${textOrIcons(
                            'icons',
                          )}" alt="visibility">${
          iconsOrText === 'text' ? 'visibility' : ''
        } ${hour[`vis_${distanceUnit}`]} ${distanceUnit}
                      </div>
                  </div>
              </div>`;
      }

      weatherForecast.innerHTML += `<p onclick="document.querySelectorAll('.tomorrow').forEach((el) => {el.classList.toggle('hiddenBox')});document.querySelector('.weather-caret-1').classList.toggle('open')">Tomorrow<img src="./imgs/triangle${
        theme === 'dark' ? '-white' : ''
      }.svg" alt="triangle" class="weather-caret-1"></p>`;

      for (var i = 0; i < 24; i++) {
        hour = JSON.parse(request.response)['forecast']['forecastday'][1]['hour'][i];
        weatherForecast.innerHTML += `<div class="tomorrow hiddenBox">
              <div class="vertical-align">
                  <div class="time">${hour['time'].match(/\d+:\d+/g)[0]}</div>
                  <img class="condition${textOrIcons('icons')}" src="./imgs/${
          getCondition(hour['condition']['text'])[0]
        }.svg" alt="${hour['condition']['text']}">
                  <p class="${textOrIcons('text')}">${
          getCondition(hour['condition']['text'])[1]
        }</p>
              </div>
              <div class="vertical-align temperatures">
                  <div class="temperature">
                      ${
                        hour[`temp_${temperatureUnit}`]
                      }&deg;${temperatureUnit.toUpperCase()}
                  </div>
                  <div class="feels-like">
                      feels like ${
                        hour[`feelslike_${temperatureUnit}`]
                      }&deg;${temperatureUnit.toUpperCase()}
                  </div>
              </div>
              <div class="extra-info">
                  <div class="wind">
                      <img src="./imgs/wind.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="wind">${
          iconsOrText === 'text' ? 'wind' : ''
        } ${windSpeed(hour, false)} ${windUnit}<br>${
          iconsOrText === 'text' ? 'gust' : ''
        } ${maxWindSpeed(hour, false)} ${windUnit}<br>${
          iconsOrText === 'text' ? 'direction' : ''
        } ${hour['wind_degree']}&deg;
                  </div>
                  <div class="humidity">
                      <img src="./imgs/droplet.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="humidity">${
          iconsOrText === 'text' ? 'humidity' : ''
        } ${hour['humidity']}%
                  </div>
                  <div class="precipitation">
                      <img src="./imgs/umbrella.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="precipitation">${
          iconsOrText === 'text' ? 'precip.' : ''
        } ${percentprecip(hour, false)}%<br>${
          iconsOrText === 'text' ? 'fall' : ''
        } ${hour[`precip_${precipUnit}`]} ${precipUnit}
                  </div>
                  <div class="visibility">
                      <img src="./imgs/eye.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="visibility">${
          iconsOrText === 'text' ? 'visibility' : ''
        } ${hour[`vis_${distanceUnit}`]} ${distanceUnit}
                  </div>
              </div>
          </div>`;
      }

      weatherForecast.innerHTML += `<p onclick="document.querySelectorAll('.overmorrow').forEach((el) => {el.classList.toggle('hiddenBox')});document.querySelector('.weather-caret-2').classList.toggle('open')">Overmorrow<img src="./imgs/triangle${
        theme === 'dark' ? '-white' : ''
      }.svg" alt="triangle" class="weather-caret-2"></p>`;

      for (var i = 0; i < 24; i++) {
        hour = JSON.parse(request.response)['forecast']['forecastday'][2]['hour'][i];
        weatherForecast.innerHTML += `<div class="overmorrow hiddenBox">
              <div class="vertical-align">
                  <div class="time">${hour['time'].match(/\d+:\d+/g)[0]}</div>
                  <img class="condition${textOrIcons('icons')}" src="./imgs/${
          getCondition(hour['condition']['text'])[0]
        }.svg" alt="${hour['condition']['text']}">
                  <p class="${textOrIcons('text')}">${
          getCondition(hour['condition']['text'])[1]
        }</p>
              </div>
              <div class="vertical-align temperatures">
                  <div class="temperature">
                      ${
                        hour[`temp_${temperatureUnit}`]
                      }&deg;${temperatureUnit.toUpperCase()}
                  </div>
                  <div class="feels-like">
                      feels like ${
                        hour[`feelslike_${temperatureUnit}`]
                      }&deg;${temperatureUnit.toUpperCase()}
                  </div>
              </div>
              <div class="extra-info">
                  <div class="wind">
                      <img src="./imgs/wind.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="wind">${
          iconsOrText === 'text' ? 'wind' : ''
        } ${windSpeed(hour, false)} ${windUnit}<br>${
          iconsOrText === 'text' ? 'gust' : ''
        } ${maxWindSpeed(hour, false)} ${windUnit}<br>${
          iconsOrText === 'text' ? 'direction' : ''
        } ${hour['wind_degree']}&deg;
                  </div>
                  <div class="humidity">
                      <img src="./imgs/droplet.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="humidity">${
          iconsOrText === 'text' ? 'humidity' : ''
        } ${hour['humidity']}%
                  </div>
                  <div class="precipitation">
                      <img src="./imgs/umbrella.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="precipitation">${
          iconsOrText === 'text' ? 'precip.' : ''
        } ${percentprecip(hour, false)}%<br>${
          iconsOrText === 'text' ? 'fall' : ''
        } ${hour[`precip_${precipUnit}`]} ${precipUnit}
                  </div>
                  <div class="visibility">
                      <img src="./imgs/eye.svg" class="${textOrIcons(
                        'icons',
                      )}" alt="visibility">${
          iconsOrText === 'text' ? 'visibility' : ''
        } ${hour[`vis_${distanceUnit}`]} ${distanceUnit}
                  </div>
              </div>
          </div>`;
      }
    }
  };
}

function textOrIcons(type) {
  if (type === 'text') {
    return iconsOrText === 'text' ? 'shown' : 'hidden';
  } else {
    return iconsOrText === 'text' ? ' hidden' : ' shown';
  }
}

function getAlerts(alert) {
  if (alert.length === 0) {
    return '';
  } else {
    alerts = '';
    for (var i = 0; i < alert.length; i++) {
      alerts += `
            <div class="alert">
                <h1>${alert[i]['event']}</h1>
                <h2>${alert[i]['headline']}</h2>
                <p>${getInstructions(alert[i]['instruction'])}</p>
                <p>Affected areas: ${alert[i]['areas']}</p>
            </div>`;
    }
  }
  return alerts;
}

function getInstructions(instructions) {
  website = instructions.match(
    /(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*/g,
  );
  return instructions.replace(website, `<a href="${website}">${website}</a>`);
}

function getCondition(condition_name) {
  var condition;
  if (
    condition_name === 'Partly cloudy' ||
    condition_name === 'Cloudy' ||
    condition_name === 'Overcast'
  ) {
    condition = ['cloud', 'Cloudy'];
  } else if (
    condition_name === 'Patchy rain possible' ||
    condition_name === 'Patchy light drizzle' ||
    condition_name === 'Light drizzle' ||
    condition_name === 'Patchy light rain' ||
    condition_name === 'Light rain'
  ) {
    condition = ['cloud-drizzle', 'Drizzle'];
  } else if (
    condition_name === 'Patchy snow possible' ||
    condition_name === 'Patchy freeing drizzle possible' ||
    condition_name === 'Blowing snow' ||
    condition_name === 'Blizzard' ||
    condition_name === 'Freezing drizzle' ||
    condition_name === 'Heavy freezing drizzle' ||
    condition_name === 'Light freezing rain' ||
    condition_name === 'Moderate or heavy freezing rain' ||
    condition_name === 'Light sleet' ||
    condition_name === 'Moderate or heavy sleet' ||
    condition_name === 'Patchy light snow' ||
    condition_name === 'Light snow' ||
    condition_name === 'Patchy moderate snow' ||
    condition_name === 'Moderate snow' ||
    condition_name === 'Patchy heavy snow' ||
    condition_name === 'Heavy snow' ||
    condition_name === 'Ice pellets' ||
    condition_name === 'Light sleet showers' ||
    condition_name === 'Moderate or heavy sleet showers' ||
    condition_name === 'Light snow showers' ||
    condition_name === 'Moderate or heavy snow showers' ||
    condition_name === 'Light showers of ice pellets' ||
    condition_name === 'Moderate or heavy showers of ice pellets' ||
    condition_name === 'Patchy sleet possible'
  ) {
    condition = ['cloud-snow', 'Snow'];
  } else if (
    condition_name === 'Moderate rain at times' ||
    condition_name === 'Heavy rain at times' ||
    condition_name === 'Heavy rain' ||
    condition_name === 'Light rain shower' ||
    condition_name === 'Moderate or heavy rain shower' ||
    condition_name === 'Torrential rain shower'
  ) {
    condition = ['cloud-rain', 'Rain'];
  } else if (
    condition_name === 'Patchy light rain with thunder' ||
    condition_name === 'Moderate or heavy rain with thunder' ||
    condition_name === 'Patchy light snow with thunder' ||
    condition_name === 'Moderate or heavy snow with thunder' ||
    condition_name === 'Thundery outbreaks possible'
  ) {
    condition = ['cloud-lightning', 'Thunderstorm'];
  } else {
    condition = ['sun', 'Sunny'];
  }
  return condition;
}

function percentprecip(json, current) {
  if (current === true) {
    var t;
    t = `${json['current']['last_updated'].match(/\d+:\d+/g)}`;
    t = parseInt(String(t.match(/\d+:/g)).replace(':', ''));
    return Math.max(
      json['forecast']['forecastday'][0]['hour'][t]['chance_of_rain'],
      json['forecast']['forecastday'][0]['hour'][t]['chance_of_snow'],
    );
  } else {
    return json['chance_of_rain'];
  }
}

function windSpeed(json, current) {
  let space;
  if (current === false) {
    space = json;
  } else {
    space = json['current'];
  }
  if (windUnit === 'kph') {
    return space['wind_kph'];
  } else if (windUnit === 'mph') {
    return space['wind_mph'];
  } else {
    return Math.round(space['wind_kph'] / 0.1852001) / 10;
  }
}

function maxWindSpeed(json, current) {
  let space;
  if (current === false) {
    space = json;
  } else {
    space = json['current'];
  }
  if (windUnit === 'kph') {
    return space['gust_kph'];
  } else if (windUnit === 'mph') {
    return space['gust_mph'];
  } else {
    return Math.round(space['gust_kph'] / 0.1852001) / 10;
  }
}

function checkWindBtns(btnNum) {
  if (btnNum === 0) {
    windBtn0.checked = true;
    windBtn1.checked = false;
    windBtn2.checked = false;
    windUnit0.classList.add('active');
    windUnit1.classList.remove('active');
    windUnit2.classList.remove('active');
    setKphWind();
  } else if (btnNum === 1) {
    windBtn0.checked = false;
    windBtn1.checked = true;
    windBtn2.checked = false;
    windUnit0.classList.remove('active');
    windUnit1.classList.add('active');
    windUnit2.classList.remove('active');
    setMphWind();
  } else {
    windBtn0.checked = false;
    windBtn1.checked = false;
    windBtn2.checked = true;
    windUnit0.classList.remove('active');
    windUnit1.classList.remove('active');
    windUnit2.classList.add('active');
    setKtWind();
  }
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
  }
}

function checkTemperatureBtns(btnNum) {
  if (btnNum === 0) {
    temperatureBtn0.checked = true;
    temperatureBtn1.checked = false;
    temperatureUnit0.classList.add('active');
    temperatureUnit1.classList.remove('active');
    setCTemp();
  } else {
    temperatureBtn0.checked = false;
    temperatureBtn1.checked = true;
    temperatureUnit0.classList.remove('active');
    temperatureUnit1.classList.add('active');
    setFTemp();
  }
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
  }
}

function checkPrecipBtns(btnNum) {
  if (btnNum === 0) {
    precipBtn0.checked = true;
    precipBtn1.checked = false;
    precipUnit0.classList.add('active');
    precipUnit1.classList.remove('active');
    setMmPrecip();
  } else {
    precipBtn0.checked = false;
    precipBtn1.checked = true;
    precipUnit0.classList.remove('active');
    precipUnit1.classList.add('active');
    setInPrecip();
  }
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
  }
}

function checkDistanceBtns(btnNum) {
  if (btnNum === 0) {
    distanceBtn0.checked = true;
    distanceBtn1.checked = false;
    distanceUnit0.classList.add('active');
    distanceUnit1.classList.remove('active');
    setKmDistance();
  } else {
    distanceBtn0.checked = false;
    distanceBtn1.checked = true;
    distanceUnit0.classList.remove('active');
    distanceUnit1.classList.add('active');
    setMiDistance();
  }
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
  }
}

function checkIconsOrTextBtns(btnNum) {
  if (btnNum === 0) {
    iconsOrTextBtn0.checked = true;
    iconsOrTextBtn1.checked = false;
    iconsOrTextUnit0.classList.add('active');
    iconsOrTextUnit1.classList.remove('active');
    setIcons();
  } else if (btnNum === 1) {
    iconsOrTextBtn0.checked = false;
    iconsOrTextBtn1.checked = true;
    iconsOrTextUnit0.classList.remove('active');
    iconsOrTextUnit1.classList.add('active');
    setText();
  }
  if (locationInput.value !== '') {
    getWeather(locationInput.value);
  }
}
