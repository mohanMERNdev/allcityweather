import React from 'react';
import { useParams } from 'react-router-dom';
import './WeatherPage.css'; // Import CSS file

class WeatherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      loading: true,
    };
  }

  componentDidMount() {
    const { cityName } = this.props.params;
    this.fetchWeather(cityName);
  }

  fetchWeather(cityName) {
    const apiKey = 'ac7e9a2ca4737d694b2c8cffc21890dd'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          this.setState({
            weatherData: data,
            loading: false,
          });
        } else {
          // Handle the case where the city is not found
          this.setState({
            weatherData: null,
            loading: false,
          });
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { weatherData, loading } = this.state;

    if (loading) {
      return <p>Loading weather data...</p>;
    }

    if (!weatherData) {
      return <p>City not found or an error occurred.</p>;
    }

    return (
      <div className="weather-container">
        <div className="weather-card">
          <h2>{weatherData.name}</h2>
          <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
          <p><strong>Description:</strong> {weatherData.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Pressure:</strong> {weatherData.main.pressure} hPa</p>
        </div>
      </div>
    );
  }
}

const WeatherPageWithParams = (props) => {
  const params = useParams();
  return <WeatherPage {...props} params={params} />;
};

export default WeatherPageWithParams;
