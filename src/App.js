import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherPage from './components/WeatherPage';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Routes>
          <Route path="/" element={<CitiesTable />} />
          <Route path="/weather/:cityName" element={<WeatherPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
