const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const moment = require('moment');
const { groupWith } = require('ramda');

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, './public')))

const getWindDirection = (deg) => {
  if (deg >= 11.25 && deg < 33.75) return 'nne';
  if (deg >= 33.75 && deg < 56.25) return 'ne';
  if (deg >= 56.25 && deg < 78.75) return 'ene';
  if (deg >= 78.75 && deg < 101.25) return 'e';
  if (deg >= 101.25 && deg < 123.75) return 'ese';
  if (deg >= 123.75 && deg < 146.25) return 'se';
  if (deg >= 146.25 && deg < 168.75) return 'sse';
  if (deg >= 168.75 && deg < 191.25) return 's';
  if (deg >= 191.25 && deg < 213.75) return 'ssw';
  if (deg >= 213.75 && deg < 236.25) return 'sw';
  if (deg >= 236.25 && deg < 258.75) return 'wsw';
  if (deg >= 258.75 && deg < 281.25) return 'w';
  if (deg >= 281.25 && deg < 303.75) return 'wnw';
  if (deg >= 303.75 && deg < 326.25) return 'nw';
  if (deg >= 326.25 && deg < 348.75) return 'nnw';
  return 'n';
}

const formatData = data => ({
  location: {
    city: data.city.name,
    country: data.city.country,
  },
  forecasts: data.list.map(forecast => ({
    date: forecast.dt * 1000,
    temperature: {
      max: Math.ceil(forecast.main.temp_max),
      min: Math.floor(forecast.main.temp_min),
    },
    wind: {
      speed: Math.ceil(forecast.wind.speed),
      direction: getWindDirection(forecast.wind.deg),
    },
    humidity: forecast.main.humidity,
    description: forecast.weather[0].main,
    icon: forecast.weather[0].id,
  })),
});

const sameDate = (a, b) => moment(a.date).isSame(b.date, 'day');

app.get('/forecast', (req, res) => {
  axios.get('https://api.openweathermap.org/data/2.5/forecast', {
    params: {
      id: 2643123,
      appId: process.env.OWM_API_KEY,
      units: 'metric',
    },
  })
    .then(response => {
      const forecasts = formatData(response.data);

      res.status(200).json({
        ...forecasts,
        forecasts: groupWith(sameDate, forecasts.forecasts)
          .map(([day]) => day)
          .slice(0, 5),
      });
    });
});

app.get('*', (req, res) => {
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('app listening on http://127.0.0.1:3000');
});