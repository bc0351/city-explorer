import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import getImage from './components/Map';
import Forecasts from './components/Forecast';
import Movies from './components/Movies';

import './app.css';

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
      input = input.split('').map((e, i) => { return (i === 0) ? e.toUpperCase() : e }).join('');

      let url = `${process.env.REACT_APP_LOC_API_BASE_URL}/search.php?key=${process.env.REACT_APP_LOC_API_KEY}&city=${this.state.input}&country=usa&format=json`;

      let data = await axios.get(url)
        .then(res => res.data[0])
        .catch(err => console.log(err));

      console.log(data);

      this.setState({
        lat: data.lat,
        lon: data.lon,
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
      <main>
        <header>
          <div>
            <h1>City Explorer</h1>
          </div>
        </header>
        <div className="main">
          <nav className="left-nav"></nav>
          <article>
            <Form className="input-group" onSubmit={this.handleSubmit}>
              <Form.Group className="form-group">
                <input
                  type="text"
                  placeholder="Search for city..."
                  className="form-input"
                  id="city"
                  name="city"
                  onChange={this.handleChange}
                />
                <Button type="submit" value={this.input} >Explore!</Button>
              </Form.Group>
            </Form>
            <div className="location">
              {this.state.showMap && <div className="map" >{getImage(this.state)}</div>}
              {this.state.showForecast && <Forecasts lat={this.state.lat} lon={this.state.lon} />}
            </div>
            {this.state.showMovies && <Movies className="movies" q={this.state.input} />}
          </article>
          <nav className="right-nav"></nav>
        </div>
      </main>
    );
  }
}
