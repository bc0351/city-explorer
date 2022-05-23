import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}`;
    await axios.get(`${API_BASE_URL}/movies?q=${this.props.q}`)
      .then(res => res.data)
      .then(data => this.setState({ data }));
  }

  render() {
    return (<ListGroup>{this.state.data && (<Movie data={this.state.data} />)}</ListGroup>);
  };
};
const Movie = ({ data }) => (
    data.map((e, i) => (
      <ListGroup.Item display='flex' flex-direction='row' key={i}>
        <div display='flex' flex-direction='column'>
          <img src={e.poster_img_url}
            alt={e.title}
            width={300}
            height={'auto'}
          />
        </div>
        <div display='flex' flex-direction='column'>
          <h3>{e.title}</h3>
          <h4>{e.overview}</h4>
          <span>Votes: {e.total_votes} | Average Votes: {e.average_votes} | Realease Date: {e.released_on}</span>
        </div>
      </ListGroup.Item>))
);
