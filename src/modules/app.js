import { addDays, getDay, setHours } from 'date-fns';
import searchIcon from '../img/magnify.png';

const API_KEY = '649f476528e8be8ecbf48bc1d874c839';
let forecastData;
let location = 'Seoul';
let units = 'standard';

async function updateData(location, units) {
  const loading = document.querySelector('.loading');
  loading.classList.remove('hidden');
  const forecastResp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${API_KEY}`,
    { mode: 'cors' }
  );
  loading.classList.add('hidden');
  const forecastJson = await forecastResp.json();
  if (forecastJson.cod !== '200') throw 'Invalid city';
  forecastData = forecastJson;
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
  try {
    await updateData(newLocation, units);
    location = newLocation;
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
    if (searchInput.value === location || searchInput.value === '')
      return;
    updateLocation(searchInput.value, units);
  });

  const searchImg = searchBtn.querySelector('img');
  searchImg.src = searchIcon;

  const convert = document.querySelector('.temp-convert');
  const celcius = convert.querySelector('.celcius');
  celcius.addEventListener('click', () => {
    if (celcius.classList.contains('active')) return;
    celcius.classList.add('active');
    fahrenheit.classList.remove('active');
    units = 'metric';
    updateLocation(location, units);
  });

  const fahrenheit = convert.querySelector('.fahrenheit');
  fahrenheit.addEventListener('click', () => {
    if (fahrenheit.classList.contains('active')) return;
    fahrenheit.classList.add('active');
    celcius.classList.remove('active');
    units = 'standard';
    updateLocation(location, 'units');
  });
}

export default function init() {
  initUI();
  updateLocation();
}
