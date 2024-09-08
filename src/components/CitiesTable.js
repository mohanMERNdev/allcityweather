import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './CitiesTable.css'; // Import CSS file

class CitiesTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      filteredCities: [],
      searchQuery: '',
      limit: 100,
      offset: 0,
      loading: false,
      hasMore: true,
    };
  }

  componentDidMount() {
    this.fetchCities();
  }

  fetchCities() {
    if (this.state.loading || !this.state.hasMore) return;

    this.setState({ loading: true });

    const { limit, offset } = this.state;
    const apiUrl = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&rows=${limit}&start=${offset}&sort=name`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const newCities = data.records;
        if (newCities.length < limit) {
          this.setState({ hasMore: false });
        }
        this.setState(prevState => ({
          cities: [...prevState.cities, ...newCities],
          filteredCities: [...prevState.cities, ...newCities], // Update filteredCities with all cities
          offset: prevState.offset + limit,
          loading: false,
        }));
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
        this.setState({ loading: false });
      });
  }

  handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredCities = this.state.cities.filter(city =>
      city.fields.name.toLowerCase().includes(searchQuery)
    );
    this.setState({ searchQuery, filteredCities });
  };

  render() {
    const { filteredCities, searchQuery, hasMore, loading } = this.state;

    return (
      <div className="table-container">
        <h2>City List</h2>
        <input
          type="text"
          placeholder="Search cities..."
          value={searchQuery}
          onChange={this.handleSearch}
          className="search-box"
        />
        <div className="table-wrapper">
          <InfiniteScroll
            dataLength={filteredCities.length}
            next={this.fetchCities.bind(this)}
            hasMore={hasMore}
            loader={<p>Loading more cities...</p>}
            endMessage={<p>No more cities to load</p>}
          >
            <table>
              <thead>
                <tr>
                  <th>City Name</th>
                  <th>Country Code</th>
                  <th>Timezone</th>
                </tr>
              </thead>
              <tbody>
                {filteredCities.map(city => (
                  <tr key={city.recordid}>
                    <td>
                      <Link to={`/weather/${city.fields.name}`} className="city-link">
                        {city.fields.name}
                      </Link>
                    </td>
                    <td>{city.fields.country_code || 'N/A'}</td>
                    <td>{city.fields.timezone || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

export default CitiesTable;
