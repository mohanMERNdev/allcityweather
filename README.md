Cities and Weather App

Overview

The Cities and Weather App allows users to explore a comprehensive list of cities with infinite scrolling. Users can search for cities, view detailed weather information, and navigate between city and weather pages.

Features

- **City List with Infinite Scroll**: Displays cities in a table format that loads more cities as you scroll.
- **Search and Filter**: Filter cities by name as you type in the search box.
- **Clickable City Names**: Click on a city name to view detailed weather information on a separate page.
- **Weather Details**: Shows current weather conditions and forecasts for the selected city.

Technologies Used

- **React**: For building the user interface.
- **Fetch API**: For fetching city and weather data.
- **CSS**: Custom styles for the app with a blue, white, and grey color theme.

Components

- **CitiesTable**: Displays the list of cities with search and infinite scroll functionality.
- **WeatherPage**: Shows weather details for a selected city.
API Endpoints

- **Cities Data**: 
  - URL: `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000`
  - Fetches cities with a population of at least 1,000.

- **Weather Data**:
  - URL: `https://api.openweathermap.org/data/2.5/weather`
  - Fetches current weather data for a specific city.


