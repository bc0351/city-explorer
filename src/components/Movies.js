import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

export default class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}`;
    await axios.get(`${API_BASE_URL}/movies?q=${this.props.q}`)
      .then(res => res.data)
      .then(data => this.setState({data}));
  }

  render() {
   return(<ListGroup>{this.state.data && (<Movie data={this.state.data} />)}</ListGroup>);
  };
}

const Movie = ({data}) => (
  <ListGroupItem>
    {data.map((e,i) => (
      <ListGroupItem key={i}>
        <div>
          <img src={e.image_url} 
            alt={e.title}
          />
        </div>
        <div>
        <h3>{e.title}</h3>
        <h4>{e.overview}</h4>
        <span>Votes: {e.total_votes} | Average Votes: {e.average_votes} | Realease Date: {e.released_on}</span>
        </div>
        </ListGroupItem>))}
    </ListGroupItem>
);
