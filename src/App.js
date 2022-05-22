import React from 'react';
import axios from 'axios';
import { Form, Button, ListGroup } from 'react-bootstrap';

import getImage from './components/Map';
import Forecasts from './components/Forecast';
import Movies from './components/Movies';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      lat: '',
      lon: '',
      showMap: false,
      showForecast: false,
      showMovies: false
    };
  }

  handleShowMap = () => {
    this.setState({
      showMap: true
    });
  }

  handleShowForecast = () => {
    this.setState({
      showForecast: true
    });
  }

  handleShowMovies = () => {
    this.setState({
      showMovies: true
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let input = this.state.input;
      console.log(input);

      input = input.split('').map((e, i) => { return (i === 0) ? e.toUpperCase() : e }).join('');

      let data = (await axios.get(`${process.env.REACT_APP_LOC_API_BASE_URL}/search.php?key=${process.env.REACT_APP_LOC_API_KEY}&city=${input}&country=USA&format=json`)).data[0];
      console.log(data);
      let lat = data.lat.toString();
      let lon = data.lon.toString();
        this.setState({
          lat: lat,
          lon: lon,
          showMap: true,
          showForecast: true,
          showMovies: true
        });
      } catch (err) {
        console.log(err);
      }
  };

  handleChange = (e) => {
    e.preventDefault();
    try {
      this.setState({ input: e.currentTarget.value });
      console.log(this.state.input);
    } catch (err) {
      this.setState({ error: err });
    }
  };

  render() {
    
    return (
      <>
        <h1>City Explorer</h1>
        <h2>Code301 -Project 02 - City Explorer</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="cityName" >Enter a City</Form.Label>
          <input
            type="text"
            placeholder="Search for city..."
            className="form-control"
            id="city"
            name="city"
            value={this.input}
            onChange={this.handleChange}
          />
          <Button type="submit" value={this.input} >Explore!</Button>
        </Form>
        {this.state.showMap && <div className="map" >{getImage(this.state)}</div> }
        {this.state.showForecast && <Forecasts lat={this.state.lat} lon={this.state.lon} />}
        {this.state.showMovies && <Movies className="movies" q={this.state.input} /> }
      </>
    );
  }
}
