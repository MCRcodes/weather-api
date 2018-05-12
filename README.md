# Weather API

## Endpoints

### `GET /forecast`

Returns a 5 day forecast for the weather in Manchester.

#### Response:
```json
{
  "location": {
    "city": "City name - String",
    "country": "Country name - String",
  },
  "forecasts": [{
    "date": "Forecast date (Unix Timestamp Milliseconds) - Integer",
    "temperature": {
      "max": "Max temperature for day (celcius) - Integer",
      "min": "Min temperature for day (celcius) - Integer"
    },
    "wind": {
      "speed": "Wind speed (mph) - Integer",
      "direction": "Wind direction (e.g. n, sw) - String"
    },
    "humidity": "Humidity - Integer",
    "description": "Overall description of weather - String",
    "icon": "Icon ID - Number"
  }]
}
```

