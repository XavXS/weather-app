/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/toInteger/index.js
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
;// CONCATENATED MODULE: ./node_modules/date-fns/esm/_lib/requiredArgs/index.js
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}
;// CONCATENATED MODULE: ./node_modules/date-fns/esm/toDate/index.js
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}
;// CONCATENATED MODULE: ./node_modules/date-fns/esm/setHours/index.js



/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} hours - the hours of the new date
 * @returns {Date} the new date with the hours set
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */

function setHours(dirtyDate, dirtyHours) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var hours = toInteger(dirtyHours);
  date.setHours(hours);
  return date;
}
;// CONCATENATED MODULE: ./node_modules/date-fns/esm/addDays/index.js



/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @param {Date|Number} date - the date to be changed
 * @param {Number} amount - the amount of days to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
 * @returns {Date} - the new date with the days added
 * @throws {TypeError} - 2 arguments required
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */

function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);

  if (isNaN(amount)) {
    return new Date(NaN);
  }

  if (!amount) {
    // If 0 days, no-op to avoid changing times in the hour before end of DST
    return date;
  }

  date.setDate(date.getDate() + amount);
  return date;
}
;// CONCATENATED MODULE: ./node_modules/date-fns/esm/getDay/index.js


/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param {Date|Number} date - the given date
 * @returns {0|1|2|3|4|5|6} the day of week, 0 represents Sunday
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */

function getDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var day = date.getDay();
  return day;
}
;// CONCATENATED MODULE: ./src/img/magnify.png
const magnify_namespaceObject = __webpack_require__.p + "images/img_eeadf8038b4f626289c4.png";
;// CONCATENATED MODULE: ./src/modules/app.js



const API_KEY = '649f476528e8be8ecbf48bc1d874c839';
let forecastData;
let app_location = 'Seoul';
let units = 'standard';

async function updateData(location, units) {
  const loading = document.querySelector('.loading');
  loading.classList.remove('hidden');
  const forecastResp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${API_KEY}`,
    { mode: 'cors' }
  );
  loading.classList.add('hidden');
  forecastData = await forecastResp.json();
  if (forecastData.cod === '400') throw 'Nothing to geocode';
}

function loadWeather() {
  const weather = document.querySelector('.weather');
  const icon = weather.querySelector('img');
  const humid = weather.querySelector('.weather-humid');
  const rain = weather.querySelector('.weather-rain');
  const weatherData = forecastData.list[0];
  icon.src =
    'https://openweathermap.org/img/wn/' +
    weatherData.weather[0].icon +
    '@4x.png';
  humid.textContent = 'humidity: ' + weatherData.main.humidity + '%';
  rain.textContent = 'chance of rain: ' + weatherData.pop * 100 + '%';

  const temperature = document.querySelector('.temperature');
  const name = temperature.querySelector('.name');
  const temp = temperature.querySelector('.temp');
  const lowHigh = temperature.querySelector('.low-high');

  name.textContent = forecastData.city.name;
  temp.textContent = weatherData.main.temp + '°';
  lowHigh.textContent =
    'L: ' +
    weatherData.main.temp_min +
    '° H: ' +
    weatherData.main.temp_max +
    '°';
}

function loadForecast() {
  const days = document.querySelectorAll('.day');
  const dayList = forecastData.list;
  const dayData = [];

  let time = dayList[0].dt * 1000;
  time = setHours(time, 12);

  for (let i = 0; i < 5; ++i) {
    time = addDays(time, 1);
    let k = 0,
      n = dayList.length;
    for (let b = Math.floor(n / 2); b >= 1; b = Math.floor(b / 2)) {
      while (k + b < n && dayList[k + b].dt * 1000 <= time) k += b;
    }
    dayData.push({
      day: getDayOfWeek(getDay(time)),
      temp: dayList[k].main.temp,
      low: dayList[k].main.temp_min,
      high: dayList[k].main.temp_max,
      icon:
        'https://openweathermap.org/img/wn/' +
        dayList[k].weather[0].icon +
        '@4x.png',
      humid: dayList[k].main.humidity,
      rain: dayList[k].pop,
    });
  }

  for (let i = 0; i < days.length; ++i) {
    const name = days[i].querySelector('.day-name');
    const temp = days[i].querySelector('.day-temp');
    const lh = days[i].querySelector('.day-lh');
    const icon = days[i].querySelector('img');
    const humid = days[i].querySelector('.day-humid');
    const rain = days[i].querySelector('.day-rain');

    name.textContent = dayData[i].day;
    temp.textContent = dayData[i].temp + '°';
    lh.textContent =
      'L: ' + dayData[i].low + '° H: ' + dayData[i].high + '°';
    icon.src = dayData[i].icon;
    humid.textContent = 'humidity: ' + dayData[i].humid + '%';
    rain.textContent =
      'chance of rain: ' + dayData[i].rain * 100 + '%';
  }
}

function getDayOfWeek(num) {
  switch (num) {
    case 0:
      return 'Sun';
    case 1:
      return 'Mon';
    case 2:
      return 'Tues';
    case 3:
      return 'Thurs';
    case 4:
      return 'Fri';
    case 5:
      return 'Sat';
    default:
      console.error('no such day exists');
  }
}

async function updateLocation(
  newLocation = 'Seoul',
  units = 'standard'
) {
  app_location = newLocation;
  try {
    await updateData(app_location, units);
  } catch (err) {
    console.error(err);
    return;
  }
  loadWeather();
  loadForecast();
}

function initUI() {
  const search = document.querySelector('.search');
  const searchInput = search.querySelector('input');
  const searchBtn = search.querySelector('button');
  searchBtn.addEventListener('click', () => {
    if (searchInput.value === app_location) return;
    updateLocation(searchInput.value, units);
  });

  const searchImg = searchBtn.querySelector('img');
  searchImg.src = magnify_namespaceObject;

  const convert = document.querySelector('.temp-convert');
  const celcius = convert.querySelector('.celcius');
  celcius.addEventListener('click', () => {
    if (celcius.classList.contains('active')) return;
    celcius.classList.add('active');
    fahrenheit.classList.remove('active');
    units = 'metric';
    updateLocation(app_location, units);
  });

  const fahrenheit = convert.querySelector('.fahrenheit');
  fahrenheit.addEventListener('click', () => {
    if (fahrenheit.classList.contains('active')) return;
    fahrenheit.classList.add('active');
    celcius.classList.remove('active');
    units = 'standard';
    updateLocation(app_location, 'units');
  });
}

function init() {
  initUI();
  updateLocation();
}

;// CONCATENATED MODULE: ./src/index.js


init();

/******/ })()
;
//# sourceMappingURL=index.js.map