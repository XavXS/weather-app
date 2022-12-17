const API_KEY = '649f476528e8be8ecbf48bc1d874c839';

async function getWeatherData(location = 'London') {
  const weatherResp = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`,
    { mode: 'cors' }
  );
  const forecastResp = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`,
    { mode: 'cors' }
  );
  const weatherData = await weatherResp.json();
  const forecastData = await forecastResp.json();
  console.log(weatherData);
  console.log(forecastData);
}

export default function init() {
  try {
    getWeatherData();
  } catch (err) {
    console.error(err);
  }
}
