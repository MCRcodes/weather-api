# Weather API

## Endpoints

### `GET /forecast`

Returns a 5 day weather forecast.

#### Request:
##### Query Parameters:
- city - the city to get the forecast for - defaults to Manchester

e.g. [`https://mcr-codes-weather.herokuapp.com/forecast?city=London`](https://mcr-codes-weather.herokuapp.com/forecast?city=London)

#### Response:
##### Status Codes:
- 200 - Success
- 404 - Returned when the city is not found
- 500 - Server Error

##### Response Data Structure:

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

