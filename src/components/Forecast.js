import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

export default class Forecasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}`;
    await axios.get(`${API_BASE_URL}/weather?lat=${this.props.lat}&lon=${this.props.lon}`)
      .then(res => res.data)
      .then(data => this.setState({data}));
  }

  render() {
   return(<ListGroup>{this.state.data && (<Forecast data={this.state.data} />)}</ListGroup>);
  };
}

const Forecast = ({data}) => (
  <ListGroupItem>
    {data.map((e,i) => (<ListGroupItem key={i}>{e.date}: {e.description}</ListGroupItem>))}
  </ListGroupItem>
);
